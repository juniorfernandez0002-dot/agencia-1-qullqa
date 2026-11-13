export type MapTileLayerId = 'dark' | 'osm';

export interface MapTileLayerConfig {
  id: MapTileLayerId;
  label: string;
  shortLabel: string;
  url: string;
  attribution: string;
  maxZoom: number;
}

export const MAP_TILE_LAYERS: Record<MapTileLayerId, MapTileLayerConfig> = {
  dark: {
    id: 'dark',
    label: 'Mapa Oscuro',
    shortLabel: 'Oscuro',
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles © Esri — Esri, DeLorme, NAVTEQ | GeoJSON: INEI / Perú ADM1',
    maxZoom: 16,
  },
  osm: {
    id: 'osm',
    label: 'OpenStreetMap',
    shortLabel: 'OSM',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors | GeoJSON: INEI / Perú ADM1',
    maxZoom: 18,
  },
} as const;

export interface PeruCorridor {
  id: 'ruta-sur' | 'enlace-amazonia';
  name: string;
  coordinates: [number, number][];
  color: string;
  weight: number;
  opacity: number;
  dashArray?: string;
}

/**
 * Coordenadas reales WGS84 de los corredores troncales operados por Qullqa:
 * 1) Gran Ruta Sur: Lima → Paracas → Huacachina → Nazca → Arequipa → Colca → Puno → Cusco → Machu Picchu
 * 2) Enlace Andes–Amazonía: Cusco → Puerto Maldonado / Tambopata
 */
export const PERU_CORRIDORS: readonly PeruCorridor[] = [
  {
    id: 'ruta-sur',
    name: 'Gran Circuito Sur (Costa, Andes y Altiplano)',
    coordinates: [
      [-12.0464, -77.0428], // Lima
      [-13.8357, -76.2508], // Paracas
      [-14.0875, -75.7626], // Ica / Huacachina
      [-14.8289, -74.9386], // Nazca
      [-16.3989, -71.535], // Arequipa
      [-15.6386, -71.6011], // Cañón del Colca (Chivay)
      [-15.8402, -70.0219], // Puno / Lago Titicaca
      [-13.5319, -71.9675], // Cusco
      [-13.2584, -72.2631], // Valle Sagrado (Ollantaytambo)
      [-13.1631, -72.545], // Machu Picchu
    ],
    color: '#D9532F',
    weight: 2.6,
    opacity: 0.9,
    dashArray: '6 5',
  },
  {
    id: 'enlace-amazonia',
    name: 'Enlace Andes–Amazonía (Cusco → Tambopata)',
    coordinates: [
      [-13.5319, -71.9675], // Cusco
      [-12.5933, -69.1891], // Puerto Maldonado / Reserva Tambopata
    ],
    color: '#D49B35',
    weight: 2.2,
    opacity: 0.85,
    dashArray: '4 5',
  },
] as const;
