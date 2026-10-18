import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TrailFilters } from './components/TrailFilters';
import { TrailCard } from './components/TrailCard';
import { TrailMap } from './components/TrailMap';
import { TrailDetailDrawer } from './components/TrailDetailDrawer';
import { LogHikeModal } from './components/LogHikeModal';
import { ElevationProfile } from './components/ElevationProfile';
import { ProgressDashboard } from './components/ProgressDashboard';
import { TRAILS_DATA } from './data/trails';
import { storageService } from './services/supabase';
import { Compass, Mountain, Heart } from 'lucide-react';

export function App() {
  const [trails] = useState(TRAILS_DATA);
  const [selectedTrail, setSelectedTrail] = useState(TRAILS_DATA[0]);
  const [activeDrawerTrail, setActiveDrawerTrail] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [completedHikes, setCompletedHikes] = useState([]);
  const [unit, setUnit] = useState('metric'); // 'metric' | 'imperial'
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'progress' | 'saved'

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [maxDistance, setMaxDistance] = useState(30);
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  // Interactive sync states
  const [hoverElevationPoint, setHoverElevationPoint] = useState(null);
  const [hoverTrailId, setHoverTrailId] = useState(null);
  const [elevationPanelOpen, setElevationPanelOpen] = useState(true);

  // Modals
  const [isLogHikeModalOpen, setIsLogHikeModalOpen] = useState(false);
  const [logHikeTargetTrail, setLogHikeTargetTrail] = useState(null);

  // Load bookmarks & completed hikes on mount
  useEffect(() => {
    const loadUserData = async () => {
      const bMarks = await storageService.getBookmarks();
      const cHikes = await storageService.getCompletedHikes();
      setBookmarks(bMarks || []);
      setCompletedHikes(cHikes || []);
    };
    loadUserData();
  }, []);

  // Filtered & Sorted Trails
  const filteredTrails = useMemo(() => {
    return trails
      .filter((trail) => {
        // If in saved tab, show only bookmarked
        if (activeTab === 'saved' && !bookmarks.includes(trail.id)) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = trail.name.toLowerCase().includes(q);
          const matchPark = trail.park.toLowerCase().includes(q);
          const matchLoc = trail.location.toLowerCase().includes(q);
          const matchTag = trail.tags.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchPark && !matchLoc && !matchTag) return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'All' && trail.difficulty !== selectedDifficulty) {
          return false;
        }

        // Max distance filter
        if (trail.distanceKm > maxDistance) {
          return false;
        }

        // Tag filter
        if (selectedTag !== 'All' && !trail.tags.includes(selectedTag)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'distance-asc') return a.distanceKm - b.distanceKm;
        if (sortBy === 'distance-desc') return b.distanceKm - a.distanceKm;
        if (sortBy === 'elevation-desc') return b.elevationGainM - a.elevationGainM;
        return 0;
      });
  }, [trails, activeTab, bookmarks, searchQuery, selectedDifficulty, maxDistance, selectedTag, sortBy]);

  // Handle Bookmark Toggle
  const handleToggleBookmark = async (trailId) => {
    const isBookmarked = bookmarks.includes(trailId);
    const updated = await storageService.toggleBookmark(trailId, isBookmarked);
    setBookmarks([...updated]);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('All');
    setMaxDistance(30);
    setSelectedTag('All');
    setSortBy('rating');
  };

  // Set selected trail and open drawer
  const handleSelectTrail = (trail) => {
    setSelectedTrail(trail);
    setActiveDrawerTrail(trail);
  };

  const handleOpenLogModal = (trail = null) => {
    setLogHikeTargetTrail(trail || selectedTrail || trails[0]);
    setIsLogHikeModalOpen(true);
  };

  const completedTrailIds = useMemo(() => {
    return new Set(completedHikes.map(h => h.trail_id));
  }, [completedHikes]);

  return (
    <div className="app-container topo-pattern">
      {/* Top Header */}
      <Header
        trailsCount={trails.length}
        bookmarksCount={bookmarks.length}
        completedHikesCount={completedHikes.length}
        unit={unit}
        onToggleUnit={() => setUnit(u => u === 'metric' ? 'imperial' : 'metric')}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenLogHikeModal={() => handleOpenLogModal()}
      />

      {/* Main View Switcher */}
      {activeTab === 'progress' ? (
        <ProgressDashboard
          completedHikes={completedHikes}
          trails={trails}
          unit={unit}
          onLogNewHike={() => handleOpenLogModal()}
          onSelectTrail={(t) => {
            setActiveTab('explore');
            handleSelectTrail(t);
          }}
        />
      ) : (
        <main className="main-content">
          {/* Left Explorer Pane */}
          <div className="explorer-pane" id="trail-explorer-pane">
            <TrailFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              maxDistance={maxDistance}
              onMaxDistanceChange={setMaxDistance}
              selectedTag={selectedTag}
              onTagChange={setSelectedTag}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
              totalResults={filteredTrails.length}
              unit={unit}
            />

            <div className="trail-cards-list">
              {filteredTrails.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  {activeTab === 'saved' ? (
                    <>
                      <Heart size={36} color="var(--coral-primary)" style={{ marginBottom: '10px', opacity: 0.7 }} />
                      <p>You haven't saved any trails to your wishlist yet.</p>
                      <button className="btn btn-secondary" style={{ marginTop: '12px' }} onClick={() => setActiveTab('explore')}>
                        Explore All Trails
                      </button>
                    </>
                  ) : (
                    <>
                      <Mountain size={36} style={{ marginBottom: '10px', opacity: 0.5 }} />
                      <p>No trails found matching the current filters.</p>
                      <button className="btn btn-secondary" style={{ marginTop: '12px' }} onClick={handleResetFilters}>
                        Clear Filters
                      </button>
                    </>
                  )}
                </div>
              ) : (
                filteredTrails.map((trail) => (
                  <TrailCard
                    key={trail.id}
                    trail={trail}
                    isSelected={selectedTrail?.id === trail.id}
                    isBookmarked={bookmarks.includes(trail.id)}
                    isCompleted={completedTrailIds.has(trail.id)}
                    onSelectTrail={handleSelectTrail}
                    onToggleBookmark={handleToggleBookmark}
                    onMouseEnter={() => setHoverTrailId(trail.id)}
                    onMouseLeave={() => setHoverTrailId(null)}
                    unit={unit}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Map Pane */}
          <div className="map-pane">
            <TrailMap
              trails={filteredTrails}
              selectedTrail={selectedTrail}
              onSelectTrail={handleSelectTrail}
              hoverPoint={hoverElevationPoint}
              hoverTrailId={hoverTrailId}
            />

            {/* Floating Elevation Card over Map for Selected Trail */}
            {selectedTrail && elevationPanelOpen && (
              <div className="map-floating-panel">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`badge badge-${selectedTrail.difficulty.toLowerCase()}`}>
                      {selectedTrail.difficulty}
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>
                      {selectedTrail.name}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                      onClick={() => setActiveDrawerTrail(selectedTrail)}
                    >
                      View Trail Profile
                    </button>
                    <button
                      className="btn btn-ghost"
                      style={{ padding: '4px 6px' }}
                      onClick={() => setElevationPanelOpen(false)}
                      title="Minimize elevation graph"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <ElevationProfile
                  trail={selectedTrail}
                  unit={unit}
                  onHoverPoint={(point) => setHoverElevationPoint(point)}
                />
              </div>
            )}

            {/* Collapsed Elevation pill if closed */}
            {selectedTrail && !elevationPanelOpen && (
              <button
                className="btn btn-secondary"
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  zIndex: 1000,
                  boxShadow: 'var(--shadow-md)',
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(10px)'
                }}
                onClick={() => setElevationPanelOpen(true)}
              >
                <Compass size={15} color="var(--emerald-light)" />
                <span>Show {selectedTrail.name} Elevation</span>
              </button>
            )}
          </div>
        </main>
      )}

      {/* Trail Detail Drawer */}
      {activeDrawerTrail && (
        <TrailDetailDrawer
          trail={activeDrawerTrail}
          onClose={() => setActiveDrawerTrail(null)}
          isBookmarked={bookmarks.includes(activeDrawerTrail.id)}
          onToggleBookmark={handleToggleBookmark}
          onOpenLogHikeModal={(t) => handleOpenLogModal(t)}
          unit={unit}
          onHoverElevationPoint={(point) => setHoverElevationPoint(point)}
        />
      )}

      {/* Log Hike Modal */}
      {isLogHikeModalOpen && (
        <LogHikeModal
          trails={trails}
          initialTrail={logHikeTargetTrail}
          onClose={() => setIsLogHikeModalOpen(false)}
          onHikeLogged={(updatedList) => setCompletedHikes(updatedList)}
        />
      )}


    </div>
  );
}

export default App;
