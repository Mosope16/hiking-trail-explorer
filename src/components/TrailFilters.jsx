import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export const TrailFilters = ({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  maxDistance,
  onMaxDistanceChange,
  selectedTag,
  onTagChange,
  sortBy,
  onSortChange,
  onResetFilters,
  totalResults,
  unit = 'metric'
}) => {
  const isMetric = unit === 'metric';
  const distUnit = isMetric ? 'km' : 'mi';
  const displayDist = isMetric ? maxDistance : Math.round(maxDistance * 0.621371);

  const tagsList = ['All', 'Summit', 'Waterfalls', 'Glaciers', 'Loop', 'Wildflowers'];

  const hasActiveFilters = searchQuery || selectedDifficulty !== 'All' || maxDistance < 30 || selectedTag !== 'All' || sortBy !== 'rating';

  return (
    <div className="filters-container" id="trail-filters-section">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <Search size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by trail name, park, or keyword…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          id="input-trail-search"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '12px',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Difficulty Tabs */}
      <div className="difficulty-pill-row">
        {['All', 'Easy', 'Moderate', 'Strenuous'].map((diff) => (
          <button
            key={diff}
            className={`filter-pill ${diff !== 'All' ? `difficulty-${diff.toLowerCase()}` : ''} ${selectedDifficulty === diff ? 'active' : ''}`}
            onClick={() => onDifficultyChange(diff)}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Tag Badges */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
        {tagsList.map(tag => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            style={{
              background: selectedTag === tag ? 'var(--emerald-deep)' : 'var(--bg-tertiary)',
              border: `1px solid ${selectedTag === tag ? 'var(--emerald-primary)' : 'var(--border-subtle)'}`,
              color: selectedTag === tag ? '#ffffff' : 'var(--text-dim)',
              fontSize: '0.74rem',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Slider & Sort Controls Row */}
      <div className="filter-controls-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <span style={{ fontSize: '0.78rem' }}>Max Dist:</span>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={maxDistance}
            onChange={(e) => onMaxDistanceChange(Number(e.target.value))}
            style={{ accentColor: 'var(--emerald-primary)', flex: 1, maxWidth: '120px' }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--emerald-light)' }}>
            {displayDist} {distUnit}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="rating">Top Rated</option>
            <option value="distance-asc">Shortest</option>
            <option value="distance-desc">Longest</option>
            <option value="elevation-desc">Highest Gain</option>
          </select>

          {hasActiveFilters && (
            <button
              className="btn btn-ghost"
              onClick={onResetFilters}
              title="Reset all filters"
              style={{ padding: '4px 8px', fontSize: '0.78rem', gap: '4px' }}
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Result Count Info */}
      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
        <span>Showing {totalResults} curated trails</span>
        {hasActiveFilters && <span style={{ color: 'var(--amber-primary)' }}>Filters active</span>}
      </div>
    </div>
  );
};
