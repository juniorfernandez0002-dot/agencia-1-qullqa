import type { DestinationGuide } from '../types/tourism';
import { PERU_PHOTOS } from './mediaAssets';

export const DESTINATIONS_DATA: DestinationGuide[] = [
  {
    slug: 'cusco',
    name: 'Cusco & Valle Sur',
    tagline: 'Antigua capital del Tawantinsuyo: cantería incaica imperial y arquitectura virreinal a 3,399 m s.n.m.',
    region: 'Sierra Sur — Andes Centrales',
    coordinates: '13°31′01″S 71°58′43″O',
    altitudeRange: '3,122 m (Andahuaylillas) – 3,399 m (Cusco) – 5,036 m (Vinicunca)',
    localityAltitudes: [
      { place: 'Andahuaylillas (Valle Sur)', altitude: '3,122 m s.n.m.' },
      { place: 'Cusco (Plaza de Armas)', altitude: '3,399 m s.n.m.' },
      { place: 'Q’enqo / Sacsayhuamán', altitude: '3,580 – 3,700 m s.n.m.' },
      { place: 'Puka Pukara', altitude: '3,760 m s.n.m.' },
      { place: 'Laguna Humantay', altitude: '4,200 m s.n.m.' },
      { place: 'Abra Vinicunca / Valle Rojo', altitude: '4,950 – 5,036 m s.n.m.' }
    ],
    bestSeason: 'Abril a Noviembre (Estación seca y cielos despejados)',
    recommendedStay: '3 a 5 días (combinando aclimatación urbana y alta montaña)',
    temperatureRange: 'Día: 18°C a 22°C · Noche: 2°C a 7°C',
    heroImage: PERU_PHOTOS.cuscoPlaza,
    gallery: [
      PERU_PHOTOS.cuscoPlaza,
      PERU_PHOTOS.sacsayhuaman,
      PERU_PHOTOS.qorikancha,
      PERU_PHOTOS.vinicunca
    ],
    editorialIntro: 'Trazada en época del Inca Pachacútec con la silueta de un puma sagrado, Cusco es una ciudad viva donde los muros de andesita ensamblados sin argamasa sostienen claustros coloniales, talleres de imaginería en San Blas y mercados tradicionales.',
    editorialBody: 'Más allá de ser el punto de partida hacia Machu Picchu, la cuenca del Cusco y las cordilleras del Vilcanota y Vilcabamba reúnen la ingeniería hidráulica de Tipón, los baluartes megalíticos de Sacsayhuamán y las lagunas glaciares bajo los nevados Ausangate y Salkantay.',
    mustVisit: [
      {
        name: 'Qorikancha (Templo del Sol)',
        description: 'El centro religioso y geográfico del Imperio Inca, célebre por sus muros curvos de encaje milimétrico sin argamasa.',
        tag: 'Arqueología Imperial'
      },
      {
        name: 'Parque Arqueológico de Sacsayhuamán',
        description: 'Tres niveles de murallas zigzagueantes construidas con megalitos calizos que dominan la ciudad desde la cabeza del puma.',
        tag: 'Ingeniería Lítica'
      },
      {
        name: 'Barrio de los Artesanos de San Blas',
        description: 'Cuestas empedradas donde habitan dinastías de escultores y pintores cusqueños junto a cafés de especialidad y miradores.',
        tag: 'Cultura Viva'
      },
      {
        name: 'Cordillera del Ausangate y Vinicunca',
        description: 'Estratificaciones minerales y espejos glaciares entre los 4,300 y los 5,036 metros de altitud.',
        tag: 'Alta Montaña'
      }
    ],
    activities: [
      'Recorridos arqueológicos con historiadores por el Centro Histórico y las 4 Ruinas',
      'Caminatas de alta montaña a Vinicunca, Valle Rojo, Laguna Humantay y 7 Lagunas de Ausangate',
      'Rutas gastronómicas por el Mercado de San Pedro y talleres de Cacao Chuncho',
      'Exploración del Valle Sur (Tipón, Pikillacta y Andahuaylillas)'
    ],
    practicalTips: [
      {
        title: 'Protocolo de Aclimatación Gradual',
        detail: 'Durante tus primeras 24 horas en Cusco camina despacio, hidrátate bien, prefiere cenas ligeras y deja las caminatas sobre 4,000 m para los últimos días del itinerario.'
      },
      {
        title: 'Boleto Turístico del Cusco (BTC)',
        detail: 'El Boleto General (S/ 130 / ~USD $35) incluye 16 atractivos en Cusco, Valle Sur y Valle Sagrado; también existen boletos parciales por circuito (S/ 70 / ~USD $19).'
      }
    ],
    geo: {
      lat: -13.5169,
      lng: -71.9785,
      zoom: 9,
      adm1Names: ['CUSCO'],
      subPoints: [
        { name: 'Cusco (Plaza de Armas)', lat: -13.5169, lng: -71.9785, altitudeM: '3,399 m' },
        { name: 'Sacsayhuamán', lat: -13.5078, lng: -71.9822, altitudeM: '3,600–3,700 m' },
        { name: 'Puka Pukara', lat: -13.4878, lng: -71.9450, altitudeM: '3,760 m' },
        { name: 'Laguna Humantay', lat: -13.3789, lng: -72.5850, altitudeM: '4,200 m' },
        { name: 'Vinicunca (Montaña 7 Colores)', lat: -13.8702, lng: -71.3030, altitudeM: '5,036 m' }
      ]
    }
  },
  {
    slug: 'valle-sagrado-machu-picchu',
    name: 'Valle Sagrado & Machu Picchu',
    tagline: 'Del corredor fértil del río Urubamba a la ciudadela de granito blanco en la ceja de selva.',
    region: 'Cañón del Vilcanota y Ceja de Selva',
    coordinates: '13°09′47″S 72°32′44″O',
    altitudeRange: '2,040 m (Aguas Calientes) · 2,430 m (Machu Picchu) · 2,871 m (Urubamba) · 3,762 m (Chinchero)',
    localityAltitudes: [
      { place: 'Aguas Calientes (Machu Picchu Pueblo)', altitude: '2,040 m s.n.m.' },
      { place: 'Machu Picchu (Ciudadela Inca)', altitude: '2,430 m s.n.m.' },
      { place: 'Ollantaytambo (Fortaleza y Pueblo)', altitude: '2,792 m s.n.m.' },
      { place: 'Urubamba (Piso del Valle Sagrado)', altitude: '2,871 m s.n.m.' },
      { place: 'Salineras de Maras (Pozas de sal)', altitude: '3,200 – 3,300 m s.n.m.' },
      { place: 'Pisac (Parque Arqueológico)', altitude: '3,300 – 3,427 m s.n.m.' },
      { place: 'Moray (Andenes circulares)', altitude: '3,500 m s.n.m.' },
      { place: 'Chinchero (Meseta alta)', altitude: '3,762 m s.n.m.' }
    ],
    bestSeason: 'Todo el año (Mayo a Octubre cielos secos; Noviembre a Marzo paisajes verde esmeralda)',
    recommendedStay: '2 a 4 días',
    temperatureRange: 'Día: 20°C a 25°C · Noche: 8°C a 12°C',
    heroImage: PERU_PHOTOS.machuPicchuMist,
    gallery: [
      PERU_PHOTOS.machuPicchuMist,
      PERU_PHOTOS.ollantaytambo,
      PERU_PHOTOS.marasSalineras,
      PERU_PHOTOS.morayAndenes
    ],
    editorialIntro: 'Descendiendo desde los 3,762 m de Chinchero hasta el piso templado de Urubamba (2,871 m) y Ollantaytambo (2,792 m), el río Willkamayu atraviesa el cañón de granito hacia Aguas Calientes (2,040 m) y el santuario de Machu Picchu (2,430 m).',
    editorialBody: 'A menor altitud que la ciudad de Cusco, el Valle Sagrado ofrece el clima ideal para aclimatarse en los primeros días del viaje. Sus andenerías reales en Pisac, los anfiteatros microclimáticos de Moray, las más de 3,000 pozas de sal de Maras y la ciudadela viviente de Ollantaytambo enlazan directamente por ferrocarril con Machu Picchu.',
    mustVisit: [
      {
        name: 'Santuario Histórico de Machu Picchu (2,430 m)',
        description: 'Ciudadela inca del siglo XV erigida sobre un promontorio de granito blanco entre los ríos y bosques de niebla.',
        tag: 'Patrimonio UNESCO'
      },
      {
        name: 'Ollantaytambo (2,792 m)',
        description: 'Poblado vivo que conserva el trazo urbano original incaico, canales de agua activos y su monumental Templo del Sol.',
        tag: 'Pueblo Inca Vivo'
      },
      {
        name: 'Moray (3,500 m) y Salineras de Maras (3,200–3,300 m)',
        description: 'Terrazas agrícolas concéntricas de aclimatación de cultivos junto a miles de pozas artesanales de sal rosada andina.',
        tag: 'Paisaje Cultural'
      },
      {
        name: 'Pisac (3,300–3,427 m) y Chinchero (3,762 m)',
        description: 'Andenerías colgadas sobre la cuenca del Vilcanota y comunidades maestras del teñido y tejido en fibra de alpaca.',
        tag: 'Textilería y Andenes'
      }
    ],
    activities: [
      'Viajes ferroviarios panorámicos (Expedition, Vistadome, 360°, First Class) a Aguas Calientes y Machu Picchu',
      'Caminata oficial por el Camino Inca Corto (Km 104 – Wiñay Wayna – Inti Punku)',
      'Experiencias privadas y picnics junto a la Laguna Huaypo (3,507 m)',
      'Ascensos complementarios a Huayna Picchu (2,693 m) o Montaña Machu Picchu (3,082 m)'
    ],
    practicalTips: [
      {
        title: 'Circuitos Ministeriales de Machu Picchu',
        detail: 'El ingreso oficial se organiza en Circuito 1 (Panorámico), Circuito 2 (Ruta Clásica) y Circuito 3 (Realeza). Reservar con 45 a 60 días de antelación asegura los turnos de Circuito 2.'
      },
      {
        title: 'Equipaje de Mano en el Tren',
        detail: 'Los trenes a Machu Picchu permiten un bolso o mochila de hasta 8 kg por pasajero; las maletas grandes permanecen resguardadas sin costo en tu hotel de Cusco o Valle Sagrado.'
      }
    ],
    geo: {
      lat: -13.2350,
      lng: -72.2550,
      zoom: 10,
      adm1Names: ['CUSCO'],
      subPoints: [
        { name: 'Aguas Calientes (M. Picchu Pueblo)', lat: -13.1550, lng: -72.5253, altitudeM: '2,040 m' },
        { name: 'Machu Picchu (Ciudadela Llaqta)', lat: -13.1631, lng: -72.5450, altitudeM: '2,430 m' },
        { name: 'Ollantaytambo', lat: -13.2583, lng: -72.2636, altitudeM: '2,792 m' },
        { name: 'Urubamba (Piso del Valle)', lat: -13.3042, lng: -72.1167, altitudeM: '2,871 m' },
        { name: 'Salineras de Maras', lat: -13.3003, lng: -72.1556, altitudeM: '3,200–3,300 m' },
        { name: 'Pisac (Parque Arqueológico)', lat: -13.4131, lng: -71.8436, altitudeM: '3,300–3,427 m' },
        { name: 'Moray', lat: -13.3292, lng: -72.1956, altitudeM: '3,500 m' },
        { name: 'Chinchero (Meseta)', lat: -13.3908, lng: -72.0472, altitudeM: '3,762 m' }
      ]
    }
  },
  {
    slug: 'lima',
    name: 'Lima Virreinal & Gastronómica',
    tagline: 'Tres milenios frente al océano Pacífico: huacas milenarias, claustros virreinales y mesa peruana contemporánea.',
    region: 'Costa Central del Pacífico',
    coordinates: '12°02′46″S 77°01′50″O',
    altitudeRange: '0 m (Costa Verde) – 79 m (Miraflores) – 161 m (Centro Histórico)',
    localityAltitudes: [
      { place: 'Puente de los Suspiros (Barranco)', altitude: '65 – 75 m s.n.m.' },
      { place: 'Santuario de Pachacamac', altitude: '50 – 75 m s.n.m.' },
      { place: 'Acantilados de Miraflores', altitude: '79 m s.n.m.' },
      { place: 'Plaza Mayor de Lima', altitude: '154 – 161 m s.n.m.' }
    ],
    bestSeason: 'Todo el año (Diciembre a Abril verano soleado; Mayo a Noviembre temporada gastronómica)',
    recommendedStay: '2 a 3 días',
    temperatureRange: 'Verano: 22°C a 29°C · Invierno: 15°C a 20°C',
    heroImage: PERU_PHOTOS.mirafloresCosta,
    gallery: [
      PERU_PHOTOS.mirafloresCosta,
      PERU_PHOTOS.limaPlaza,
      PERU_PHOTOS.barrancoLima,
      PERU_PHOTOS.pachacamac
    ],
    editorialIntro: 'Mucho más que una escala aérea, Lima reúne pirámides preincas de adobe en medio de barrios costeros, palacios barrocos del siglo XVI y la tradición culinaria más diversa de Sudamérica.',
    editorialBody: 'Desde los malecones sobre el Pacífico en Miraflores y las casonas artísticas de Barranco hasta Casa Aliaga y San Francisco en el Centro Histórico, sin olvidar el oráculo costero de Pachacamac en el valle de Lurín, Lima ofrece el inicio o cierre perfecto para cualquier viaje por el Perú.',
    mustVisit: [
      {
        name: 'Centro Histórico de Lima (Patrimonio UNESCO)',
        description: 'Plaza Mayor, Catedral, Casa Aliaga, Palacio Torre Tagle y las Catacumbas de San Francisco.',
        tag: 'Centro Virreinal'
      },
      {
        name: 'Barranco y Acantilados de Miraflores',
        description: 'Puente de los Suspiros, galerías de arte contemporáneo, cafés de origen y jardines sobre la bahía.',
        tag: 'Arte y Costa'
      },
      {
        name: 'Santuario Arqueológico de Pachacamac',
        description: 'Principal centro de peregrinación prehispánica de la costa central frente a las islas del valle de Lurín.',
        tag: 'Arqueología Costera'
      },
      {
        name: 'Mercados de Productores y Cocina Peruana',
        description: 'Rutas por mercados locales, clases de ceviche clásico y cata de pisco de quebranta e italia.',
        tag: 'Gastronomía'
      }
    ],
    activities: [
      'Recorridos arquitectónicos por Casa Aliaga y Catacumbas de San Francisco',
      'Experiencias culinarias en Mercado de Surquillo con taller de Ceviche y Pisco Sour',
      'Caminatas por Barranco, galerías independientes y café peruano de especialidad',
      'Excursión a Pachacamac y exhibición de Caballos Peruanos de Paso en Lurín'
    ],
    practicalTips: [
      {
        title: 'Zonas Sugeridas de Alojamiento',
        detail: 'Miraflores (frente a los malecones), Barranco (distrito cultural) y San Isidro (entorno de parques y casonas) concentran nuestra red de hoteles seleccionados.'
      }
    ],
    geo: {
      lat: -12.0460,
      lng: -77.0305,
      zoom: 11,
      adm1Names: ['LIMA', 'CALLAO'],
      subPoints: [
        { name: 'Plaza Mayor (Centro Histórico)', lat: -12.0460, lng: -77.0305, altitudeM: '154–161 m' },
        { name: 'Parque de la Reserva (Agua)', lat: -12.0708, lng: -77.0333, altitudeM: '134 m' },
        { name: 'Miraflores (Costa Verde)', lat: -12.1268, lng: -77.0365, altitudeM: '79 m' },
        { name: 'Barranco (Puente Suspiros)', lat: -12.1491, lng: -77.0226, altitudeM: '65–75 m' },
        { name: 'Santuario de Pachacamac', lat: -12.2567, lng: -76.9003, altitudeM: '50–75 m' }
      ]
    }
  },
  {
    slug: 'paracas-huacachina',
    name: 'Paracas, Ica & Huacachina',
    tagline: 'Acantilados ocres frente al Pacífico, colonias de fauna marina, viñedos históricos y dunas de arena dorada.',
    region: 'Costa Sur — Departamento de Ica',
    coordinates: '13°49′51″S 76°14′49″O',
    altitudeRange: '0 m (Islas Ballestas / Paracas) – 406 m (Ica) – ~500 m (Dunas)',
    localityAltitudes: [
      { place: 'Islas Ballestas y Bahía de Paracas', altitude: '0 – 15 m s.n.m.' },
      { place: 'Playa Roja (Reserva Nacional de Paracas)', altitude: '0 – 18 m s.n.m.' },
      { place: 'Oasis de Huacachina e Ica', altitude: '368 – 406 m s.n.m.' },
      { place: 'Crestas de Dunas en Huacachina', altitude: '~460 – 500 m s.n.m.' }
    ],
    bestSeason: 'Todo el año (clima desértico luminoso casi todo el año)',
    recommendedStay: '1 a 2 días',
    temperatureRange: '22°C a 32°C',
    heroImage: PERU_PHOTOS.huacachina,
    gallery: [
      PERU_PHOTOS.huacachina,
      PERU_PHOTOS.islasBallestas,
      PERU_PHOTOS.paracasReserva,
      PERU_PHOTOS.playaRojaParacas
    ],
    editorialIntro: 'A unas tres horas y media por carretera al sur de Lima se despliega un contraste geográfico único: la riqueza marina de las Islas Ballestas junto a las bodegas vitivinícolas de Ica y las dunas de Huacachina.',
    editorialBody: 'En un mismo día o en escapada de dos jornadas puedes navegar frente al Candelabro de Paracas entre pingüinos de Humboldt y lobos marinos, explorar las arenas volcánicas de Playa Roja, catar piscos en alambiques de cobre y recorrer las dunas de 80 a 100 metros de desnivel sobre el oasis al caer el sol.',
    mustVisit: [
      {
        name: 'Islas Ballestas y Geoglifo El Candelabro',
        description: 'Santuario marino alimentado por la corriente de Humboldt con arcos de roca y miles de aves guaneras.',
        tag: 'Fauna Marina'
      },
      {
        name: 'Reserva Nacional de Paracas (Playa Roja)',
        description: 'Península desértica donde los acantilados minerales se sumergen en el océano Pacífico.',
        tag: 'Reserva Natural'
      },
      {
        name: 'Oasis y Dunas de Huacachina',
        description: 'Laguna natural rodeada de huarangos y palmeras bajo imponentes crestas de arena fina.',
        tag: 'Desierto Costero'
      },
      {
        name: 'Viñedos y Bodegas de Pisco en Ica',
        description: 'Haciendas coloniales y destilerías artesanales donde se elabora el destilado nacional desde el siglo XVI.',
        tag: 'Ruta del Pisco'
      }
    ],
    activities: [
      'Navegación matinal en deslizador hacia Islas Ballestas',
      'Circuito costero por Playa Roja y Lagunillas en la Reserva Nacional de Paracas',
      'Travesía en carros areneros 4x4 y sandboard en Huacachina al atardecer',
      'Cata guiada de piscos puros, acholados y mosto verde en bodegas de Ica'
    ],
    practicalTips: [
      {
        title: 'Conexión Natural al Sur',
        detail: 'Ubicados sobre el eje Panamericana Sur, Paracas e Ica enlazan directamente hacia las Líneas de Nazca y Arequipa sin tener que volver a Lima.'
      }
    ],
    geo: {
      lat: -13.9400,
      lng: -76.0500,
      zoom: 9,
      adm1Names: ['ICA'],
      subPoints: [
        { name: 'Islas Ballestas', lat: -13.7358, lng: -76.3963, altitudeM: '0 m' },
        { name: 'Muelle El Chaco (Paracas)', lat: -13.8307, lng: -76.2470, altitudeM: '5 m' },
        { name: 'Playa Roja (R.N. Paracas)', lat: -13.8926, lng: -76.3071, altitudeM: '10 m' },
        { name: 'Bodega en Ica', lat: -14.0032, lng: -75.7175, altitudeM: '415 m' },
        { name: 'Oasis de Huacachina', lat: -14.0875, lng: -75.7633, altitudeM: '395 m' }
      ]
    }
  },
  {
    slug: 'nazca',
    name: 'Líneas de Nazca & Cahuachi',
    tagline: 'Geoglifos milenarios grabados en las pampas desérticas e ingeniería hidráulica subterránea aún viva.',
    region: 'Desierto Sur — Cuenca del Río Grande',
    coordinates: '14°49′44″S 74°56′36″O',
    altitudeRange: '360 m (Cahuachi) – 520 m (Nazca) – 588 m (Aeródromo y Cantalloc)',
    localityAltitudes: [
      { place: 'Centro Ceremonial Cahuachi', altitude: '360 – 380 m s.n.m.' },
      { place: 'Pampas de Nazca (Geoglifos)', altitude: '400 – 540 m s.n.m.' },
      { place: 'Ciudad de Nazca y Cantalloc', altitude: '520 – 588 m s.n.m.' }
    ],
    bestSeason: 'Todo el año (Clima árido soleado y excelente visibilidad)',
    recommendedStay: '1 día (en tránsito por el corredor sur o vuelo desde Pisco)',
    temperatureRange: '24°C a 33°C',
    heroImage: PERU_PHOTOS.nazcaLines,
    gallery: [
      PERU_PHOTOS.nazcaLines,
      PERU_PHOTOS.nazcaColibri,
      PERU_PHOTOS.cantalloc,
      PERU_PHOTOS.paracasReserva
    ],
    editorialIntro: 'Entre el 200 a.C. y el 600 d.C., la civilización Nazca convirtió las terrazas aluviales de Jumana en un santuario monumental de colibríes, cóndores, arañas y trapecios de escala solo legible desde el cielo.',
    editorialBody: 'Además del sobrevuelo en aeronaves Cessna sobre los 13 geoglifos principales, la cuenca del río Grande alberga los sorprendentes acueductos espirales de Cantalloc —que siguen conduciendo agua freática hacia los cultivos— y las pirámides de adobe del centro teocrático de Cahuachi.',
    mustVisit: [
      {
        name: 'Pampas de Nazca (Sobrevuelo de 13 Geoglifos)',
        description: 'Vuelo aéreo sobre El Colibrí, El Mono, El Cóndor, La Araña, El Astronauta, Las Manos y El Lagarto.',
        tag: 'Patrimonio UNESCO'
      },
      {
        name: 'Acueductos Preincas de Cantalloc',
        description: 'Galerías filtrantes subterráneas con respiraderos en espiral construidos en canto rodado y madera de huarango.',
        tag: 'Ingeniería Hidráulica'
      },
      {
        name: 'Centro Ceremonial de Cahuachi',
        description: 'Conjunto de más de treinta montículos piramidales y plazas ceremoniales en medio del desierto.',
        tag: 'Arqueología del Desierto'
      }
    ],
    activities: [
      'Sobrevuelo clásico de 35 minutos en Cessna Grand Caravan con asiento de ventana garantizado',
      'Recorrido terrestre por Cantalloc, Paredones y Cahuachi',
      'Visita a talleres de cerámica polícroma con pigmentos minerales Nazca'
    ],
    practicalTips: [
      {
        title: 'Preparación para el Sobrevuelo',
        detail: 'Recomendamos un desayuno ligero antes del vuelo y portar pasaporte o DNI físico vigente para el registro aeronáutico.'
      }
    ],
    geo: {
      lat: -14.8000,
      lng: -75.0000,
      zoom: 10,
      adm1Names: ['ICA'],
      subPoints: [
        { name: 'Pampas de Nazca (Geoglifos)', lat: -14.6975, lng: -75.1350, altitudeM: '480 m' },
        { name: 'Centro Ceremonial Cahuachi', lat: -14.8189, lng: -75.1058, altitudeM: '370 m' },
        { name: 'Aeródromo María Reiche', lat: -14.8542, lng: -74.9611, altitudeM: '567 m' },
        { name: 'Acueductos de Cantalloc', lat: -14.8264, lng: -74.9101, altitudeM: '588 m' }
      ]
    }
  },
  {
    slug: 'arequipa-colca',
    name: 'Arequipa & Cañón del Colca',
    tagline: 'La Ciudad Blanca de piedra sillar entre volcanes y el vuelo matinal del cóndor sobre terrazas milenarias.',
    region: 'Andes Volcánicos del Sur',
    coordinates: '16°23′56″S 71°32′13″O',
    altitudeRange: '2,335 m (Arequipa) – 3,635 m (Chivay) – 4,910 m (Patapampa)',
    localityAltitudes: [
      { place: 'Arequipa (Centro de Sillar)', altitude: '2,335 m s.n.m.' },
      { place: 'Yanque (Valle del Colca)', altitude: '3,417 m s.n.m.' },
      { place: 'Chivay (Valle del Colca)', altitude: '3,635 m s.n.m.' },
      { place: 'Mirador Cruz del Cóndor', altitude: '3,800 m s.n.m.' },
      { place: 'Mirador de los Volcanes (Patapampa)', altitude: '4,910 m s.n.m.' }
    ],
    bestSeason: 'Abril a Noviembre (Más de 300 días soleados al año)',
    recommendedStay: '2 a 4 días',
    temperatureRange: 'Arequipa: 10°C a 24°C · Colca: 4°C a 21°C',
    heroImage: PERU_PHOTOS.colcaCanon,
    gallery: [
      PERU_PHOTOS.colcaCanon,
      PERU_PHOTOS.arequipaCatalina,
      PERU_PHOTOS.colcaCondor,
      PERU_PHOTOS.ausangate
    ],
    editorialIntro: 'Edificada con lava blanca de sillar al pie del Misti (5,822 m), Arequipa combina la intimidad de sus claustros coloniales con la tradición incomparable de sus picanterías y el acceso directo al Valle del Colca.',
    editorialBody: 'Cruzando la Reserva Nacional de Salinas y Aguada Blanca —hogar de vicuñas silvestres y bofedales altoandinos— y superando brevemente el paso de Patapampa (4,910 m), el camino desciende a las andenerías preincas del Colca y sus pozas termales volcánicas.',
    mustVisit: [
      {
        name: 'Monasterio de Santa Catalina',
        description: 'Ciudadela amurallada de 20,000 m² con callejones en azul añil y rojo óxido fundada en 1579 en el centro de Arequipa.',
        tag: 'Joya Virreinal'
      },
      {
        name: 'Mirador de la Cruz del Cóndor (3,800 m)',
        description: 'Balcón natural sobre uno de los cañones más profundos del planeta donde planean los cóndores andinos.',
        tag: 'Fauna y Paisaje'
      },
      {
        name: 'Reserva Nacional de Salinas y Aguada Blanca',
        description: 'Planicie volcánica entre los 4,000 y 4,300 m habitada por manadas de vicuñas, alpacas y parihuanas.',
        tag: 'Reserva Altoandina'
      }
    ],
    activities: [
      'Programa de 2 días / 1 noche al Valle y Cañón del Colca con baños termales',
      'Conexión directa por el altiplano desde Chivay hacia Puno (Lago Titicaca)',
      'Recorridos urbanos y de picanterías en Arequipa (integrados en circuito sur o a medida)'
    ],
    practicalTips: [
      {
        title: 'Puente Natural hacia el Lago Titicaca',
        detail: 'Al mediodía del segundo día en el Colca puedes conectar directamente en bus turístico desde Chivay hacia Puno en ~5.5 horas, evitando regresar hasta Arequipa.'
      }
    ],
    geo: {
      lat: -15.9500,
      lng: -71.6800,
      zoom: 8,
      adm1Names: ['AREQUIPA'],
      subPoints: [
        { name: 'Arequipa (Plaza y Sta. Catalina)', lat: -16.3989, lng: -71.5369, altitudeM: '2,335 m' },
        { name: 'Reserva Salinas y Aguada Blanca', lat: -16.1021, lng: -71.2190, altitudeM: '4,100 m' },
        { name: 'Abra Patapampa', lat: -15.7527, lng: -71.5822, altitudeM: '4,910 m' },
        { name: 'Chivay / Yanque (Valle del Colca)', lat: -15.6383, lng: -71.6011, altitudeM: '3,635 m' },
        { name: 'Mirador Cruz del Cóndor', lat: -15.6112, lng: -71.9064, altitudeM: '3,800 m' }
      ]
    }
  },
  {
    slug: 'puno-titicaca',
    name: 'Puno & Lago Titicaca',
    tagline: 'El lago navegable más alto del mundo entre islas tejidas en totora y comunidades textiles del altiplano.',
    region: 'Meseta del Collao — Altiplano Sur',
    coordinates: '15°50′24″S 70°01′18″O',
    altitudeRange: '3,812 m (Lago Titicaca) – 3,950 m (Cumbre Taquile) – 4,335 m (Abra La Raya)',
    localityAltitudes: [
      { place: 'Espejo del Lago Titicaca e Islas Uros', altitude: '3,812 m s.n.m.' },
      { place: 'Ciudad y Puerto de Puno', altitude: '3,827 m s.n.m.' },
      { place: 'Pukara (Ruta del Sol)', altitude: '3,870 m s.n.m.' },
      { place: 'Isla de Taquile (Plaza)', altitude: '3,950 m s.n.m.' }
    ],
    bestSeason: 'Abril a Noviembre (Cielos despejados y noches frías)',
    recommendedStay: '2 días',
    temperatureRange: 'Día: 15°C a 19°C · Noche: 0°C a 5°C',
    heroImage: PERU_PHOTOS.titicacaUros,
    gallery: [
      PERU_PHOTOS.titicacaUros,
      PERU_PHOTOS.taquile,
      PERU_PHOTOS.raqchi,
      PERU_PHOTOS.ausangate
    ],
    editorialIntro: 'A 3,812 metros sobre el mar, las aguas azul cobalto del Lago Titicaca custodian las culturas vivas quechuas y aimaras de las islas flotantes de los Uros y la isla de Taquile.',
    editorialBody: 'Navegar en lancha rápida por el Titicaca y continuar hacia Cusco a través de la Ruta del Sol —visitando Pukara, el paso de La Raya (4,335 m), Raqchi y Andahuaylillas— conecta el altiplano con los valles interandinos del Cusco en una jornada memorable.',
    mustVisit: [
      {
        name: 'Islas Flotantes de los Uros (3,812 m)',
        description: 'Plataformas habitadas tejidas íntegramente con totora sobre la Reserva Nacional del Titicaca.',
        tag: 'Cultura Lacustre'
      },
      {
        name: 'Isla de Taquile (3,812–3,950 m)',
        description: 'Comunidad isleña cuyo arte textil tejido por los hombres es Patrimonio Inmaterial de la Humanidad.',
        tag: 'Patrimonio UNESCO'
      },
      {
        name: 'Chullpas de Sillustani (3,893 m)',
        description: 'Torres funerarias cilíndricas preincas e incas alzadas frente a la laguna Umayo (extensión privada a medida).',
        tag: 'Extensión Altiplánica'
      }
    ],
    activities: [
      'Navegación en Lancha Rápida hacia las Islas Uros y Taquile con almuerzo tradicional',
      'Travesía terrestre guiada Ruta del Sol entre Puno y Cusco en ambos sentidos',
      'Extensiones privadas a Sillustani o pernocte comunitario en Amantaní bajo solicitud'
    ],
    practicalTips: [
      {
        title: 'Conexión Aérea vía Juliaca',
        detail: 'El Aeropuerto Inca Manco Cápac de Juliaca (JUL, 3,825 m) se encuentra a 50 minutos por carretera del embarcadero de Puno.'
      }
    ],
    geo: {
      lat: -15.8100,
      lng: -69.9200,
      zoom: 10,
      adm1Names: ['PUNO'],
      subPoints: [
        { name: 'Puno (Puerto y Bahía)', lat: -15.8400, lng: -70.0217, altitudeM: '3,827 m' },
        { name: 'Islas Flotantes de los Uros', lat: -15.8189, lng: -69.9697, altitudeM: '3,812 m' },
        { name: 'Isla de Taquile', lat: -15.7772, lng: -69.6833, altitudeM: '3,950 m' },
        { name: 'Pukara (Museo Lítico)', lat: -15.0453, lng: -70.3728, altitudeM: '3,870 m' },
        { name: 'Abra La Raya', lat: -14.4792, lng: -70.9856, altitudeM: '4,335 m' }
      ]
    }
  },
  {
    slug: 'amazonia-tambopata',
    name: 'Amazonía & Reserva Tambopata',
    tagline: 'Selva baja virgen a 55 minutos de vuelo desde Cusco: lagos de aguajales, nutrias gigantes y collpas de guacamayos.',
    region: 'Selva Sur — Madre de Dios',
    coordinates: '12°36′00″S 69°11′00″O',
    altitudeRange: '180 m (Lago Sandoval) – 183 m (Puerto Maldonado) – 400 m (Bosque alto)',
    localityAltitudes: [
      { place: 'Lago Sandoval (Reserva Tambopata)', altitude: '180 m s.n.m.' },
      { place: 'Puerto Maldonado (Río Madre de Dios)', altitude: '183 m s.n.m.' },
      { place: 'Senderos interiores de Tambopata', altitude: '200 – 400 m s.n.m.' }
    ],
    bestSeason: 'Abril a Noviembre (Estación menos lluviosa y mayor actividad en collpas)',
    recommendedStay: '3 a 4 días en Eco-Lodge',
    temperatureRange: '24°C a 33°C (Clima tropical húmedo)',
    heroImage: PERU_PHOTOS.lagoSandoval,
    gallery: [
      PERU_PHOTOS.lagoSandoval,
      PERU_PHOTOS.tambopataMacaws,
      PERU_PHOTOS.machuPicchuTrain,
      PERU_PHOTOS.machuPicchuClassic
    ],
    editorialIntro: 'A menos de una hora en avión desde las cumbres cusqueñas, el bosque nuboso da paso a la llanura amazónica de Madre de Dios, atravesada por los meandros de los ríos Madre de Dios y Tambopata.',
    editorialBody: 'Desde eco-lodges ribereños con pensión completa se accede en canoa a remo al Lago Sandoval —hábitat de familias de nutrias gigantes y caimanes negros—, a pasarelas colgantes sobre el dosel del bosque primario y a barrancos de arcilla mineral donde se congregan loros y guacamayos.',
    mustVisit: [
      {
        name: 'Lago Sandoval (180 m)',
        description: 'Espejo de agua rodeado de palmeras aguaje que alberga nutrias gigantes, monos aulladores y hoatzines.',
        tag: 'Santuario de Fauna'
      },
      {
        name: 'Collpas de Loros y Guacamayos',
        description: 'Paredes de arcilla rica en sales minerales visitadas al alba por bandadas de psitácidos multicolores.',
        tag: 'Observación de Aves'
      },
      {
        name: 'Pasarelas en el Dosel (Canopy Walkway)',
        description: 'Puentes suspendidos a 30 metros de altura entre las copas de castaños y shihuahuacos centenarios.',
        tag: 'Bosque Primario'
      }
    ],
    activities: [
      'Estadías de 3D/2N o 4D/3N en Eco-Lodges con pensión completa y guías naturalistas',
      'Navegación silenciosa en canoa a remo por el Lago Sandoval',
      'Safaris fluviales nocturnos y caminatas interpretativas de selva'
    ],
    practicalTips: [
      {
        title: 'Custodia de Equipaje de Montaña',
        detail: 'Si vienes desde Cusco, resguardamos tus maletas rígidas en Puerto Maldonado para embarcar al río únicamente con un bolso ligero.'
      }
    ],
    geo: {
      lat: -12.6000,
      lng: -69.1400,
      zoom: 10,
      adm1Names: ['MADRE DE DIOS'],
      subPoints: [
        { name: 'Puerto Maldonado (PEM)', lat: -12.6000, lng: -69.1833, altitudeM: '183 m' },
        { name: 'Collpa Cachuela', lat: -12.5197, lng: -69.1706, altitudeM: '185 m' },
        { name: 'Lago Sandoval', lat: -12.6055, lng: -69.0419, altitudeM: '180 m' }
      ]
    }
  }
];
