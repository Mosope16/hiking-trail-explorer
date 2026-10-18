import React from 'react';
import { Star, MapPin, Heart } from 'lucide-react';

export const TrailCard = ({
  trail,
  isSelected,
  isBookmarked,
  isCompleted,
  onSelectTrail,
  onToggleBookmark,
  onMouseEnter,
  onMouseLeave,
  unit = 'metric'
}) => {
  const isMetric = unit === 'metric';
  const dist = isMetric ? `${trail.distanceKm} km` : `${(trail.distanceKm * 0.621371).toFixed(1)} mi`;
  const gain = isMetric ? `+${trail.elevationGainM} m` : `+${Math.round(trail.elevationGainM * 3.28084)} ft`;

  const difficultyClass = `badge-${trail.difficulty.toLowerCase()}`;

  return (
    <div
      className={`trail-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectTrail(trail)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      id={`trail-card-${trail.id}`}
    >
      <div className="trail-card-image-box">
        <img
          src={trail.heroImage}
          alt={trail.name}
          className="trail-card-image"
          loading="lazy"
        />
        <div className="trail-card-gradient" />

        <div className="trail-card-badges">
          <span className={`badge ${difficultyClass}`}>{trail.difficulty}</span>
          {isCompleted && (
            <span className="badge badge-completed">
              ✓ Completed
            </span>
          )}
        </div>

        <button
          className={`btn-card-favorite ${isBookmarked ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(trail.id);
          }}
          title={isBookmarked ? 'Remove from saved' : 'Save trail'}
        >
          <Heart size={18} fill={isBookmarked ? '#ef4444' : 'none'} color={isBookmarked ? '#ef4444' : '#ffffff'} />
        </button>
      </div>

      <div className="trail-card-body">
        <div>
          <div className="trail-card-header">
            <h3 className="trail-card-title">{trail.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--amber-primary)', fontSize: '0.82rem', fontWeight: 700 }}>
              <Star size={14} fill="var(--amber-primary)" />
              <span>{trail.rating}</span>
              <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>({trail.reviewCount})</span>
            </div>
          </div>
          <div className="trail-card-park">
            <MapPin size={13} />
            <span>{trail.park}, {trail.location}</span>
          </div>
        </div>

        <div className="trail-card-metrics">
          <div className="metric-item">
            <span className="metric-label">Distance</span>
            <span className="metric-value">{dist}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Elev Gain</span>
            <span className="metric-value">{gain}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Est Time</span>
            <span className="metric-value">{trail.estimatedHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
