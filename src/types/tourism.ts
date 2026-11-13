export type CommercialSectionId =
  | 'paquetes-peru'
  | 'full-day'
  | 'rutas-terrestres'
  | 'cusco-machu-picchu'
  | 'lima-urbana'
  | 'paracas-huacachina'
  | 'nazca'
  | 'aventura-naturaleza'
  | 'gastronomia'
  | 'experiencias-privadas';

export type DestinationSlug =
  | 'cusco'
  | 'valle-sagrado-machu-picchu'
  | 'lima'
  | 'paracas-huacachina'
  | 'nazca'
  | 'arequipa-colca'
  | 'amazonia-tambopata'
  | 'puno-titicaca';

export type DifficultyLevel = 'Suave / Cultural' | 'Moderada' | 'Exigente / Alta Montaña';

export interface ItineraryStep {
  badge: string;
  title: string;
  description: string;
  altitude?: string;
  meals?: string[];
  overnight?: string;
}

export interface PricingTier {
  name: string;
  modality: 'Grupal' | 'Privado' | 'Upgrade';
  priceUsd: number;
  minPax: number;
  isGroupVolumeTier?: boolean;
  description: string;
  perks: string[];
}

export interface TourAddOn {
  id: string;
  label: string;
  priceUsd: number;
  note?: string;
  includedInPrivate?: boolean;
}

export interface TourFAQ {
  question: string;
  answer: string;
}

export interface TourProduct {
  id: string;
  slug: string;
  code: string;
  title: string;
  shortTitle?: string;
  subtitle: string;
  destinationSlug: DestinationSlug;
  visitedDestinations: DestinationSlug[];
  destinationName: string;
  region: 'Andes Mágicos' | 'Costa y Desierto Sur' | 'Lima Gastronómica y Virreinal' | 'Amazonía Sur' | 'Multirregión Perú';
  primaryCategory: CommercialSectionId;
  sections: CommercialSectionId[];
  durationDays: number;
  durationLabel: string;
  altitudeMax: string;
  difficulty: DifficultyLevel;
  languages: string[];
  modalities: ('Grupal Reducido' | 'Privado a Medida')[];
  priceUsd: number;
  privatePriceUsd: number;
  singleSupplementUsd?: number;
  originalPriceUsd?: number;
  promoLabel?: string;
  isFeatured?: boolean;
  isExclusive?: boolean;
  requiresMinisterialPermit?: boolean;
  heroImage: string;
  gallery: string[];
  summary: string;
  editorialDescription: string;
  highlights: string[];
  placesVisited: string[];
  schedule: {
    departure: string;
    returnTime: string;
    frequency: string;
    pickupInfo: string;
  };
  itinerary: ItineraryStep[];
  included: string[];
  notIncluded: string[];
  pricingTiers: PricingTier[];
  addOns?: TourAddOn[];
  mandatoryFeesNote?: string;
  recommendations: string[];
  cancellationPolicy: string;
  faqs: TourFAQ[];
}

export interface GeoSubPoint {
  name: string;
  lat: number;
  lng: number;
  altitudeM: string;
  note?: string;
}

export interface DestinationGuide {
  slug: DestinationSlug;
  name: string;
  tagline: string;
  region: string;
  coordinates: string;
  altitudeRange: string;
  localityAltitudes?: { place: string; altitude: string }[];
  bestSeason: string;
  recommendedStay: string;
  temperatureRange: string;
  heroImage: string;
  gallery: string[];
  editorialIntro: string;
  editorialBody: string;
  mustVisit: {
    name: string;
    description: string;
    tag: string;
  }[];
  activities: string[];
  practicalTips: {
    title: string;
    detail: string;
  }[];
  geo: {
    lat: number;
    lng: number;
    zoom: number;
    adm1Names: string[];
    subPoints: GeoSubPoint[];
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Rutas y Logística' | 'Cultura Viva' | 'Gastronomía' | 'Preparación de Viaje' | 'Fotografía y Territorio';
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
  heroImage: string;
  excerpt: string;
  sections: {
    heading: string;
    paragraphs: string[];
    proTip?: string;
  }[];
  relatedTourSlugs: string[];
  relatedDestinationSlug: DestinationSlug;
}
