import type { CommercialSectionId, TourProduct } from '../types/tourism';
import { TOURS_ANDES_AND_PACKAGES } from './toursAndes';
import { TOURS_COAST_LIMA_AND_SPECIALS } from './toursCoastLima';
import { PERU_PHOTOS } from './mediaAssets';

export const ALL_TOURS: TourProduct[] = [
  ...TOURS_ANDES_AND_PACKAGES,
  ...TOURS_COAST_LIMA_AND_SPECIALS
];

export const PEN_EXCHANGE_RATE = 3.75; // Tipo de cambio referencial: 1 USD = S/ 3.75 PEN

export interface CommercialSectionMeta {
  id: CommercialSectionId;
  number: string;
  title: string;
  shortLabel: string;
  subtitle: string;
}

export const COMMERCIAL_SECTIONS: CommercialSectionMeta[] = [
  {
    id: 'paquetes-peru',
    number: '01',
    title: 'Paquetes Turísticos Multidía por el Perú',
    shortLabel: 'Paquetes Perú',
    subtitle: 'Programas de 5 a 12 días con hotelería selecta, traslados privados, trenes panorámicos e ingresos coordinados.'
  },
  {
    id: 'full-day',
    number: '02',
    title: 'Experiencias de Un Día',
    shortLabel: 'Tours 1 Día',
    subtitle: 'Excursiones diarias seleccionadas para recorrer cada destino con ritmo propio y guía especialista.'
  },
  {
    id: 'rutas-terrestres',
    number: '03',
    title: 'Rutas Terrestres entre Ciudades',
    shortLabel: 'Rutas Terrestres',
    subtitle: 'Corredores transandinos y costeros que transforman el traslado entre regiones en una jornada cultural guiada.'
  },
  {
    id: 'cusco-machu-picchu',
    number: '04',
    title: 'Cusco, Valle Sagrado & Machu Picchu',
    shortLabel: 'Cusco & Machu Picchu',
    subtitle: 'Circuitos arqueológicos y ferroviarios hacia la antigua capital del Tawantinsuyo y la ciudadela inca.'
  },
  {
    id: 'lima-urbana',
    number: '05',
    title: 'Lima Virreinal, Bohemio & Urbano',
    shortLabel: 'Lima Urbana',
    subtitle: 'Centro Histórico UNESCO, casonas del siglo XVI, Barranco bohemio y santuario costero de Pachacamac.'
  },
  {
    id: 'paracas-huacachina',
    number: '06',
    title: 'Reserva de Paracas, Islas Ballestas & Huacachina',
    shortLabel: 'Paracas & Huacachina',
    subtitle: 'Fauna marina de la corriente de Humboldt, acantilados rojizos, bodegas de Pisco y dunas doradas.'
  },
  {
    id: 'nazca',
    number: '07',
    title: 'Sobrevuelo Líneas de Nazca & Desierto',
    shortLabel: 'Líneas de Nazca',
    subtitle: 'Perspectiva aérea de los 13 geoglifos milenarios en avioneta Cessna y acueductos subterráneos de Cantalloc.'
  },
  {
    id: 'aventura-naturaleza',
    number: '08',
    title: 'Alta Montaña, Cañones & Selva de Tambopata',
    shortLabel: 'Aventura & Amazonía',
    subtitle: 'Caminatas glaciares, mirador del cóndor en el Colca y albergues ribereños en la Amazonía sur.'
  },
  {
    id: 'gastronomia',
    number: '09',
    title: 'Rutas Gastronómicas, Cacao & Pisco',
    shortLabel: 'Gastronomía',
    subtitle: 'Mercados de biodiversidad, talleres de ceviche clásico, picanterías andinas y catas de cacao y pisco.'
  },
  {
    id: 'experiencias-privadas',
    number: '10',
    title: 'Colección Privada & De Autor',
    shortLabel: 'Viajes Privados',
    subtitle: 'Itinerarios exclusivos con vehículo dedicado, arqueólogo privado, picnics frente a lagunas y trenes de lujo.'
  }
];

export interface TravelerMoment {
  id: string;
  image: string;
  caption: string;
  location: string;
  altitude: string;
  tourSlug: string;
  seasonNote: string;
  aspect: 'tall' | 'wide' | 'square';
}

