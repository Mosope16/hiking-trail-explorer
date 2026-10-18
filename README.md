# SummitPath — Hiking Trail Explorer (#6 of Project Series)

A modern, high-performance backcountry hiking and trail exploration web application built with **React 19**, **Vite**, **Leaflet**, and **Supabase**.

---

## 🌟 Features

### 1. 🗺️ Multi-Layer Interactive Topographic Map
* **Basemaps**:
  * **Topographic** (OpenTopoMap with elevation contour shading)
  * **Outdoors** (OpenStreetMap trails & bike paths)
  * **Satellite** (High-res Esri World Imagery)
  * **Dark Alpine** (High-contrast dark mode)
* **Vector Polylines**: Difficulty color-coded paths (Emerald for Easy, Amber for Moderate, Coral for Strenuous).
* **Waypoints**: Interactive pins for Trailheads, Summits, Water sources, Scenic Overlooks, Campsites, and Hazard Warnings.
* **Bi-directional Elevation Scrubbing**: Hovering over the elevation profile renders a real-time pulsing beacon (`live-pulse-marker`) directly along the map path.
* **Geolocation**: Live GPS "Locate Me" button and zoom-to-fit controls.

### 2. 📈 Dynamic Elevation Profile & Scrubbing
* Interactive SVG elevation graphs showing cumulative ascent/descent, distance, peak altitude, and grade steepness.
* Scrubbing along the profile reveals real-time distance and altitude tooltips with landmark names.

### 3. 🔍 Search & Multi-Parameter Filter Engine
* Instant keyword search across trail names, national parks, and regions.
* Filter pills for **Difficulty** (`All`, `Easy`, `Moderate`, `Strenuous`).
* Maximum distance range slider.
* Feature tag filters (`#Summit`, `#Waterfalls`, `#Glaciers`, `#Wildflowers`, `#Loop`).
* Sorting options: Top Rated, Shortest, Longest, Highest Elevation Gain.

### 4. 🥾 Detailed Trail Profile & Weather
* High-definition landscape hero photography.
* Live mountain weather conditions (temperature, weather, wind speed, UV index, and safety advisories).
* Interactive **Gear Checklist** with checkable essentials.
* Waypoints timeline with elevations.
* Community reviews and field reports submission.

### 5. 🏆 Hiker Expedition Logbook & Progress Tracker
* Dedicated **"My Logbook & Progress"** dashboard tracking:
  * **Total Distance Hiked** (km / miles).
  * **Cumulative Vertical Elevation Gain** (including Mount Everest % comparison).
  * **Total Time on Trail**.
  * **Trail Catalog Completion %**.
  * **Milestone Badges** (*Trailhead Inauguration*, *Kilometer Climber*, *Alpine Endurance*, *Summit Conqueror*).
* Export logbook records as structured JSON.
* Multi-shot confetti celebration upon logging a new hike.

### 6. ⚡ Supabase Cloud Integration & Offline Resilience
* Configured for Supabase project **`mwtaebvqlputoadjfowv`**.
* Connect via `.env` or paste your Anon Key directly into the in-app Supabase modal.
* One-click **"Copy SQL Schema"** button to run the DDL tables in Supabase SQL Editor:
  * `public.bookmarks`
  * `public.completed_hikes`
  * `public.trail_reviews`
* Resilient automatic fallback to `localStorage` when offline.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **[http://127.0.0.1:5173/](http://127.0.0.1:5173/)** in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
├── .agents/
│   └── skills/           # Neon & Supabase agent skills
├── public/
│   └── images/trails/    # High-res trail photography
├── src/
│   ├── components/
│   │   ├── ElevationProfile.jsx   # Interactive SVG elevation profile
│   │   ├── Header.jsx             # Top bar, stats, unit toggle, tab nav
│   │   ├── LogHikeModal.jsx       # Modal to record completed hikes
│   │   ├── ProgressDashboard.jsx  # Lifetime progress, analytics & badges
│   │   ├── SupabaseModal.jsx      # Supabase config & SQL schema copy
│   │   ├── TrailCard.jsx          # Trail card with metrics & save button
│   │   ├── TrailDetailDrawer.jsx  # Slide-over full trail profile
│   │   ├── TrailFilters.jsx       # Search & multi-parameter filter bar
│   │   └── TrailMap.jsx           # Leaflet map with multi-basemap layers
│   ├── data/
│   │   └── trails.js              # Comprehensive trail dataset with GPS routes
│   ├── services/
│   │   └── supabase.js            # Supabase client & local storage fallback
│   ├── App.jsx                    # Root app component & state management
│   ├── index.css                  # Custom Alpine design system
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```
