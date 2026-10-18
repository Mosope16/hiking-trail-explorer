import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X, Star, MapPin, TrendingUp, CloudSun, AlertTriangle,
  CheckSquare, MessageSquare, Send, CheckCircle2, Heart, Award
} from 'lucide-react';
import { ElevationProfile } from './ElevationProfile';
import { storageService } from '../services/supabase';

export const TrailDetailDrawer = ({
  trail,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenLogHikeModal,
  unit = 'metric',
  onHoverElevationPoint
}) => {
  const [checkedGear, setCheckedGear] = useState({});
  const [reviews, setReviews] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (!trail) return;
    // Load reviews
    const fetchReviews = async () => {
      const data = await storageService.getReviews(trail.id);
      if (data) {
        setReviews(data);
      } else {
        // Fallback sample reviews
        setReviews([
          {
            id: 'sample-r1',
            author_name: 'Elena Rostova',
            rating: 5,
            comment: 'One of the greatest outdoor adventures of my life! The summit views were unforgettable. Make sure to pack plenty of water and start before dawn.',
            hike_date: 'September 2026'
          },
          {
            id: 'sample-r2',
            author_name: 'Marcus Vance',
            rating: 5,
            comment: 'Challenging climb, but the trail is very well maintained. The exposed sections get the heart racing. Stiff hiking boots are an absolute must.',
            hike_date: 'August 2026'
          }
        ]);
      }
    };
    fetchReviews();
  }, [trail]);

  if (!trail) return null;

  const isMetric = unit === 'metric';
  const dist = isMetric ? `${trail.distanceKm} km` : `${(trail.distanceKm * 0.621371).toFixed(1)} mi`;
  const gain = isMetric ? `+${trail.elevationGainM} m` : `+${Math.round(trail.elevationGainM * 3.28084)} ft`;
  const peak = isMetric ? `${trail.peakElevationM} m` : `${Math.round(trail.peakElevationM * 3.28084)} ft`;

  const toggleGear = (itemIndex) => {
    setCheckedGear(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingReview(true);
    const reviewObj = {
      trail_id: trail.id,
      author_name: authorName.trim() || 'Trail Adventurer',
      rating: newRating,
      comment: newComment.trim(),
      hike_date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    const updated = await storageService.addReview(reviewObj);
    setReviews(updated);
    setNewComment('');
    setAuthorName('');
    setSubmittingReview(false);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Hero Top */}
        <div className="drawer-hero">
          <img src={trail.heroImage} alt={trail.name} className="drawer-hero-img" />
          <div className="drawer-hero-gradient" />

          <button className="btn-drawer-close" onClick={onClose} title="Close drawer">
            <X size={20} />
          </button>

          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge badge-${trail.difficulty.toLowerCase()}`}>
                {trail.difficulty}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
                {trail.routeType}
              </span>
              {trail.permitRequired && (
                <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.9)', color: '#ffffff' }}>
                  Permit Required
                </span>
              )}
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
              {trail.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald-light)', fontSize: '0.9rem', marginTop: '4px' }}>
              <MapPin size={15} />
              <span>{trail.park}, {trail.location}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="drawer-content">
          {/* Quick Metrics Bar */}
          <div className="trail-card-metrics" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="metric-item">
              <span className="metric-label">Distance</span>
              <span className="metric-value">{dist}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Elevation Gain</span>
              <span className="metric-value">{gain}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Peak Summit</span>
              <span className="metric-value">{peak}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Est Duration</span>
              <span className="metric-value">{trail.estimatedHours}</span>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => onOpenLogHikeModal(trail)}
            >
              <Award size={16} />
              <span>Log as Completed Hike</span>
            </button>
            <button
              className={`btn ${isBookmarked ? 'btn-secondary' : 'btn-ghost'}`}
              onClick={() => onToggleBookmark(trail.id)}
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              <Heart size={16} fill={isBookmarked ? '#ef4444' : 'none'} color={isBookmarked ? '#ef4444' : 'var(--text-muted)'} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Trail Description */}
          <div>
            <h3 className="drawer-section-title">Trail Overview</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {trail.description}
            </p>

            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--emerald-light)' }}>Route Highlights:</strong>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {trail.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Elevation Profile Chart */}
          <div>
            <h3 className="drawer-section-title">
              <TrendingUp size={18} color="var(--emerald-light)" />
              Topographic Elevation Profile
            </h3>
            <ElevationProfile
              trail={trail}
              unit={unit}
              onHoverPoint={onHoverElevationPoint}
            />
          </div>

          {/* Weather & Safety Advisory */}
          <div>
            <h3 className="drawer-section-title">
              <CloudSun size={18} color="var(--sky-primary)" />
              Live Mountain Weather & Conditions
            </h3>
            <div className="weather-card">
              <div className="weather-header">
                <div>
                  <div className="weather-temp">{trail.weather.tempC}°C / {Math.round(trail.weather.tempC * 9/5 + 32)}°F</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{trail.weather.condition}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <div>Wind: {trail.weather.windSpeedKmh} km/h</div>
                  <div>UV Index: {trail.weather.uvIndex}</div>
                </div>
              </div>

              {trail.weather.alert && (
                <div className="weather-alert-box">
                  <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Advisory: </strong>
                    <span>{trail.weather.alert}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Waypoints List */}
          <div>
            <h3 className="drawer-section-title">Key Trail Waypoints & Water Points</h3>
            <div className="waypoints-timeline">
              {trail.waypoints.map((wp, idx) => (
                <div key={idx} className="waypoint-item">
                  <div className="waypoint-dot" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>{wp.name}</strong>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--amber-primary)' }}>
                      {isMetric ? `${wp.elevation} m` : `${Math.round(wp.elevation * 3.28084)} ft`}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    {wp.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Gear Checklist */}
          <div>
            <h3 className="drawer-section-title">
              <CheckSquare size={18} color="var(--emerald-light)" />
              Recommended Gear Checklist
            </h3>
            <div className="gear-list">
              {trail.gearChecklist.map((gear, idx) => {
                const isChecked = checkedGear[idx];
                return (
                  <div
                    key={idx}
                    className={`gear-item ${isChecked ? 'checked' : ''}`}
                    onClick={() => toggleGear(idx)}
                  >
                    <div className="checkbox-custom">
                      {isChecked && <CheckCircle2 size={16} />}
                    </div>
                    <span style={{ flex: 1, fontSize: '0.88rem' }}>
                      {gear.item}
                    </span>
                    {gear.essential && (
                      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--coral-primary)', fontWeight: 700 }}>
                        Essential
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Community Reviews */}
          <div>
            <h3 className="drawer-section-title">
              <MessageSquare size={18} color="var(--sky-primary)" />
              Trail Reviews & Field Reports ({reviews.length})
            </h3>

            {/* Review form */}
            <form onSubmit={handleReviewSubmit} style={{ background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name (e.g. Alex H.)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{ flex: 1 }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      onClick={() => setNewRating(star)}
                      fill={star <= newRating ? 'var(--amber-primary)' : 'none'}
                      color={star <= newRating ? 'var(--amber-primary)' : 'var(--text-dim)'}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>

              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Share trail conditions, wildlife sightings, or tips for fellow hikers…"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{ width: '100%', marginBottom: '10px' }}
                required
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                  <Send size={14} />
                  <span>{submittingReview ? 'Posting…' : 'Post Field Report'}</span>
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reviews.map((rev) => (
                <div key={rev.id} style={{ background: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      {rev.author_name}
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} size={12} fill="var(--amber-primary)" color="var(--amber-primary)" />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 6px 0', lineHeight: 1.5 }}>
                    "{rev.comment}"
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'right' }}>
                    {rev.hike_date || 'Recent Hike'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
