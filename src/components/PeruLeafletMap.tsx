import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Feature, GeoJsonObject, Geometry } from 'geojson';
import { Compass, Layers, LocateFixed } from 'lucide-react';
import peruAdm1 from '../data/peruAdm1.json';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import type { DestinationGuide, DestinationSlug, GeoSubPoint } from '../types/tourism';
import {
  MAP_TILE_LAYERS,
  PERU_CORRIDORS,
  type MapTileLayerId,
} from '../config/mapTiles';

export interface PeruLeafletMapProps {
  mode: 'atlas' | 'detail';
  activeSlug: DestinationSlug;
  onSelectDestination?: (slug: DestinationSlug) => void;
  heightClass?: string;
}

interface Adm1Properties {
  NOMBDEP?: string;
  COUNT?: number;
  FIRST_IDDP?: string;
  HECTARES?: number;
}

const ACTIVE_ADM1_STYLE: L.PathOptions = {
  fillColor: '#D9532F',
  fillOpacity: 0.24,
  color: '#D49B35',
  weight: 1.8,
  opacity: 0.95,
};

const INACTIVE_ADM1_STYLE: L.PathOptions = {
  fillColor: '#D49B35',
  fillOpacity: 0.05,
  color: 'rgba(246,243,236,0.22)',
  weight: 1,
  opacity: 0.85,
};

const QULLQA_LEAFLET_STYLES = `
  .qullqa-leaflet-map.leaflet-container {
    background-color: #101316;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .qullqa-leaflet-map .qullqa-div-icon {
    background: transparent;
    border: none;
  }

  .qullqa-leaflet-map .leaflet-control-zoom {
    border: 1px solid rgba(255, 255, 255, 0.16) !important;
    border-radius: 6px !important;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45) !important;
  }

  .qullqa-leaflet-map .leaflet-control-zoom a {
    background-color: rgba(20, 22, 24, 0.92) !important;
    color: #FAF8F5 !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
    width: 30px !important;
    height: 30px !important;
    line-height: 28px !important;
    font-weight: 600;
  }

  .qullqa-leaflet-map .leaflet-control-zoom a:last-child {
    border-bottom: none !important;
  }

  .qullqa-leaflet-map .leaflet-control-zoom a:hover {
    background-color: #D9532F !important;
    color: #FFFFFF !important;
  }

  .qullqa-leaflet-map .leaflet-control-attribution {
    background: rgba(16, 19, 22, 0.82) !important;
    color: rgba(246, 243, 236, 0.65) !important;
    font-size: 10px !important;
    padding: 2px 7px !important;
    border-top-left-radius: 4px;
    backdrop-filter: blur(4px);
  }

  .qullqa-leaflet-map .leaflet-control-attribution a {
    color: #D49B35 !important;
  }

  .qullqa-leaflet-map .leaflet-tooltip.qullqa-map-tooltip {
    background: rgba(20, 22, 24, 0.96);
    border: 1px solid rgba(197, 155, 95, 0.55);
    color: #FAF8F5;
    border-radius: 5px;
    padding: 6px 10px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
  }

  .qullqa-leaflet-map .leaflet-tooltip-top.qullqa-map-tooltip::before {
    border-top-color: rgba(197, 155, 95, 0.6);
  }

  .qullqa-leaflet-map .leaflet-tooltip-bottom.qullqa-map-tooltip::before {
    border-bottom-color: rgba(197, 155, 95, 0.6);
  }

  .qullqa-leaflet-map .leaflet-popup-content-wrapper,
  .qullqa-leaflet-map .leaflet-popup-tip {
    background: rgba(20, 22, 24, 0.97);
    color: #FAF8F5;
    border: 1px solid rgba(197, 155, 95, 0.48);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.55);
  }

  .qullqa-leaflet-map .leaflet-popup-content {
    margin: 10px 12px;
  }

  .qullqa-leaflet-map .leaflet-popup-close-button {
    color: rgba(246, 243, 236, 0.7) !important;
  }

  .qullqa-leaflet-map .leaflet-popup-close-button:hover {
    color: #D49B35 !important;
  }
`;

