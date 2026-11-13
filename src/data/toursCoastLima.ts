import type { TourProduct } from '../types/tourism';
import { PERU_PHOTOS } from './mediaAssets';

export const TOURS_COAST_LIMA_AND_SPECIALS: TourProduct[] = [
  {
    id: 'tour-16',
    slug: 'lima-ciudad-de-los-reyes-catacumbas-casa-aliaga',
    code: 'QUL-LIM-01',
    title: 'Lima de los Reyes: Centro Histórico UNESCO, Casa Aliaga y Catacumbas de San Francisco',
    shortTitle: 'Lima Virreinal: Casa Aliaga & Catacumbas',
    subtitle: 'Arquitectura virreinal, balcones tallados y la casona habitada más antigua del continente americano.',
    destinationSlug: 'lima',
    visitedDestinations: ['lima'],
    destinationName: 'Lima',
    region: 'Lima Gastronómica y Virreinal',
    primaryCategory: 'lima-urbana',
    sections: ['lima-urbana', 'full-day'],
    durationDays: 1,
    durationLabel: 'Medio Día (4.5 horas)',
    altitudeMax: '161 m s.n.m. (Centro Histórico)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés', 'Francés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 48,
    privatePriceUsd: 95,
    heroImage: PERU_PHOTOS.limaPlaza,
    gallery: [
      PERU_PHOTOS.limaPlaza,
      PERU_PHOTOS.mirafloresCosta,
      PERU_PHOTOS.barrancoLima,
      PERU_PHOTOS.pachacamac
    ],
    summary: 'Recorrido peatonal y en vehículo por la Lima prehispánica (Huaca Pucllana exterior), la elegancia republicana de la Plaza San Martín, los salones de Casa Aliaga y las catacumbas de San Francisco.',
    editorialDescription: 'Fundada en 1535 como Ciudad de los Reyes, el Centro Histórico de Lima resguarda tesoros que suelen pasar inadvertidos sin la llave adecuada. Este itinerario incluye el acceso gestionado a la Casa de Aliaga —otorgada por Francisco Pizarro y habitada continuamente por la misma familia durante diecisiete generaciones—, la vista exterior del Palacio Torre Tagle y la biblioteca coral y criptas subterráneas del Convento de San Francisco.',
    highlights: [
      'Ingreso incluido a Casa Aliaga (siglo XVI) y Museo/Catacumbas de San Francisco',
      'Caminata histórica por Plaza San Martín, Jirón de la Unión, Plaza Mayor y Torre Tagle',
      'Parada panorámica en el Parque del Olivar y la pirámide de Huaca Pucllana',
      'Salidas en turno mañana (09:00 hrs) y turno tarde (14:00 hrs)'
    ],
    placesVisited: ['Huaca Pucllana (exterior)', 'Parque del Olivar de San Isidro', 'Plaza San Martín y Jirón de la Unión', 'Plaza Mayor y Torre Tagle (exterior)', 'Casa Aliaga', 'Convento y Catacumbas de San Francisco'],
    schedule: {
      departure: '09:00 hrs o 14:00 hrs desde Miraflores / San Isidro / Barranco',
      returnTime: '13:30 hrs (Mañana) / 18:30 hrs (Tarde)',
      frequency: 'Salidas diarias en dos turnos',
      pickupInfo: 'Recojo directo desde hoteles en Miraflores, San Isidro y Barranco.'
    },
    itinerary: [
      {
        badge: 'Hora 01',
        title: 'Lima Prehispánica en Miraflores y Bosques de San Isidro',
        description: 'Vista exterior de la pirámide de adobes de Huaca Pucllana (cultura Lima, 500 d.C.) y cruce por los olivos centenarios de San Isidro.'
      },
      {
        badge: 'Hora 02',
        title: 'Plaza San Martín, Jirón de la Unión y Palacio Torre Tagle',
        description: 'Paseo arquitectónico por las fachadas republicanas y balcones barrocos de madera tallada hasta la Plaza Mayor.'
      },
      {
        badge: 'Hora 03',
        title: 'Salones Virreinales de Casa Aliaga',
        description: 'Visita interior a los patios sevillanos, capilla familiar y salones históricos de la casona de 1535.'
      },
      {
        badge: 'Hora 04',
        title: 'Biblioteca Monástica y Catacumbas de San Francisco',
        description: 'Recorrido por el claustro de azulejos sevillanos y descenso a las bóvedas subterráneas de ladrillo y calicanto antes de regresar a tu hotel.'
      }
    ],
    included: [
      'Transporte climatizado de recojo y retorno',
      'Entradas a Casa Aliaga y Museo/Catacumbas de San Francisco',
      'Guía oficial historiador bilingüe'
    ],
    notIncluded: [
      'Almuerzo',
      'Ingreso interior a la Catedral de Lima (incluido en modalidad Privada)'
    ],
    pricingTiers: [
      {
        name: 'Turno Grupal Reducido',
        modality: 'Grupal',
        priceUsd: 48,
        minPax: 1,
        description: 'Entradas incluidas y grupo máximo de 12 personas.',
        perks: ['Casa Aliaga incluida', 'Catacumbas incluidas', 'Recojo en hotel']
      },
      {
        name: 'Recorrido Privado + Catedral de Lima',
        modality: 'Privado',
        priceUsd: 95,
        minPax: 2,
        description: 'Suma el ingreso a la Basílica Catedral de Lima y degustación de Pisco Sour clásico.',
        perks: ['Catedral de Lima incluida', 'Pisco Sour clásico incluido', 'Vehículo y guía exclusivos']
      }
    ],
    recommendations: [
      'Vestimenta cómoda; para ingresar a los recintos religiosos se sugiere cubrir hombros.'
    ],
    cancellationPolicy: 'Cancelación gratuita hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Las Catacumbas son aptas para personas con claustrofobia?',
        answer: 'Las galerías tienen ventilación e iluminación indirecta, pero quien prefiera no descender puede esperar visitando los claustros principales y la biblioteca antigua.'
      }
    ]
  },
  {
    id: 'tour-17',
    slug: 'barranco-bohemio-miraflores-acantilados-arte-contemporaneo',
    code: 'QUL-LIM-02',
    title: 'Barranco Bohemio, Galerías de Arte, Café de Origen y Acantilados de Miraflores',
    shortTitle: 'Barranco Bohemio & Acantilados de Miraflores',
    subtitle: 'El rostro creativo y costero de Lima: casonas republicanas, muralismo urbano, Puente de los Suspiros y el Pacífico.',
    destinationSlug: 'lima',
    visitedDestinations: ['lima'],
    destinationName: 'Lima',
    region: 'Lima Gastronómica y Virreinal',
    primaryCategory: 'lima-urbana',
    sections: ['lima-urbana', 'full-day'],
    durationDays: 1,
    durationLabel: 'Medio Día (4 horas)',
    altitudeMax: '79 m s.n.m. (Miraflores)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 45,
    privatePriceUsd: 88,
    heroImage: PERU_PHOTOS.barrancoLima,
    gallery: [
      PERU_PHOTOS.barrancoLima,
      PERU_PHOTOS.mirafloresCosta,
      PERU_PHOTOS.limaPlaza,
      PERU_PHOTOS.cevichePeru
    ],
    summary: 'Paseo pausado entre los malecones sobre el océano Pacífico en Miraflores y el barrio artístico de Barranco, incluyendo cata de café peruano de especialidad y visita a galerías independientes.',
    editorialDescription: 'Antiguo balneario de poetas y músicos del siglo XIX, Barranco es hoy el epicentro del arte contemporáneo y el diseño en Lima. Caminamos desde la Plaza Municipal y el Puente de los Suspiros hasta los acantilados de Bajada de Baños, recorremos galerías en casonas restauradas, probamos cafés de altura de Villa Rica o Cajamarca y cerramos en los jardines costeros de Miraflores.',
    highlights: [
      'Cata guiada de cafés de especialidad peruanos en tostador local de Barranco',
      'Recorrido peatonal por Bajada de Baños, La Ermita y el Puente de los Suspiros',
      'Visita a galerías de arte y tiendas de diseño peruano en casonas republicanas',
      'Caminata panorámica por el Malecón Cisneros y el Parque del Amor'
    ],
    placesVisited: ['Malecón Cisneros y Parque del Amor (Miraflores)', 'Plaza Municipal de Barranco', 'Puente de los Suspiros', 'Bajada de Baños', 'Galería Dédalo / Estudios de Arte'],
    schedule: {
      departure: '09:30 hrs o 15:00 hrs (Turno Atardecer)',
      returnTime: '13:30 hrs / 19:00 hrs',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo en hoteles de Miraflores, Barranco y San Isidro.'
    },
    itinerary: [
      {
        badge: 'Paso 01',
        title: 'Acantilados de la Costa Verde en Miraflores',
        description: 'Vistas de la bahía de Lima desde el Faro de la Marina y la escultura de Víctor Delfín en el Parque del Amor.'
      },
      {
        badge: 'Paso 02',
        title: 'Casonas Republicanas, Murales y Puente de los Suspiros en Barranco',
        description: 'Caminata cultural por las calles Cajamarca, Domeyer y la Bajada de Baños siguiendo la historia musical de Chabuca Granda.'
      },
      {
        badge: 'Paso 03',
        title: 'Degustación de Café de Origen y Galerías de Autor',
        description: 'Pausa sensorial con métodos filtrados de granos peruanos de altura y recorrido por espacios de arte contemporáneo.'
      }
    ],
    included: [
      'Transporte entre distritos y caminatas guiadas',
      'Degustación de café de especialidad + bocado artesanal en Barranco',
      'Guía especialista en cultura urbana y arte contemporáneo'
    ],
    notIncluded: [
      'Ingreso opcional al Museo Pedro de Osma o MAC (+USD $12; incluido en Privado)'
    ],
    pricingTiers: [
      {
        name: 'Experiencia Grupal Barranco & Miraflores',
        modality: 'Grupal',
        priceUsd: 45,
        minPax: 1,
        description: 'Incluye degustación de café y guiado cultural.',
        perks: ['Degustación incluida', 'Grupo reducido máx. 10 pax']
      },
      {
        name: 'Barranco Privado + Museo Pedro de Osma',
        modality: 'Privado',
        priceUsd: 88,
        minPax: 2,
        description: 'Añade ingreso privado al palacete del Museo Pedro de Osma y chilcano artesanal al atardecer.',
        perks: ['Museo Pedro de Osma incluido', 'Cóctel frente al mar', 'Guía privado']
      }
    ],
    recommendations: [
      'El turno de las 15:00 hrs es óptimo entre diciembre y abril para presenciar la puesta de sol sobre el Pacífico.'
    ],
    cancellationPolicy: 'Cancelación sin cargo hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Puedo quedarme en Barranco al terminar el tour para cenar?',
        answer: 'Sí, muchos viajeros eligen quedarse en Barranco al concluir el turno tarde, a pocos pasos de destacados restaurantes del distrito.'
      }
    ]
  },
  {
    id: 'tour-18',
    slug: 'experiencia-gastronomica-lima-mercado-ceviche-pisco-huaca',
    code: 'QUL-GAS-01',
    title: 'Lima Capital Gastronómica: Mercado de Productores, Taller de Ceviche, Pisco y Almuerzo Criollo',
    shortTitle: 'Lima Gastronómica: Mercado, Ceviche & Pisco',
    subtitle: 'Inmersión culinaria de 5 horas desde la biodiversidad de los mercados limeños hasta la barra cevichera.',
    destinationSlug: 'lima',
    visitedDestinations: ['lima'],
    destinationName: 'Lima',
    region: 'Lima Gastronómica y Virreinal',
    primaryCategory: 'gastronomia',
    sections: ['gastronomia', 'lima-urbana', 'full-day'],
    durationDays: 1,
    durationLabel: '5 horas (Mañana y Almuerzo)',
    altitudeMax: '115 m s.n.m. (Surquillo / Miraflores)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 110,
    privatePriceUsd: 175,
    isFeatured: true,
    heroImage: PERU_PHOTOS.cevichePeru,
    gallery: [
      PERU_PHOTOS.cevichePeru,
      PERU_PHOTOS.mirafloresCosta,
      PERU_PHOTOS.barrancoLima,
      PERU_PHOTOS.limaPlaza
    ],
    summary: 'Más de 14 degustaciones entre frutas amazónicas, ajíes nativos, pesca fresca del Pacífico, clase práctica individual de Ceviche y Pisco Sour, y almuerzo completo.',
    editorialDescription: 'Lima concentra en sus mesas el cruce entre el mar frío de Humboldt, las despensas andinas y amazónicas, y la cocina criolla, cantonesa y nikkei. Junto a un chef anfitrión visitamos los puestos seleccionados del Mercado N.º 1 de Surquillo (105–118 m) para probar frutas exóticas y quesos regionales, realizamos una cata de cacao fino peruano y pasamos a una cocina abierta para preparar paso a paso tu propio Ceviche y Pisco Sour.',
    highlights: [
      'Recorrido guiado por el Mercado de Surquillo con cata de 8 frutas nativas, aceitunas y quesos',
      'Clase participativa individual: prepara Ceviche de pesca del día y Pisco Sour con mosto verde',
      'Almuerzo criollo de tres tiempos (Causa limeña, Lomo Saltado al wok o Arroz con Mariscos)',
      'Recetario impreso y digital de cocina peruana'
    ],
    placesVisited: ['Mercado N.º 1 de Surquillo', 'Tostaduría de Cacao y Café de Origen', 'Estudio Culinario en Miraflores / Barranco'],
    schedule: {
      departure: '09:30 hrs desde tu hotel en Lima',
      returnTime: '14:30 hrs en tu hotel',
      frequency: 'Martes a Domingo (Lunes en mercado alternativo de San Isidro)',
      pickupInfo: 'Recojo en hoteles de Miraflores, San Isidro y Barranco.'
    },
    itinerary: [
      {
        badge: '09:45 hrs',
        title: 'Exploración de Insumos en el Mercado de Surquillo',
        description: 'Identificación de papas nativas, maíces peruanos, ají amarillo, limo y rocoto, chirimoya, lúcuma y selección de pesca fresca del día.'
      },
      {
        badge: '11:15 hrs',
        title: 'Cata de Cacao Amazónico de Origen (Chuncho & Piura Blanco)',
        description: 'Degustación de chocolates peruanos bean-to-bar del 70% al 85% de pureza.'
      },
      {
        badge: '12:00 hrs',
        title: 'Taller de Ceviche, Leche de Tigre, Pisco Sour y Almuerzo Criollo',
        description: 'Práctica directa junto al chef para dominar el corte de pescado, el punto de limón sutil y la preparación de tu almuerzo de tres tiempos.',
        meals: ['Almuerzo Gastronómico de 3 Tiempos + Maridaje de Pisco']
      }
    ],
    included: [
      'Transporte privado durante toda la ruta gastronómica',
      'Todas las degustaciones en el mercado + Cata de cacao',
      'Clase participativa de Ceviche y Pisco Sour con ingredientes incluidos',
      'Almuerzo completo criollo y bebidas'
    ],
    notIncluded: [
      'Compras personales de insumos o botellas de pisco'
    ],
    pricingTiers: [
      {
        name: 'Experiencia Gastronómica Grupal (Máx. 8 Pax)',
        modality: 'Grupal',
        priceUsd: 110,
        minPax: 1,
        description: 'Grupo íntimo con todas las degustaciones, taller y almuerzo incluidos.',
        perks: ['Más de 14 degustaciones', 'Taller práctico individual', 'Almuerzo completo']
      },
      {
        name: 'Taller Culinario Privado con Sommelier de Pisco',
        modality: 'Privado',
        priceUsd: 175,
        minPax: 2,
        description: 'Chef y vehículo en exclusivo, añadiendo cata vertical de 4 cepas de Pisco (Quebranta, Italia, Torontel y Acholado).',
        perks: ['Cata de 4 cepas de Pisco', 'Chef exclusivo para tu grupo', 'Adaptable a dietas vegetarianas o celíacas']
      }
    ],
    recommendations: [
      'Desayunar ligero en el hotel para disfrutar plenamente de todas las estaciones gastronómicas.'
    ],
    cancellationPolicy: 'Cancelación sin penalidad hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Qué pasa si alguno de los viajeros no consume pescado crudo o es vegetariano?',
        answer: 'Adaptamos su estación con un Ceviche de hongos portobello, palmitos amazónicos y palta fuerte o un Tiradito de alcachofas con leche de tigre de ají amarillo.'
      }
    ]
  },
  {
    id: 'tour-19',
    slug: 'santuario-pachacamac-valle-lurin-caballos-de-paso',
    code: 'QUL-LIM-03',
    title: 'Oráculo de Pachacamac & Valle de Lurín (Opcional Caballo Peruano de Paso)',
    shortTitle: 'Santuario de Pachacamac & Valle de Lurín',
    subtitle: 'El mayor centro ceremonial prehispánico de la costa central frente al océano, con opción de almuerzo y exhibición ecuestre.',
    destinationSlug: 'lima',
    visitedDestinations: ['lima'],
    destinationName: 'Lima',
    region: 'Lima Gastronómica y Virreinal',
    primaryCategory: 'lima-urbana',
    sections: ['lima-urbana', 'full-day', 'experiencias-privadas'],
    durationDays: 1,
    durationLabel: '4 hrs (Santuario) / 6 hrs (con Hacienda)',
    altitudeMax: '75 m s.n.m.',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 85,
    privatePriceUsd: 145,
    heroImage: PERU_PHOTOS.pachacamac,
    gallery: [
      PERU_PHOTOS.pachacamac,
      PERU_PHOTOS.mirafloresCosta,
      PERU_PHOTOS.limaPlaza,
      PERU_PHOTOS.barrancoLima
    ],
    summary: 'Explora los templos piramidales de adobe frente al mar en el Santuario Arqueológico de Pachacamac y su Museo de Sitio, con extensión opcional a hacienda en el valle de Lurín.',
    editorialDescription: 'Durante más de mil años, peregrinos de costa y sierra acudieron al oráculo costero de Pachacamac, un complejo de 465 hectáreas ocupado sucesivamente por las culturas Lima, Wari, Ychma e Inca. Visitamos su Museo de Sitio (con el célebre ídolo de madera tallada), el Acllawasi y el Templo del Sol mirando las islas de Lurín; quienes eligen la modalidad Privada o el adicional continúan hacia una hacienda del valle para almorzar junto a una exhibición de Caballos Peruanos de Paso.',
    highlights: [
      'Ingreso incluido al Museo de Sitio de Pachacamac y recorrido por las pirámides con rampa',
      'Vista del océano Pacífico desde el Templo del Sol Inca',
      'Extensión en hacienda de Lurín con almuerzo campestre y Caballos Peruanos de Paso (incluida en Privado)',
      'Ruta escénica frente al humedal costero Pantanos de Villa'
    ],
    placesVisited: ['Pantanos de Villa (ruta escénica)', 'Museo de Sitio de Pachacamac', 'Acllawasi', 'Templo Pintado y Templo del Sol', 'Valle de Lurín'],
    schedule: {
      departure: '09:00 hrs desde Lima (Martes a Domingo)',
      returnTime: '13:00 hrs (base) / 15:00 hrs (con Hacienda)',
      frequency: 'Martes a Domingo (lunes cerrado por normativa ministerial)',
      pickupInfo: 'Recojo en hoteles de Miraflores, Barranco y San Isidro.'
    },
    itinerary: [
      {
        badge: '09:45 hrs',
        title: 'Museo de Sitio y el Ídolo de Pachacamac',
        description: 'Lectura cronológica de las cuatro culturas que edificaron este santuario costero entre el 200 d.C. y 1533.'
      },
      {
        badge: '10:45 hrs',
        title: 'Pirámides con Rampa, Acllawasi y Templo del Sol',
        description: 'Ascenso al sector inca frente al mar y paseo por la calle ceremonial de los peregrinos.'
      },
      {
        badge: '12:30 hrs',
        title: 'Retorno a Miraflores (o Extensión Hacienda de Lurín)',
        description: 'Quienes eligen servicio Privado o extensión opcional disfrutan de almuerzo criollo en hacienda de Lurín y presentación de Caballos Peruanos de Paso antes de retornar a las 15:00 hrs.',
        meals: ['Almuerzo Campestre + Exhibición Ecuestre (en Privado o adicional)']
      }
    ],
    included: [
      'Transporte turístico ida y vuelta por la costa sur de Lima',
      'Boleto de ingreso al Santuario y Museo de Sitio de Pachacamac',
      'Guía oficial especialista en arqueología costera'
    ],
    notIncluded: [
      'Almuerzo y exhibición de Caballos de Paso en hacienda de Lurín (+USD $55 en grupal; ya incluido en Privado)'
    ],
    pricingTiers: [
      {
        name: 'Santuario de Pachacamac Arqueológico',
        modality: 'Grupal',
        priceUsd: 85,
        minPax: 2,
        description: 'Transporte, guía arqueológico y entradas al Santuario y Museo (4 hrs).',
        perks: ['Museo de Sitio incluido', 'Recorrido completo por el complejo']
      },
      {
        name: 'Pachacamac Privado + Hacienda Caballos de Paso & Almuerzo',
        modality: 'Privado',
        priceUsd: 145,
        minPax: 2,
        description: 'Incluye el almuerzo campestre y presentación privada de Caballos Peruanos de Paso en Lurín (6 hrs).',
        perks: ['Almuerzo en hacienda incluido', 'Exhibición ecuestre', 'Vehículo exclusivo']
      }
    ],
    addOns: [
      { id: 'hacienda-lurin', label: 'Almuerzo criollo + Caballos Peruanos de Paso en Lurín', priceUsd: 55, note: 'Ya incluido en tarifa Privada', includedInPrivate: true }
    ],
    recommendations: [
      'Usar sombrero y bloqueador solar, ya que el santuario se ubica en una planicie costera abierta.'
    ],
    cancellationPolicy: 'Cancelación sin cargo hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Abre los días lunes el Santuario de Pachacamac?',
        answer: 'Por disposición del Ministerio de Cultura, el complejo y museo de sitio cierran los lunes; operan de martes a domingo.'
      }
    ]
  },
  {
    id: 'tour-20',
    slug: 'lima-nocturna-circuito-magico-agua-cena-huaca-pucllana',
    code: 'QUL-LIM-04',
    title: 'Lima Iluminada: Circuito Mágico del Agua y Centro Monumental (Opcional Cena en Huaca Pucllana)',
    shortTitle: 'Lima Nocturna: Circuito del Agua & Plazas',
    subtitle: 'Velada arquitectónica por el Parque de la Reserva y el Centro Histórico iluminado, con cena opcional frente a una pirámide de adobe.',
    destinationSlug: 'lima',
    visitedDestinations: ['lima'],
    destinationName: 'Lima',
    region: 'Lima Gastronómica y Virreinal',
    primaryCategory: 'lima-urbana',
    sections: ['lima-urbana', 'full-day', 'gastronomia', 'experiencias-privadas'],
    durationDays: 1,
    durationLabel: 'Noche (4.5 horas)',
    altitudeMax: '161 m s.n.m. (Plaza Mayor de Lima)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 68,
    privatePriceUsd: 138,
    heroImage: PERU_PHOTOS.circuitoAguaLima,
    gallery: [
      PERU_PHOTOS.circuitoAguaLima,
      PERU_PHOTOS.limaPlaza,
      PERU_PHOTOS.mirafloresCosta,
      PERU_PHOTOS.cevichePeru
    ],
    summary: 'Paseo nocturno por las fuentes iluminadas del Parque de la Reserva, las plazas neoclásicas y virreinales del Centro Histórico y cena opcional en la terraza de la Huaca Pucllana.',
    editorialDescription: 'Al caer la tarde, los palacios de la Plaza San Martín y la Plaza Mayor cobran una nueva presencia luminosa. Recorremos las 13 fuentes del histórico Parque de la Reserva (134 m) y paseamos en vehículo y a pie por el Centro Histórico iluminado; en la modalidad Privada Gourmet cerramos la noche con una mesa reservada frente a la pirámide prehispánica iluminada de Huaca Pucllana en Miraflores.',
    highlights: [
      'Espectáculo nocturno en las fuentes del Parque de la Reserva (Circuito Mágico del Agua)',
      'Recorrido iluminado por la Plaza San Martín, Club Nacional y Plaza Mayor de Lima',
      'Opción Privada Gourmet con cena de 3 tiempos frente a la pirámide de Huaca Pucllana',
      'Traslado puerta a puerta desde tu hotel en Lima'
    ],
    placesVisited: ['Parque de la Reserva (134 m)', 'Plaza San Martín iluminada', 'Plaza Mayor nocturna (161 m)', 'Huaca Pucllana en Miraflores (cena opcional)'],
    schedule: {
      departure: '17:30 hrs desde tu hotel',
      returnTime: '21:30 hrs (Grupal) / 22:15 hrs (Privado Gourmet)',
      frequency: 'Miércoles a Domingo',
      pickupInfo: 'Recojo y retorno en tu hotel en Miraflores, San Isidro o Barranco.'
    },
    itinerary: [
      {
        badge: '18:15 hrs',
        title: 'Parque de la Reserva y Fuente de la Fantasía',
        description: 'Paseo por los jardines neoclásicos de 1929 y espectáculo audiovisual de agua y luz sobre la fuente principal.'
      },
      {
        badge: '19:45 hrs',
        title: 'Plazas Virreinales y Republicanas Iluminadas',
        description: 'Visita nocturna a la Plaza San Martín y la Plaza Mayor iluminadas en el corazón de la Lima antigua.'
      },
      {
        badge: '20:30 hrs',
        title: 'Cierre en Miraflores o Cena frente a Huaca Pucllana',
        description: 'Retorno directo al hotel en la modalidad grupal o cena de 3 tiempos con vista directa a la pirámide iluminada de Huaca Pucllana en la edición Privada Gourmet.',
        meals: ['Cena de 3 tiempos en Huaca Pucllana (en Privado Gourmet)']
      }
    ],
    included: [
      'Transporte turístico nocturno ida y vuelta',
      'Boleto de ingreso al Circuito Mágico del Agua',
      'Guía anfitrión bilingüe'
    ],
    notIncluded: [
      'Cena en Huaca Pucllana en tarifa grupal (+USD $65 opcional; ya incluida en Privada Gourmet)'
    ],
    pricingTiers: [
      {
        name: 'Lima Iluminada & Circuito del Agua',
        modality: 'Grupal',
        priceUsd: 68,
        minPax: 2,
        description: 'Incluye transporte, guía y entradas al Parque de la Reserva y Centro Iluminado.',
        perks: ['Entradas incluidas', 'Recojo y retorno en hotel']
      },
      {
        name: 'Velada Privada + Cena en Terraza de Huaca Pucllana',
        modality: 'Privado',
        priceUsd: 138,
        minPax: 2,
        description: 'Incluye el recorrido privado y cena de 3 tiempos frente a la pirámide iluminada.',
        perks: ['Cena en Huaca Pucllana incluida', 'Mesa en terraza frente a las ruinas', 'Vehículo exclusivo']
      }
    ],
    addOns: [
      { id: 'cena-huaca', label: 'Reserva y Cena de 3 tiempos en Huaca Pucllana', priceUsd: 65, note: 'Ya incluido en Privado Gourmet', includedInPrivate: true }
    ],
    recommendations: [
      'Ideal para tu primera o última noche en Lima. Llevar abrigo ligero para la brisa costera.'
    ],
    cancellationPolicy: 'Cancelación gratuita hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Funciona todos los días el espectáculo de fuentes?',
        answer: 'Opera de miércoles a domingo y feriados (cerrado lunes y martes por mantenimiento).'
      }
    ]
  },
  {
    id: 'tour-21',
    slug: 'paracas-islas-ballestas-reserva-oasis-huacachina-full-day',
    code: 'QUL-SUR-01',
    title: 'Paracas, Islas Ballestas, Viñedo de Pisco & Oasis de Huacachina (Full Day desde Lima)',
    shortTitle: 'Paracas, Ballestas & Huacachina 1 Día',
    subtitle: 'La escapada costera del sur: fauna marina en el Pacífico, cata de pisco en Ica y buggies por las dunas al atardecer.',
    destinationSlug: 'paracas-huacachina',
    visitedDestinations: ['paracas-huacachina', 'lima'],
    destinationName: 'Paracas & Huacachina',
    region: 'Costa y Desierto Sur',
    primaryCategory: 'paracas-huacachina',
    sections: ['paracas-huacachina', 'full-day', 'rutas-terrestres'],
    durationDays: 1,
    durationLabel: 'Full Day (16.5 horas)',
    altitudeMax: '450 m s.n.m. (Dunas de Huacachina)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 115,
    privatePriceUsd: 235,
    originalPriceUsd: 135,
    promoLabel: 'Ruta Insignia Costa -15%',
    isFeatured: true,
    heroImage: PERU_PHOTOS.huacachina,
    gallery: [
      PERU_PHOTOS.huacachina,
      PERU_PHOTOS.islasBallestas,
      PERU_PHOTOS.paracasReserva,
      PERU_PHOTOS.playaRojaParacas
    ],
    summary: 'Saliendo temprano desde Lima: navega frente al Candelabro y las colonias de pingüinos de Humboldt en Islas Ballestas, cata pisco en bodega de Ica y recorre en buggy las dunas de Huacachina.',
    editorialDescription: 'La costa sur peruana concentra a tres horas y media de Lima el oasis natural de Huacachina y la riqueza marina de Paracas. Partimos en unidad ejecutiva hacia el muelle El Chaco para navegar por las Islas Ballestas; continuamos hacia el valle de Ica para conocer la destilación en alambiques tradicionales y culminamos en las crestas arenosas de Huacachina al caer la tarde (en servicio privado sumamos también el circuito de Playa Roja en la Reserva Nacional de Paracas).',
    highlights: [
      'Navegación en deslizador a Islas Ballestas con tasas de muelle y SERNANP incluidas',
      'Visita y cata de piscos y vinos artesanales en viñedo de Ica',
      'Travesía en carros areneros (buggies 4x4) y sandboard en Huacachina al atardecer',
      'Recojo y retorno en la puerta de tu hotel en Lima (o descenso con equipaje en Paracas/Ica)'
    ],
    placesVisited: ['Bahía de Paracas e Islas Ballestas (0 m)', 'Geoglifo El Candelabro', 'Bodega vitivinícola en Ica (406 m)', 'Laguna y Dunas de Huacachina'],
    schedule: {
      departure: '04:45 hrs desde tu hotel en Lima',
      returnTime: '21:30 hrs en tu hotel en Lima',
      frequency: 'Salidas diarias todo el año',
      pickupInfo: 'Recojo en hoteles de Miraflores, San Isidro y Barranco.'
    },
    itinerary: [
      {
        badge: '08:00 hrs',
        title: 'Zarpe desde el Muelle El Chaco hacia las Islas Ballestas',
        description: 'Navegación de 2 horas observando El Candelabro, lobos marinos, pingüinos de Humboldt y aves guaneras.'
      },
      {
        badge: '10:30 hrs',
        title: 'Ruta hacia el Valle Vitivinícola de Ica (Parada Playa Roja en Privado)',
        description: 'Traslado hacia Ica; quienes eligen servicio privado realizan antes el recorrido panorámico por Playa Roja y acantilados de la Reserva Nacional de Paracas.'
      },
      {
        badge: '13:00 hrs',
        title: 'Viñedo Artesanal de Pisco y Almuerzo Regional en Ica',
        description: 'Recorrido por falcas y botijas, cata guiada de piscos puros y acholados, y pausa de almuerzo criollo iqueño.',
        meals: ['Cata de Pisco incluida (Almuerzo incluido en Privado)']
      },
      {
        badge: '15:45 hrs',
        title: 'Oasis de Huacachina, Buggies Areneros y Puesta de Sol',
        description: 'Paseo por la laguna y ascenso en buggies 4x4 por las dunas para practicar sandboard viendo el atardecer antes de regresar a Lima.'
      }
    ],
    included: [
      'Transporte turístico ejecutivo Lima – Paracas – Ica – Huacachina – Lima',
      'Boleto de deslizador a Islas Ballestas + Tasas de muelle y SERNANP incluidas',
      'Cata guiada de Pisco en bodega de Ica',
      'Paseo en buggies areneros + tablas de sandboard + tasa turística de Huacachina',
      'Guía oficial durante toda la jornada'
    ],
    notIncluded: [
      'Almuerzo en el viñedo de Ica en tarifa grupal (platos S/ 38–55; incluido en tarifa Privada)'
    ],
    pricingTiers: [
      {
        name: 'Full Day Grupal Todo Incluido (Con Tasas)',
        modality: 'Grupal',
        priceUsd: 115,
        minPax: 1,
        description: 'Incluye transporte, Ballestas, cata, Buggies y todas las tasas SERNANP.',
        perks: ['Sin cobros extras de tasas en muelle', 'Ballestas y Buggies incluidos', 'Recojo en hotel']
      },
      {
        name: 'Costa Sur en Camioneta Privada + Reserva de Paracas + Almuerzo',
        modality: 'Privado',
        priceUsd: 235,
        minPax: 2,
        description: 'Salida a las 06:00 AM en vehículo exclusivo añadiendo Playa Roja en Reserva de Paracas, buggy privado y almuerzo.',
        perks: ['Añade Reserva Nacional de Paracas (Playa Roja)', 'Buggy exclusivo', 'Almuerzo incluido en viñedo']
      }
    ],
    recommendations: [
      'Llevar cortavientos para la navegación matinal en Ballestas y gafas de sol para la arena de Huacachina.'
    ],
    cancellationPolicy: 'Cancelación gratuita hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Puedo quedarme en Huacachina o Paracas al finalizar para seguir al día siguiente a Nazca?',
        answer: 'Sí, te dejamos con tu equipaje en tu hotel de Paracas o Huacachina sin costo adicional.'
      }
    ]
  },
  {
    id: 'tour-22',
    slug: 'paracas-reserva-nacional-ruta-del-pisco-huacachina-2d-1n',
    code: 'QUL-SUR-02',
    title: 'Reserva de Paracas, Ruta del Pisco & Desierto de Huacachina (2 Días / 1 Noche)',
    shortTitle: 'Paracas, Ruta del Pisco & Huacachina (2D/1N)',
    subtitle: 'Dos días entre los acantilados ocres donde el desierto besa el océano y las bodegas centenarias de Ica.',
    destinationSlug: 'paracas-huacachina',
    visitedDestinations: ['paracas-huacachina', 'lima'],
    destinationName: 'Paracas & Huacachina',
    region: 'Costa y Desierto Sur',
    primaryCategory: 'paracas-huacachina',
    sections: ['paracas-huacachina'],
    durationDays: 2,
    durationLabel: '2 Días / 1 Noche',
    altitudeMax: '450 m s.n.m.',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 245,
    privatePriceUsd: 390,
    singleSupplementUsd: 55,
    heroImage: PERU_PHOTOS.playaRojaParacas,
    gallery: [
      PERU_PHOTOS.playaRojaParacas,
      PERU_PHOTOS.islasBallestas,
      PERU_PHOTOS.paracasReserva,
      PERU_PHOTOS.huacachina
    ],
    summary: 'Disfruta con calma de la península de Paracas (Playa Roja, Lagunillas), navega a Islas Ballestas, recorre dos bodegas emblemáticas de Pisco (Tacama / Caravedo) y duerme frente al mar o en hacienda de Ica.',
    editorialDescription: 'Contar con dos días en Ica transforma el viaje costero. Partimos temprano a las 05:30 hrs para alcanzar cómodamente las Islas Ballestas y explorar toda la península de la Reserva Nacional de Paracas, pernoctando frente a la bahía de Paracas o en una hacienda rodeada de parras en Ica. El segundo día lo dedicamos a la Ruta del Pisco y a las dunas de Huacachina.',
    highlights: [
      '1 noche de alojamiento con desayuno en la bahía de Paracas o Hacienda de Ica',
      'Recorrido completo por Reserva Nacional de Paracas (Playa Roja, Istmo, Lagunillas)',
      'Ruta del Pisco en 2 bodegas históricas y artesanales de Ica',
      'Navegación a Islas Ballestas y buggies al atardecer en Huacachina'
    ],
    placesVisited: ['Islas Ballestas', 'Reserva Nacional de Paracas (Playa Roja y Lagunillas)', 'Viñedo Tacama o Hacienda La Caravedo', 'Bodega Artesanal de Ica', 'Oasis de Huacachina'],
    schedule: {
      departure: 'Día 1: 05:30 hrs desde Lima',
      returnTime: 'Día 2: 21:00 hrs en Lima',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo y retorno en tu hotel en Lima.'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Lima – Islas Ballestas – Reserva Nacional de Paracas y Tarde en Bahía',
        description: 'Viaje hacia Paracas (~3h 40m), zarpe matinal a las Islas Ballestas y circuito completo por Playa Roja y Lagunillas para almorzar frente al Pacífico. Tarde libre en piscina del hotel.',
        overnight: 'Paracas o Valle de Ica (según categoría seleccionada)'
      },
      {
        badge: 'Día 02',
        title: 'Ruta del Pisco en Ica, Oasis de Huacachina y Retorno a Lima',
        description: 'Visita a dos bodegas de pisco con cata dirigida por sommelier, almuerzo criollo entre viñedos y tarde de buggies y sandboard en Huacachina antes de regresar a Lima.',
        meals: ['Desayuno Buffet', 'Almuerzo en Viñedo']
      }
    ],
    included: [
      'Transporte Lima – Paracas – Ica – Lima',
      '1 noche de hotel en Paracas o Ica con desayuno buffet',
      'Islas Ballestas + Reserva Nacional de Paracas + Tasas SERNANP',
      'Tour Ruta del Pisco con catas + Almuerzo en viñedo el Día 2',
      'Buggies y sandboard en Huacachina'
    ],
    notIncluded: [
      'Almuerzo del Día 1 en caleta de Lagunillas y cena'
    ],
    pricingTiers: [
      {
        name: 'Escapada 2D/1N Hotel 3★ Superior (Base Doble)',
        modality: 'Grupal',
        priceUsd: 245,
        minPax: 2,
        description: 'Incluye hotel en Paracas, todas las excursiones, tasas y almuerzo en viñedo.',
        perks: ['Reserva de Paracas incluida', 'Almuerzo en viñedo incluido', '1 noche con desayuno']
      },
      {
        name: 'Escapada Privada + Resort 4★/5★ (Hotel Paracas / Las Dunas)',
        modality: 'Privado',
        priceUsd: 390,
        minPax: 2,
        description: 'Vehículo privado desde Lima y noche en resort frente al mar o Hacienda Ica.',
        perks: ['Vehículo privado los 2 días', 'Resort 4★/5★ con piscinas', 'Cata Gran Reserva en bodega']
      }
    ],
    recommendations: [
      'Llevar ropa de baño para la piscina climatizada y protector solar.'
    ],
    cancellationPolicy: 'Cancelación sin cargo hasta 72 horas antes.',
    faqs: [
      {
        question: '¿Se puede agregar kayak o bicicletas por la Reserva en la tarde del Día 1?',
        answer: 'Sí, la bahía de Paracas ofrece aguas tranquilas ideales para kayak matinal o bicicleta costera bajo solicitud.'
      }
    ]
  },
  {
    id: 'tour-23',
    slug: 'sobrevuelo-lineas-de-nazca-acueductos-cantalloc-cahuachi',
    code: 'QUL-NAZ-01',
    title: 'Enigma de Nazca: Sobrevuelo 13 Geoglifos y Acueductos de Cantalloc (Opcional Cahuachi)',
    shortTitle: 'Líneas de Nazca: Sobrevuelo & Cantalloc',
    subtitle: 'Perspectiva aérea en avioneta Cessna Grand Caravan unida a la ingeniería hidráulica subterránea del desierto.',
    destinationSlug: 'nazca',
    visitedDestinations: ['nazca'],
    destinationName: 'Nazca',
    region: 'Costa y Desierto Sur',
    primaryCategory: 'nazca',
    sections: ['nazca', 'full-day'],
    durationDays: 1,
    durationLabel: 'Medio Día / Full Day (6 horas)',
    altitudeMax: '588 m s.n.m. (Cantalloc / Aeródromo)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 145,
    privatePriceUsd: 225,
    isFeatured: true,
    heroImage: PERU_PHOTOS.nazcaLines,
    gallery: [
      PERU_PHOTOS.nazcaLines,
      PERU_PHOTOS.nazcaColibri,
      PERU_PHOTOS.cantalloc,
      PERU_PHOTOS.huacachina
    ],
    summary: 'Sobrevuelo de 35 minutos en aeronaves Cessna con asiento de ventana garantizado, complementado en tierra con los acueductos espirales de Cantalloc y talleres de cerámica (extensión a Cahuachi en servicio privado).',
    editorialDescription: 'Trazadas en las pampas de Jumana hace más de mil quinientos años, las Líneas de Nazca solo revelan su geometría monumental desde el aire. Volamos en aeronaves Cessna certificadas con capitán y copiloto realizando virajes suaves por ambos lados sobre 13 figuras clásicas. Al aterrizar recorremos los ojos de agua en espiral de Cantalloc (588 m) y, en modalidad privada, añadimos el Mirador de Palpa y las pirámides de adobe de Cahuachi (370 m).',
    highlights: [
      'Sobrevuelo certificado de 35 minutos con asiento de ventana individual para cada viajero',
      'Virajes compensados a izquierda y derecha sobre los 13 geoglifos principales',
      'Visita terrestre a los Acueductos Preincas de Cantalloc y Ruinas de Paredones',
      'Certificado oficial de vuelo tras aterrizar'
    ],
    placesVisited: ['Aeródromo María Reiche (567 m)', 'Pampas de Nazca (13 Geoglifos)', 'Acueductos de Cantalloc (588 m)', 'Ruinas de Los Paredones', 'Cahuachi (370 m en Privado)'],
    schedule: {
      departure: 'Turnos de vuelo entre las 07:30 hrs y las 15:00 hrs',
      returnTime: '4 a 6 horas después del recojo',
      frequency: 'Salidas diarias sujetas a visibilidad meteorológica',
      pickupInfo: 'Recojo en hoteles de Nazca o terminal de bus en Nazca (o desde Ica/Paracas en Privado).'
    },
    itinerary: [
      {
        badge: 'Fase 01',
        title: 'Check-in en Aeródromo María Reiche y Briefing de Ruta Aérea',
        description: 'Pesaje reglamentario, lectura del mapa de vuelo y embarque en aeronave Cessna.'
      },
      {
        badge: 'Fase 02',
        title: 'Sobrevuelo de 35 Minutos sobre los 13 Geoglifos de Nazca',
        description: 'Avistamiento en secuencia: La Ballena, Trapecios, El Astronauta, El Mono, El Perro, El Cóndor, La Araña, El Colibrí, El Alcatraz, El Loro, Las Manos, El Árbol y El Lagarto.'
      },
      {
        badge: 'Fase 03',
        title: 'Acueductos de Cantalloc, Paredones (y Cahuachi en Privado)',
        description: 'Exploración de las galerías subterráneas en espiral aún activas y taller de pigmentos cerámicos Nazca.'
      }
    ],
    included: [
      'Traslados internos en Nazca (Hotel / Estación – Aeródromo – Sitios Arqueológicos)',
      'Sobrevuelo de 35 minutos a las Líneas de Nazca con asiento de ventana',
      'Tour terrestre a los Acueductos de Cantalloc y Paredones con entradas incluidas',
      'Certificado de sobrevuelo'
    ],
    notIncluded: [
      'Tasa aeroportuaria TUUA y boleto turístico aéreo en el aeródromo (S/ 77 / ~USD $20 pago presencial en counter)'
    ],
    mandatoryFeesNote: 'El aeródromo cobra una tasa oficial TUUA + boleto de sobrevuelo de S/ 77 (~USD $20 por persona) abonada en ventanilla antes de embarcar.',
    pricingTiers: [
      {
        name: 'Sobrevuelo Nazca + Cantalloc (Inicio en Nazca)',
        modality: 'Grupal',
        priceUsd: 145,
        minPax: 1,
        description: 'Incluye el vuelo en Cessna + tour a los acueductos de Cantalloc.',
        perks: ['Ventana garantizada', 'Tour Cantalloc incluido', 'Traslados en Nazca']
      },
      {
        name: 'Expedición Privada desde Ica o Paracas + Cahuachi',
        modality: 'Privado',
        priceUsd: 225,
        minPax: 2,
        description: 'Traslado privado desde tu hotel en Ica/Huacachina o Paracas, Mirador de Palpa y Centro Ceremonial de Cahuachi.',
        perks: ['Traslado desde Ica o Paracas incluido', 'Torre Mirador de Palpa', 'Pirámides de Cahuachi incluidas']
      }
    ],
    recommendations: [
      'Evitar desayunos pesados al menos 2 horas antes del vuelo.',
      'Portar pasaporte o DNI físico original indispensable para el control aeronáutico.'
    ],
    cancellationPolicy: 'Reembolso íntegro del sobrevuelo en caso de cancelación por condiciones climáticas.',
    faqs: [
      {
        question: '¿Existe límite de peso por pasajero en las avionetas?',
        answer: 'Por norma de balance aéreo, los viajeros que superen los 95 kg (209 lbs) deben indicarlo al cotizar para asignar ubicación o asiento adicional según regulación.'
      }
    ]
  },
  {
    id: 'tour-24',
    slug: 'expedicion-nazca-paracas-huacachina-desde-lima',
    code: 'QUL-NAZ-02',
    title: 'Trilogía del Desierto Sur: Ballestas, Vuelo Líneas de Nazca desde Pisco y Huacachina (1 Día)',
    shortTitle: 'Ballestas, Sobrevuelo Nazca & Huacachina 1D',
    subtitle: 'Travesía marítima, aérea y de desierto en un solo día desde Lima mediante vuelo charter desde el aeropuerto de Pisco.',
    destinationSlug: 'nazca',
    visitedDestinations: ['paracas-huacachina', 'nazca', 'lima'],
    destinationName: 'Nazca & Paracas',
    region: 'Costa y Desierto Sur',
    primaryCategory: 'nazca',
    sections: ['nazca', 'paracas-huacachina', 'full-day', 'experiencias-privadas'],
    durationDays: 1,
    durationLabel: 'Full Day Extendido (17.5 horas)',
    altitudeMax: '540 m s.n.m.',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 365,
    privatePriceUsd: 495,
    heroImage: PERU_PHOTOS.nazcaColibri,
    gallery: [
      PERU_PHOTOS.nazcaColibri,
      PERU_PHOTOS.islasBallestas,
      PERU_PHOTOS.huacachina,
      PERU_PHOTOS.nazcaLines
    ],
    summary: 'La única forma real y cómoda de conocer Islas Ballestas, sobrevolar las Líneas de Nazca y recorrer Huacachina en un solo día desde Lima: despegando directo desde el aeropuerto de Pisco (a 15 min de Paracas).',
    editorialDescription: 'Recorrer Lima–Paracas–Nazca–Huacachina–Lima por carretera en un mismo día supera las 14 horas al volante y deja sin luz el atardecer en el desierto. Para hacerlo viable y placentero, navegamos temprano en las Islas Ballestas (08:00 hrs), trasladamos 15 minutos al Aeropuerto de Pisco para abordar el vuelo directo Pisco – Líneas de Nazca – Pisco (1h 40min), almorzamos en Paracas o Ica y disfrutamos con tiempo las dunas de Huacachina al atardecer antes de volver a Lima.',
    highlights: [
      'Vuelo directo desde el Aeropuerto de Pisco (evita 5.5 horas adicionales de carretera ida/vuelta a Nazca)',
      'Reúne en 1 día viable: Islas Ballestas + Sobrevuelo Líneas de Nazca + Oasis de Huacachina',
      'Incluye almuerzo regional frente al mar o entre viñedos de Ica',
      'Doble conductor o vehículo ejecutivo para regreso seguro a Lima'
    ],
    placesVisited: ['Muelle de Paracas e Islas Ballestas', 'Aeropuerto de Pisco (vuelo directo a Pampas de Nazca)', 'Viñedo de Ica', 'Oasis de Huacachina'],
    schedule: {
      departure: '04:15 hrs desde tu hotel en Lima',
      returnTime: '21:45 hrs en tu hotel en Lima',
      frequency: 'Salidas diarias desde 2 pasajeros',
      pickupInfo: 'Recojo puerta a puerta en Lima.'
    },
    itinerary: [
      {
        badge: '08:00 hrs',
        title: 'Navegación a Islas Ballestas en Paracas',
        description: 'Primer turno marítimo hacia el Candelabro de Paracas y los arcos rocosos de Ballestas (regreso al muelle 10:00 hrs).'
      },
      {
        badge: '10:30 hrs',
        title: 'Despegue desde Pisco y Sobrevuelo de las Líneas de Nazca',
        description: 'Vuelo escénico de 1h 40min sobre el desierto costero y los 13 geoglifos de Nazca, seguido de almuerzo regional en ruta a Ica.',
        meals: ['Almuerzo a la carta incluido']
      },
      {
        badge: '15:45 hrs',
        title: 'Dunas de Huacachina al Atardecer y Retorno a Lima',
        description: 'Travesía en buggies 4x4 y sandboard con la puesta de sol sobre las dunas antes del regreso a tu hotel en Lima.'
      }
    ],
    included: [
      'Transporte ejecutivo Lima – Paracas – Ica – Lima',
      'Navegación Islas Ballestas + Tasas SERNANP',
      'Sobrevuelo directo Pisco – Líneas de Nazca – Pisco (1h 40min)',
      'Almuerzo incluido + Buggies y sandboard en Huacachina'
    ],
    notIncluded: [
      'Tasa aeroportuaria TUUA de Pisco/Nazca (USD $20 en counter)'
    ],
    mandatoryFeesNote: 'El aeropuerto requiere el abono presencial de la tasa TUUA y boleto sobrevuelo (~USD $20 por persona).',
    pricingTiers: [
      {
        name: 'Programa Trilogía Sur Vuelo Pisco (Grupal)',
        modality: 'Grupal',
        priceUsd: 365,
        minPax: 2,
        description: 'Todos los servicios terrestres, marítimos, vuelo directo desde Pisco y almuerzo.',
        perks: ['Vuelo directo desde Pisco', 'Ballestas y Huacachina incluidos', 'Almuerzo incluido']
      },
      {
        name: 'Trilogía Sur en Camioneta SUV Privada',
        modality: 'Privado',
        priceUsd: 495,
        minPax: 2,
        description: 'Vehículo SUV privado desde Lima con buggy exclusivo en Huacachina.',
        perks: ['Ritmo y paradas libres', 'Buggy privado en Huacachina', 'Almuerzo gourmet']
      }
    ],
    recommendations: [
      'Portar pasaporte o DNI físico original vigente indispensable para el embarque en el aeropuerto de Pisco.'
    ],
    cancellationPolicy: 'Cancelación gratuita hasta 48 horas antes.',
    faqs: [
      {
        question: '¿Se puede hacer por carretera hasta Nazca en lugar de volar desde Pisco?',
        answer: 'Si deseas ir por tierra hasta el aeródromo de Nazca, te recomendamos nuestra escapada de 2 Días / 1 Noche para dormir en Ica o Nazca sin prisas.'
      }
    ]
  },
  {
    id: 'tour-25',
    slug: 'cusco-gastronomico-mercado-san-pedro-picanteria-cacao',
    code: 'QUL-GAS-02',
    title: 'Sabores de los Andes: Mercado de San Pedro, Picantería Cusqueña y Cacao Chuncho',
    shortTitle: 'Cusco Gastronómico: San Pedro & Cacao Chuncho',
    subtitle: 'Arqueología del gusto en Cusco: panes Chuta de Oropesa, quesos de Paruro, chicha de jora y cacao fino de aroma.',
    destinationSlug: 'cusco',
    visitedDestinations: ['cusco'],
    destinationName: 'Cusco',
    region: 'Andes Mágicos',
    primaryCategory: 'gastronomia',
    sections: ['gastronomia', 'cusco-machu-picchu', 'full-day'],
    durationDays: 1,
    durationLabel: '4.5 horas',
    altitudeMax: '3,450 m s.n.m. (San Blas / San Pedro)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 75,
    privatePriceUsd: 130,
    heroImage: PERU_PHOTOS.sanPedroCusco,
    gallery: [
      PERU_PHOTOS.sanPedroCusco,
      PERU_PHOTOS.cuscoPlaza,
      PERU_PHOTOS.qorikancha,
      PERU_PHOTOS.cevichePeru
    ],
    summary: 'Recorrido sensorial por el Mercado Central de San Pedro (de estructura metálica atribuida al taller de Gustave Eiffel en 1925), las picanterías tradicionales del Cusco y un taller con cacao nativo Chuncho.',
    editorialDescription: 'La cocina cusqueña condensa el calendario agrícola de tres pisos ecológicos. Caminando desde la Plaza San Francisco hacia el Mercado Central de San Pedro (3,410 m) junto a un investigador culinario, probamos pan Chuta recién horneado, tamales de maíz blanco del Valle Sagrado, quesos madurados, papas nativas y frutas de selva alta. Seguimos luego hacia un taller de tostado de Cacao Chuncho de La Convención y cerramos con un almuerzo andino en San Blas (3,450 m).',
    highlights: [
      'Recorrido por Plaza San Francisco y Mercado de San Pedro con 9 degustaciones seguras',
      'Taller del grano a la barra con Cacao nativo Chuncho de Quillabamba',
      'Visita a picantería patrimonial (chicha de jora y frutillada) y almuerzo de cocina cusqueña',
      'Ideal para realizar en una mañana tranquila de aclimatación en Cusco'
    ],
    placesVisited: ['Plaza San Francisco', 'Mercado Central de San Pedro (3,410 m)', 'Taller de Cacao Chuncho', 'Picantería y Restaurante de Autor en San Blas (3,450 m)'],
    schedule: {
      departure: '09:30 hrs desde tu hotel en Cusco',
      returnTime: '14:00 hrs',
      frequency: 'Salidas diarias',
      pickupInfo: 'Encuentro en tu hotel del Centro Histórico de Cusco.'
    },
    itinerary: [
      {
        badge: '09:30 hrs',
        title: 'Plaza San Francisco y Mercado de San Pedro',
        description: 'Degustación de panes rituales de Oropesa, quesos andinos, mieles de ceja de selva, granos de quinua y kiwicha y jugos frescos.'
      },
      {
        badge: '11:15 hrs',
        title: 'Tostado y Molienda de Cacao Nativo Chuncho',
        description: 'Descubre por qué el cacao silvestre de La Convención es uno de los más aromáticos del mundo y prepara tu propia tableta artesanal.'
      },
      {
        badge: '12:30 hrs',
        title: 'Almuerzo Degustación Cusqueño en San Blas',
        description: 'Menú de 3 tiempos con kapchi de setas y habas, trucha ahumada en aliso, chiri uchu de temporada o solterito de quinua.',
        meals: ['Almuerzo Degustación Andino + Bebida ceremonial']
      }
    ],
    included: [
      'Guía especialista gastronómico',
      'Todas las degustaciones en San Pedro y taller de cacao',
      'Almuerzo de 3 tiempos en restaurante seleccionado de San Blas'
    ],
    notIncluded: [
      'Bebidas alcohólicas adicionales'
    ],
    pricingTiers: [
      {
        name: 'Ruta Gastronómica Grupal (Máx. 8 Pax)',
        modality: 'Grupal',
        priceUsd: 75,
        minPax: 2,
        description: 'Incluye degustaciones, taller de cacao y almuerzo de 3 tiempos.',
        perks: ['Grupos íntimos', 'Taller de cacao incluido', 'Almuerzo incluido']
      },
      {
        name: 'Experiencia Privada + Maridaje de Destilados Andinos',
        modality: 'Privado',
        priceUsd: 130,
        minPax: 2,
        description: 'Recorrido privado sumando cata de Matacuy, Gin de botánicos andinos y Cañazo artesanal.',
        perks: ['Cata de destilados andinos (Matacuy / Aqará)', 'Guía privado', 'Menú degustación ampliado']
      }
    ],
    recommendations: [
      'Comunicar cualquier alergia o restricción alimentaria al momento de solicitar disponibilidad.'
    ],
    cancellationPolicy: 'Cancelación sin penalidad hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Las degustaciones en el mercado cumplen estándares de higiene para viajeros?',
        answer: 'Sí: trabajamos con puestos familiares seleccionados de larga trayectoria donde todos los productos son cocidos, horneados o pelados al momento con agua purificada.'
      }
    ]
  },
  {
    id: 'tour-26',
    slug: 'expedicion-privada-autor-valle-sagrado-picnic-andino-machu-picchu-lujo',
    code: 'QUL-PRV-01',
    title: 'Valle Sagrado y Machu Picchu en Privado: Picnic en Laguna Huaypo y Tren First Class (3D/2N)',
    shortTitle: 'Colección Privada: Valle Sagrado & First Class (3D)',
    subtitle: 'Nuestra expedición privada más exclusiva: almuerzo campestre frente a la Laguna Huaypo, comunidad de Patacancha y hoteles 5★.',
    destinationSlug: 'valle-sagrado-machu-picchu',
    visitedDestinations: ['valle-sagrado-machu-picchu', 'cusco'],
    destinationName: 'Valle Sagrado & Machu Picchu',
    region: 'Andes Mágicos',
    primaryCategory: 'experiencias-privadas',
    sections: ['experiencias-privadas', 'cusco-machu-picchu'],
    durationDays: 3,
    durationLabel: '3 Días / 2 Noches (Privado)',
    altitudeMax: '3,820 m s.n.m. (Patacancha)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés', 'Francés', 'Alemán'],
    modalities: ['Privado a Medida'],
    priceUsd: 1290,
    privatePriceUsd: 1290,
    singleSupplementUsd: 380,
    isFeatured: true,
    isExclusive: true,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.morayAndenes,
    gallery: [
      PERU_PHOTOS.morayAndenes,
      PERU_PHOTOS.marasSalineras,
      PERU_PHOTOS.machuPicchuTrain,
      PERU_PHOTOS.machuPicchuClassic
    ],
    summary: 'Viaje privado de alta gama: recorre Moray, Maras y la comunidad altoandina de Patacancha en exclusiva, almuerza en picnic vestido a orillas de la Laguna Huaypo, viaja en tren First Class y descansa en hoteles 5★.',
    editorialDescription: 'Pensada para viajeros que priorizan la privacidad absoluta, los tiempos serenos y la hospitalidad de colección. Durante tres días cuentas con vehículo privado de alta gama y un arqueólogo anfitrión dedicado a tu grupo: exploramos Moray (3,500 m) y Salineras de Maras, compartimos una mesa campestre montada con chef y vinos sudamericanos junto a la Laguna Huaypo (3,507 m), ascendemos al valle textil de Patacancha (3,820 m) sobre Ollantaytambo y abordamos el vagón First Class / Observatory rumbo a Machu Picchu.',
    highlights: [
      'Picnic privado de autor frente a la Laguna Huaypo (3,507 m) mirando los nevados Chicón y Verónica',
      'Tren First Class / Vistadome Observatory con coche bar panorámico y cena gourmet a bordo',
      '2 noches en hoteles 5★ (Tambo del Inka / Sol y Luna / Inkaterra Machu Picchu Pueblo)',
      'Arqueólogo privado, vehículo de alta gama y opción de gestionar doble circuito en Machu Picchu'
    ],
    placesVisited: ['Laguna Huaypo (3,507 m)', 'Moray (3,500 m) y Salineras de Maras (3,250 m)', 'Comunidad de Patacancha (3,820 m)', 'Ollantaytambo (2,792 m)', 'Santuario de Machu Picchu (2,430 m)'],
    schedule: {
      departure: 'Día 1: Horario flexible a elección (sugerido 08:30 hrs)',
      returnTime: 'Día 3: Retorno privado a Cusco por la noche',
      frequency: 'Salidas privadas cualquier día del año',
      pickupInfo: 'Recepción privada en aeropuerto o hotel de Cusco y Valle Sagrado.'
    },
    itinerary: [
      {
        badge: 'Día 01',
        title: 'Moray, Salineras de Maras y Picnic Privado frente a Laguna Huaypo',
        description: 'Visita privada a Moray (3,500 m) y Maras (3,250 m), seguida de un almuerzo campestre privado vestido a orillas de la Laguna Huaypo con servicio de chef y vinos.',
        altitude: '2,871 m – 3,507 m s.n.m.',
        meals: ['Almuerzo Picnic de Lujo en Laguna Huaypo'],
        overnight: 'Valle Sagrado (Hotel 5★)'
      },
      {
        badge: 'Día 02',
        title: 'Comunidad de Patacancha, Ollantaytambo y Tren First Class a Aguas Calientes',
        description: 'Ascenso privado al valle alto de Patacancha (3,820 m) para encuentro con maestras tejedoras, visita a Ollantaytambo (2,792 m) y viaje ferroviario First Class hacia Aguas Calientes.',
        altitude: '2,040 m – 3,820 m s.n.m.',
        meals: ['Desayuno Buffet', 'Almuerzo en Hacienda', 'Cena de 3 tiempos en Inkaterra / Sumaq'],
        overnight: 'Aguas Calientes (Hotel 5★ Boutique)'
      },
      {
        badge: 'Día 03',
        title: 'Exploración Privada de Machu Picchu y Retorno en Coche Observatorio',
        description: 'Visita privada en la Llaqta (opción de gestionar segundo circuito adicional), almuerzo frente al santuario y regreso en tren Observatory con cócteles y traslado privado a Cusco.',
        altitude: '2,430 m s.n.m.',
        meals: ['Desayuno', 'Almuerzo frente al Santuario', 'Cena/Cóctel a bordo del tren']
      }
    ],
    included: [
      'Vehículo privado de alta gama y conductor ejecutivo los 3 días',
      'Arqueólogo / Guía privado exclusivo',
      '1 noche en Valle Sagrado 5★ + 1 noche en Aguas Calientes 5★',
      'Picnic privado en Laguna Huaypo + Alimentación gourmet indicada',
      'Boletos de tren First Class / Observatory + Entradas y buses a Machu Picchu'
    ],
    notIncluded: [
      'Upgrade opcional al tren Belmond Hiram Bingham (+USD $690 por persona)'
    ],
    pricingTiers: [
      {
        name: 'Edición Privada (Base 2 Viajeros)',
        modality: 'Privado',
        priceUsd: 1290,
        minPax: 2,
        description: 'Todo incluido en privado para 2 viajeros con hoteles 5★ y tren First Class.',
        perks: ['Picnic privado en Huaypo', 'Hoteles 5★ incluidos', 'Tren First Class incluido']
      },
      {
        name: 'Grupo Familiar Privado (Base 4+ Viajeros)',
        modality: 'Privado',
        priceUsd: 1080,
        minPax: 4,
        isGroupVolumeTier: true,
        description: 'Tarifa por persona ya bonificada para familias o grupos privados de 4 o más viajeros.',
        perks: ['Van Mercedes-Benz VIP exclusiva', 'Hoteles 5★ incluidos', 'Anfitrión dedicado 24/7']
      }
    ],
    addOns: [
      { id: 'hiram-bingham', label: 'Upgrade Tren Belmond Hiram Bingham (ida o retorno)', priceUsd: 690 }
    ],
    recommendations: [
      'Personalizamos menús, vinos y horarios según las preferencias de tu grupo.'
    ],
    cancellationPolicy: 'Condiciones flexibles terrestres hasta 20 días antes (boletos ministeriales y de tren sujetos a normativa nominativa).',
    faqs: [
      {
        question: '¿Se puede realizar este programa viajando en el tren Belmond Hiram Bingham?',
        answer: 'Sí, emitimos directamente Belmond Hiram Bingham y podemos integrarlo en el tramo de ida, de retorno o ambos.'
      }
    ]
  },
  {
    id: 'tour-27',
    slug: 'expedicion-fotografica-7-lagunas-ausangate-aguas-termales-pacchanta',
    code: 'QUL-ADV-03',
    title: '7 Lagunas del Glaciar Ausangate & Aguas Termales de Pacchanta',
    shortTitle: '7 Lagunas del Ausangate & Termales',
    subtitle: 'El circuito glaciar menos masificado del Cusco: espejos de agua azul cobalto y verde esmeralda al pie del Apu Ausangate.',
    destinationSlug: 'cusco',
    visitedDestinations: ['cusco'],
    destinationName: 'Cusco',
    region: 'Andes Mágicos',
    primaryCategory: 'aventura-naturaleza',
    sections: ['aventura-naturaleza', 'cusco-machu-picchu', 'experiencias-privadas', 'full-day'],
    durationDays: 1,
    durationLabel: 'Full Day (13 horas)',
    altitudeMax: '4,650 m s.n.m.',
    difficulty: 'Exigente / Alta Montaña',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 68,
    privatePriceUsd: 150,
    heroImage: PERU_PHOTOS.ausangate,
    gallery: [
      PERU_PHOTOS.ausangate,
      PERU_PHOTOS.vinicunca,
      PERU_PHOTOS.humantay,
      PERU_PHOTOS.cuscoPlaza
    ],
    summary: 'Circuito circular de 4 a 4.5 horas de caminata por las 7 lagunas glaciares del Apu Ausangate (6,384 m), culminando en las aguas termales humeantes de la comunidad alpaquera de Pacchanta.',
    editorialDescription: 'Mientras cientos de visitantes se concentran en otras rutas, la cuenca de las 7 Lagunas del Ausangate (Azulcocha, Otorongo Macho, Otorongo Hembra, Pucacocha, Alqacocha, Qomercocha y Patacocha) regala silencio andino, morrenas glaciares y manadas de alpacas en libertad. Tras completar el circuito circular de 4 a 4.5 horas, regresamos a Pacchanta (4,200 m) para relajarnos en sus pozas termales naturales mirando el nevado.',
    highlights: [
      'Recorrido circular por 7 lagunas glaciares bajo la cara sur del Ausangate (6,384 m)',
      'Tiempo de descanso en las pozas termales de Pacchanta incluidas en tarifa',
      'Desayuno y almuerzo tradicional en casa comunal alpaquera de Pacchanta',
      'Ruta serena con mínima afluencia, ideal para fotografía de alta montaña'
    ],
    placesVisited: ['Tinki', 'Comunidad Alpaquera de Pacchanta (4,200 m)', 'Circuito 7 Lagunas (4,300–4,650 m)', 'Aguas Termales de Pacchanta'],
    schedule: {
      departure: '04:30 hrs desde Cusco',
      returnTime: '17:30 hrs en Cusco',
      frequency: 'Salidas diarias',
      pickupInfo: 'Recojo en tu hotel en Cusco.'
    },
    itinerary: [
      {
        badge: '04:30 hrs',
        title: 'Ruta Interoceánica Sur hacia Tinki y Pacchanta',
        description: 'Viaje hacia Quispicanchi (~3h 15m incluyendo tramo de trocha desde Tinki) hasta Pacchanta para desayunar caliente.',
        altitude: '4,200 m s.n.m.',
        meals: ['Desayuno Andino']
      },
      {
        badge: '08:15 hrs',
        title: 'Caminata Circular por las 7 Lagunas del Ausangate (4–4.5 hrs)',
        description: 'Sendero de pampa andina y morrenas visitando Azulcocha, Otorongo, Pucacocha y Qomercocha bajo el glaciar.',
        altitude: '4,300 – 4,650 m s.n.m.'
      },
      {
        badge: '12:45 hrs',
        title: 'Baño en Aguas Termales de Pacchanta y Almuerzo',
        description: 'Inmersión en las pozas volcánicas al aire libre seguida de almuerzo caliente antes de retornar a Cusco.',
        altitude: '4,200 m s.n.m.',
        meals: ['Almuerzo Andino']
      }
    ],
    included: [
      'Transporte turístico ida y vuelta desde Cusco',
      'Desayuno y almuerzo en Pacchanta',
      'Entradas comunales al circuito de 7 Lagunas y a las Aguas Termales',
      'Bastones de trekking, balón de oxígeno y guía de montaña'
    ],
    notIncluded: [
      'Caballo de silla opcional (S/ 80 / ~USD $21 pago directo a comuneros de Pacchanta)'
    ],
    pricingTiers: [
      {
        name: 'Expedición Grupal 7 Lagunas',
        modality: 'Grupal',
        priceUsd: 68,
        minPax: 2,
        description: 'Incluye transporte, 2 comidas, entradas y aguas termales.',
        perks: ['Entradas y termales incluidas', 'Bastones incluidos', 'Grupo reducido']
      },
      {
        name: 'Ruta Fotográfica Privada en 4x4',
        modality: 'Privado',
        priceUsd: 150,
        minPax: 2,
        description: 'Horario adaptado a la luz matinal y paradas fotográficas en pastizales de alpacas.',
        perks: ['Camioneta exclusiva', 'Guía especialista en naturaleza', 'Todo incluido']
      }
    ],
    recommendations: [
      'Llevar ropa de baño, toalla de secado rápido y sandalias para las aguas termales de Pacchanta.'
    ],
    cancellationPolicy: 'Cancelación gratuita hasta 24 horas antes.',
    faqs: [
      {
        question: '¿Cómo es el desnivel respecto a Laguna Humantay?',
        answer: 'Es un circuito circular más largo (4–4.5 horas), pero sin una rampa única tan empinada; avanza por ondulaciones amplias entre 4,200 y 4,650 m s.n.m.'
      }
    ]
  },
  {
    id: 'tour-28',
    slug: 'paquete-biodiversidad-andes-amazonia-10-dias-lima-cusco-machu-picchu-tambopata',
    code: 'QUL-PKG-04',
    title: 'Andes & Amazonía Profunda: De Machu Picchu a la Selva de Tambopata (10 Días / 9 Noches)',
    shortTitle: 'Andes & Amazonía: Machu Picchu & Tambopata (10D)',
    subtitle: 'El contraste supremo del Perú: templos incas en las nubes y biodiversidad amazónica en Madre de Dios.',
    destinationSlug: 'amazonia-tambopata',
    visitedDestinations: ['lima', 'valle-sagrado-machu-picchu', 'cusco', 'amazonia-tambopata'],
    destinationName: 'Multirregión Perú',
    region: 'Multirregión Perú',
    primaryCategory: 'paquetes-peru',
    sections: ['paquetes-peru', 'aventura-naturaleza', 'cusco-machu-picchu'],
    durationDays: 10,
    durationLabel: '10 Días / 9 Noches',
    altitudeMax: '3,762 m s.n.m. (Chinchero)',
    difficulty: 'Suave / Cultural',
    languages: ['Español', 'Inglés'],
    modalities: ['Grupal Reducido', 'Privado a Medida'],
    priceUsd: 1380,
    privatePriceUsd: 1940,
    singleSupplementUsd: 290,
    requiresMinisterialPermit: true,
    heroImage: PERU_PHOTOS.tambopataMacaws,
    gallery: [
      PERU_PHOTOS.tambopataMacaws,
      PERU_PHOTOS.lagoSandoval,
      PERU_PHOTOS.machuPicchuClassic,
      PERU_PHOTOS.mirafloresCosta
    ],
    summary: 'Un itinerario de 10 días sin alturas extremas (máximo 3,762 m): 2 noches en Lima, 4 noches entre Valle Sagrado, Aguas Calientes y Cusco, y 3 noches en Eco-Lodge en Tambopata con pensión completa.',
    editorialDescription: 'Concebido para viajeros amantes de la cultura, la historia y la vida silvestre que prefieren evitar caminatas por encima de los 4,000 metros. Iniciamos en Lima entre casonas virreinales y Barranco, volamos a Cusco descendiendo de inmediato al Valle Sagrado para una aclimatación gradual y sosegada, visitamos Machu Picchu y conectamos hacia Puerto Maldonado para pasar 4 días y 3 noches en la Reserva Nacional Tambopata.',
    highlights: [
      'Aclimatación cómoda: primeras noches andinas en el Valle Sagrado (2,871 m s.n.m.)',
      '3 noches en Eco-Lodge en la Reserva Nacional Tambopata con pensión completa y navegaciones',
      'Incluye Lima Virreinal, Valle Sagrado completo, Santuario de Machu Picchu y Cusco Imperial',
      'Ideal para familias, parejas y observadores de fauna y naturaleza'
    ],
    placesVisited: ['Lima y Barranco', 'Valle Sagrado (Pisac, Moray, Maras, Ollantaytambo, Chinchero)', 'Santuario de Machu Picchu', 'Cusco y Sacsayhuamán', 'Río Madre de Dios, Isla de Monos, Lago Sandoval y Collpa Cachuela (Tambopata)'],
    schedule: {
      departure: 'Salidas diarias desde tu llegada a Lima',
      returnTime: 'Día 10: traslado al aeropuerto de Puerto Maldonado para tu vuelo a Lima',
      frequency: 'Salidas diarias todo el año',
      pickupInfo: 'Asistencia en aeropuertos de Lima, Cusco y Puerto Maldonado.'
    },
    itinerary: [
      {
        badge: 'Días 01–02',
        title: 'Lima de los Reyes, Casa Aliaga y Barranco Bohemio',
        description: 'Llegada a Lima, alojamiento en Miraflores y recorrido por el Centro Histórico y los acantilados de Barranco.',
        meals: ['Desayuno (Día 02)'],
        overnight: 'Lima (2N)'
      },
      {
        badge: 'Días 03–04',
        title: 'Vuelo a Cusco, Descenso al Valle Sagrado y Tren a Aguas Calientes',
        description: 'Aterrizaje en Cusco y descenso hacia Pisac y Urubamba (2,871 m) para aclimatarse cómodamente. Día 4: Moray, Salineras de Maras, almuerzo en Urubamba, Ollantaytambo y tren a Aguas Calientes.',
        meals: ['Desayunos (Días 03–04)', 'Almuerzo en Urubamba (Día 04)'],
        overnight: 'Valle Sagrado (1N) / Aguas Calientes (1N)'
      },
      {
        badge: 'Días 05–06',
        title: 'Santuario de Machu Picchu y Cusco Monumental',
        description: 'Visita matinal guiada a Machu Picchu y retorno a Cusco. Día 6: Qorikancha, Sacsayhuamán, Q’enqo, San Blas y tarde libre.',
        meals: ['Desayunos'],
        overnight: 'Cusco (2N)'
      },
      {
        badge: 'Días 07–10',
        title: 'Expedición Amazónica en Reserva Nacional Tambopata (4D/3N)',
        description: 'Vuelo a Puerto Maldonado y navegación al Eco-Lodge: Canopy Walkway, Lago Sandoval, Isla de Monos, safari nocturno de caimanes y collpa de loros/guacamayos al alba antes de tu traslado al aeropuerto el Día 10.',
        meals: ['Pensión Completa en Amazonía (Días 07–10)'],
        overnight: 'Tambopata Eco-Lodge (3N)'
      }
    ],
    included: [
      '9 noches de alojamiento (2 Lima, 1 Valle Sagrado, 1 Aguas Calientes, 2 Cusco, 3 Tambopata Eco-Lodge)',
      'Pensión completa durante los 4 días en Tambopata + Almuerzo en Urubamba + Todos los desayunos',
      'Todos los ingresos: Casa Aliaga, Catacumbas, BTG del Cusco, Qorikancha, Maras, Machu Picchu y SERNANP Tambopata',
      'Trenes ida y vuelta a Machu Picchu + Todos los traslados terrestres y fluviales'
    ],
    notIncluded: [
      'Vuelos domésticos Lima – Cusco – Puerto Maldonado – Lima (añadibles desde USD $220)'
    ],
    addOns: [
      { id: 'vuelos-3-tramos', label: 'Paquete aéreo interno 3 tramos (LIM-CUZ / CUZ-PEM / PEM-LIM)', priceUsd: 220 }
    ],
    pricingTiers: [
      {
        name: 'Programa Confort 3★ Boutique & Eco-Lodge (Base Doble)',
        modality: 'Grupal',
        priceUsd: 1380,
        minPax: 2,
        description: 'Hoteles 3★ Boutique en ciudades + Bungalow en Eco-Lodge Amazónico con pensión completa.',
        perks: ['9 noches incluidas', 'Pensión completa en selva', 'Todos los ingresos incluidos']
      },
      {
        name: 'Programa Superior 4★ & Lodge de Colección en Tambopata',
        modality: 'Privado',
        priceUsd: 1940,
        minPax: 2,
        description: 'Hoteles 4★ Superior, tren Vistadome, tours privados y cabañas superiores en Tambopata.',
        perks: ['Lodges de colección', 'Tren Vistadome', 'Guía privado en cada destino']
      }
    ],
    recommendations: [
      'En nuestra sede de Puerto Maldonado resguardamos tus abrigos de los Andes mientras visitas la selva.'
    ],
    cancellationPolicy: 'Reserva con depósito del 30% al validar cupos; flexibilidad terrestre hasta 20 días antes.',
    faqs: [
      {
        question: '¿Cómo se vuela entre Cusco y Puerto Maldonado?',
        answer: 'Hay vuelos diarios directos de ~55 minutos que enlazamos con la recepción fluvial hacia tu Eco-Lodge.'
      }
    ]
  }
];
