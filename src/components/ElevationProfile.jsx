import React, { useState, useRef } from 'react';
import { TrendingUp } from 'lucide-react';

export const ElevationProfile = ({
  trail,
  unit = 'metric',
  onHoverPoint,
  _activeScrubPoint
}) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const svgRef = useRef(null);

  if (!trail || !trail.elevationProfile || trail.elevationProfile.length === 0) {
    return null;
  }

  const profile = trail.elevationProfile;
  const isMetric = unit === 'metric';

  // Unit conversions
  const distMultiplier = isMetric ? 1 : 0.621371;
  const elevMultiplier = isMetric ? 1 : 3.28084;
  const distUnit = isMetric ? 'km' : 'mi';
  const elevUnit = isMetric ? 'm' : 'ft';

  // Calculate bounds
  const elevations = profile.map(p => p.elevationM * elevMultiplier);
  const distances = profile.map(p => p.distanceKm * distMultiplier);
  const minElev = Math.min(...elevations);
  const maxElev = Math.max(...elevations);
  const maxDist = Math.max(...distances) || 1;
  const elevRange = (maxElev - minElev) || 1;

  // SVG viewBox settings
  const width = 600;
  const height = 130;
  const paddingX = 30;
  const paddingY = 20;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;

  // Map points to SVG coordinates
  const points = profile.map(p => {
    const d = p.distanceKm * distMultiplier;
    const e = p.elevationM * elevMultiplier;
    const x = paddingX + (d / maxDist) * plotWidth;
    const y = paddingY + plotHeight - ((e - minElev) / elevRange) * plotHeight;
    return { x, y, ...p, displayElev: Math.round(e), displayDist: d.toFixed(1) };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const normX = (mouseX / rect.width) * width;

    // Find closest point
    let closestIndex = 0;
    let minDiff = Infinity;
    points.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - normX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setHoverIndex(closestIndex);
    if (onHoverPoint) {
      onHoverPoint(points[closestIndex], closestIndex);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    if (onHoverPoint) {
      onHoverPoint(null, null);
    }
  };

  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="elevation-chart-container" id="elevation-profile-card">
      <div className="elevation-stats-strip">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={15} color="var(--emerald-light)" />
          <span>Elevation Profile:</span>
        </div>
        <div>
          <span>Min: <strong>{Math.round(minElev)} {elevUnit}</strong></span>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
          <span>Peak: <strong>{Math.round(maxElev)} {elevUnit}</strong></span>
          <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
          <span>Gain: <strong>+{Math.round(trail.elevationGainM * elevMultiplier)} {elevUnit}</strong></span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="elevation-svg"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(255,255,255,0.15)" />

          {/* Filled elevation area & polyline */}
          <path d={areaD} className="elevation-area" />
          <path d={pathD} className="elevation-line" />

          {/* Key waypoint landmark points */}
          {points.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={i === 0 || i === points.length - 1 ? 4 : 3}
              fill={i === points.length - 1 ? '#ef4444' : '#10b981'}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          ))}

          {/* Active scrub cursor */}
          {activePoint && (
            <g>
              <line
                x1={activePoint.x}
                y1={paddingY}
                x2={activePoint.x}
                y2={height - paddingY}
                className="scrub-line"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="6"
                className="scrub-point"
              />
            </g>
          )}
        </svg>

        {/* Floating tooltip during scrub */}
        {activePoint && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: `${(activePoint.x / width) * 100}%`,
              transform: 'translateX(-50%)',
              background: 'rgba(9, 14, 12, 0.92)',
              border: '1px solid var(--amber-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 10px',
              fontSize: '0.75rem',
              color: '#ffffff',
              pointerEvents: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
              zIndex: 10
            }}
          >
            <strong style={{ color: 'var(--amber-primary)' }}>{activePoint.landmark || 'Trail Point'}</strong>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {activePoint.displayDist} {distUnit} • {activePoint.displayElev} {elevUnit}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