export const TRAVELER_GALLERY: TravelerMoment[] = [
  {
    id: 'gal-01',
    image: PERU_PHOTOS.machuPicchuClassic,
    caption: 'Primer turno matinal frente a las terrazas del Circuito 2 en la ciudadela de Machu Picchu.',
    location: 'Santuario Histórico de Machu Picchu',
    altitude: '2,430 m s.n.m.',
    tourSlug: 'machu-picchu-2-dias-pernocte-aguas-calientes',
    seasonNote: 'Temporada seca · Turno mañana',
    aspect: 'tall'
  },
  {
    id: 'gal-02',
    image: PERU_PHOTOS.marasSalineras,
    caption: 'Cosecha artesanal de sal rosada en las más de 3,000 pozas escalonadas de Maras.',
    location: 'Salineras de Maras, Valle Sagrado',
    altitude: '3,250 m s.n.m.',
    tourSlug: 'valle-sagrado-completo-pisac-maras-moray-ollantaytambo',
    seasonNote: 'Valle Sagrado · Todo el año',
    aspect: 'wide'
  },
  {
    id: 'gal-03',
    image: PERU_PHOTOS.vinicunca,
    caption: 'Estratos minerales de Vinicunca y travesía hacia el mirador silencioso del Valle Rojo.',
    location: 'Cordillera del Vilcanota, Cusco',
    altitude: '5,036 m s.n.m.',
    tourSlug: 'montana-siete-colores-vinicunca-valle-rojo',
    seasonNote: 'Alta montaña · Salida 04:15 hrs',
    aspect: 'square'
  },
  {
    id: 'gal-04',
    image: PERU_PHOTOS.humantay,
    caption: 'Espejo glaciar turquesa bajo la pared nevada de los Apus Humantay y Salkantay.',
    location: 'Laguna Humantay, Mollepata',
    altitude: '4,200 m s.n.m.',
    tourSlug: 'laguna-humantay-glaciar-salkantay',
    seasonNote: 'Cordillera Vilcabamba · Mañana',
    aspect: 'tall'
  },
  {
    id: 'gal-05',
    image: PERU_PHOTOS.paracasReserva,
    caption: 'Acantilados ocres del desierto de Paracas frente a las aguas del océano Pacífico.',
    location: 'Reserva Nacional de Paracas, Ica',
    altitude: '0 – 18 m s.n.m.',
    tourSlug: 'paracas-reserva-nacional-ruta-del-pisco-huacachina-2d-1n',
    seasonNote: 'Costa Sur · Clima soleado',
    aspect: 'wide'
  },
  {
    id: 'gal-06',
    image: PERU_PHOTOS.cevichePeru,
    caption: 'Pesca del día marinada al instante con limón de Piura y ají limo en nuestras rutas culinarias.',
    location: 'Lima & Barrio de San Blas (Cusco)',
    altitude: '100 – 3,420 m s.n.m.',
    tourSlug: 'experiencia-gastronomica-lima-mercado-ceviche-pisco-huaca',
    seasonNote: 'Cocina peruana · Todo el año',
    aspect: 'square'
  }
];

export interface ReferenceTestimonial {
  id: string;
  travelerName: string;
  origin: string;
  tripType: string;
  tourTitle: string;
  tourSlug: string;
  quote: string;
  highlightMetric: string;
}

export const REFERENCE_TESTIMONIALS: ReferenceTestimonial[] = [
  {
    id: 'test-01',
    travelerName: 'Elena & Marc V.',
    origin: 'Madrid, España',
    tripType: 'Viaje en Pareja — 9 Días',
    tourTitle: 'Perú Esencial: De la Costa del Pacífico a la Cumbre de los Incas (9D/8N)',
    tourSlug: 'paquete-peru-esencial-9-dias-lima-paracas-ica-cusco-machu-picchu',
    quote: 'La diferencia estuvo en el orden del itinerario: bajar directo al Valle Sagrado y conectar el tren desde Ollantaytambo sin regresar a Cusco nos ahorró horas de carretera y evitó el mal de altura.',
    highlightMetric: 'Aclimatación progresiva · Circuito 2'
  },
  {
    id: 'test-02',
    travelerName: 'Familia Echeverría',
    origin: 'Santiago, Chile',
    tripType: 'Grupo Familiar Privado — 4 Viajeros',
    tourTitle: 'Valle Sagrado y Machu Picchu en Privado: Picnic en Huaypo y First Class (3D/2N)',
    tourSlug: 'expedicion-privada-autor-valle-sagrado-picnic-andino-machu-picchu-lujo',
    quote: 'El almuerzo frente a la laguna Huaypo y contar con un arqueólogo dedicado a nuestro ritmo permitió que tanto nuestros padres como nuestros hijos disfrutaran cada sitio sin prisas.',
    highlightMetric: 'Servicio Privado a Medida'
  },
  {
    id: 'test-03',
    travelerName: 'Lucas M. & Sofía R.',
    origin: 'Buenos Aires, Argentina',
    tripType: 'Travesía Transandina — 12 Días',
    tourTitle: 'Gran Trilogía del Sur Peruano: Costa, Volcanes, Titicaca e Incas (12D/11N)',
    tourSlug: 'gran-circuito-sur-peru-12-dias-lima-paracas-nazca-arequipa-titicaca-cusco',
    quote: 'Ascender por tierra desde Paracas y Nazca pasando por Arequipa, el Colca y la Ruta del Sol hasta Cusco te deja comprender cómo cambia la geografía del Perú kilómetro a kilómetro.',
    highlightMetric: '6 Regiones en Travesía Continua'
  }
];
