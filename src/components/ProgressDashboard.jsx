import React from 'react';
import {
  Award, TrendingUp, Clock, MapPin, Calendar,
  Trophy, CheckCircle2, ChevronRight, Download, Mountain
} from 'lucide-react';

export const ProgressDashboard = ({
  completedHikes = [],
  trails = [],
  unit = 'metric',
  onLogNewHike,
  onSelectTrail
}) => {
  const isMetric = unit === 'metric';
  const distUnit = isMetric ? 'km' : 'mi';
  const elevUnit = isMetric ? 'm' : 'ft';
  const distMultiplier = isMetric ? 1 : 0.621371;
  const elevMultiplier = isMetric ? 1 : 3.28084;

  // Compute Aggregates
  const totalDistance = completedHikes.reduce((sum, h) => sum + (parseFloat(h.distance_km) || 0), 0) * distMultiplier;
  const totalElevation = completedHikes.reduce((sum, h) => sum + (parseInt(h.elevation_gain_m) || 0), 0) * elevMultiplier;
  const totalMinutes = completedHikes.reduce((sum, h) => sum + (parseInt(h.duration_minutes) || 0), 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMins = totalMinutes % 60;

  // Comparison to Mount Everest (8,848m)
  const everestPercent = Math.min(100, Math.round(((totalElevation / elevMultiplier) / 8848) * 100));

  // Achievements
  const achievements = [
    {
      id: 'first-step',
      title: 'Trailhead Inauguration',
      desc: 'Logged your first official backcountry hike',
      icon: '🥾',
      unlocked: completedHikes.length >= 1
    },
    {
      id: 'vertical-1k',
      title: 'Kilometer Climber',
      desc: 'Climbed over 1,000m of total vertical elevation gain',
      icon: '🏔️',
      unlocked: (totalElevation / elevMultiplier) >= 1000
    },
    {
      id: 'endurance-pro',
      title: 'Alpine Endurance',
      desc: 'Logged over 25km of rugged trails',
      icon: '⚡',
      unlocked: (totalDistance / distMultiplier) >= 25
    },
    {
      id: 'summit-hunter',
      title: 'Summit Conqueror',
      desc: 'Recorded 3 or more distinct trail expeditions',
      icon: '🦅',
      unlocked: completedHikes.length >= 3
    }
  ];

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(completedHikes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `summitpath-hike-logbook-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-light)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Award size={18} />
            <span>Personal Trail Progress & Analytics</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 6px 0' }}>
            Hiker Expedition Logbook
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Track your lifetime backcountry miles, cumulative vertical elevation gain, and milestones.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={handleExportData} title="Export logbook as JSON">
            <Download size={15} />
            <span>Export Log</span>
          </button>
          <button className="btn btn-primary" onClick={onLogNewHike}>
            <span>+ Log New Hike</span>
          </button>
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
            <span>Total Distance</span>
            <MapPin size={16} color="var(--emerald-light)" />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '8px' }}>
            {totalDistance.toFixed(1)} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{distUnit}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Across {completedHikes.length} completed routes
          </div>
        </div>

        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
            <span>Vertical Climbed</span>
            <TrendingUp size={16} color="var(--amber-primary)" />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--amber-primary)', marginTop: '8px' }}>
            +{Math.round(totalElevation).toLocaleString()} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{elevUnit}</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {everestPercent}% equivalent of Mount Everest
          </div>
        </div>

        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
            <span>Time on Trail</span>
            <Clock size={16} color="var(--sky-primary)" />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '8px' }}>
            {totalHours}h {remainingMins}m
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Total expedition endurance
          </div>
        </div>

        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
            <span>Catalog Conquered</span>
            <Trophy size={16} color="var(--coral-primary)" />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '8px' }}>
            {completedHikes.length} / {trails.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {Math.round((completedHikes.length / (trails.length || 1)) * 100)}% of world trails logged
          </div>
        </div>
      </div>

      {/* Badges & Milestones Section */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={18} color="var(--amber-primary)" />
          <span>Trail Milestones & Badges</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {achievements.map((ach) => (
            <div
              key={ach.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: ach.unlocked ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-tertiary)',
                border: `1px solid ${ach.unlocked ? 'var(--emerald-primary)' : 'var(--border-subtle)'}`,
                opacity: ach.unlocked ? 1 : 0.6
              }}
            >
              <div style={{ fontSize: '2rem', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)' }}>
                {ach.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: ach.unlocked ? '#ffffff' : 'var(--text-dim)', fontSize: '0.92rem' }}>
                  {ach.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {ach.desc}
                </div>
              </div>
              {ach.unlocked && (
                <CheckCircle2 size={18} color="var(--emerald-light)" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Completed Hikes Chronological Log */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} color="var(--emerald-light)" />
          <span>Expedition History ({completedHikes.length})</span>
        </h2>

        {completedHikes.length === 0 ? (
          <div style={{ background: 'var(--bg-tertiary)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '40px', textAlign: 'center' }}>
            <Mountain size={40} style={{ color: 'var(--text-dim)', margin: '0 auto 12px auto' }} />
            <h3 style={{ color: '#ffffff', marginBottom: '6px' }}>No Hikes Logged Yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 16px auto' }}>
              Whenever you conquer a trail, log your completion date, hiking time, and field notes to start building your personal record!
            </p>
            <button className="btn btn-primary" onClick={onLogNewHike}>
              Log Your First Hike
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {completedHikes.map((hike) => {
              const matchedTrail = trails.find(t => t.id === hike.trail_id);
              const hHours = Math.floor((hike.duration_minutes || 0) / 60);
              const hMins = (hike.duration_minutes || 0) % 60;

              return (
                <div
                  key={hike.id}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'border-color var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                        {hike.trail_name || matchedTrail?.name || 'Backcountry Hike'}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '3px' }}>
                        <span>Completed on: {hike.completed_date}</span>
                        {hike.rating && (
                          <span>• Rated: {'★'.repeat(hike.rating)}{'☆'.repeat(5 - hike.rating)}</span>
                        )}
                      </div>
                    </div>

                    {matchedTrail && (
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                        onClick={() => onSelectTrail(matchedTrail)}
                      >
                        <span>View Map</span>
                        <ChevronRight size={14} />
                      </button>
                    )}
                  </div>

                  {/* Metrics bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'var(--bg-primary)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Distance</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                        {(parseFloat(hike.distance_km || 0) * distMultiplier).toFixed(1)} {distUnit}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Elevation Gain</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--amber-primary)', fontSize: '0.9rem' }}>
                        +{Math.round(parseInt(hike.elevation_gain_m || 0) * elevMultiplier)} {elevUnit}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Duration</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--sky-primary)', fontSize: '0.9rem' }}>
                        {hHours}h {hMins}m
                      </div>
                    </div>
                  </div>

                  {/* Journal notes */}
                  {hike.notes && (
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontStyle: 'italic', borderLeft: '3px solid var(--emerald-primary)' }}>
                      "{hike.notes}"
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