function normalizeAdm1Name(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toUpperCase();
}

function formatDepartmentName(rawName: string): string {
  const lowerWords = new Set(['de', 'del', 'la', 'las', 'los']);
  return rawName
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index > 0 && lowerWords.has(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function findDestinationsForDepartment(
  rawDeptName: string,
  destinations: DestinationGuide[]
): DestinationGuide[] {
  const normalized = normalizeAdm1Name(rawDeptName);
  const directMatches = destinations.filter((dest) =>
    dest.geo?.adm1Names?.some((adm1) => normalizeAdm1Name(adm1) === normalized)
  );
  if (directMatches.length > 0) {
    return directMatches;
  }
  if (normalized === 'CALLAO') {
    return destinations.filter((dest) => dest.slug === 'lima');
  }
  return [];
}

function buildAtlasMarkerIcon(isSelected: boolean): L.DivIcon {
  if (isSelected) {
    return L.divIcon({
      className: 'qullqa-div-icon',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      html: `
        <div style="position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center;">
          <span style="position:absolute;inset:2px;border-radius:9999px;background:rgba(184,74,39,0.22);border:1.5px solid rgba(217,180,124,0.85);"></span>
          <span style="position:relative;width:13px;height:13px;border-radius:9999px;background:#D9532F;border:2px solid #FAF8F5;box-shadow:0 0 0 2px rgba(20,22,24,0.85),0 4px 12px rgba(0,0,0,0.6);"></span>
        </div>
      `,
    });
  }

  return L.divIcon({
    className: 'qullqa-div-icon',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    html: `
      <div style="width:18px;height:18px;display:flex;align-items:center;justify-content:center;">
        <span style="width:10px;height:10px;border-radius:9999px;background:#FAF8F5;border:2px solid #18221F;box-shadow:0 0 0 1.5px rgba(197,155,95,0.85),0 2px 6px rgba(0,0,0,0.55);"></span>
      </div>
    `,
  });
}

function buildSubPointIcon(index: number): L.DivIcon {
  const isPrimary = index === 0;
  const fill = isPrimary ? '#D9532F' : '#D49B35';
  const ring = isPrimary ? '#FAF8F5' : '#18221F';

  return L.divIcon({
    className: 'qullqa-div-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    html: `
      <div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;">
        <span style="width:14px;height:14px;transform:rotate(45deg);border-radius:2px;background:${fill};border:2px solid ${ring};box-shadow:0 3px 10px rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;">
          <span style="width:4px;height:4px;border-radius:9999px;background:${isPrimary ? '#FAF8F5' : '#18221F'};"></span>
        </span>
      </div>
    `,
  });
}

export const PeruLeafletMap: React.FC<PeruLeafletMapProps> = ({
  mode,
  activeSlug,
  onSelectDestination,
  heightClass,
}) => {
  const [tileLayerByMode, setTileLayerByMode] = useState<
    Partial<Record<PeruLeafletMapProps['mode'], MapTileLayerId>>
  >({});
  const tileLayerId: MapTileLayerId =
    tileLayerByMode[mode] ?? (mode === 'detail' ? 'osm' : 'dark');
  const [tileFallbackActive, setTileFallbackActive] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const adm1LayerRef = useRef<L.GeoJSON<Adm1Properties, Geometry> | null>(null);
  const corridorLayerRef = useRef<L.LayerGroup | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);
  const adm1BoundsRef = useRef<L.LatLngBounds | null>(null);

  const activeSlugRef = useRef<DestinationSlug>(activeSlug);
  const onSelectRef = useRef(onSelectDestination);
  const isInitialAtlasMountRef = useRef(true);
  const hasDetailMountedRef = useRef(false);

  useEffect(() => {
    activeSlugRef.current = activeSlug;
  }, [activeSlug]);

  useEffect(() => {
    onSelectRef.current = onSelectDestination;
  }, [onSelectDestination]);

  const activeDestination = useMemo<DestinationGuide>(
    () =>
      DESTINATIONS_DATA.find((dest) => dest.slug === activeSlug) ??
      DESTINATIONS_DATA[0],
    [activeSlug]
  );

  const flyToDestination = useCallback(
    (dest: DestinationGuide, targetZoom: number, durationSeconds: number) => {
      const map = mapRef.current;
      if (!map || !dest.geo) return;

      const reduced = prefersReducedMotion();
      if (reduced) {
        map.setView([dest.geo.lat, dest.geo.lng], targetZoom, { animate: false });
      } else {
        map.flyTo([dest.geo.lat, dest.geo.lng], targetZoom, {
          duration: durationSeconds,
          easeLinearity: 0.25,
        });
      }
    },
    []
  );

  const focusDetailRegion = useCallback(
    (dest: DestinationGuide, animate: boolean) => {
      const map = mapRef.current;
      if (!map || !dest.geo) return;

      const shouldAnimate = animate && !prefersReducedMotion();
      const subPoints = dest.geo.subPoints;

      if (subPoints.length > 1) {
        const bounds = L.latLngBounds(
          subPoints.map((pt) => [pt.lat, pt.lng] as L.LatLngTuple)
        );
        if (bounds.isValid()) {
          map.fitBounds(bounds, {
            paddingTopLeft: [44, 48],
            paddingBottomRight: [48, 48],
            maxZoom: dest.geo.zoom,
            animate: shouldAnimate,
            duration: shouldAnimate ? 0.7 : undefined,
          });
          return;
        }
      }

      const targetLat = subPoints[0]?.lat ?? dest.geo.lat;
      const targetLng = subPoints[0]?.lng ?? dest.geo.lng;
      if (shouldAnimate) {
        map.flyTo([targetLat, targetLng], dest.geo.zoom, {
          duration: 0.7,
          easeLinearity: 0.25,
        });
      } else {
        map.setView([targetLat, targetLng], dest.geo.zoom, { animate: false });
      }
    },
    []
  );

  const handleNationalView = useCallback(() => {
    const map = mapRef.current;
    const bounds = adm1BoundsRef.current;
    if (!map || !bounds || !bounds.isValid()) return;

    map.fitBounds(bounds, {
      padding: [22, 22],
      animate: !prefersReducedMotion(),
    });
  }, []);

  const handleRecenterDetail = useCallback(() => {
    focusDetailRegion(activeDestination, true);
  }, [activeDestination, focusDetailRegion]);

  // 1. Inicialización y limpieza segura para React 19 StrictMode
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let rafId: number | null = null;
    isInitialAtlasMountRef.current = true;
    hasDetailMountedRef.current = false;

    const leafletContainer = container as HTMLDivElement & {
      _leaflet_id?: number | null;
    };
    if (leafletContainer._leaflet_id) {
      delete leafletContainer._leaflet_id;
    }
    container.innerHTML = '';

    const initialDest =
      DESTINATIONS_DATA.find((d) => d.slug === activeSlugRef.current) ??
      DESTINATIONS_DATA[0];

    const map = L.map(container, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: mode === 'atlas',
      minZoom: 4,
      maxZoom: 18,
      center: initialDest?.geo
        ? [initialDest.geo.lat, initialDest.geo.lng]
        : [-9.8, -75.0],
      zoom: mode === 'detail' && initialDest?.geo ? initialDest.geo.zoom : 5,
    });

    mapRef.current = map;
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const adm1Layer = L.geoJSON<Adm1Properties, Geometry>(
      peruAdm1 as unknown as GeoJsonObject,
      {
        style: () => INACTIVE_ADM1_STYLE,
        onEachFeature: (
          feature: Feature<Geometry, Adm1Properties>,
          layer: L.Layer
        ) => {
          const rawDeptName = feature.properties?.NOMBDEP ?? '';
          if (!rawDeptName) return;

          const prettyDept = formatDepartmentName(rawDeptName);
          const matchingDests = findDestinationsForDepartment(
            rawDeptName,
            DESTINATIONS_DATA
          );

          if (mode === 'atlas') {
            if (matchingDests.length > 0) {
              const destLabel = matchingDests.map((d) => d.name).join(' · ');
              layer.bindTooltip(
                `<div style="display:flex;flex-direction:column;gap:1px;">
                  <span style="font-family:'Plus Jakarta Sans',sans-serif;font-variant-numeric:tabular-nums lining-nums;letter-spacing:0.06em;font-size:9px;text-transform:uppercase;color:#D49B35;">Depto. ${escapeHtml(prettyDept)}</span>
                  <span style="font-weight:600;font-size:11px;color:#FAF8F5;">${escapeHtml(destLabel)}</span>
                </div>`,
                {
                  sticky: true,
                  direction: 'top',
                  className: 'qullqa-map-tooltip',
                }
              );
            } else {
              layer.bindTooltip(
                `<span style="font-family:'Plus Jakarta Sans',sans-serif;font-variant-numeric:tabular-nums lining-nums;letter-spacing:0.06em;font-size:10px;color:rgba(246,243,236,0.82);">${escapeHtml(prettyDept)}</span>`,
                {
                  sticky: true,
                  direction: 'top',
                  className: 'qullqa-map-tooltip',
                }
              );
            }
          }

          layer.on({
            mouseover: () => {
              if (
                mode === 'atlas' &&
                matchingDests.length > 0 &&
                'setStyle' in layer
              ) {
                (layer as L.Path).setStyle({
                  weight: 2.2,
                  color: '#D49B35',
                });
              }
            },
            mouseout: () => {
              if ('setStyle' in layer) {
                const currentActive =
                  DESTINATIONS_DATA.find(
                    (d) => d.slug === activeSlugRef.current
                  ) ?? DESTINATIONS_DATA[0];
                const activeNames = new Set(
                  (currentActive?.geo?.adm1Names ?? []).map(normalizeAdm1Name)
                );
                const isActive = activeNames.has(
                  normalizeAdm1Name(rawDeptName)
                );
                (layer as L.Path).setStyle(
                  isActive ? ACTIVE_ADM1_STYLE : INACTIVE_ADM1_STYLE
                );
              }
            },
            click: () => {
              if (
                mode !== 'atlas' ||
                matchingDests.length === 0 ||
                !onSelectRef.current
              ) {
                return;
              }
              const currentIndex = matchingDests.findIndex(
                (d) => d.slug === activeSlugRef.current
              );
              const nextDest =
                currentIndex >= 0
                  ? matchingDests[(currentIndex + 1) % matchingDests.length]
                  : matchingDests[0];
              onSelectRef.current(nextDest.slug);
            },
          });
        },
      }
    ).addTo(map);

    adm1LayerRef.current = adm1Layer;
    const bounds = adm1Layer.getBounds();
    if (bounds.isValid()) {
      adm1BoundsRef.current = bounds;
      if (mode === 'atlas') {
        map.fitBounds(bounds, { padding: [22, 22], animate: false });
      }
    }

    if (mode === 'detail' && initialDest?.geo) {
      if (initialDest.geo.subPoints.length > 1) {
        const subBounds = L.latLngBounds(
          initialDest.geo.subPoints.map((pt) => [pt.lat, pt.lng] as L.LatLngTuple)
        );
        if (subBounds.isValid()) {
          map.fitBounds(subBounds, {
            paddingTopLeft: [44, 48],
            paddingBottomRight: [48, 48],
            maxZoom: initialDest.geo.zoom,
            animate: false,
          });
        }
      } else {
        map.setView(
          [initialDest.geo.lat, initialDest.geo.lng],
          initialDest.geo.zoom,
          { animate: false }
        );
      }
    }

    corridorLayerRef.current = L.layerGroup().addTo(map);
    markerLayerRef.current = L.layerGroup().addTo(map);

    const resizeObserver = new ResizeObserver(() => {
      if (isDisposed) return;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!isDisposed && mapRef.current) {
          mapRef.current.invalidateSize({ animate: false });
        }
      });
    });
    resizeObserver.observe(container);

    return () => {
      isDisposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      map.stop();
      map.remove();
      mapRef.current = null;
      tileLayerRef.current = null;
      adm1LayerRef.current = null;
      corridorLayerRef.current = null;
      markerLayerRef.current = null;
      adm1BoundsRef.current = null;
      if (leafletContainer._leaflet_id) {
        delete leafletContainer._leaflet_id;
      }
    };
  }, [mode]);

  // 2. Capa de teselas con manejo silencioso de tileerror (modo vectorial ADM1)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let isCancelled = false;
    let tileLoadCount = 0;
    let tileErrorCount = 0;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    setTileFallbackActive(false);

    const tileConfig = MAP_TILE_LAYERS[tileLayerId];
    const layer = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: tileConfig.maxZoom,
    });

    layer.on('tileload', () => {
      if (isCancelled) return;
      tileLoadCount += 1;
      setTileFallbackActive(false);
    });

    layer.on('tileerror', (event: L.TileErrorEvent) => {
      event.tile.style.opacity = '0';
      event.tile.style.visibility = 'hidden';
      tileErrorCount += 1;
      if (!isCancelled && tileLoadCount === 0 && tileErrorCount >= 2) {
        setTileFallbackActive(true);
      }
    });

    layer.addTo(map);
    layer.bringToBack();
    tileLayerRef.current = layer;

    return () => {
      isCancelled = true;
      layer.off();
      if (mapRef.current && mapRef.current.hasLayer(layer)) {
        mapRef.current.removeLayer(layer);
      }
      if (tileLayerRef.current === layer) {
        tileLayerRef.current = null;
      }
    };
  }, [tileLayerId, mode]);

  // 3. Resaltado ADM1, corredores, marcadores divIcon y vuelo de cámara
  useEffect(() => {
    const map = mapRef.current;
    const adm1Layer = adm1LayerRef.current;
    const corridorLayer = corridorLayerRef.current;
    const markerLayer = markerLayerRef.current;
    if (!map || !adm1Layer || !corridorLayer || !markerLayer) return;

    const activeAdm1Set = new Set(
      (activeDestination?.geo?.adm1Names ?? []).map(normalizeAdm1Name)
    );

    adm1Layer.eachLayer((subLayer) => {
      const featureLayer = subLayer as L.GeoJSON<Adm1Properties, Geometry> & {
        feature?: Feature<Geometry, Adm1Properties>;
      };
      const depName = featureLayer.feature?.properties?.NOMBDEP ?? '';
      const isActive = activeAdm1Set.has(normalizeAdm1Name(depName));

      if ('setStyle' in subLayer) {
        (subLayer as L.Path).setStyle(
          isActive ? ACTIVE_ADM1_STYLE : INACTIVE_ADM1_STYLE
        );

        const el = (subLayer as L.Path).getElement();
        if (el instanceof SVGElement) {
          const isSelectable =
            mode === 'atlas' &&
            Boolean(onSelectRef.current) &&
            findDestinationsForDepartment(depName, DESTINATIONS_DATA).length >
              0;
          el.style.cursor = isSelectable ? 'pointer' : 'grab';
        }
      }

      if (isActive && 'bringToFront' in subLayer) {
        (subLayer as L.Path).bringToFront();
      }
    });

    // Corredores troncales en modo atlas
    corridorLayer.clearLayers();
    if (mode === 'atlas') {
      PERU_CORRIDORS.forEach((corridor) => {
        L.polyline(corridor.coordinates, {
          color: '#18221F',
          weight: corridor.weight + 2,
          opacity: 0.55,
          lineCap: 'round',
          lineJoin: 'round',
          interactive: false,
        }).addTo(corridorLayer);

        const routeLine = L.polyline(corridor.coordinates, {
          color: corridor.color,
          weight: corridor.weight,
          opacity: corridor.opacity,
          dashArray: corridor.dashArray,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(corridorLayer);

        routeLine.bindTooltip(
          `<span style="font-size:11px;font-weight:600;color:#FAF8F5;">${escapeHtml(corridor.name)}</span>`,
          {
            sticky: true,
            className: 'qullqa-map-tooltip',
          }
        );
      });
    }

    // Marcadores L.divIcon (sin PNGs)
    markerLayer.clearLayers();
    if (mode === 'atlas') {
      DESTINATIONS_DATA.forEach((dest) => {
        if (!dest.geo) return;
        const isSelected = dest.slug === activeSlug;
        const marker = L.marker([dest.geo.lat, dest.geo.lng], {
          icon: buildAtlasMarkerIcon(isSelected),
          zIndexOffset: isSelected ? 600 : 120,
          title: dest.name,
        });

        marker.bindTooltip(
          `<div style="display:flex;flex-direction:column;gap:2px;min-width:135px;">
            <span style="font-weight:700;font-size:12px;color:#FAF8F5;">${escapeHtml(dest.name)}</span>
            <span style="font-family:'Plus Jakarta Sans',sans-serif;font-variant-numeric:tabular-nums lining-nums;letter-spacing:0.06em;font-size:10px;color:#D49B35;">${escapeHtml(dest.altitudeRange)}</span>
          </div>`,
          {
            direction: 'top',
            offset: [0, -10],
            opacity: 0.98,
            className: 'qullqa-map-tooltip',
          }
        );

        marker.on('click', () => {
          if (dest.slug === activeSlugRef.current) {
            flyToDestination(dest, 7, 0.9);
          }
          onSelectRef.current?.(dest.slug);
        });

        marker.addTo(markerLayer);
      });

      if (isInitialAtlasMountRef.current) {
        isInitialAtlasMountRef.current = false;
      } else if (activeDestination?.geo) {
        flyToDestination(activeDestination, 7, 0.9);
      }
    } else if (activeDestination?.geo) {
      const subPoints: GeoSubPoint[] =
        activeDestination.geo.subPoints.length > 0
          ? activeDestination.geo.subPoints
          : [
              {
                name: activeDestination.name,
                lat: activeDestination.geo.lat,
                lng: activeDestination.geo.lng,
                altitudeM: activeDestination.altitudeRange,
              },
            ];

      subPoints.forEach((point, idx) => {
        const marker = L.marker([point.lat, point.lng], {
          icon: buildSubPointIcon(idx),
          zIndexOffset: idx === 0 ? 500 : 250,
          title: point.name,
        });

        marker.bindTooltip(
          `<div style="display:flex;align-items:center;gap:6px;">
            <span style="font-weight:700;font-size:11px;color:#FAF8F5;">${escapeHtml(point.name)}</span>
            <span style="font-family:'Plus Jakarta Sans',sans-serif;font-variant-numeric:tabular-nums lining-nums;letter-spacing:0.06em;font-size:10px;color:#D49B35;">${escapeHtml(point.altitudeM)}</span>
          </div>`,
          {
            direction: 'top',
            offset: [0, -10],
            opacity: 0.98,
            className: 'qullqa-map-tooltip',
          }
        );

        marker.bindPopup(
          `<div style="min-width:170px;max-width:230px;">
            <div style="font-family:'Plus Jakarta Sans',sans-serif;font-variant-numeric:tabular-nums lining-nums;letter-spacing:0.06em;font-size:10px;color:#D49B35;text-transform:uppercase;">
              ${escapeHtml(point.altitudeM)}
            </div>
            <div style="font-weight:700;font-size:13px;color:#FAF8F5;margin-top:2px;">
              ${escapeHtml(point.name)}
            </div>
            ${
              point.note
                ? `<p style="font-size:11px;color:rgba(246,243,236,0.78);margin:4px 0 0;line-height:1.4;">${escapeHtml(point.note)}</p>`
                : ''
            }
          </div>`,
          { offset: [0, -8] }
        );

        marker.addTo(markerLayer);
      });

      if (!hasDetailMountedRef.current) {
        hasDetailMountedRef.current = true;
        focusDetailRegion(activeDestination, false);
      } else {
        focusDetailRegion(activeDestination, true);
      }
    }
  }, [activeSlug, activeDestination, mode, flyToDestination, focusDetailRegion]);

  const resolvedHeightClass =
    heightClass ??
    (mode === 'atlas'
      ? 'h-[420px] sm:h-[500px] lg:h-[540px]'
      : 'h-[260px] sm:h-[300px]');

  return (
    <div
      className={`relative w-full ${resolvedHeightClass} rounded-md overflow-hidden border border-white/15 bg-[#101316] select-none`}
    >
      <style>{QULLQA_LEAFLET_STYLES}</style>

      {/* Contenedor real de Leaflet */}
      <div
        ref={containerRef}
        className="qullqa-leaflet-map w-full h-full"
        aria-label={
          mode === 'atlas'
            ? 'Mapa cartográfico interactivo del Perú con regiones operativas Qullqa'
            : `Mapa regional de ${activeDestination.name}`
        }
      />

      {/* Controles superiores flotantes */}
      <div className="pointer-events-none absolute top-3 left-3 right-3 z-[800] flex flex-wrap items-center justify-between gap-2">
        {mode === 'atlas' ? (
          <>
            <div
              className="pointer-events-auto inline-flex items-center rounded bg-[#18221F]/92 border border-white/20 p-0.5 backdrop-blur-sm shadow-lg"
              role="group"
              aria-label="Seleccionar capa base del mapa"
            >
              <span className="hidden sm:inline-flex items-center gap-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-[#E8B954]">
                <Layers className="w-3 h-3" />
                Capa
              </span>
              {(['dark', 'osm'] as const).map((layerKey) => {
                const isActive = tileLayerId === layerKey;
                return (
                  <button
                    key={layerKey}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setTileLayerByMode((prev) => ({
                        ...prev,
                        [mode]: layerKey,
                      }))
                    }
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                      isActive
                        ? 'bg-[#D9532F] text-white'
                        : 'text-white/75 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {MAP_TILE_LAYERS[layerKey].label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNationalView}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#18221F]/92 hover:bg-[#1E2226] border border-[#D49B35]/50 text-[#FAF8F5] text-[11px] font-medium backdrop-blur-sm shadow-lg transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#D49B35]" />
              <span>Vista Nacional</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleRecenterDetail}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#18221F]/92 hover:bg-[#1E2226] border border-[#D49B35]/50 text-[#FAF8F5] text-[11px] font-medium backdrop-blur-sm shadow-lg transition-colors"
            >
              <LocateFixed className="w-3.5 h-3.5 text-[#D49B35]" />
              <span>Recentrar región</span>
            </button>

            <div
              className="pointer-events-auto inline-flex items-center rounded bg-[#18221F]/92 border border-white/20 p-0.5 backdrop-blur-sm shadow-lg"
              role="group"
              aria-label="Cambiar capa base regional"
            >
              {(['dark', 'osm'] as const).map((layerKey) => {
                const isActive = tileLayerId === layerKey;
                return (
                  <button
                    key={layerKey}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setTileLayerByMode((prev) => ({
                        ...prev,
                        [mode]: layerKey,
                      }))
                    }
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      isActive
                        ? 'bg-[#D9532F] text-white'
                        : 'text-white/75 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {MAP_TILE_LAYERS[layerKey].shortLabel}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Leyenda inferior discreta + aviso de modo vectorial ADM1 ante fallo de teselas */}
      <div className="pointer-events-none absolute bottom-7 left-3 z-[800] flex flex-col items-start gap-1.5 max-w-[calc(100%-56px)]">
        {tileFallbackActive && (
          <div className="pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#18221F]/92 border border-[#D49B35]/45 text-[11px] font-medium text-[#E8B954] shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B954]" />
            <span>Cartografía vectorial ADM1 activa</span>
          </div>
        )}

        {mode === 'atlas' && (
          <div className="hidden sm:inline-flex items-center gap-3 px-2.5 py-1 rounded bg-[#18221F]/90 border border-white/15 text-[11px] font-medium text-[#FAF8F5]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#D9532F] inline-block" />
              Ruta Sur
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#E8B954] inline-block" />
              Andes–Amazonía
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeruLeafletMap;
