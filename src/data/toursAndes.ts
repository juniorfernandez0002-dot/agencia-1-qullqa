import type { TourProduct } from '../types/tourism';
import { PERU_PHOTOS } from './mediaAssets';

export const TOURS_ANDES_AND_PACKAGES: TourProduct[] = [
  {
    id: 'tour-01',
    slug: 'arquitectura-viva-cusco-sacsayhuaman-4-ruinas',
    code: 'QUL-CUS-01',
    title: 'Cusco Monumental: Qorikancha, Catedral y Complejo de Sacsayhuamán',
    shortTitle: 'Cusco Monumental: Qorikancha & Sacsayhuamán',
    subtitle: 'Lectura arqueológica e histórica entre muros incas imperiales y el barroco mestizo cusqueño.',
    destinationSlug: 'cusco',
    visitedDestinations: ['cusco'],
    destinationName: 'Cusco',
    region: 'Andes Mágicos',
    primaryCategory: 'cusco-machu-picchu',
    sections: ['cusco-machu-picchu', 'full-day'],
    durationDays: 1,
    durationLabel: 'Medio Día (5.5 horas)',
    altitudeMax: '3,760 m s.n.m. (Puka Pukara)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés', 'Francés (Privado)'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 55,
    privatePriceUsd: 115,
    isFeatured: true,
    heroImage: PERU_PHOTOS.sacsayhuaman,
    gallery: [
      PERU_PHOTOS.sacsayhuaman,
      PERU_PHOTOS.qorikancha,
      PERU_PHOTOS.cuscoPlaza,
      PERU_PHOTOS.ollantaytambo
    ],
    summary: 'Un recorrido curado por el corazón del antiguo Tawantinsuyo: desde la astronomía lítica del Templo del Sol (Qorikancha) hasta los baluartes ciclópeos de Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay.',
    editorialDescription: 'Lejos de los circuitos apresurados en autobús masivo, esta jornada de medio día está pensada para tu primera toma de contacto y aclimatación en Cusco. Acompañados por un historiador local, recorremos el trazado ceremonial de la capital inca, contrastando la ingeniería antisísmica del Qorikancha con el entorno de la Plaza de Armas (con ingreso interior a la Basílica Catedral incluido en modalidad privada o como extensión), antes de ascender hacia las fortalezas y adoratorios del Hanan Qosqo.',
    highlights: [
      'Ingreso guiado al Templo del Sol (Qorikancha) con análisis de cantería imperial',
      'Exploración de Sacsayhuamán con luz dorada vespertina sobre la ciudad',
      'Recorrido por Q’enqo (3,590 m), Puka Pukara (3,760 m) y las fuentes de Tambomachay (3,700 m)',
      'Grupo reducido (máximo 10 viajeros) para acceso fluido y diálogo directo'
    ],
    placesVisited: ['Qorikancha (Templo de Santo Domingo)', 'Plaza de Armas del Cusco', 'Sacsayhuamán', 'Q’enqo', 'Puka Pukara', 'Tambomachay'],
    schedule: {
      departure: '13:00 hrs (Turno Tarde) / 08:30 hrs (Privado)',
      returnTime: '18:30 hrs en Plaza Regocijo o tu hotel',
      frequency: 'Salidas diarias confirmadas',
      pickupInfo: 'Recojo incluido desde hoteles en el Centro Histórico de Cusco, San Blas y San Cristóbal.'
    },
    itinerary: [
      {
        badge: '13:00 hrs',
        title: 'Plaza de Armas y Templo del Sol (Qorikancha)',
        description: 'Encuentro con nuestro guía especialista frente a la Basílica Catedral (ingreso interior incluido en servicio privado o extensión opcional) y traslado al antiguo Intikancha para estudiar sus recintos dedicados al Sol, la Luna y las Estrellas.',
        altitude: '3,399 m s.n.m.'
      },
      {
        badge: '14:40 hrs',
        title: 'Ascenso a la explanada de Sacsayhuamán',
        description: 'Recorrido por los tres niveles de baluartes zigzagueantes construidos con bloques calizos de hasta 120 toneladas. Vista panorámica de los tejados del Cusco.',
        altitude: '3,600 – 3,700 m s.n.m.'
      },
      {
        badge: '16:10 hrs',
        title: 'Santuario rupestre de Q’enqo y mirador de Puka Pukara',
        description: 'Ingreso a las galerías subterráneas labradas en roca viva de Q’enqo (3,590 m) y ascenso al puesto de control de Puka Pukara en el abra hacia Pisac.',
        altitude: '3,590 – 3,760 m s.n.m.'
      },
      {
        badge: '17:15 hrs',
        title: 'Fuentes ceremoniales de Tambomachay y retorno',
        description: 'Visita a los acueductos incas de precisión hidráulica aún activos y descenso hacia el Centro Histórico al anochecer.',
        altitude: '3,700 m s.n.m.'
      }
    ],
    included: [
      'Transporte turístico climatizado Mercedes-Benz Sprinter',
      'Guía oficial de turismo licenciado en historia y arqueología',
      'Ticket de ingreso al Templo de Qorikancha',
      'Asistencia permanente y botiquín con oxígeno medicinal a bordo'
    ],
    notIncluded: [
      'Boleto Turístico del Cusco Parcial (S/ 70 / ~USD $19 extranjeros — añadible en cotización)',
      'Ingreso interior opcional a la Catedral del Cusco (S/ 40 / ~USD $11; incluido en Privado)',
      'Propinas voluntarias'
    ],
    pricingTiers: [
      {
        name: 'Modalidad Grupal Reducida',
        modality: 'Grupal',
        priceUsd: 55,
        minPax: 1,
        description: 'Grupo de máximo 10 pasajeros con guía bilingüe e ingreso a Qorikancha.',
        perks: ['Recojo en hotel céntrico', 'Ingreso a Qorikancha incluido', 'Salidas todos los días']
      },
      {
        name: 'Servicio Privado Curado (Base 2 Pax)',
        modality: 'Privado',
        priceUsd: 115,
        minPax: 2,
        description: 'Vehículo exclusivo, horario flexible, Catedral y Boleto Turístico Parcial incluidos.',
        perks: ['Boleto Turístico Parcial incluido', 'Ingreso a Catedral y Qorikancha incluidos', 'Ritmo adaptado a tu aclimatación']
      }
    ],
    addOns: [
      { id: 'btc-parcial', label: 'Boleto Turístico Parcial Circuito I (S/ 70)', priceUsd: 19, note: 'Ya incluido en tarifa Privada', includedInPrivate: true },
      { id: 'catedral', label: 'Ingreso interior a la Basílica Catedral (S/ 40)', priceUsd: 11, note: 'Ya incluido en tarifa Privada', includedInPrivate: true }
    ],
    recommendations: [
      'Realizar este recorrido en tu primer o segundo día para favorecer la aclimatación gradual.',
      'Portar documento de identidad original o pasaporte vigente para el control en Sacsayhuamán.',
      'Llevar cortavientos ligero, bloqueador solar e hidratación.'
    ],
    cancellationPolicy: 'Cancelación o reprogramación sin penalidad hasta 48 horas antes del inicio del tour, con reembolso íntegro del importe abonado.',
    faqs: [
      {
        question: '¿Necesito comprar el Boleto Turístico del Cusco por separado?',
        answer: 'En la modalidad grupal puedes adquirir el Boleto Parcial (Circuito I, S/ 70) en el primer control o añadirlo en tu solicitud de disponibilidad. En la modalidad Privada ya está incluido.'
      },
      {
        question: '¿Es exigente físicamente para el primer día en altura?',
        answer: 'No. Los traslados entre sitios se realizan en vehículo y las caminatas son pausadas y mayormente en terreno plano o de descenso suave.'
      }
    ]
  },
  {
    id: 'tour-02',
    slug: 'valle-sagrado-completo-pisac-maras-moray-ollantaytambo',
    code: 'QUL-CUS-02',
    title: 'Valle Sagrado Integral: Pisac, Moray, Salineras de Maras, Ollantaytambo y Chinchero',
    shortTitle: 'Valle Sagrado: Pisac, Moray, Maras & Ollantaytambo',
    subtitle: 'La ruta magistral del río Vilcanota combinando andenerías reales, pozas de sal y la ciudadela inca viviente.',
    destinationSlug: 'valle-sagrado-machu-picchu',
    visitedDestinations: ['valle-sagrado-machu-picchu'],
    destinationName: 'Valle Sagrado & Machu Picchu',
    region: 'Andes Mágicos',
    primaryCategory: 'cusco-machu-picchu',
    sections: ['cusco-machu-picchu', 'full-day'],
    durationDays: 1,
    durationLabel: 'Full Day (11.5 horas)',
    altitudeMax: '3,762 m s.n.m. (Chinchero)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 78,
    privatePriceUsd: 155,
    originalPriceUsd: 92,
    promoLabel: 'Temporada -15%',
    isFeatured: true,
    heroImage: PERU_PHOTOS.marasSalineras,
    gallery: [
      PERU_PHOTOS.marasSalineras,
      PERU_PHOTOS.morayAndenes,
      PERU_PHOTOS.ollantaytambo,
      PERU_PHOTOS.pisac
    ],
    summary: 'Recorre de principio a fin los grandes hitos del Valle Sagrado en horario diurno sin prisas: parque arqueológico de Pisac, terrazas circulares de Moray, más de 3,000 pozas de sal en Maras, Ollantaytambo y Chinchero.',
    editorialDescription: 'Con pisos de valle en torno a los 2,871 m s.n.m. en Urubamba, el Valle Sagrado ofrece un microclima templado incomparable. Partimos temprano a las 06:45 hrs hacia los andenes reales de Pisac con luz limpia de la mañana, continuamos por las terrazas concéntricas de Moray (3,500 m) y las pozas de sal rosada de Maras (3,250 m), disfrutamos de un almuerzo novoandino en Urubamba y exploramos Ollantaytambo antes de cerrar por la meseta de Chinchero (3,762 m). Quienes toman el tren hacia Machu Picchu esa misma tarde enlazan cómodamente en Ollantaytambo (finalizando el circuito guiado hasta allí).',
    highlights: [
      'Orden geográfico optimizado para recorrer Pisac con luz plena antes de su cierre',
      'Almuerzo buffet novoandino incluido en hacienda de Urubamba (2,871 m)',
      'Ingreso a las Salineras de Maras incluido sin cobros adicionales en ruta',
      'Enlace directo opcional con trenes vespertinos en la estación de Ollantaytambo'
    ],
    placesVisited: ['Parque Arqueológico de Pisac', 'Anfiteatros de Moray', 'Salineras de Maras', 'Urubamba', 'Fortaleza de Ollantaytambo', 'Chinchero'],
    schedule: {
      departure: '06:45 hrs desde tu hotel en Cusco',
      returnTime: '18:30 hrs en Cusco (o 15:45 hrs en estación de Ollantaytambo)',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo puerta a puerta en hoteles del Cusco o Valle Sagrado.'
    },
    itinerary: [
      {
        badge: '06:45 hrs',
        title: 'Cusco – Mirador de Taray y Andenerías de Pisac',
        description: 'Vistas sobre la cuenca del río Vilcanota desde Taray y visita matinal a las terrazas, barrios y cementerio inca del Parque Arqueológico de Pisac.',
        altitude: '3,300 – 3,427 m s.n.m. (Pueblo 2,972 m)'
      },
      {
        badge: '10:00 hrs',
        title: 'Anfiteatros agrícolas de Moray y Salineras de Maras',
        description: 'Exploración de las terrazas circulares de Moray (3,500 m), donde los incas recrearon microclimas agrícolas, y descenso al mirador de las más de 3,000 pozas de sal de Maras (3,200–3,300 m).',
        altitude: '3,250 – 3,500 m s.n.m.'
      },
      {
        badge: '12:30 hrs',
        title: 'Almuerzo gastronómico en el valle de Urubamba',
        description: 'Pausa culinaria junto al río Vilcanota con quinuas orgánicas, maíz gigante del Cusco, trucha andina y postres de lúcuma.',
        altitude: '2,871 m s.n.m.',
        meals: ['Almuerzo Buffet Novoandino']
      },
      {
        badge: '14:15 hrs',
        title: 'Ciudadela y Templo del Sol de Ollantaytambo',
        description: 'Ascenso a los seis monolitos de pórfido rojo y recorrido por el pueblo inca viviente hasta las 15:45 hrs (quienes conectan hacia Machu Picchu abordan su tren en la estación local).',
        altitude: '2,792 m s.n.m.'
      },
      {
        badge: '16:45 hrs',
        title: 'Centro textil en meseta de Chinchero y retorno a Cusco',
        description: 'Demostración de teñido natural con cochinilla y plantas andinas en comunidad tejedora antes de regresar a Cusco.',
        altitude: '3,762 m s.n.m.'
      }
    ],
    included: [
      'Transporte turístico de ruta completa Cusco – Valle Sagrado – Cusco',
      'Guía profesional bilingüe',
      'Almuerzo buffet gastronómico en Urubamba',
      'Ingreso a las Salineras de Maras (S/ 20 incluido)'
    ],
    notIncluded: [
      'Boleto Turístico del Cusco (Circuito III — S/ 70 / ~USD $19 extranjeros, añadible al solicitar)',
      'Bebidas embotelladas en el restaurante'
    ],
    pricingTiers: [
      {
        name: 'Tarifa Grupal Superior',
        modality: 'Grupal',
        priceUsd: 78,
        minPax: 1,
        description: 'Almuerzo en Urubamba e ingreso a Maras incluidos.',
        perks: ['Máximo 14 pasajeros', 'Almuerzo buffet incluido', 'Ticket de Maras incluido']
      },
      {
        name: 'Valle Sagrado en Privado',
        modality: 'Privado',
        priceUsd: 155,
        minPax: 2,
        description: 'Vehículo SUV o Van exclusiva con Boleto Turístico Circuito III incluido.',
        perks: ['Boleto Turístico incluido', 'Almuerzo a la carta en Urubamba', 'Custodia de equipaje si conectas a Machu Picchu']
      }
    ],
    addOns: [
      { id: 'btc-valle', label: 'Boleto Turístico Parcial Circuito III (S/ 70)', priceUsd: 19, note: 'Ya incluido en Privado', includedInPrivate: true }
    ],
    recommendations: [
      'Si viajas a Machu Picchu esa tarde, reserva un tren desde Ollantaytambo a partir de las 16:36 hrs para embarcar con 30 minutos de margen.',
      'Llevar calzado con buena tracción para las escalinatas de piedra en Pisac y Ollantaytambo.'
    ],
    cancellationPolicy: 'Modificación y cancelación gratuita hasta 48 horas antes de la salida.',
    faqs: [
      {
        question: '¿Puedo llevar mi maleta si tomo el tren en Ollantaytambo al terminar?',
        answer: 'Sí, nuestras unidades cuentan con bodega segura para tu bolso de viaje (recuerda que los trenes a Machu Picchu permiten 8 kg por pasajero; el resto de tu equipaje lo custodiamos sin costo en Cusco).'
      }
    ]
  },
  {
    id: 'tour-03',
    slug: 'machu-picchu-full-day-tren-panoramico',
    code: 'QUL-MAP-01',
    title: 'Machu Picchu en Un Día: Tren Panorámico y Circuito Clásico',
    shortTitle: 'Machu Picchu en 1 Día por Tren',
    subtitle: 'Expedición ferroviaria por el cañón del Urubamba con ingreso oficial a la Llaqta Inca y guiado arqueológico.',
    destinationSlug: 'valle-sagrado-machu-picchu',
    visitedDestinations: ['valle-sagrado-machu-picchu', 'cusco'],
    destinationName: 'Valle Sagrado & Machu Picchu',
    region: 'Andes Mágicos',
    primaryCategory: 'cusco-machu-picchu',
    sections: ['cusco-machu-picchu', 'full-day'],
    durationDays: 1,
    durationLabel: 'Full Day (15.5 horas)',
    altitudeMax: '2,430 m (Machu Picchu) / Paso salida Cusco 3,399 m',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés', 'Portugués'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 310,
    privatePriceUsd: 395,
    isFeatured: true,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.machuPicchuTrain,
    gallery: [
      PERU_PHOTOS.machuPicchuTrain,
      PERU_PHOTOS.machuPicchuClassic,
      PERU_PHOTOS.machuPicchuMist,
      PERU_PHOTOS.aguasCalientes
    ],
    summary: 'La expedición de día completo al Santuario Histórico de Machu Picchu coordinada de principio a fin: traslado privado desde Cusco, tren ida y vuelta, bus Consettur, boleto oficial del Ministerio de Cultura y guía acreditado.',
    editorialDescription: 'Visitar Machu Picchu en una sola jornada requiere coordinación puntual entre traslados terrestres, salidas de tren, buses de ascenso y turnos horarios del Ministerio de Cultura. Gestionamos tus boletos priorizando el Circuito 2 (Ruta Clásica Diseñada o Terraza Inferior según disponibilidad oficial) para contemplar la vista panorámica desde la Casa del Guardián y recorrer la Plaza Sagrada, el Templo de las Tres Ventanas y el sector urbano.',
    highlights: [
      'Todos los tickets incluidos: Tren Ida/Vuelta + Bus Consettur + Entrada Oficial a Machu Picchu',
      'Gestión prioritaria del Circuito 2 (Ruta Clásica) en reservas anticipadas',
      'Opción de ascender a vagón panorámico Vistadome o Inca Rail 360° con guía privado',
      'Asistencia presencial en el andén de Ollantaytambo y a la llegada a Aguas Calientes'
    ],
    placesVisited: ['Valle de Ollantaytambo (2,792 m)', 'Cañón del río Vilcanota', 'Aguas Calientes (2,040 m)', 'Santuario Histórico de Machu Picchu (2,430 m)'],
    schedule: {
      departure: '04:30 hrs desde tu hotel en Cusco (para tren 06:40 hrs)',
      returnTime: '20:15 hrs en tu hotel en Cusco',
      frequency: 'Salidas diarias sujetas a cupo ministerial',
      pickupInfo: 'Recojo privado puerta a puerta desde hoteles en Cusco o Valle Sagrado.'
    },
    itinerary: [
      {
        badge: '04:30 hrs',
        title: 'Traslado privado desde Cusco a la estación de Ollantaytambo',
        description: 'Descenso escénico de 1h 35min hacia el Valle Sagrado para check-in ferroviario 30 minutos antes de la salida.',
        altitude: '2,792 m s.n.m.'
      },
      {
        badge: '06:40 hrs',
        title: 'Viaje en Tren Turístico por el Cañón del Urubamba',
        description: 'Trayecto de ~1 hora y 35 minutos bordeando el río Vilcanota mientras el paisaje andino se transforma en ceja de selva nubosa.',
        altitude: '2,040 m s.n.m.'
      },
      {
        badge: '09:00 hrs',
        title: 'Ascenso en bus Consettur y guiado en Machu Picchu',
        description: 'Ascenso de 25 a 30 minutos por la carretera Hiram Bingham y visita guiada de 2.5 horas por las terrazas superiores, templos ceremoniales y sector urbano.',
        altitude: '2,430 m s.n.m.'
      },
      {
        badge: '13:30 hrs',
        title: 'Descenso a Aguas Calientes y almuerzo libre',
        description: 'Tiempo para almorzar junto al río Vilcanota y recorrer la feria artesanal antes de regresar a la estación.',
        altitude: '2,040 m s.n.m.'
      },
      {
        badge: '16:22 hrs',
        title: 'Tren de retorno a Ollantaytambo y traslado privado a Cusco',
        description: 'Llegada a Ollantaytambo hacia las 18:00 hrs donde nuestro conductor te aguarda para llevarte directo a tu hotel en Cusco.',
        altitude: '3,399 m s.n.m.'
      }
    ],
    included: [
      'Traslados Cusco – Estación Ollantaytambo – Cusco',
      'Boletos de tren Expedition (PeruRail) / The Voyager (Inca Rail) ida y vuelta',
      'Boletos de bus Consettur Aguas Calientes – Machu Picchu ida y vuelta',
      'Boleto oficial de ingreso a Machu Picchu + Guía certificado (2.5 horas)'
    ],
    notIncluded: [
      'Almuerzo en Aguas Calientes',
      'Ingreso adicional a montaña Huayna Picchu o Montaña Machu Picchu (+USD $65 sujeto a cupo)'
    ],
    pricingTiers: [
      {
        name: 'Expedición Clásica (Tren Expedition / Voyager)',
        modality: 'Grupal',
        priceUsd: 310,
        minPax: 1,
        description: 'Tren turístico con ventanas amplias y guiado en grupo reducido en la ciudadela.',
        perks: ['Todos los tickets incluidos', 'Recojo en hotel', 'Guía acreditado']
      },
      {
        name: 'Edición Panorámica Vistadome / 360° + Guía Privado',
        modality: 'Privado',
        priceUsd: 395,
        minPax: 2,
        description: 'Vagón panorámico con domos de cristal o coche mirador, snack andino a bordo y guía privado exclusivo en Machu Picchu.',
        perks: ['Tren Vistadome o 360°', 'Guía privado exclusivo', 'Traslados privados Cusco-Ollantaytambo']
      }
    ],
    addOns: [
      { id: 'huayna-picchu', label: 'Ascenso Montaña Huayna Picchu (Circuito 3)', priceUsd: 65, note: 'Sujeto a cupo ministerial anticipado' },
      { id: 'montana-mp', label: 'Ascenso Montaña Machu Picchu (3,082 m)', priceUsd: 65 }
    ],
    recommendations: [
      'Reservar con 30 a 60 días de anticipación para asegurar el Circuito 2 (Ruta Clásica).',
      'Obligatorio presentar el pasaporte o DNI físico original con el que se emitió el boleto.',
      'Equipaje máximo permitido dentro del Santuario: mochila de hasta 40 × 35 × 20 cm (sin trípodes ni bastones con punta metálica).'
    ],
    cancellationPolicy: 'Por normativa del Ministerio de Cultura del Perú y empresas ferroviarias, los boletos emitidos son nominativos y no reembolsables. La logística terrestre admite cambios hasta 7 días antes.',
    faqs: [
      {
        question: '¿Qué circuito de Machu Picchu incluye esta reserva?',
        answer: 'Priorizamos el Circuito 2 (Ruta Clásica). Si en tu fecha el cupo oficial del Circuito 2 está agotado, te informaremos por escrito las opciones disponibles en Circuito 1 (Panorámico) o Circuito 3 (Realeza) antes de confirmar ningún pago.'
      }
    ]
  },
  {
    id: 'tour-04',
    slug: 'machu-picchu-2-dias-pernocte-aguas-calientes',
    code: 'QUL-MAP-02',
    title: 'Machu Picchu al Amanecer: 2 Días / 1 Noche en Aguas Calientes',
    shortTitle: 'Machu Picchu 2D/1N en Aguas Calientes',
    subtitle: 'Viaja sin madrugar por el cañón del Urubamba, pernocta al pie de la montaña y asciende en los primeros turnos matinales.',
    destinationSlug: 'valle-sagrado-machu-picchu',
    visitedDestinations: ['valle-sagrado-machu-picchu', 'cusco'],
    destinationName: 'Valle Sagrado & Machu Picchu',
    region: 'Andes Mágicos',
    primaryCategory: 'cusco-machu-picchu',
    sections: ['cusco-machu-picchu'],
    durationDays: 2,
    durationLabel: '2 Días / 1 Noche',
    altitudeMax: '2,430 m (Machu Picchu) / Paso salida Cusco 3,399 m',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 385,
    privatePriceUsd: 520,
    singleSupplementUsd: 45,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.aguasCalientes,
    gallery: [
      PERU_PHOTOS.aguasCalientes,
      PERU_PHOTOS.machuPicchuMist,
      PERU_PHOTOS.machuPicchuClassic,
      PERU_PHOTOS.machuPicchuTrain
    ],
    summary: 'Para quienes desean evitar la partida de las 04:30 hrs desde Cusco y presenciar la neblina matinal disipándose sobre las cumbres de Machu Picchu y Huayna Picchu.',
    editorialDescription: 'Dividir la visita a Machu Picchu en dos jornadas transforma la experiencia. El primer día disfrutas de un traslado diurno por el Valle Sagrado con parada en el Mirador de Taray hacia Ollantaytambo, viajas en tren con luz natural hasta Aguas Calientes (2,040 m) y realizas la charla de coordinación con tu guía en el hotel —con tiempo libre para los Jardines de Mandor o baños termales—. Al día siguiente asciendes en los primeros turnos para recorrer la ciudadela sin apuros.',
    highlights: [
      '1 noche de hotel seleccionado con desayuno desde las 05:00 hrs en Aguas Calientes',
      'Ingreso matinal a Machu Picchu aprovechando la mejor luz sobre el granito inca',
      'Ideal para combinar con el ascenso temprano a Huayna Picchu (2,693 m)',
      'Briefing presencial la noche previa y asistencia continua en estación'
    ],
    placesVisited: ['Mirador de Taray', 'Ollantaytambo (2,792 m)', 'Aguas Calientes y Jardines de Mandor (2,040 m)', 'Santuario de Machu Picchu (2,430 m)'],
    schedule: {
      departure: 'Día 1: 09:00 hrs o 12:30 hrs desde Cusco',
      returnTime: 'Día 2: ~20:15 hrs en tu hotel en Cusco',
      frequency: 'Salidas diarias todo el año',
      pickupInfo: 'Recojo y retorno en tu hotel de Cusco o Valle Sagrado.'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Cusco – Ollantaytambo – Tren Escénico a Aguas Calientes',
        description: 'Traslado panorámico con vista en el Mirador de Taray hacia la estación de Ollantaytambo. Viaje ferroviario junto al río Vilcanota hasta Aguas Calientes, instalación en el hotel y tarde libre para caminar a los Jardines de Mandor o visitar los baños termales.',
        altitude: '2,040 m s.n.m.',
        overnight: 'Aguas Calientes (Hotel 3★ Boutique o 4★)'
      },
      {
        badge: 'Día 02',
        title: 'Amanecer en Machu Picchu y Retorno a Cusco',
        description: 'Desayuno temprano y ascenso en bus Consettur hacia la llaqta. Visita guiada profunda de 2.5 horas por el Santuario Histórico. Descenso para almorzar por cuenta propia y retorno vespertino en tren y vehículo privado a Cusco.',
        altitude: '2,430 m s.n.m.',
        meals: ['Desayuno buffet en hotel']
      }
    ],
    included: [
      'Traslados terrestres Cusco – Ollantaytambo – Cusco',
      'Tren turístico ida y vuelta (Expedition/Voyager o Vistadome según modalidad)',
      '1 noche de alojamiento en Aguas Calientes con desayuno',
      'Boleto de bus Consettur ida y vuelta',
      'Entrada oficial a Machu Picchu + Guía acreditado'
    ],
    notIncluded: [
      'Almuerzos y cenas',
      'Boleto adicional a montaña Huayna Picchu (+USD $65)'
    ],
    pricingTiers: [
      {
        name: 'Programa Confort 3★ Boutique (Base Doble)',
        modality: 'Grupal',
        priceUsd: 385,
        minPax: 2,
        description: 'Hotel 3★ (Tierra Viva / Casa Andina Standard) + Tren Expedition.',
        perks: ['Habitación doble o matrimonial con baño privado', 'Desayuno temprano desde 05:00 hrs', 'Asistencia en estación']
      },
      {
        name: 'Programa Superior 4★ + Tren Vistadome + Guía Privado',
        modality: 'Privado',
        priceUsd: 520,
        minPax: 2,
        description: 'Hotel 4★ (El Mapi by Inkaterra o Casa del Sol) + Tren panorámico Vistadome.',
        perks: ['Hotel 4★ seleccionado', 'Tren panorámico Vistadome', 'Guía privado exclusivo en Machu Picchu']
      }
    ],
    addOns: [
      { id: 'huayna-picchu', label: 'Ascenso a Huayna Picchu (turnos 07:00 o 09:00 AM)', priceUsd: 65 }
    ],
    recommendations: [
      'Empacar únicamente una mochila o bolso de cabina (máximo 8 kg) para la noche en Aguas Calientes; tu maleta grande permanece segura en tu hotel de Cusco.'
    ],
    cancellationPolicy: 'Reprogramación terrestre sin cargo hasta 15 días antes; tickets ministeriales y ferroviarios sujetos a condiciones del emisor.',
    faqs: [
      {
        question: '¿Puedo agregar la caminata a Huayna Picchu en el Día 2?',
        answer: 'Sí, pernoctar en Aguas Calientes es la mejor forma de acceder a los turnos matinales de Huayna Picchu (07:00 o 09:00 AM) sin depender de trenes de madrugada.'
      }
    ]
  },
  {
    id: 'tour-05',
    slug: 'conexion-valle-sagrado-machu-picchu-2d-1n',
    code: 'QUL-MAP-03',
    title: 'Travesía Valle Sagrado & Machu Picchu (2 Días / 1 Noche)',
    shortTitle: 'Valle Sagrado + Machu Picchu 2D/1N',
    subtitle: 'El circuito más eficiente de los Andes: explora Chinchero, Moray, Maras y Ollantaytambo conectando directo en tren.',
    destinationSlug: 'valle-sagrado-machu-picchu',
    visitedDestinations: ['valle-sagrado-machu-picchu', 'cusco'],
    destinationName: 'Valle Sagrado & Machu Picchu',
    region: 'Andes Mágicos',
    primaryCategory: 'cusco-machu-picchu',
    sections: ['cusco-machu-picchu'],
    durationDays: 2,
    durationLabel: '2 Días / 1 Noche',
    altitudeMax: '3,762 m s.n.m. (Chinchero)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 435,
    privatePriceUsd: 590,
    singleSupplementUsd: 45,
    originalPriceUsd: 485,
    promoLabel: 'Tarifa Combinada -10%',
    isFeatured: true,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.ollantaytambo,
    gallery: [
      PERU_PHOTOS.ollantaytambo,
      PERU_PHOTOS.morayAndenes,
      PERU_PHOTOS.marasSalineras,
      PERU_PHOTOS.machuPicchuClassic
    ],
    summary: 'Diseñado para optimizar tu ruta sin retroceder a Cusco: visita el Valle Sagrado el Día 1, aborda el tren en Ollantaytambo a media tarde y despierta en Aguas Calientes listo para Machu Picchu.',
    editorialDescription: 'Muchos viajeros duplican trayectos regresando a dormir a Cusco tras el Valle Sagrado para volver a bajar de madrugada hacia Ollantaytambo. Este itinerario elimina cuatro horas innecesarias de carretera: luego de recorrer Chinchero (3,762 m), Moray (3,500 m), Salineras de Maras (3,250 m), almorzar en Urubamba (2,871 m) y explorar Ollantaytambo (2,792 m), concluimos a las 15:45 hrs para embarcar cómodamente en el tren de las 16:36 hrs rumbo a Aguas Calientes (2,040 m).',
    highlights: [
      'Ahorra 4 horas de carretera conectando Ollantaytambo directo con el tren a Aguas Calientes',
      'Incluye almuerzo buffet en Urubamba el Día 1 y desayuno temprano el Día 2',
      'Ingreso a Salineras de Maras y Boleto Oficial a Machu Picchu incluidos',
      'Asistencia permanente de nuestro equipo desde tu salida en Cusco hasta tu regreso'
    ],
    placesVisited: ['Chinchero (3,762 m)', 'Moray (3,500 m)', 'Salineras de Maras (3,250 m)', 'Urubamba (2,871 m)', 'Ollantaytambo (2,792 m)', 'Aguas Calientes (2,040 m)', 'Machu Picchu (2,430 m)'],
    schedule: {
      departure: 'Día 1: 06:45 hrs desde Cusco',
      returnTime: 'Día 2: ~20:15 hrs en Cusco',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo en cualquier hotel del Cusco.'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Chinchero, Moray, Salineras de Maras, Urubamba y Tren desde Ollantaytambo',
        description: 'Recorrido por la meseta de Chinchero (3,762 m), los andenes de Moray (3,500 m) y Salineras de Maras (3,250 m), almuerzo en Urubamba (2,871 m) y visita a Ollantaytambo hasta las 15:45 hrs para abordar el tren de las 16:36 hrs hacia Aguas Calientes.',
        altitude: '2,040 m – 3,762 m s.n.m.',
        meals: ['Almuerzo Buffet en Urubamba'],
        overnight: 'Aguas Calientes (2,040 m)'
      },
      {
        badge: 'Día 02',
        title: 'Santuario Histórico de Machu Picchu y Retorno a Cusco',
        description: 'Ascenso matinal en bus Consettur. Recorrido guiado de 2.5 horas por la ciudadela inca. Retorno vespertino en tren a Ollantaytambo y traslado directo a tu hotel en Cusco.',
        altitude: '2,430 m s.n.m.',
        meals: ['Desayuno en hotel']
      }
    ],
    included: [
      'Tour guiado del Valle Sagrado con transporte turístico',
      'Almuerzo buffet en Urubamba + Ingreso a Maras',
      'Tren turístico Ollantaytambo – Aguas Calientes – Ollantaytambo',
      '1 noche de alojamiento en Aguas Calientes con desayuno',
      'Buses Consettur + Entrada a Machu Picchu + Guía oficial',
      'Traslado estación Ollantaytambo – Hotel en Cusco'
    ],
    notIncluded: [
      'Boleto Turístico Parcial Circuito III (Chinchero, Moray y Ollantaytambo — S/ 70 / ~USD $19 extranjeros, añadible al solicitar)'
    ],
    pricingTiers: [
      {
        name: 'Modalidad Grupal en Ruta Directa (Hotel 3★)',
        modality: 'Grupal',
        priceUsd: 435,
        minPax: 2,
        description: 'Incluye almuerzo en Valle Sagrado, hotel 3★ en Aguas Calientes y boletos de tren/Machu Picchu.',
        perks: ['Almuerzo en Valle Sagrado incluido', 'Hotel 3★ en Aguas Calientes', 'Tickets completos a Machu Picchu']
      },
      {
        name: 'Modalidad Privada 4★ + Tren Vistadome',
        modality: 'Privado',
        priceUsd: 590,
        minPax: 2,
        description: 'Todo en privado con Boleto Turístico Circuito III incluido, hotel 4★ y tren panorámico.',
        perks: ['Vehículo y guías privados ambos días', 'Boleto Turístico incluido', 'Tren Vistadome al retorno']
      }
    ],
    addOns: [
      { id: 'btc-circuito3', label: 'Boleto Turístico Parcial Circuito III (S/ 70)', priceUsd: 19, note: 'Ya incluido en modalidad Privada', includedInPrivate: true }
    ],
    recommendations: [
      'Llevar una mochila de 20 a 30 litros (máx. 8 kg) con tus pertenencias para la noche en Aguas Calientes.'
    ],
    cancellationPolicy: 'Modificación flexible terrestre hasta 10 días antes; boletos de Machu Picchu sujetos a regulación oficial.',
    faqs: [
      {
        question: '¿Qué ocurre con mis maletas grandes mientras voy a Aguas Calientes?',
        answer: 'Tu hotel en Cusco las guarda gratuitamente en su custodia de equipaje, o bien las resguardamos en nuestra sede del Centro Histórico.'
      }
    ]
  },
  {
    id: 'tour-06',
    slug: 'montana-siete-colores-vinicunca-valle-rojo',
    code: 'QUL-ADV-01',
    title: 'Vinicunca & Mirador del Valle Rojo: Expedición de Alta Montaña',
    shortTitle: 'Montaña de 7 Colores & Valle Rojo',
    subtitle: 'Ascenso a los estratos minerales de la cordillera del Vilcanota a 5,036 m s.n.m. en salida temprana anticongestión.',
    destinationSlug: 'cusco',
    visitedDestinations: ['cusco'],
    destinationName: 'Cusco',
    region: 'Andes Mágicos',
    primaryCategory: 'aventura-naturaleza',
    sections: ['aventura-naturaleza', 'cusco-machu-picchu', 'full-day'],
    durationDays: 1,
    durationLabel: 'Full Day (12.5 horas)',
    altitudeMax: '5,036 m s.n.m. (Vinicunca / Valle Rojo ~4,950–5,020 m s.n.m.)',
    difficulty: 'Exigente / Alta Montaña',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 65,
    privatePriceUsd: 145,
    heroImage: PERU_PHOTOS.vinicunca,
    gallery: [
      PERU_PHOTOS.vinicunca,
      PERU_PHOTOS.ausangate,
      PERU_PHOTOS.cuscoPlaza,
      PERU_PHOTOS.sacsayhuaman
    ],
    summary: 'Llegamos al abra de Vinicunca antes de las caravanas masivas mediante la ruta corta de Cusipata – Phulawasipata, sumando el desvío panorámico hacia el mirador del Valle Rojo.',
    editorialDescription: 'La Montaña de 7 Colores (Vinicunca, 5,036 m) exige aclimatación previa y un protocolo serio de montaña. Partimos a las 04:15 hrs en transporte calefaccionado con guías equipados con oxímetro de pulso, oxígeno suplementario, bastones de trekking y desayuno caliente en Cusipata (3,310 m). Tras 1h 45min de caminata desde Phulawasipata (4,630 m), contemplamos los estratos minerales frente al macizo del Ausangate (6,384 m) y recorremos el sendero del Valle Rojo (~4,950–5,020 m s.n.m.).',
    highlights: [
      'Ruta corta por Cusipata – Phulawasipata (3 a 3.5 hrs desde Cusco; caminata de 1h 45min)',
      'Incluye ingresos comunales tanto a Vinicunca como al mirador del Valle Rojo',
      'Guía certificado en primeros auxilios de alta montaña con oxígeno y oxímetro',
      'Desayuno andino energético y almuerzo buffet reconfortante en Cusipata'
    ],
    placesVisited: ['Cusipata (3,310 m)', 'Comunidad de Phulawasipata (4,630 m)', 'Abra Vinicunca (5,036 m)', 'Mirador del Valle Rojo', 'Vista del Apu Ausangate'],
    schedule: {
      departure: '04:15 hrs desde tu hotel en Cusco',
      returnTime: '16:45 hrs en Cusco',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo directo en tu hotel en Cusco.'
    },
    itinerary: [
      {
        badge: '04:15 hrs',
        title: 'Salida de Cusco hacia el Valle Sur (Cusipata)',
        description: 'Viaje de 2 horas por carretera asfaltada hasta Cusipata para tomar un desayuno caliente con cereales andinos y mate de muña.',
        altitude: '3,310 m s.n.m.',
        meals: ['Desayuno Andino']
      },
      {
        badge: '07:45 hrs',
        title: 'Inicio de caminata en Phulawasipata entre rebaños de alpacas',
        description: 'Tras ~1 hora de ascenso por trocha afirmada, iniciamos la caminata de 3.5 km acompañado por nuestro guía (opción de caballo comunal en ruta).',
        altitude: '4,630 m s.n.m.'
      },
      {
        badge: '09:30 hrs',
        title: 'Cumbre de Vinicunca (5,036 m) y desvío al Valle Rojo',
        description: 'Contemplación de las franjas minerales frente al nevado Ausangate y caminata de 25 a 35 minutos por la cresta del Valle Rojo.',
        altitude: '~4,950–5,020 m s.n.m.'
      },
      {
        badge: '13:15 hrs',
        title: 'Almuerzo buffet en Cusipata y retorno a Cusco',
        description: 'Descenso hacia la unidad, almuerzo reparador en Cusipata y regreso a Cusco a media tarde.',
        altitude: '3,399 m s.n.m.',
        meals: ['Almuerzo Buffet']
      }
    ],
    included: [
      'Transporte turístico Cusco – Phulawasipata – Cusco',
      'Desayuno y almuerzo buffet en Cusipata',
      'Boletos de ingreso comunal a Vinicunca y al Valle Rojo',
      'Bastones de trekking y oxígeno de emergencia',
      'Guía especialista en alta montaña'
    ],
    notIncluded: [
      'Alquiler opcional de caballo comunal (aprox. S/ 90 / ~USD $24 pago directo al arriero local)'
    ],
    pricingTiers: [
      {
        name: 'Expedición Grupal Primer Turno',
        modality: 'Grupal',
        priceUsd: 65,
        minPax: 1,
        description: 'Grupo reducido con entradas a Vinicunca y Valle Rojo incluidas.',
        perks: ['Entradas incluidas', 'Bastones incluidos', '2 comidas incluidas']
      },
      {
        name: 'Expedición Privada en Camioneta 4x4',
        modality: 'Privado',
        priceUsd: 145,
        minPax: 2,
        description: 'Salida en horario a elección (05:00 AM) con vehículo privado y guía exclusivo.',
        perks: ['Ritmo 100% personalizado', 'Snacks de montaña y bebidas calientes', 'Entradas incluidas']
      }
    ],
    recommendations: [
      'Indispensable contar con mínimo 2 o 3 días previos de aclimatación en Cusco antes de realizar esta ruta.',
      'Vestir en capas térmicas (primera capa, polar, cortavientos impermeable, gorro y guantes).'
    ],
    cancellationPolicy: 'Cancelación gratuita hasta 24 horas antes de la salida.',
    faqs: [
      {
        question: '¿Qué sucede si siento mal de altura durante la caminata?',
        answer: 'Nuestros guías portan oxímetro de pulso y oxígeno medicinal para asistencia inmediata, además de poder coordinar caballo de apoyo con los arrieros de la comunidad.'
      }
    ]
  },
  {
    id: 'tour-07',
    slug: 'laguna-humantay-glaciar-salkantay',
    code: 'QUL-ADV-02',
    title: 'Laguna Humantay Turquesa: Caminata al Pie del Nevado Salkantay',
    shortTitle: 'Laguna Humantay & Nevado Salkantay',
    subtitle: 'Espejo glaciar esmeralda a 4,200 m s.n.m. en la cordillera de Vilcabamba con desayuno y almuerzo en Mollepata.',
    destinationSlug: 'cusco',
    visitedDestinations: ['cusco'],
    destinationName: 'Cusco',
    region: 'Andes Mágicos',
    primaryCategory: 'aventura-naturaleza',
    sections: ['aventura-naturaleza', 'cusco-machu-picchu', 'full-day'],
    durationDays: 1,
    durationLabel: 'Full Day (12.5 horas)',
    altitudeMax: '4,200 m s.n.m.',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 60,
    privatePriceUsd: 135,
    heroImage: PERU_PHOTOS.humantay,
    gallery: [
      PERU_PHOTOS.humantay,
      PERU_PHOTOS.ausangate,
      PERU_PHOTOS.cuscoPlaza,
      PERU_PHOTOS.sacsayhuaman
    ],
    summary: 'Caminata escénica desde el campamento de Soraypampa hasta las aguas glaciares de la Laguna Humantay, sagrada para las comunidades andinas de Mollepata.',
    editorialDescription: 'Alimentada por el deshielo perpetuo de los nevados Humantay (5,473 m) y Salkantay (6,271 m), esta laguna de origen glaciar adquiere una tonalidad turquesa intensa bajo el cielo andino. Nuestra ruta contempla parada en Mollepata (2,803 m) —y ascenso final por ~20 km de trocha afirmada hasta Soraypampa—, bastones de trekking, boleto comunal incluido y una breve ofrenda tradicional frente al Apu.',
    highlights: [
      'Caminata de 1.5 horas desde Soraypampa (3,900 m) bajo las paredes glaciares del Salkantay',
      'Ingreso comunal a Laguna Humantay incluido en la tarifa',
      'Desayuno y almuerzo buffet andino en Mollepata (2,803 m)',
      'Bastones de caminata y equipo de oxígeno medicinal a bordo'
    ],
    placesVisited: ['Limatambo', 'Mollepata (2,803 m)', 'Pampa de Soraypampa (3,900 m)', 'Laguna Humantay (4,200 m)'],
    schedule: {
      departure: '04:30 hrs desde Cusco',
      returnTime: '17:00 hrs en Cusco',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo en tu hotel del Cusco.'
    },
    itinerary: [
      {
        badge: '04:30 hrs',
        title: 'Ruta hacia Limatambo y desayuno en Mollepata',
        description: 'Viaje por carretera asfaltada bordeando el cañón del Apurímac hasta el poblado de Mollepata para desayunar.',
        altitude: '2,803 m s.n.m.',
        meals: ['Desayuno Buffet']
      },
      {
        badge: '08:30 hrs',
        title: 'Tramo de trocha a Soraypampa e inicio del ascenso',
        description: 'Subida en vehículo por ~20 km de trocha afirmada hasta Soraypampa y caminata de 3 km en pendiente constante frente al nevado Salkantay.',
        altitude: '3,900 m s.n.m.'
      },
      {
        badge: '10:15 hrs',
        title: 'Orillas de la Laguna Humantay',
        description: 'Tiempo amplio en la laguna para recorrer sus miradores laterales y conocer su simbolismo andino.',
        altitude: '4,200 m s.n.m.'
      },
      {
        badge: '13:15 hrs',
        title: 'Almuerzo en Mollepata y retorno a Cusco',
        description: 'Descenso hacia Soraypampa, almuerzo en Mollepata y retorno por la tarde a Cusco.',
        altitude: '2,803 m (Mollepata) → 3,399 m s.n.m. (Cusco)',
        meals: ['Almuerzo Buffet']
      }
    ],
    included: [
      'Transporte turístico ida y vuelta',
      'Ticket de ingreso a Laguna Humantay',
      'Desayuno y almuerzo buffet en Mollepata',
      'Bastones de caminata y guía oficial de montaña'
    ],
    notIncluded: [
      'Caballo de ascenso opcional en Soraypampa (S/ 80 / ~USD $21 pago directo a pobladores)'
    ],
    pricingTiers: [
      {
        name: 'Modalidad Grupal Reducida',
        modality: 'Grupal',
        priceUsd: 60,
        minPax: 1,
        description: 'Incluye entradas, bastones, desayuno y almuerzo.',
        perks: ['Todo incluido sin pagos ocultos en ruta', 'Máximo 14 viajeros']
      },
      {
        name: 'Expedición Privada Humantay',
        modality: 'Privado',
        priceUsd: 135,
        minPax: 2,
        description: 'Salida flexible y picnic gourmet adicional frente al Salkantay.',
        perks: ['Vehículo privado', 'Guía exclusivo', 'Entradas incluidas']
      }
    ],
    recommendations: [
      'Llevar calzado de trekking impermeable, gorro para el sol, gafas UV y casaca cortavientos.'
    ],
    cancellationPolicy: 'Cancelación sin penalidad hasta 24 horas antes de la salida.',
    faqs: [
      {
        question: '¿Qué es más exigente: Laguna Humantay o Montaña de 7 Colores?',
        answer: 'Laguna Humantay se encuentra 836 metros más abajo (4,200 m frente a los 5,036 m de Vinicunca), por lo que la oxigenación es mucho más cómoda aunque la rampa final tiene pendiente sostenida.'
      }
    ]
  },
  {
    id: 'tour-08',
    slug: 'camino-inca-corto-km104-winay-wayna-puerta-del-sol',
    code: 'QUL-MAP-04',
    title: 'Camino Inca Corto a Machu Picchu (2 Días / 1 Noche por Inti Punku)',
    shortTitle: 'Camino Inca Corto Km 104 (2D/1N)',
    subtitle: 'Ingresa a Machu Picchu caminando por la Puerta del Sol tras recorrer el sendero real desde el Km 104 y Wiñay Wayna.',
    destinationSlug: 'valle-sagrado-machu-picchu',
    visitedDestinations: ['valle-sagrado-machu-picchu', 'cusco'],
    destinationName: 'Valle Sagrado & Machu Picchu',
    region: 'Andes Mágicos',
    primaryCategory: 'aventura-naturaleza',
    sections: ['aventura-naturaleza', 'cusco-machu-picchu'],
    durationDays: 2,
    durationLabel: '2 Días / 1 Noche',
    altitudeMax: '2,720 m s.n.m. (Inti Punku)',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 560,
    privatePriceUsd: 710,
    singleSupplementUsd: 45,
    isFeatured: true,
    isExclusive: true,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.machuPicchuMist,
    gallery: [
      PERU_PHOTOS.machuPicchuMist,
      PERU_PHOTOS.machuPicchuClassic,
      PERU_PHOTOS.ollantaytambo,
      PERU_PHOTOS.aguasCalientes
    ],
    summary: 'La emoción del Qhapaq Ñan sin acampar: camina 12 km el Día 1 por bosque nuboso desde Chachabamba (Km 104) hasta el Inti Punku, descansa en hotel en Aguas Calientes y recorre Machu Picchu el Día 2.',
    editorialDescription: 'Operado con autorización oficial en la Red de Caminos Inca, este programa permite vivir la llegada a pie más celebrada de los Andes —divisar Machu Picchu por primera vez desde la Puerta del Sol (Inti Punku, 2,720 m)— descansando luego en la comodidad de un hotel en Aguas Calientes. El Día 1 descendemos del tren en el control de Chachabamba (Km 104, 2,170 m), ascendemos entre orquídeas y la catarata de Wiñay Wayna hasta sus espectaculares terrazas (2,650 m) y coronamos el Inti Punku al atardecer. El Día 2 retornamos a la ciudadela para el guiado completo.',
    highlights: [
      'Permiso oficial de Red de Camino Inca (Km 104 – Chachabamba – Wiñay Wayna – Inti Punku)',
      'Doble encuentro con Machu Picchu: atardecer desde Inti Punku y mañana siguiente en los templos',
      'Sin carpas: noche en hotel 3★ Boutique o 4★ en Aguas Calientes con cena incluida',
      'Almuerzo campestre de montaña, traslados Cusco–Ollantaytambo, trenes y 3 buses incluidos'
    ],
    placesVisited: ['Chachabamba Km 104 (2,170 m)', 'Catarata de Wiñay Wayna', 'Complejo Arqueológico de Wiñay Wayna (2,650 m)', 'Inti Punku (2,720 m)', 'Santuario de Machu Picchu (2,430 m)'],
    schedule: {
      departure: 'Día 1: 04:30 hrs desde Cusco',
      returnTime: 'Día 2: ~20:15 hrs en Cusco',
      frequency: 'Salidas diarias de marzo a enero (cerrado en febrero por mantenimiento oficial)',
      pickupInfo: 'Recojo en hotel y charla previa el día anterior a las 18:00 hrs.'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Tren al Km 104 – Chachabamba a Wiñay Wayna – Inti Punku (12 km / 6 hrs)',
        description: 'Descenso del tren en el control de Chachabamba (2,170 m). Ascenso por escalinatas incas entre orquídeas y la catarata de Wiñay Wayna hasta los andenes de Wiñay Wayna (2,650 m). Tras el almuerzo campestre de ruta, caminamos hasta la Puerta del Sol (Inti Punku) para contemplar Machu Picchu con la luz de la tarde y descendemos en bus a Aguas Calientes.',
        altitude: '2,170 m → 2,720 m s.n.m.',
        meals: ['Almuerzo campestre de montaña', 'Cena a la carta en Aguas Calientes'],
        overnight: 'Aguas Calientes (2,040 m)'
      },
      {
        badge: 'Día 02',
        title: 'Exploración del Santuario de Machu Picchu y Retorno en Tren',
        description: 'Ascenso temprano en bus para recorrer en detalle los sectores urbanos y ceremoniales con nuestro guía. Por la tarde, retorno en tren a Ollantaytambo y vehículo privado a Cusco.',
        altitude: '2,430 m s.n.m.',
        meals: ['Desayuno en hotel']
      }
    ],
    included: [
      'Traslado privado Hotel Cusco – Estación Ollantaytambo – Hotel Cusco',
      'Permiso oficial del Ministerio de Cultura para Camino Inca Corto (Km 104) + Machu Picchu Día 2',
      'Tren de ida hasta el Km 104 y tren de retorno desde Aguas Calientes',
      '3 boletos de bus Consettur (bajada Día 1 + subida y bajada Día 2)',
      '1 noche de hotel en Aguas Calientes + Almuerzo campestre Día 1 + Cena Día 1 + Desayuno Día 2',
      'Guía especialista habilitado para Red de Camino Inca'
    ],
    notIncluded: [
      'Almuerzo del Día 2 en Aguas Calientes'
    ],
    pricingTiers: [
      {
        name: 'Camino Inca Corto Grupal (Máx. 8 Pax)',
        modality: 'Grupal',
        priceUsd: 560,
        minPax: 2,
        description: 'Incluye permisos oficiales, traslados, hotel 3★ y alimentación indicada.',
        perks: ['Permiso oficial garantizado', 'Hotel 3★ incluido', 'Trenes y 3 buses incluidos']
      },
      {
        name: 'Camino Inca Corto Privado + Hotel 4★ + Vistadome',
        modality: 'Privado',
        priceUsd: 710,
        minPax: 2,
        description: 'Guía privado durante toda la caminata, hotel 4★ y tren panorámico Vistadome.',
        perks: ['Guía exclusivo a tu ritmo', 'Hotel 4★ y tren Vistadome', 'Asistencia en estación']
      }
    ],
    recommendations: [
      'Reservar con 2 a 4 meses de anticipación (cupo gubernamental limitado a 250 permisos diarios).',
      'En febrero la Red de Caminos Inca cierra por mantenimiento anual del Ministerio de Cultura.'
    ],
    cancellationPolicy: 'Los permisos de Camino Inca no admiten cambios de nombre ni fecha una vez emitidos ante el Ministerio de Cultura.',
    faqs: [
      {
        question: '¿Se requiere gran condición física para los 12 km del Día 1?',
        answer: 'Es una caminata de nivel moderado: las primeras 3 horas ascienden gradualmente por escalinatas de piedra hasta Wiñay Wayna, seguidas de 1.5 horas de sendero ondulado hasta Inti Punku, siempre entre 2,170 y 2,720 m s.n.m.'
      }
    ]
  },
  {
    id: 'tour-09',
    slug: 'arequipa-canon-del-colca-2-dias-chivay-cruz-del-condor',
    code: 'QUL-AQP-01',
    title: 'Arequipa & Cañón del Colca Pausado: Reserva Salinas, Chivay y Cruz del Cóndor (2D/1N)',
    shortTitle: 'Arequipa & Cañón del Colca (2D/1N)',
    subtitle: 'Cruza la puna de Pampa Cañahuas entre vicuñas silvestres hacia uno de los cañones más profundos del planeta.',
    destinationSlug: 'arequipa-colca',
    visitedDestinations: ['arequipa-colca'],
    destinationName: 'Arequipa & Cañón del Colca',
    region: 'Andes Mágicos',
    primaryCategory: 'aventura-naturaleza',
    sections: ['aventura-naturaleza', 'rutas-terrestres'],
    durationDays: 2,
    durationLabel: '2 Días / 1 Noche',
    altitudeMax: '4,910 m s.n.m. (Mirador Patapampa)',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 165,
    privatePriceUsd: 310,
    singleSupplementUsd: 35,
    heroImage: PERU_PHOTOS.colcaCanon,
    gallery: [
      PERU_PHOTOS.colcaCanon,
      PERU_PHOTOS.colcaCondor,
      PERU_PHOTOS.arequipaCatalina,
      PERU_PHOTOS.ausangate
    ],
    summary: 'Dos días recorriendo la Reserva Nacional de Salinas y Aguada Blanca, las aguas termales de Yanque o La Calera, los pueblos Collaguas de Pinchollo y Maca, y el vuelo matinal del cóndor.',
    editorialDescription: 'Partiendo desde la Ciudad Blanca de Arequipa (2,335 m), ascendemos bordeando el volcán Chachani a través de la reserva de vicuñas de Pampa Cañahuas y los bofedales de Tocra hasta el Mirador de los Volcanes en Patapampa (4,910 m), antes de descender al Valle del Colca (3,635 m). Dormir en el valle permite llegar temprano a la Cruz del Cóndor y elegir al mediodía del Día 2 si regresas a Arequipa o continúas directamente hacia Puno (Lago Titicaca).',
    highlights: [
      'Avistamiento de vicuñas, alpacas y flamencos altoandinos en Salinas y Aguada Blanca',
      'Tarde termal en las pozas volcánicas de Chakapi (Yanque) o La Calera',
      'Observación del planeo del Cóndor Andino en los acantilados de Pinchollo y Cruz del Cóndor',
      'Conexión opcional directa desde Chivay hacia Puno en el Día 2 (~5.5 hrs)'
    ],
    placesVisited: ['Reserva Salinas y Aguada Blanca (4,100 m)', 'Mirador Patapampa (4,910 m)', 'Chivay (3,635 m) y Yanque (3,417 m)', 'Maca y Pinchollo', 'Mirador Cruz del Cóndor (3,800 m)'],
    schedule: {
      departure: 'Día 1: 07:30 hrs desde Arequipa',
      returnTime: 'Día 2: 17:00 hrs en Arequipa (o 19:30 hrs en Puno)',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo en hoteles del Centro Histórico, Yanahuara y Cayma en Arequipa.'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Arequipa – Reserva de Vicuñas – Abra Patapampa – Valle del Colca',
        description: 'Ascenso escénico con paradas en Pampa Cañahuas, Patahuasi y Patapampa (vista de 8 volcanes). Descenso a Chivay para almorzar, instalación en el valle y visita vespertina a las aguas termales.',
        altitude: '3,635 m s.n.m. en Chivay (Paso 4,910 m)',
        meals: ['Almuerzo Buffet en Chivay'],
        overnight: 'Valle del Colca (Chivay o Yanque)'
      },
      {
        badge: 'Día 02',
        title: 'Yanque, Pinchollo y Cruz del Cóndor – Retorno a Arequipa (o Ruta a Puno)',
        description: 'Salida a las 06:00 hrs bordeando las andenerías del Colca hasta el Mirador de la Cruz del Cóndor (3,800 m) para observar el vuelo de los cóndores. De regreso visitamos los pueblos e iglesias coloniales de Pinchollo, Maca y Yanque.',
        altitude: '3,800 m s.n.m.',
        meals: ['Desayuno en Lodge']
      }
    ],
    included: [
      'Transporte turístico durante los 2 días',
      '1 noche de alojamiento en el Valle del Colca con desayuno',
      'Boleto Turístico del Colca (Autocolca — S/ 70 / ~USD $19 incluido)',
      'Almuerzo buffet del Día 1 en Chivay',
      'Guía oficial bilingüe'
    ],
    notIncluded: [
      'Ingreso a baños termales públicos de Chakapi o La Calera (S/ 15 / ~USD $4)',
      'Tramo opcional Chivay – Puno en bus turístico (+USD $45)'
    ],
    pricingTiers: [
      {
        name: 'Programa Colca Clásico 3★ (Boleto Autocolca Incluido)',
        modality: 'Grupal',
        priceUsd: 165,
        minPax: 2,
        description: 'Incluye transporte, hotel 3★ en Chivay/Yanque, almuerzo Día 1 y Boleto Turístico del Colca.',
        perks: ['Boleto Turístico del Colca incluido', 'Hotel 3★ con calefacción', 'Almuerzo Día 1 incluido']
      },
      {
        name: 'Colca Privado + Lodge 4★ Superior (Colca Lodge / Aranwa)',
        modality: 'Privado',
        priceUsd: 310,
        minPax: 2,
        description: 'Camioneta privada y alojamiento en lodge 4★ con pozas termales privadas junto al río.',
        perks: ['Lodge 4★ Superior en Yanque', 'Boleto Autocolca y termales del lodge incluidos', 'Vehículo y guía privados']
      }
    ],
    addOns: [
      { id: 'chivay-puno', label: 'Conexión Chivay → Puno (Día 2 tarde en bus turístico)', priceUsd: 45 }
    ],
    recommendations: [
      'Llevar traje de baño para las pozas termales del primer día y abrigo cortavientos para la mañana en la Cruz del Cóndor.'
    ],
    cancellationPolicy: 'Cancelación sin penalidad hasta 72 horas antes de la fecha de salida.',
    faqs: [
      {
        question: '¿Puedo terminar el tour en Puno en lugar de regresar a Arequipa?',
        answer: 'Sí, a las 13:00 hrs del Día 2 en Chivay te conectamos directamente con el bus turístico hacia Puno (llegada a las 19:30 hrs), ideal para enlazar con el Lago Titicaca y Cusco.'
      }
    ]
  },
  {
    id: 'tour-10',
    slug: 'expedicion-amazonica-tambopata-lago-sandoval-collpa-guacamayos-3d',
    code: 'QUL-AMZ-01',
    title: 'Amazonía de Tambopata: Lago Sandoval, Isla de Monos y Collpa Cachuela (3D/2N)',
    shortTitle: 'Amazonía Tambopata & Lago Sandoval (3D/2N)',
    subtitle: 'Inmersión en la selva virgen de Madre de Dios en eco-lodge ribereño con naturalista bilingüe y pensión completa.',
    destinationSlug: 'amazonia-tambopata',
    visitedDestinations: ['amazonia-tambopata'],
    destinationName: 'Amazonía & Tambopata',
    region: 'Amazonía Sur',
    primaryCategory: 'aventura-naturaleza',
    sections: ['aventura-naturaleza'],
    durationDays: 3,
    durationLabel: '3 Días / 2 Noches',
    altitudeMax: '200 m s.n.m. (Reserva Tambopata)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 360,
    privatePriceUsd: 540,
    singleSupplementUsd: 70,
    isFeatured: true,
    heroImage: PERU_PHOTOS.lagoSandoval,
    gallery: [
      PERU_PHOTOS.lagoSandoval,
      PERU_PHOTOS.tambopataMacaws,
      PERU_PHOTOS.aguasCalientes,
      PERU_PHOTOS.machuPicchuTrain
    ],
    summary: 'A solo 55 minutos de vuelo desde Cusco: navega en canoa a remo por el Lago Sandoval en busca de nutrias gigantes, visita la Isla de Monos, camina por puentes sobre el dosel y observa loros y guacamayos en La Cachuela.',
    editorialDescription: 'La Reserva Nacional Tambopata concentra una de las mayores densidades de fauna silvestre del planeta. Nuestro programa de 3 días te recibe en el aeropuerto de Puerto Maldonado (PEM, 183 m), resguarda tu equipaje grande en nuestra sede de ciudad y navega por el río Madre de Dios hasta un Eco-Lodge rodeado de bosque primario. Con pensión completa incluida explorarás el Lago Sandoval (180 m), la Isla de Monos y las paredes minerales de la collpa Cachuela.',
    highlights: [
      'Pensión completa incluida (Desayunos, Almuerzos y Cenas amazónicas en el Eco-Lodge)',
      'Excursión completa en canoa a remo por el Lago Sandoval (hábitat del lobo de río gigante)',
      'Canopy Walkway a 30 m en la copa de los árboles e incursión en la Isla de Monos',
      'Safari fluvial nocturno de caimanes y avistamiento al alba en Collpa Cachuela'
    ],
    placesVisited: ['Río Madre de Dios (183 m)', 'Isla de Monos', 'Canopy Walkway', 'Reserva Nacional Tambopata y Lago Sandoval (180 m)', 'Collpa de Loros y Guacamayos chicos (La Cachuela)'],
    schedule: {
      departure: 'Día 1: Recepción en vuelos de llegada antes de las 13:00 hrs en Puerto Maldonado',
      returnTime: 'Día 3: Traslado al aeropuerto para vuelos a partir de las 11:30 hrs',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recepción en el Aeropuerto Padre Aldamiz (PEM) de Puerto Maldonado.'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Río Madre de Dios, Isla de Monos, Canopy Walkway y Safari Nocturno',
        description: 'Recepción en aeropuerto, embarque fluvial hasta el eco-lodge y almuerzo de bienvenida. Por la tarde visitamos la Isla de Monos y subimos a las torres de Canopy entre castaños y shihuahuacos; al caer la noche navegamos en busca de caimanes.',
        altitude: '183 m s.n.m.',
        meals: ['Almuerzo', 'Cena'],
        overnight: 'Eco-Lodge en Río Madre de Dios'
      },
      {
        badge: 'Día 02',
        title: 'Expedición a la Reserva Nacional Tambopata y Lago Sandoval',
        description: 'Caminata de 3 km entre aguajales hasta el Lago Sandoval (180 m). Navegación silenciosa en canoa a remo observando nutrias gigantes, monos aulladores rojos, hoatzines y tortugas charapas.',
        altitude: '180 – 200 m s.n.m.',
        meals: ['Desayuno', 'Almuerzo Amazónico en hoja de bijao', 'Cena'],
        overnight: 'Eco-Lodge en Río Madre de Dios'
      },
      {
        badge: 'Día 03',
        title: 'Collpa de Loros y Guacamayos chicos (La Cachuela) y Retorno',
        description: 'Salida a las 05:00 hrs en bote hacia el barranco de arcilla mineral donde acuden bandadas de loros, pericos y guacamayos maracaná. Desayuno en el lodge y traslado puntual al aeropuerto.',
        altitude: '183 m s.n.m.',
        meals: ['Desayuno']
      }
    ],
    included: [
      'Traslados fluviales y terrestres Aeropuerto – Eco-Lodge – Aeropuerto',
      '2 noches en bungalows con mosquiteros y baño privado',
      'Alimentación completa (2 desayunos, 2 almuerzos, 2 cenas + agua filtrada e infusiones)',
      'Entrada oficial SERNANP a la Reserva Nacional Tambopata',
      'Botas de jebe para caminatas y guía naturalista bilingüe'
    ],
    notIncluded: [
      'Boletos aéreos Lima – Puerto Maldonado o Cusco – Puerto Maldonado',
      'Bebidas alcohólicas en el bar del lodge'
    ],
    pricingTiers: [
      {
        name: 'Bungalow Estándar en Eco-Lodge',
        modality: 'Grupal',
        priceUsd: 360,
        minPax: 2,
        description: 'Programa todo incluido con excursiones guiadas en grupo pequeño (máx. 8 pax).',
        perks: ['Pensión completa', 'Entradas SERNANP incluidas', 'Todas las navegaciones incluidas']
      },
      {
        name: 'Bungalow Superior Privado + Naturalista Exclusivo',
        modality: 'Privado',
        priceUsd: 540,
        minPax: 2,
        description: 'Bote y guía naturalista exclusivos para fotografía de fauna a tu propio ritmo.',
        perks: ['Bote y naturalista privado', 'Bungalow frente al río', 'Pensión completa']
      }
    ],
    recommendations: [
      'Llevar camisas de manga larga y pantalones ligeros en tonos claros (beige, arena o verde oliva), repelente con DEET y linterna frontal.'
    ],
    cancellationPolicy: 'Cancelación sin cargo hasta 10 días antes del ingreso al lodge.',
    faqs: [
      {
        question: '¿Se requiere vacuna contra la fiebre amarilla?',
        answer: 'Es altamente recomendada para ingresar a Madre de Dios (aplicada al menos 10 días antes del viaje), aunque no se exige como requisito en vuelos nacionales.'
      }
    ]
  },
  {
    id: 'tour-11',
    slug: 'paquete-peru-esencial-9-dias-lima-paracas-ica-cusco-machu-picchu',
    code: 'QUL-PKG-01',
    title: 'Perú Esencial: De la Costa del Pacífico a la Cumbre de los Incas (9 Días / 8 Noches)',
    shortTitle: 'Perú Esencial: Lima, Paracas, Cusco & M. Picchu (9D)',
    subtitle: 'El circuito insignia que articula Lima, Reserva de Paracas, Oasis de Huacachina, Cusco, Valle Sagrado, Machu Picchu y Vinicunca.',
    destinationSlug: 'cusco',
    visitedDestinations: ['lima', 'paracas-huacachina', 'cusco', 'valle-sagrado-machu-picchu'],
    destinationName: 'Multirregión Perú',
    region: 'Multirregión Perú',
    primaryCategory: 'paquetes-peru',
    sections: ['paquetes-peru', 'cusco-machu-picchu', 'paracas-huacachina'],
    durationDays: 9,
    durationLabel: '9 Días / 8 Noches',
    altitudeMax: '5,036 m s.n.m. (si elige Vinicunca) / 4,200 m (Humantay)',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 1190,
    privatePriceUsd: 1680,
    singleSupplementUsd: 260,
    originalPriceUsd: 1350,
    promoLabel: 'Paquete Insignia -12%',
    isFeatured: true,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.machuPicchuClassic,
    gallery: [
      PERU_PHOTOS.machuPicchuClassic,
      PERU_PHOTOS.limaPlaza,
      PERU_PHOTOS.huacachina,
      PERU_PHOTOS.vinicunca
    ],
    summary: 'Nuestro programa de 9 días más equilibrado para un primer viaje al Perú: 3 noches en Lima con incursión a Islas Ballestas y Huacachina, seguidas de 5 noches entre Cusco, Valle Sagrado y Aguas Calientes.',
    editorialDescription: 'Diseñada con el oficio de quienes recorren el Perú palmo a palmo, esta travesía de 9 días enlaza con naturalidad cada traslado desde tu llegada al Aeropuerto Internacional Jorge Chávez de Lima hasta tu vuelo de despedida. Combina la Lima virreinal y bohemia, la fauna marina de Paracas y las dunas de Huacachina con una aclimatación inteligente en el Valle Sagrado, pernocte en Aguas Calientes para disfrutar Machu Picchu sin prisas y una jornada en las cumbres andinas del Cusco.',
    highlights: [
      '8 noches de alojamiento seleccionadas (3 en Lima Miraflores, 1 en Aguas Calientes, 4 en Cusco)',
      'Todas las excursiones, boletos oficiales (incl. Vinicunca/Humantay), trenes y traslados incluidos',
      'Orden progresivo de altura: primero Valle Sagrado (2,871 m) y Machu Picchu (2,430 m), luego cumbres altas',
      'Coordinación directa por WhatsApp 24/7 desde tu aterrizaje en Lima'
    ],
    placesVisited: ['Lima Centro Histórico y Barranco', 'Islas Ballestas y Paracas', 'Viñedo de Pisco en Ica', 'Oasis de Huacachina', 'Cusco y Sacsayhuamán', 'Chinchero, Maras, Moray y Ollantaytambo', 'Santuario de Machu Picchu', 'Vinicunca o Laguna Humantay'],
    schedule: {
      departure: 'Salidas diarias en la fecha de tu llegada internacional a Lima',
      returnTime: 'Día 9: Traslado al aeropuerto en horario de tu vuelo',
      frequency: 'Salidas garantizadas desde 2 pasajeros',
      pickupInfo: 'Recepción nominativa en los aeropuertos de Lima (LIM) y Cusco (CUZ).'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Llegada a Lima y traslado a Miraflores',
        description: 'Recepción en el aeropuerto de Lima, entrega de cuaderno de viaje y traslado privado a tu hotel en Miraflores.',
        overnight: 'Lima (Miraflores)'
      },
      {
        badge: 'Día 02',
        title: 'Lima de los Reyes y Bohemio Barranco',
        description: 'Recorrido por la Plaza Mayor, Catacumbas de San Francisco, vista panorámica de Huaca Pucllana y caminata por el Puente de los Suspiros en Barranco.',
        meals: ['Desayuno'],
        overnight: 'Lima (Miraflores)'
      },
      {
        badge: 'Día 03',
        title: 'Paracas, Islas Ballestas, Bodega de Pisco y Dunas de Huacachina',
        description: 'Travesía costera hacia el sur: navegación a las Islas Ballestas, cata de pisco artesanal en Ica y buggies al atardecer en las dunas de Huacachina.',
        meals: ['Desayuno', 'Almuerzo regional en Ica'],
        overnight: 'Lima (Miraflores)'
      },
      {
        badge: 'Día 04',
        title: 'Vuelo a Cusco y Tour Arqueológico de Aclimatación',
        description: 'Traslado al aeropuerto de Lima y recepción en Cusco (3,399 m). Por la tarde, recorrido por Qorikancha, Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay.',
        meals: ['Desayuno'],
        overnight: 'Cusco (3,399 m)'
      },
      {
        badge: 'Día 05',
        title: 'Valle Sagrado (Pisac, Moray, Maras, Ollantaytambo) y Tren a Aguas Calientes',
        description: 'Exploración integral del Valle Sagrado con almuerzo buffet en Urubamba y enlace directo en tren vespertino hacia Aguas Calientes.',
        meals: ['Desayuno', 'Almuerzo Buffet en Urubamba'],
        overnight: 'Aguas Calientes (2,040 m)'
      },
      {
        badge: 'Día 06',
        title: 'Santuario Histórico de Machu Picchu y Retorno a Cusco',
        description: 'Ascenso matinal a Machu Picchu (2,430 m) para el guiado de 2.5 horas por la ciudadela inca. Retorno vespertino en tren y vehículo privado a Cusco.',
        meals: ['Desayuno'],
        overnight: 'Cusco'
      },
      {
        badge: 'Día 07',
        title: 'Día Libre en Cusco (San Blas, Mercado de San Pedro y Museos)',
        description: 'Jornada de descanso y paseo libre por las calles empedradas de San Blas, cafés de origen y talleres artesanales.',
        meals: ['Desayuno'],
        overnight: 'Cusco'
      },
      {
        badge: 'Día 08',
        title: 'Expedición a elección: Montaña de 7 Colores (5,036 m) o Laguna Humantay (4,200 m)',
        description: 'Con el cuerpo ya aclimatado, realizas la caminata andina que prefieras (nivel exigente en Vinicunca o moderado en Humantay) con desayuno y almuerzo incluidos.',
        meals: ['Desayuno en ruta', 'Almuerzo Buffet'],
        overnight: 'Cusco'
      },
      {
        badge: 'Día 09',
        title: 'Despedida de los Andes y Traslado al Aeropuerto de Cusco',
        description: 'Desayuno en el hotel y traslado privado puntual al aeropuerto de Cusco para tu vuelo de conexión.',
        meals: ['Desayuno']
      }
    ],
    included: [
      '8 noches de alojamiento con desayunos (hoteles 3★ Boutique Tierra Viva / Casa Andina o 4★ Superior)',
      'Todos los traslados aeropuerto – hotel – estaciones en Lima y Cusco',
      'Boleto Turístico General del Cusco + Qorikancha + Maras + Catacumbas de Lima + Tasas SERNANP',
      'Ingresos comunales a Montaña de 7 Colores / Valle Rojo o Laguna Humantay (Día 8)',
      'Excursión completa a Paracas, Islas Ballestas y Huacachina con tubulares',
      'Trenes ida/vuelta + Buses Consettur + Entrada a Machu Picchu + Guías acreditados',
      '3 almuerzos incluidos (Ica, Valle Sagrado y Día 8)'
    ],
    notIncluded: [
      'Vuelos domésticos Lima – Cusco – Lima (añadibles desde USD $145 con equipaje de 23 kg)',
      'Cenas no especificadas'
    ],
    pricingTiers: [
      {
        name: 'Categoría 3★ Boutique Seleccionada (Base Doble)',
        modality: 'Grupal',
        priceUsd: 1190,
        minPax: 2,
        description: 'Hoteles Tierra Viva / Casa Andina Standard con todas las entradas y tren Expedition.',
        perks: ['8 noches con desayuno', 'Todas las entradas incluidas', 'Asistencia 24/7']
      },
      {
        name: 'Categoría 4★ Superior + Tren Vistadome + Tours Privados',
        modality: 'Privado',
        priceUsd: 1680,
        minPax: 2,
        description: 'Hoteles Costa del Sol Wyndham / Sonesta / El Mapi 4★, tren panorámico y guiados privados.',
        perks: ['Hoteles 4★ Superior', 'Tren Vistadome', 'Excursiones en servicio privado']
      }
    ],
    addOns: [
      { id: 'vuelos-lim-cuz', label: 'Vuelos internos Lima – Cusco – Lima (maleta 23 kg)', priceUsd: 145 }
    ],
    recommendations: [
      'Llevar prendas en capas para combinar el clima cálido costero de Paracas e Ica con las mañanas frescas de Cusco (2°C–7°C).'
    ],
    cancellationPolicy: 'Reserva con depósito del 30% al confirmar cupos oficiales (saldo hasta 15 días antes); reprogramación terrestre libre hasta 20 días antes (excepto boletos ya nominados).',
    faqs: [
      {
        question: '¿Pueden incluir también los vuelos internos Lima – Cusco – Lima?',
        answer: 'Sí, al solicitar tu disponibilidad puedes marcar el adicional de vuelos domésticos con equipaje de bodega de 23 kg incluido.'
      }
    ]
  },
  {
    id: 'tour-12',
    slug: 'paquete-cusco-imperial-machu-picchu-5-dias',
    code: 'QUL-PKG-02',
    title: 'Cusco Cultural & Machu Picchu Imperial (5 Días / 4 Noches)',
    shortTitle: 'Cusco Cultural & Machu Picchu (5D/4N)',
    subtitle: 'La escapada andina perfecta: Cusco histórico, Valle Sagrado completo, Machu Picchu y Laguna Humantay o Vinicunca.',
    destinationSlug: 'cusco',
    visitedDestinations: ['cusco', 'valle-sagrado-machu-picchu'],
    destinationName: 'Cusco & Valle Sagrado',
    region: 'Andes Mágicos',
    primaryCategory: 'paquetes-peru',
    sections: ['paquetes-peru', 'cusco-machu-picchu'],
    durationDays: 5,
    durationLabel: '5 Días / 4 Noches',
    altitudeMax: '4,200 m (Humantay) / 5,036 m (si elige Vinicunca)',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 695,
    privatePriceUsd: 980,
    singleSupplementUsd: 135,
    isFeatured: true,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.cuscoPlaza,
    gallery: [
      PERU_PHOTOS.cuscoPlaza,
      PERU_PHOTOS.marasSalineras,
      PERU_PHOTOS.machuPicchuClassic,
      PERU_PHOTOS.humantay
    ],
    summary: 'Cinco días optimizados en la capital inca con 3 noches en Cusco, 1 noche en Aguas Calientes, todos los boletos de ingreso incluidos y traslados privados de aeropuerto.',
    editorialDescription: 'Pensado para viajeros que cuentan con 5 días en los Andes y prefieren dedicar cada hora al paisaje y la historia con trenes, traslados e ingresos resueltos de antemano. Incluye el Boleto Turístico General del Cusco, Qorikancha, Salineras de Maras, noche en Aguas Calientes, visita matutina a Machu Picchu y caminata de alta montaña en el cuarto día.',
    highlights: [
      '4 noches de alojamiento (3 en Cusco + 1 en Aguas Calientes) con desayunos',
      'Incluye Boleto Turístico del Cusco, Qorikancha, Maras, Humantay/Vinicunca y Machu Picchu',
      'Almuerzo buffet en Valle Sagrado (Día 2) + Desayuno y almuerzo de montaña (Día 4)',
      'Recepción y despacho privado en el Aeropuerto de Cusco'
    ],
    placesVisited: ['Qorikancha y Sacsayhuamán', 'Chinchero, Moray y Salineras de Maras', 'Ollantaytambo', 'Machu Picchu (2,430 m)', 'Laguna Humantay (4,200 m) o Vinicunca (5,036 m)'],
    schedule: {
      departure: 'Día 1: Recepción en vuelos de llegada a Cusco antes de las 11:30 hrs',
      returnTime: 'Día 5: Traslado al aeropuerto en horario de tu vuelo',
      frequency: 'Salidas diarias todo el año',
      pickupInfo: 'Aeropuerto Alejandro Velasco Astete (CUZ).'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Bienvenida en Cusco y Tour Monumental (Qorikancha + 4 Ruinas)',
        description: 'Recepción con mate de hoja de coca en el hotel y recorrido vespertino por el Templo del Sol, Sacsayhuamán, Q’enqo, Puka Pukara y Tambomachay.',
        altitude: '3,399 m – 3,760 m s.n.m.',
        overnight: 'Cusco'
      },
      {
        badge: 'Día 02',
        title: 'Valle Sagrado de los Incas y Tren hacia Aguas Calientes',
        description: 'Visita a Pisac/Chinchero, Moray (3,500 m), Salineras de Maras (3,250 m), almuerzo en Urubamba, fortaleza de Ollantaytambo y tren vespertino a Aguas Calientes.',
        altitude: '2,040 m – 3,762 m s.n.m.',
        meals: ['Desayuno', 'Almuerzo Buffet en Urubamba'],
        overnight: 'Aguas Calientes (2,040 m)'
      },
      {
        badge: 'Día 03',
        title: 'Amanecer en Machu Picchu y Retorno a Cusco',
        description: 'Subida en primeros buses a Machu Picchu, recorrido guiado completo y retorno por la tarde en tren y vehículo privado a Cusco.',
        altitude: '2,430 m s.n.m.',
        meals: ['Desayuno'],
        overnight: 'Cusco'
      },
      {
        badge: 'Día 04',
        title: 'Laguna Humantay (4,200 m) o Montaña de 7 Colores (5,036 m)',
        description: 'Con el cuerpo ya aclimatado, realizamos la excursión de alta montaña que prefieras (o cambio sin costo por Valle Sur: Tipón y Andahuaylillas) con desayuno en ruta y almuerzo buffet.',
        altitude: '4,200 m / 5,036 m s.n.m.',
        meals: ['Desayuno en ruta', 'Almuerzo Buffet'],
        overnight: 'Cusco'
      },
      {
        badge: 'Día 05',
        title: 'Mañana en el barrio de San Blas y Traslado al Aeropuerto',
        description: 'Mañana libre para caminar por San Blas y el Mercado de San Pedro antes del traslado puntual al aeropuerto.',
        altitude: '3,399 m s.n.m.',
        meals: ['Desayuno']
      }
    ],
    included: [
      '3 noches de hotel en Cusco (ej. Tierra Viva / Casa Andina) + 1 noche en Aguas Calientes con desayuno',
      'Todos los boletos de ingreso (BTG, Qorikancha, Maras, Humantay/Vinicunca y Machu Picchu)',
      'Trenes ida y vuelta + Buses Consettur ida y vuelta',
      '1 desayuno andino en ruta (Día 4) y 2 almuerzos buffet (Días 2 y 4)',
      'Traslados privados de aeropuerto'
    ],
    notIncluded: [
      'Vuelos Lima – Cusco – Lima'
    ],
    pricingTiers: [
      {
        name: 'Programa 3★ Boutique Confort (Base Doble)',
        modality: 'Grupal',
        priceUsd: 695,
        minPax: 2,
        description: 'Hoteles 3★ seleccionados + excursiones en grupo reducido con todas las entradas.',
        perks: ['Todas las entradas incluidas', '4 noches con desayuno', 'Tren Expedition incluido']
      },
      {
        name: 'Programa 4★ Superior en Servicio Privado',
        modality: 'Privado',
        priceUsd: 980,
        minPax: 2,
        description: 'Hoteles 4★ + Tren Vistadome + Vehículo y guía privados durante los 5 días.',
        perks: ['Servicio 100% privado', 'Tren Vistadome', 'Hoteles 4★ en San Blas o Centro Histórico']
      }
    ],
    recommendations: [
      'Tomar un vuelo a Cusco que aterrice entre las 07:30 y las 11:00 AM en el Día 1.'
    ],
    cancellationPolicy: 'Reserva con depósito del 30% y saldo hasta 15 días antes; reprogramación terrestre sin penalidad hasta 10 días antes (excepto boletos ya nominados).',
    faqs: [
      {
        question: '¿Se puede cambiar la excursión del Día 4 por un día tranquilo sin caminatas de altura?',
        answer: 'Por supuesto. Sustituimos sin costo el Día 4 por la Ruta del Valle Sur (Tipón, Pikillacta y la iglesia barroca de Andahuaylillas).'
      }
    ]
  },
  {
    id: 'tour-13',
    slug: 'gran-circuito-sur-peru-12-dias-lima-paracas-nazca-arequipa-titicaca-cusco',
    code: 'QUL-PKG-03',
    title: 'Gran Trilogía del Sur Peruano: Costa, Volcanes, Titicaca e Incas (12 Días / 11 Noches)',
    shortTitle: 'Gran Trilogía del Sur Peruano (12D/11N)',
    subtitle: 'La travesía transandina definitiva: Lima, Paracas, Huacachina, Líneas de Nazca, Arequipa, Cañón del Colca, Titicaca y Cusco.',
    destinationSlug: 'arequipa-colca',
    visitedDestinations: ['lima', 'paracas-huacachina', 'nazca', 'arequipa-colca', 'puno-titicaca', 'cusco', 'valle-sagrado-machu-picchu'],
    destinationName: 'Multirregión Perú',
    region: 'Multirregión Perú',
    primaryCategory: 'paquetes-peru',
    sections: ['paquetes-peru', 'rutas-terrestres', 'cusco-machu-picchu', 'nazca'],
    durationDays: 12,
    durationLabel: '12 Días / 11 Noches',
    altitudeMax: '4,910 m s.n.m. (Abra Patapampa)',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 1690,
    privatePriceUsd: 2450,
    singleSupplementUsd: 350,
    originalPriceUsd: 1890,
    promoLabel: 'Gran Ruta Sur -11%',
    isFeatured: true,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.arequipaCatalina,
    gallery: [
      PERU_PHOTOS.arequipaCatalina,
      PERU_PHOTOS.nazcaLines,
      PERU_PHOTOS.titicacaUros,
      PERU_PHOTOS.machuPicchuClassic
    ],
    summary: 'Un viaje épico por el corredor sur que asciende progresivamente desde el océano Pacífico hasta el altiplano y los Andes sin saltos bruscos de altitud.',
    editorialDescription: 'El Gran Circuito Sur es la forma más orgánica de recorrer el Perú: en lugar de volar de golpe de 0 a 3,400 metros, asciendes por etapas desde Lima (0 m) hacia Paracas, Nazca (520 m), Arequipa (2,335 m), el Valle del Colca (3,635 m), el Lago Titicaca (3,812 m) y finalmente el Valle Sagrado y Cusco (3,399 m), disfrutando 6 regiones en travesía continua.',
    highlights: [
      'Ascenso altitudinal progresivo: Lima → Paracas → Nazca → Arequipa → Colca → Puno → Cusco',
      'Incluye Sobrevuelo Líneas de Nazca + Navegación Titicaca (Uros y Taquile) + Ruta del Sol a Cusco',
      '11 noches de alojamiento con desayunos y 4 almuerzos regionales incluidos',
      'Todos los traslados VIP, entradas arqueológicas y trenes a Machu Picchu incluidos'
    ],
    placesVisited: ['Lima', 'Paracas e Islas Ballestas', 'Oasis de Huacachina', 'Líneas de Nazca', 'Arequipa y Santa Catalina', 'Cañón del Colca', 'Lago Titicaca (Uros y Taquile)', 'Ruta del Sol (Pukara, La Raya, Raqchi, Andahuaylillas)', 'Cusco, Valle Sagrado y Machu Picchu'],
    schedule: {
      departure: 'Salidas diarias desde Lima',
      returnTime: 'Día 12 en Aeropuerto de Cusco',
      frequency: 'Salidas diarias desde 2 viajeros',
      pickupInfo: 'Recepción desde el Día 1 en el Aeropuerto Internacional Jorge Chávez (LIM).'
    },
    itinerary: [
      {
        badge: 'Días 01–02',
        title: 'Lima Virreinal y Salida hacia Paracas y Huacachina',
        description: 'Llegada a Lima y recorrido histórico/bohemio. El Día 2 navegamos a Islas Ballestas, visitamos viñedo de Pisco en Ica y hacemos buggies en Huacachina antes de continuar hacia Nazca.',
        overnight: 'Lima (1N) / Nazca o Ica (1N)'
      },
      {
        badge: 'Días 03–04',
        title: 'Sobrevuelo Líneas de Nazca, Bus VIP a Arequipa y Monasterio de Santa Catalina',
        description: 'Sobrevuelo de 35 min sobre los geoglifos de Nazca y viaje en bus salón cama 180° (~9.5 horas diurno/nocturno) hacia Arequipa (2,335 m). Día 4: recorrido peatonal por Yanahuara, Claustros de la Compañía y el Monasterio de Santa Catalina.',
        overnight: 'Arequipa (2N)'
      },
      {
        badge: 'Días 05–06',
        title: 'Reserva de Salinas, Valle del Colca, Cruz del Cóndor y Travesía a Puno',
        description: 'Ascenso por Pampa Cañahuas y Patapampa (4,910 m) hacia Chivay/Yanque. Día 6: avistamiento de cóndores en Cruz del Cóndor y enlace directo por Lagunillas hacia Puno.',
        meals: ['Desayunos', 'Almuerzo en Chivay (Día 5)'],
        overnight: 'Colca (1N) / Puno (1N)'
      },
      {
        badge: 'Días 07–08',
        title: 'Lago Titicaca (Uros y Taquile) y Ruta del Sol hacia Cusco',
        description: 'Navegación en lancha rápida por el Titicaca con almuerzo en Taquile. El Día 8 recorremos la Ruta del Sol hacia Cusco visitando Pukara, Abra La Raya (4,335 m), Raqchi y Andahuaylillas.',
        meals: ['Desayunos', 'Almuerzo en Taquile (Día 7)', 'Almuerzo en Sicuani (Día 8)'],
        overnight: 'Puno (1N) / Cusco (1N)'
      },
      {
        badge: 'Días 09–12',
        title: 'Cusco Monumental, Valle Sagrado, Machu Picchu y Despedida',
        description: 'Cuatro días dedicados al corazón inca: Sacsayhuamán y Qorikancha (Día 9), Valle Sagrado completo con almuerzo en Urubamba y tren a Aguas Calientes (Día 10), amanecer en Machu Picchu y retorno a Cusco (Día 11), y traslado final al aeropuerto (Día 12).',
        meals: ['Desayunos', 'Almuerzo en Valle Sagrado (Día 10)'],
        overnight: 'Aguas Calientes (1N) / Cusco (2N)'
      }
    ],
    included: [
      '11 noches de hotel seleccionado en las 6 regiones (Casa Andina / Tierra Viva en 3★ o Costa del Sol / Sonesta en 4★) con desayunos',
      'Sobrevuelo oficial a las Líneas de Nazca (35 minutos)',
      'Navegación Islas Ballestas + Tubulares Huacachina + Lancha rápida Lago Titicaca',
      'Bus VIP 180° Nazca – Arequipa + Enlace Colca – Puno + Ruta del Sol Puno – Cusco',
      'Todos los ingresos en Arequipa, Colca, Puno, Cusco, Valle Sagrado y Machu Picchu'
    ],
    notIncluded: [
      'Vuelo final Cusco – Lima (añadible desde USD $85)',
      'Tasas aeroportuarias TUUA en el aeródromo de Nazca (S/ 77 / ~USD $20 pago en counter)'
    ],
    mandatoryFeesNote: 'El aeródromo de Nazca cobra una tasa aeroportuaria/turística local de S/ 77 (~USD $20) pagadera presencialmente antes del embarque.',
    pricingTiers: [
      {
        name: 'Gran Circuito Sur 3★ Boutique (Base Doble)',
        modality: 'Grupal',
        priceUsd: 1690,
        minPax: 2,
        description: '11 noches de hotel 3★, todos los tours, sobrevuelo en Nazca y Machu Picchu.',
        perks: ['Aclimatación progresiva', 'Sobrevuelo Nazca incluido', 'Lago Titicaca y Ruta del Sol incluidos']
      },
      {
        name: 'Gran Circuito Sur 4★ Superior & Privado',
        modality: 'Privado',
        priceUsd: 2450,
        minPax: 2,
        description: 'Hoteles 4★ (Casa Andina Premium / Costa del Sol), tren Vistadome y servicios privados.',
        perks: ['Hoteles 4★ en las 6 regiones', 'Tren Vistadome', 'Guías privados en Lima, Arequipa y Cusco']
      }
    ],
    addOns: [
      { id: 'vuelo-cuz-lim', label: 'Vuelo final Cusco – Lima con maleta 23 kg', priceUsd: 85 }
    ],
    recommendations: [
      'Si dispones de 15 días, podemos añadir una extensión de 3 días en la Reserva Nacional Tambopata al finalizar Cusco.'
    ],
    cancellationPolicy: 'Reserva con depósito del 30% al validar cupos; saldo hasta 15 días antes.',
    faqs: [
      {
        question: '¿Cómo se realiza el tramo entre Nazca y Arequipa?',
        answer: 'Se opera en bus salón cama 180° (Cruz del Sur u Oltursa, ~9.5 hrs). También podemos cotizar retorno por tierra a Lima para volar directo a Arequipa si prefieres evitar ese tramo.'
      }
    ]
  },
  {
    id: 'tour-14',
    slug: 'ruta-del-sol-cusco-puno-raqchi-andahuaylillas',
    code: 'QUL-RUT-01',
    title: 'Ruta del Sol Transandina: Travesía Guiada entre Cusco y el Lago Titicaca (Puno)',
    shortTitle: 'Ruta del Sol: Cusco ↔ Puno (Lago Titicaca)',
    subtitle: 'Convierte el viaje entre Cusco y Puno en una expedición cultural por Andahuaylillas, Raqchi, Abra La Raya y Pukara.',
    destinationSlug: 'puno-titicaca',
    visitedDestinations: ['puno-titicaca', 'cusco'],
    destinationName: 'Puno & Lago Titicaca',
    region: 'Andes Mágicos',
    primaryCategory: 'rutas-terrestres',
    sections: ['rutas-terrestres', 'full-day', 'cusco-machu-picchu'],
    durationDays: 1,
    durationLabel: 'Full Day en Ruta (10.5 horas)',
    altitudeMax: '4,335 m s.n.m. (Abra La Raya)',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 72,
    privatePriceUsd: 240,
    heroImage: PERU_PHOTOS.raqchi,
    gallery: [
      PERU_PHOTOS.raqchi,
      PERU_PHOTOS.ausangate,
      PERU_PHOTOS.titicacaUros,
      PERU_PHOTOS.cuscoPlaza
    ],
    summary: 'Opera diariamente en ambos sentidos (Cusco → Puno o Puno → Cusco) con guía a bordo, bebidas calientes, almuerzo buffet en Sicuani y 4 paradas arqueológicas y virreinales.',
    editorialDescription: 'El corredor altiplánico entre Cusco y el Lago Titicaca sigue el eje del antiguo Qhapaq Ñan hacia el Qollasuyu. En lugar de viajar de noche sin ver los Andes, esta ruta diurna realiza visitas guiadas en el templo barroco de Andahuaylillas (3,122 m), el santuario inca de Wiracocha en Raqchi (3,450 m), el abra de La Raya (4,335 m) frente al glaciar Chimboya y el museo lítico preinca de Pukara (3,870 m).',
    highlights: [
      'Opera todos los días tanto Cusco → Puno como Puno → Cusco',
      'Incluye todas las entradas en ruta (Andahuaylillas, Raqchi y Museo de Pukara)',
      'Almuerzo buffet regional incluido en Sicuani (3,540 m)',
      'Autobús panorámico con asientos reclinables y bodega para equipaje completo'
    ],
    placesVisited: ['San Pedro de Andahuaylillas (3,122 m)', 'Complejo de Raqchi (3,450 m)', 'Sicuani (3,540 m)', 'Paso de La Raya (4,335 m)', 'Museo Lítico de Pukara (3,870 m)'],
    schedule: {
      departure: '06:40 hrs desde Cusco (o 06:40 hrs desde Puno)',
      returnTime: '17:15 hrs en destino final',
      frequency: 'Salidas diarias en ambos sentidos',
      pickupInfo: 'Traslado incluido al terminal de partida y recepción en destino.'
    },
    itinerary: [
      {
        badge: '07:30 hrs',
        title: 'San Pedro Apóstol de Andahuaylillas',
        description: 'Visita a los artesonados mudéjares bañados en pan de oro y los murales coloniales del siglo XVII.',
        altitude: '3,122 m s.n.m.'
      },
      {
        badge: '10:30 hrs',
        title: 'Santuario Inca de Wiracocha en Raqchi',
        description: 'Recorrido por el muro monumental de adobe y piedra y las más de 150 qullqas circulares de almacenamiento imperial.',
        altitude: '3,450 m s.n.m.'
      },
      {
        badge: '12:15 hrs',
        title: 'Almuerzo Buffet en Sicuani y Paso de La Raya',
        description: 'Pausa gastronómica en Sicuani (3,540 m) seguida de parada panorámica en el límite natural entre Cusco y Puno a 4,335 m s.n.m.',
        altitude: '3,540 m → 4,335 m s.n.m.',
        meals: ['Almuerzo Buffet']
      },
      {
        badge: '15:00 hrs',
        title: 'Cultura Preinca Pukara y Arribo al Lago Titicaca',
        description: 'Visita al museo de monolitos Pukara (1,400 a.C.) y cuna de los Toritos de Pucará antes de descender hacia Puno.',
        altitude: '3,870 m s.n.m.'
      }
    ],
    included: [
      'Traslado de hotel al terminal y recepción en destino',
      'Bus turístico panorámico con guía bilingüe y servicio de bebidas a bordo',
      'Entradas a Andahuaylillas, Raqchi y Museo de Pukara incluidas',
      'Almuerzo buffet en Sicuani'
    ],
    notIncluded: [
      'Bebidas alcohólicas durante el almuerzo'
    ],
    pricingTiers: [
      {
        name: 'Bus Turístico Panorámico Todo Incluido',
        modality: 'Grupal',
        priceUsd: 72,
        minPax: 1,
        description: 'Incluye transporte, guía, almuerzo buffet y los 3 boletos de ingreso.',
        perks: ['Entradas incluidas', 'Almuerzo incluido', 'Maletero amplio para equipaje de viaje']
      },
      {
        name: 'Ruta del Sol en Vehículo Privado + Cañón de Tinajani',
        modality: 'Privado',
        priceUsd: 240,
        minPax: 2,
        description: 'SUV o Van privada con desvío exclusivo al bosque de piedras de Tinajani en Ayaviri.',
        perks: ['Horario libre', 'Desvío a Tinajani (3,960 m) incluido', 'Entradas y almuerzo incluidos']
      }
    ],
    recommendations: [
      'Indicar al cotizar el sentido de tu viaje: Cusco hacia Puno o Puno hacia Cusco.'
    ],
    cancellationPolicy: 'Reprogramación o cancelación gratuita hasta 48 horas antes.',
    faqs: [
      {
        question: '¿Puedo viajar con todas mis maletas grandes en esta ruta?',
        answer: 'Sí, está diseñada como traslado escénico entre ambas ciudades: tu equipaje viaja etiquetado en la bodega inferior.'
      }
    ]
  },
  {
    id: 'tour-15',
    slug: 'lago-titicaca-islas-uros-taquile-lancha-veloz',
    code: 'QUL-PUN-01',
    title: 'Lago Titicaca Navegable: Islas Flotantes de los Uros e Isla Textil de Taquile en Lancha Rápida',
    shortTitle: 'Lago Titicaca: Uros & Taquile (Lancha Rápida)',
    subtitle: 'Navegación por el lago navegable más alto del mundo con almuerzo frente a la Cordillera Real y arte textil UNESCO.',
    destinationSlug: 'puno-titicaca',
    visitedDestinations: ['puno-titicaca'],
    destinationName: 'Puno & Lago Titicaca',
    region: 'Andes Mágicos',
    primaryCategory: 'aventura-naturaleza',
    sections: ['full-day', 'aventura-naturaleza'],
    durationDays: 1,
    durationLabel: 'Full Day (9 horas)',
    altitudeMax: '3,950 m s.n.m. (Cumbre de Taquile)',
    difficulty: 'Moderada',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 62,
    privatePriceUsd: 165,
    heroImage: PERU_PHOTOS.titicacaUros,
    gallery: [
      PERU_PHOTOS.titicacaUros,
      PERU_PHOTOS.taquile,
      PERU_PHOTOS.raqchi,
      PERU_PHOTOS.ausangate
    ],
    summary: 'Operamos en lancha rápida (Speed Boat) para reducir a la mitad el tiempo de navegación y dedicar más horas a convivir con las familias Uros y los maestros tejedores de Taquile.',
    editorialDescription: 'Las embarcaciones lentas convencionales emplean más de 3 horas por tramo hasta Taquile. En lancha rápida con cubierta panorámica cruzamos el Lago Titicaca (3,812 m) en aproximadamente 1 hora y 15 minutos entre las islas de los Uros y Taquile. Conocemos la construcción de plataformas con raíz de totora y almorzamos trucha del lago con sopa de quinua en una terraza comunal mirando los nevados bolivianos (en servicio privado visitamos el sector alejado de Uros Titino).',
    highlights: [
      'Lancha rápida que ahorra más de 2.5 horas de travesía respecto al bote lento',
      'Visita a familias anfitrionas de los Uros (sector alejado Titino en servicio privado)',
      'Caminata escénica por Taquile (3,950 m) y demostración textil Patrimonio UNESCO',
      'Almuerzo isleño con vista de 360° al Lago Titicaca incluido'
    ],
    placesVisited: ['Bahía de Puno (3,827 m)', 'Reserva Nacional del Titicaca', 'Islas Flotantes de los Uros (3,812 m)', 'Isla de Taquile (3,950 m)'],
    schedule: {
      departure: '07:00 hrs desde tu hotel en Puno',
      returnTime: '15:45 hrs en Puno',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo en hoteles del centro de Puno y ribera del lago (GHL, Casa Andina, Sonesta).'
    },
    itinerary: [
      {
        badge: '07:15 hrs',
        title: 'Zarpe desde el Puerto de Puno hacia los Uros',
        description: 'Navegación entre canales de totora y visita a dos islas flotantes para conocer su sistema de anclaje con bloques de khili.',
        altitude: '3,812 m s.n.m.'
      },
      {
        badge: '09:15 hrs',
        title: 'Travesía en Lancha Rápida hacia la Isla de Taquile',
        description: 'Desembarque y caminata pausada por senderos preincas entre andenes y flores de cantuta.',
        altitude: '3,950 m s.n.m.'
      },
      {
        badge: '12:00 hrs',
        title: 'Demostración Textil UNESCO y Almuerzo Frente al Lago',
        description: 'Interpretación de los chullos y fajas calendario tejidos por los hombres de la isla, seguida de almuerzo tradicional.',
        altitude: '3,900 m s.n.m.',
        meals: ['Almuerzo Tradicional en Taquile']
      },
      {
        badge: '13:45 hrs',
        title: 'Descenso por los 535 peldaños de piedra y retorno a Puno',
        description: 'Embarque en el muelle principal y regreso al puerto de Puno a las 15:45 hrs.',
        altitude: '3,812 m s.n.m.'
      }
    ],
    included: [
      'Traslados Hotel – Puerto de Puno – Hotel',
      'Navegación en Lancha Rápida (Speed Boat)',
      'Entradas comunitarias a Uros y Taquile',
      'Almuerzo tradicional en la Isla de Taquile',
      'Guía bilingüe local'
    ],
    notIncluded: [
      'Paseo opcional en balsa tradicional de totora en Uros (S/ 15 / ~USD $4 pago directo a isleños)'
    ],
    pricingTiers: [
      {
        name: 'Lancha Rápida Grupal',
        modality: 'Grupal',
        priceUsd: 62,
        minPax: 1,
        description: 'Navegación rápida con entradas y almuerzo en Taquile incluidos.',
        perks: ['Speed Boat', 'Almuerzo incluido', 'Entradas incluidas']
      },
      {
        name: 'Yate Privado Uros Titino & Taquile',
        modality: 'Privado',
        priceUsd: 165,
        minPax: 2,
        description: 'Embarcación privada hacia el sector tranquilo de Uros Titino y Taquile sur.',
        perks: ['Embarcación exclusiva', 'Sector Uros Titino', 'Almuerzo privado']
      }
    ],
    recommendations: [
      'La radiación solar en el espejo de agua a 3,812 m es intensa: llevar sombrero, gafas de sol y protector.'
    ],
    cancellationPolicy: 'Cancelación sin penalidad hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Termino a tiempo si esa tarde tomo un vuelo desde Juliaca o bus a Cusco?',
        answer: 'Sí, al navegar en lancha rápida estás de retorno en Puno a las 15:45 hrs, con margen amplio para traslados al aeropuerto de Juliaca (50 min) o salidas nocturnas.'
      }
    ]
  }
];
