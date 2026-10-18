import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Award, Star, CheckCircle } from 'lucide-react';
import { storageService } from '../services/supabase';

export const LogHikeModal = ({
  trails = [],
  initialTrail = null,
  onClose,
  onHikeLogged
}) => {
  const [selectedTrailId, setSelectedTrailId] = useState(initialTrail ? initialTrail.id : (trails[0]?.id || ''));
  const [completedDate, setCompletedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('4');
  const [minutes, setMinutes] = useState('30');
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const currentTrail = trails.find(t => t.id === selectedTrailId) || trails[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentTrail) return;

    setSaving(true);
    const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);

    const hikeRecord = {
      trail_id: currentTrail.id,
      trail_name: currentTrail.name,
      completed_date: completedDate,
      duration_minutes: totalMinutes,
      elevation_gain_m: currentTrail.elevationGainM,
      distance_km: currentTrail.distanceKm,
      rating: rating,
      notes: notes.trim()
    };

    const updatedList = await storageService.logCompletedHike(hikeRecord);
    setSaving(false);

    // Multi-shot celebration confetti
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);

    if (onHikeLogged) {
      onHikeLogged(updatedList);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Award size={22} color="var(--amber-primary)" />
            <span>Log Completed Trail</span>
          </div>
          <button className="btn-drawer-close" onClick={onClose} style={{ position: 'static' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Trail Selection */}
          <div className="form-group">
            <label className="form-label">Select Trail:</label>
            <select
              className="form-select"
              value={selectedTrailId}
              onChange={(e) => setSelectedTrailId(e.target.value)}
              required
            >
              {trails.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.park} • {t.distanceKm} km)
                </option>
              ))}
            </select>
          </div>

          {/* Date & Duration */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Date Completed:</label>
              <input
                type="date"
                className="form-input"
                value={completedDate}
                onChange={(e) => setCompletedDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total Time on Trail:</label>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <input
                  type="number"
                  min="0"
                  max="48"
                  className="form-input"
                  style={{ width: '65px' }}
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>hrs</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  className="form-input"
                  style={{ width: '65px' }}
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>min</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="form-group">
            <label className="form-label">Your Experience Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={26}
                  fill={star <= rating ? 'var(--amber-primary)' : 'none'}
                  color={star <= rating ? 'var(--amber-primary)' : 'var(--text-dim)'}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label">Field Notes & Memories:</label>
            <textarea
              rows="3"
              className="form-textarea"
              placeholder="Summit weather, wildlife spotted, trail conditions, or personal milestones…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Submit buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <CheckCircle size={16} />
              <span>{saving ? 'Saving…' : 'Record in Logbook'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
