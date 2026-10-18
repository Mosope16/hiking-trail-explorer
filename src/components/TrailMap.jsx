import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Locate, Maximize2 } from 'lucide-react';

const TILE_LAYERS = {
  topo: {
    name: 'Topographic',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap, &copy; OpenStreetMap contributors',
    maxZoom: 17
  },
  outdoors: {
    name: 'Outdoors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 18
  },
  dark: {
    name: 'Dark Alpine',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19
  }
};

export const TrailMap = ({
  trails = [],
  selectedTrail,
  onSelectTrail,
  hoverPoint,
  hoverTrailId
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const tileLayerRef = useRef(null);
  const pulseMarkerRef = useRef(null);
  const [activeLayerKey, setActiveLayerKey] = useState('topo');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const initialCenter = selectedTrail
      ? selectedTrail.coordinates.center
      : [37.7400, -119.5380];
    const initialZoom = selectedTrail ? selectedTrail.coordinates.zoom : 12;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false
    });

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial tile layer
    const activeLayerDef = TILE_LAYERS[activeLayerKey];
    tileLayerRef.current = L.tileLayer(activeLayerDef.url, {
      attribution: activeLayerDef.attribution,
      maxZoom: activeLayerDef.maxZoom
    }).addTo(map);

    // Layer group for polylines and markers
    layerGroupRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch Tile Layer
  const handleLayerChange = (layerKey) => {
    setActiveLayerKey(layerKey);
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const def = TILE_LAYERS[layerKey];
    tileLayerRef.current = L.tileLayer(def.url, {
      attribution: def.attribution,
      maxZoom: def.maxZoom
    }).addTo(mapInstanceRef.current);
  };

  // Render Trails and Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const group = layerGroupRef.current;
    group.clearLayers();

    trails.forEach((trail) => {
      const isSelected = selectedTrail && selectedTrail.id === trail.id;
      const isHovered = hoverTrailId === trail.id;

      // Color coding by difficulty
      let strokeColor = '#10b981'; // Easy
      if (trail.difficulty === 'Moderate') strokeColor = '#f59e0b';
      if (trail.difficulty === 'Strenuous') strokeColor = '#ef4444';

      const weight = isSelected ? 5.5 : isHovered ? 4.5 : 3.5;
      const opacity = isSelected ? 1.0 : isHovered ? 0.9 : 0.65;

      // Glow halo if selected
      if (isSelected) {
        L.polyline(trail.coordinates.path, {
          color: strokeColor,
          weight: 12,
          opacity: 0.35,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(group);
      }

      // Main polyline
      const poly = L.polyline(trail.coordinates.path, {
        color: isSelected ? '#ffffff' : strokeColor,
        weight: weight,
        opacity: opacity,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(group);

      poly.on('click', () => {
        onSelectTrail(trail);
      });

      poly.bindTooltip(`<strong>${trail.name}</strong><br/>${trail.distanceKm} km • ${trail.difficulty}`, {
        sticky: true,
        direction: 'top'
      });

      // Add waypoints if trail is selected
      if (isSelected && trail.waypoints) {
        trail.waypoints.forEach((wp) => {
          const pinClass = `custom-map-pin pin-${wp.type || 'viewpoint'}`;
          const iconHtml = `<div class="${pinClass}">▲</div>`;

          const customIcon = L.divIcon({
            html: iconHtml,
            className: '',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
          });

          const marker = L.marker(wp.coords, { icon: customIcon }).addTo(group);
          marker.bindPopup(`
            <div style="font-family: var(--font-body); padding: 4px;">
              <h4 style="margin: 0 0 4px 0; color: #10b981; font-size: 0.95rem;">${wp.name}</h4>
              <p style="margin: 0 0 6px 0; font-size: 0.8rem; color: #94a39b;">${wp.note || ''}</p>
              <div style="font-size: 0.75rem; font-family: var(--font-mono); color: #f59e0b;">
                Elevation: ${wp.elevation} m
              </div>
            </div>
          `);
        });
      }
    });

    // Fly to selected trail bounds
    if (selectedTrail && mapInstanceRef.current) {
      const bounds = L.latLngBounds(selectedTrail.coordinates.path);
      mapInstanceRef.current.flyToBounds(bounds, {
        padding: [60, 60],
        maxZoom: 15,
        duration: 1.2
      });
    }
  }, [trails, selectedTrail, hoverTrailId, onSelectTrail]);

  // Elevation Scrubber Sync Pin
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (pulseMarkerRef.current) {
      mapInstanceRef.current.removeLayer(pulseMarkerRef.current);
      pulseMarkerRef.current = null;
    }

    if (hoverPoint && selectedTrail) {
      // Find approximate coordinate along path corresponding to distance
      const path = selectedTrail.coordinates.path;
      const totalDist = selectedTrail.distanceKm;
      const scrubDist = hoverPoint.distanceKm;
      const ratio = Math.max(0, Math.min(1, scrubDist / totalDist));
      const coordIndex = Math.min(path.length - 1, Math.floor(ratio * path.length));
      const targetCoord = path[coordIndex];

      if (targetCoord) {
        const pulseIcon = L.divIcon({
          html: `<div class="live-pulse-marker"></div>`,
          className: '',
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });

        pulseMarkerRef.current = L.marker(targetCoord, { icon: pulseIcon, zIndexOffset: 1000 }).addTo(mapInstanceRef.current);
      }
    }
  }, [hoverPoint, selectedTrail]);

  // Geolocation Locate Me
  const handleLocateMe = () => {
    if (!navigator.geolocation || !mapInstanceRef.current) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        mapInstanceRef.current.flyTo(coords, 13);
        L.marker(coords, {
          icon: L.divIcon({
            html: '<div style="background:#38bdf8;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 12px #38bdf8;"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        }).addTo(mapInstanceRef.current).bindPopup('You are here!').openPopup();
      },
      (_err) => {
        alert('Could not retrieve your location. Check browser permissions.');
      }
    );
  };

  const handleResetBounds = () => {
    if (!mapInstanceRef.current || trails.length === 0) return;
    const allCoords = trails.flatMap(t => t.coordinates.path);
    const bounds = L.latLngBounds(allCoords);
    mapInstanceRef.current.flyToBounds(bounds, { padding: [40, 40], duration: 1 });
  };

  return (
    <div className="map-pane" id="interactive-trail-map">
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Map Layer Switcher */}
      <div className="map-layer-selector">
        <button
          className={`layer-btn ${activeLayerKey === 'topo' ? 'active' : ''}`}
          onClick={() => handleLayerChange('topo')}
        >
          Topographic
        </button>
        <button
          className={`layer-btn ${activeLayerKey === 'outdoors' ? 'active' : ''}`}
          onClick={() => handleLayerChange('outdoors')}
        >
          Outdoors
        </button>
        <button
          className={`layer-btn ${activeLayerKey === 'satellite' ? 'active' : ''}`}
          onClick={() => handleLayerChange('satellite')}
        >
          Satellite
        </button>
        <button
          className={`layer-btn ${activeLayerKey === 'dark' ? 'active' : ''}`}
          onClick={() => handleLayerChange('dark')}
        >
          Dark
        </button>
      </div>

      {/* Quick Map Action Floating Buttons */}
      <div style={{ position: 'absolute', bottom: '24px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          className="btn btn-secondary"
          onClick={handleLocateMe}
          title="Locate me via GPS"
          style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
        >
          <Locate size={18} />
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleResetBounds}
          title="Zoom to fit all trails"
          style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
        >
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
};
