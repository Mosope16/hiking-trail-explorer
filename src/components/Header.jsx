import React from "react";
import { Mountain, Compass, Heart, Award, Plus } from "lucide-react";

export const Header = ({
  trailsCount,
  bookmarksCount,
  completedHikesCount,
  unit,
  onToggleUnit,
  activeTab,
  onTabChange,
  onOpenLogHikeModal
}) => {
  return (
    <header className="header-bar" id="app-header">
      {/* Brand */}
      <div className="logo-group" onClick={() => onTabChange("explore")}>
        <div className="logo-icon-box">
          <Mountain size={24} strokeWidth={2.2} />
          <div className="logo-beacon" />
        </div>
        <div>
          <div className="logo-text-title">SummitPath</div>
          <div className="logo-text-subtitle">Trail Explorer & Topo Guide</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{ display: "flex", gap: "6px", background: "var(--bg-tertiary)", padding: "4px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-subtle)" }}>
        <button
          className={`filter-pill ${activeTab === "explore" ? "active" : ""}`}
          onClick={() => onTabChange("explore")}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px" }}
        >
          <Compass size={15} />
          <span>Explore Trails</span>
          <span style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.7rem", padding: "1px 6px", borderRadius: "10px", fontWeight: 600 }}>
            {trailsCount}
          </span>
        </button>

        <button
          className={`filter-pill ${activeTab === "progress" ? "active" : ""}`}
          onClick={() => onTabChange("progress")}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px" }}
        >
          <Award size={15} />
          <span>My Logbook & Progress</span>
          {completedHikesCount > 0 && (
            <span style={{ background: "var(--amber-primary)", color: "#000", fontSize: "0.7rem", padding: "1px 6px", borderRadius: "10px", fontWeight: 800 }}>
              {completedHikesCount}
            </span>
          )}
        </button>

        <button
          className={`filter-pill ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => onTabChange("saved")}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px" }}
        >
          <Heart size={15} />
          <span>Saved</span>
          {bookmarksCount > 0 && (
            <span style={{ background: "var(--coral-primary)", color: "#fff", fontSize: "0.7rem", padding: "1px 6px", borderRadius: "10px", fontWeight: 800 }}>
              {bookmarksCount}
            </span>
          )}
        </button>
      </nav>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Metric / Imperial toggle */}
        <button
          className="btn btn-ghost"
          onClick={onToggleUnit}
          title={`Switch to ${unit === "metric" ? "Imperial (mi, ft)" : "Metric (km, m)"}`}
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", padding: "6px 10px" }}
        >
          {unit === "metric" ? "KM / M" : "MI / FT"}
        </button>

        {/* Log Hike action */}
        <button
          className="btn btn-primary"
          onClick={onOpenLogHikeModal}
          id="btn-log-hike"
        >
          <Plus size={16} />
          <span>Log Hike</span>
        </button>
      </div>
    </header>
  );
};
