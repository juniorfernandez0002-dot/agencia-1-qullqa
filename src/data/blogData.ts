import type { BlogPost } from '../types/tourism';
import { PERU_PHOTOS } from './mediaAssets';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'guia-circuitos-machu-picchu-como-elegir-boleto-oficial',
    title: 'Nuevos Circuitos Oficiales en Machu Picchu: Cuál elegir entre Circuito 1, Circuito 2 y Circuito 3',
    subtitle: 'Guía técnica actualizada sobre las rutas del Ministerio de Cultura, turnos horarios y dónde se toma la fotografía clásica.',
    category: 'Rutas y Logística',
    readTime: '6 min de lectura',
    publishedAt: '14 de octubre de 2026',
    author: {
      name: 'Ramiro Tupayachi, Lic.',
      role: 'Director de Operaciones Andinas & Arqueólogo'
    },
    heroImage: PERU_PHOTOS.machuPicchuClassic,
    excerpt: 'Entender la zonificación actual del Santuario Histórico de Machu Picchu es clave antes de solicitar tu boleto. Analizamos qué incluye cada circuito y con cuánta anticipación reservar.',
    sections: [
      {
        heading: '1. Circuito 2 (Circuito Clásico): La opción más completa para tu primera visita',
        paragraphs: [
          'El Circuito 2 —dividido en Ruta 2-A (Ruta Clásica Diseñada) y Ruta 2-B (Terraza Inferior)— reúne lo esencial del santuario. Permite ascender hacia la terraza inferior cercana a la Casa del Guardián para tomar la postal panorámica de Machu Picchu y continuar por el sector urbano: Plaza Sagrada, Templo de las Tres Ventanas, Roca Sagrada y Espejos de Agua.',
          'Al combinar la perspectiva elevada con la exploración interior de los templos principales, los cupos del Circuito 2 suelen agotarse entre 45 y 75 días antes durante la estación seca (mayo a septiembre).'
        ],
        proTip: 'Si viajas entre mayo y septiembre, coordina tu paquete con al menos 2 meses de anticipación para asegurar el Circuito 2-A o 2-B en los turnos de 08:00 AM a 11:00 AM.'
      },
      {
        heading: '2. Circuito 1 (Panorámico): Vistas amplias desde las terrazas superiores',
        paragraphs: [
          'El Circuito 1 se concentra en las plataformas altas de la llaqta. Es ideal para fotógrafos que buscan la vista elevada desde la terraza de la Casa del Guardián o para quienes caminan hacia el Puente Inca o la cumbre de Montaña Machu Picchu (3,082 m).',
          'Ten en cuenta que el Circuito 1 no desciende al interior de los recintos urbanos bajos, por lo que muchos viajeros lo combinan con una segunda entrada del Circuito 3.'
        ]
      },
      {
        heading: '3. Circuito 3 (Circuito de la Realeza) y Huayna Picchu',
        paragraphs: [
          'El Circuito 3 ingresa por las terrazas agrícolas inferiores hacia el Templo del Sol, la Casa del Inca y la Roca Sagrada, con menor desnivel inicial. Es también el circuito que habilita el acceso a la cumbre de Huayna Picchu (2,693 m) y a Huchuy Picchu.'
        ]
      }
    ],
    relatedTourSlugs: ['machu-picchu-full-day-tren-panoramico', 'machu-picchu-2-dias-pernocte-aguas-calientes', 'conexion-valle-sagrado-machu-picchu-2d-1n'],
    relatedDestinationSlug: 'valle-sagrado-machu-picchu'
  },
  {
    id: 'blog-02',
    slug: 'protocolo-aclimatacion-cusco-valle-sagrado-sin-mal-de-altura',
    title: 'El Arte de Aclimatarse en los Andes: Por qué empezar por el Valle Sagrado cambia todo tu viaje',
    subtitle: 'Fisiología práctica entre los 2,040 y los 5,036 metros de altitud: hidratación, alimentación y orden inteligente de excursiones.',
    category: 'Preparación de Viaje',
    readTime: '5 min de lectura',
    publishedAt: '2 de octubre de 2026',
    author: {
      name: 'Valeria Montesinos',
      role: 'Especialista en Diseño de Itinerarios a Medida'
    },
    heroImage: PERU_PHOTOS.ollantaytambo,
    excerpt: 'La ciudad de Cusco está a 3,399 m s.n.m., pero el piso del Valle Sagrado desciende a 2,871 m y Machu Picchu se sitúa a 2,430 m. Descubre cómo ordenar tus días para disfrutar sin soroche.',
    sections: [
      {
        heading: 'La paradoja geográfica del Cusco',
        paragraphs: [
          'Muchos viajeros suponen que Machu Picchu está a mayor altitud que la ciudad del Cusco. Ocurre exactamente lo contrario: mientras el Centro Histórico de Cusco alcanza los 3,399 m s.n.m., Urubamba y Ollantaytambo en el Valle Sagrado descienden a unos templados 2,792–2,871 m s.n.m., Machu Picchu se halla a 2,430 m y Aguas Calientes apenas a 2,040 m s.n.m.',
          'Por esta razón, al diseñar nuestros circuitos dedicamos las primeras 48 horas a paseos pausados o al descenso directo hacia el Valle Sagrado y Machu Picchu, reservando las caminatas de alta montaña (Laguna Humantay a 4,200 m o Vinicunca a 5,036 m) para la recta final del viaje.'
        ],
        proTip: 'En tu primera noche sobre los 3,000 metros, cena una sopa ligera de quinua o verduras antes de las 19:30 hrs y evita el alcohol y las carnes rojas: la digestión en altura es notablemente más lenta.'
      },
      {
        heading: 'Muña frente a hoja de coca: aliados botánicos andinos',
        paragraphs: [
          'Mientras la infusión de hoja de coca aporta un estímulo suave durante la mañana, la muña (menta silvestre andina) favorece la digestión y el confort respiratorio por la tarde y la noche sin alterar el sueño.'
        ]
      }
    ],
    relatedTourSlugs: ['valle-sagrado-completo-pisac-maras-moray-ollantaytambo', 'paquete-peru-esencial-9-dias-lima-paracas-ica-cusco-machu-picchu'],
    relatedDestinationSlug: 'cusco'
  },
  {
    id: 'blog-03',
    slug: 'vinicunca-vs-palcoyo-vs-7-lagunas-ausangate-comparativa',
    title: 'Vinicunca, Laguna Humantay o 7 Lagunas de Ausangate: ¿Qué caminata de alta montaña elegir?',
    subtitle: 'Comparativa honesta de desnivel, altitud máxima, horas de caminata, paisajes y nivel de afluencia.',
    category: 'Fotografía y Territorio',
    readTime: '7 min de lectura',
    publishedAt: '19 de septiembre de 2026',
    author: {
      name: 'Ramiro Tupayachi, Lic.',
      role: 'Director de Operaciones Andinas & Arqueólogo'
    },
    heroImage: PERU_PHOTOS.vinicunca,
    excerpt: 'Analizamos las tres grandes caminatas de naturaleza de un día desde Cusco para ayudarte a elegir según tu aclimatación, estado físico y el tipo de fotografía que buscas.',
    sections: [
      {
        heading: '1. Vinicunca y el Valle Rojo (5,036 m s.n.m.)',
        paragraphs: [
          'La Montaña de 7 Colores por la ruta corta de Phulawasipata (4,630 m) implica una caminata de unas 1.5 a 2 horas de ascenso. Partimos de Cusco a las 04:15 hrs para ganar las primeras luces sobre la cordillera del Vilcanota y sumamos siempre el desvío de 25 minutos hacia el mirador del Valle Rojo (4,950–5,050 m), un paisaje ferroso casi libre de multitudes.'
        ],
        proTip: 'No realices Vinicunca en tu primer o segundo día en Cusco; aguarda al menos hasta el cuarto día tras aclimatarte en Valle Sagrado y Machu Picchu.'
      },
      {
        heading: '2. Laguna Humantay (4,200 m s.n.m.)',
        paragraphs: [
          'Ubicada en la cordillera de Vilcabamba al pie del nevado Salkantay (6,271 m), Humantay tiene 836 metros menos de altitud que Vinicunca, por lo que la respiración resulta más cómoda a pesar de la pendiente sostenida desde Soraypampa (3,900 m).'
        ]
      },
      {
        heading: '3. Las 7 Lagunas de Ausangate y Termales de Pacchanta (4,300–4,650 m s.n.m.)',
        paragraphs: [
          'Es el secreto mejor guardado para fotógrafos y caminantes que buscan autenticidad sin aglomeraciones: 4 a 4.5 horas de sendero circular entre rebaños de alpacas bajo la pared glaciar del Ausangate (6,384 m), culminando en las pozas termales al aire libre de Pacchanta.'
        ]
      }
    ],
    relatedTourSlugs: ['montana-siete-colores-vinicunca-valle-rojo', 'laguna-humantay-glaciar-salkantay', 'expedicion-fotografica-7-lagunas-ausangate-aguas-termales-pacchanta'],
    relatedDestinationSlug: 'cusco'
  },
  {
    id: 'blog-04',
    slug: 'ruta-del-pisco-y-desierto-costero-paracas-ica-nazca',
    title: 'Crónica del Desierto Costero: De los Acantilados de Paracas a los Acueductos de Nazca',
    subtitle: 'Cómo articular la costa sur peruana entre reservas marinas, viñedos patrimoniales, dunas y geoglifos milenarios.',
    category: 'Rutas y Logística',
    readTime: '6 min de lectura',
    publishedAt: '5 de septiembre de 2026',
    author: {
      name: 'Matías Solari',
      role: 'Curador de Rutas Costeras y Gastronómicas'
    },
    heroImage: PERU_PHOTOS.paracasReserva,
    excerpt: 'A unas tres horas y media al sur de Lima comienza uno de los desiertos más singulares de la Tierra. Te explicamos cómo recorrer Paracas, Ica, Huacachina y Nazca en 1 o 2 días.',
    sections: [
      {
        heading: 'La corriente de Humboldt y la península de Paracas',
        paragraphs: [
          'El encuentro entre el desierto costero de Ica y las aguas frías de la corriente de Humboldt sostiene un ecosistema extraordinario en las Islas Ballestas y la Reserva Nacional de Paracas: pingüinos de Humboldt, lobos marinos, piqueros y flamencos conviven frente a acantilados ocres y las arenas volcánicas de Playa Roja.'
        ],
        proTip: 'Las embarcaciones a las Islas Ballestas zarpan por la mañana (08:00 AM y 10:00 AM), antes de que se intensifique el viento costero de la tarde.'
      },
      {
        heading: 'El valle de Ica: Quebranta, Italia y Mosto Verde',
        paragraphs: [
          'En el oasis agrícola de Ica se cultivan las ocho cepas pisqueras del Perú. Conocer en bodega la diferencia entre un Pisco Puro de uva no aromática (Quebranta), un Pisco Aromático (Italia o Torontel) y un Mosto Verde destilado antes de concluir la fermentación transforma la cata del destilado bandera peruano.'
        ]
      }
    ],
    relatedTourSlugs: ['paracas-islas-ballestas-reserva-oasis-huacachina-full-day', 'paracas-reserva-nacional-ruta-del-pisco-huacachina-2d-1n', 'sobrevuelo-lineas-de-nazca-acueductos-cantalloc-cahuachi'],
    relatedDestinationSlug: 'paracas-huacachina'
  },
  {
    id: 'blog-05',
    slug: 'mapa-gastronomico-lima-mercados-cevicherias-picanterias',
    title: 'Anatomía del Sabor Peruano: De las Barras Cevicheras de Lima a las Picanterías de Arequipa y Cusco',
    subtitle: 'Guía editorial de ingredientes nativos, horarios tradicionales y experiencias culinarias imprescindibles.',
    category: 'Gastronomía',
    readTime: '6 min de lectura',
    publishedAt: '22 de agosto de 2026',
    author: {
      name: 'Matías Solari',
      role: 'Curador de Rutas Costeras y Gastronómicas'
    },
    heroImage: PERU_PHOTOS.cevichePeru,
    excerpt: 'En el Perú cada piso ecológico define un recetario propio: el ceviche fresco frente al Pacífico, el chupe y rocoto en la campiña arequipeña y el cacao chuncho en el Cusco.',
    sections: [
      {
        heading: 'Por qué el Ceviche en Lima es un ritual de mediodía',
        paragraphs: [
          'A diferencia de otras preparaciones marinas del continente donde el pescado se macera durante horas, el ceviche limeño se prepara al instante: cubos de lenguado, corvina o cabrilla fresca tocados apenas un minuto por jugo de limón sutil de Piura recién exprimido, ají limo aromático, cebolla roja en pluma y sal marina, servidos con camote glaseado y choclo tierno.'
        ],
        proTip: 'Visita los mercados de productores como Surquillo N.º 1 entre las 09:00 y las 11:00 AM para probar chirimoya, lúcuma, granadilla y pacae en su punto óptimo.'
      },
      {
        heading: 'Cacao Chuncho del Cusco y Cafés de Altura',
        paragraphs: [
          'En los valles cálidos de Quillabamba (La Convención, Cusco) crece el cacao nativo Chuncho, reconocido internacionalmente como uno de los cacaos finos de aroma más florales y complejos.'
        ]
      }
    ],
    relatedTourSlugs: ['experiencia-gastronomica-lima-mercado-ceviche-pisco-huaca', 'cusco-gastronomico-mercado-san-pedro-picanteria-cacao'],
    relatedDestinationSlug: 'lima'
  },
  {
    id: 'blog-06',
    slug: 'trenes-a-machu-picchu-comparativa-expedition-vistadome-360-first-class',
    title: 'Trenes hacia Machu Picchu: Diferencias reales entre Expedition, Voyager, Vistadome, 360° y First Class',
    subtitle: 'Qué ofrece cada categoría ferroviaria entre Ollantaytambo y Aguas Calientes para tomar la mejor decisión.',
    category: 'Rutas y Logística',
    readTime: '5 min de lectura',
    publishedAt: '8 de agosto de 2026',
    author: {
      name: 'Valeria Montesinos',
      role: 'Especialista en Diseño de Itinerarios a Medida'
    },
    heroImage: PERU_PHOTOS.machuPicchuTrain,
    excerpt: 'El trayecto ferroviario por el cañón del Urubamba es una de las rutas de tren más escénicas de Sudamérica. Comparamos vagones, ventanas y servicios a bordo.',
    sections: [
      {
        heading: '1. Categoría Turística Estándar (Expedition y The Voyager)',
        paragraphs: [
          'Vagones confortables con mesas centrales y ventanas amplias que recorren el cañón entre Ollantaytambo (2,792 m) y Aguas Calientes (2,040 m) en aproximadamente 1h 30min a 1h 40min. Constituyen la base excelente de nuestros programas clásicos.'
        ]
      },
      {
        heading: '2. Categoría Panorámica (Vistadome y The 360°)',
        paragraphs: [
          'A medida que las paredes de granito del cañón superan los 800 metros de altura, los cristales superiores del Vistadome o el coche mirador al aire libre del 360° marcan una diferencia visual notable. Suman refrigerio con insumos andinos y bebidas calientes.'
        ],
        proTip: 'Una combinación muy acertada es tomar el tren de ida temprano en categoría Expedition y reservar el retorno de tarde con luz diurna en el vagón panorámico Vistadome.'
      }
    ],
    relatedTourSlugs: ['machu-picchu-full-day-tren-panoramico', 'expedicion-privada-autor-valle-sagrado-picnic-andino-machu-picchu-lujo'],
    relatedDestinationSlug: 'valle-sagrado-machu-picchu'
  },
  {
    id: 'blog-07',
    slug: 'cuando-viajar-a-tambopata-amazonia-peruana-equipaje-fauna',
    title: 'Preparando tu Expedición a la Reserva Nacional Tambopata: Épocas, Fauna y Equipaje Inteligente',
    subtitle: 'Cómo conectar desde Cusco en 55 minutos hacia la selva de Madre de Dios y qué esperar en el Lago Sandoval.',
    category: 'Preparación de Viaje',
    readTime: '6 min de lectura',
    publishedAt: '25 de julio de 2026',
    author: {
      name: 'Ramiro Tupayachi, Lic.',
      role: 'Director de Operaciones Andinas & Arqueólogo'
    },
    heroImage: PERU_PHOTOS.tambopataMacaws,
    excerpt: 'Puerto Maldonado es la puerta de acceso más cercana y biodiversa hacia la Amazonía sur del Perú. Te detallamos qué llevar en tu bolso de mano al Eco-Lodge.',
    sections: [
      {
        heading: 'Por qué Tambopata es el complemento natural de Cusco',
        paragraphs: [
          'En menos de una hora de vuelo pasas de los 3,399 metros de los Andes cusqueños a los 183 metros de altitud de la cuenca del Madre de Dios. La Reserva Nacional Tambopata protege bosques primarios habitados por nutrias gigantes de río (Pteronura brasiliensis), nueve especies de monos, caimanes negros y guacamayos escarlata.'
        ],
        proTip: 'Evita prendas de color negro o azul oscuro durante las caminatas por selva húmeda; opta por camisas ligeras de manga larga en tonos arena, caqui, gris claro o verde oliva.'
      },
      {
        heading: 'Equipaje hacia los albergues fluviales',
        paragraphs: [
          'Como el ingreso a los Eco-Lodges se realiza en embarcaciones fluviales con motor fuera de borda por el río Madre de Dios, las maletas grandes con ropa de abrigo quedan custodiadas en nuestra sede de Puerto Maldonado, embarcando solo con una mochila o bolso blando de unos 10 kg.'
        ]
      }
    ],
    relatedTourSlugs: ['expedicion-amazonica-tambopata-lago-sandoval-collpa-guacamayos-3d', 'paquete-biodiversidad-andes-amazonia-10-dias-lima-cusco-machu-picchu-tambopata'],
    relatedDestinationSlug: 'amazonia-tambopata'
  },
  {
    id: 'blog-08',
    slug: 'arquitectura-del-sur-peruano-arequipa-colca-y-ruta-del-sol',
    title: 'La Ruta Terrestre de los Volcanes y el Altiplano: Arequipa, Cañón del Colca, Titicaca y la Ruta del Sol',
    subtitle: 'Por qué cruzar los Andes del sur por tierra es la travesía cultural y paisajística más rica del Perú.',
    category: 'Cultura Viva',
    readTime: '7 min de lectura',
    publishedAt: '10 de julio de 2026',
    author: {
      name: 'Valeria Montesinos',
      role: 'Especialista en Diseño de Itinerarios a Medida'
    },
    heroImage: PERU_PHOTOS.raqchi,
    excerpt: 'De las bóvedas blancas de sillar en Arequipa a las terrazas Collaguas del Colca, las islas tejidas del Titicaca y los templos barrocos de la Ruta del Sol hacia Cusco.',
    sections: [
      {
        heading: 'El ascenso escalonado hacia el altiplano',
        paragraphs: [
          'Quienes disponen de 10 a 12 días encuentran en el corredor sur una secuencia geográfica admirable: desde la costa desértica hasta Arequipa (2,335 m) —con un breve paso panorámico por Patapampa (4,910 m) al cruzar hacia el Valle del Colca (3,635 m)—, siguiendo luego al Lago Titicaca (3,812 m) y finalmente a Cusco (3,399 m).'
        ],
        proTip: 'En lugar de regresar desde el Cañón del Colca hasta Arequipa para tomar otro transporte hacia Puno, enlazamos directamente desde Chivay hacia Puno la tarde del segundo día.'
      },
      {
        heading: 'La Ruta del Sol entre Puno y Cusco',
        paragraphs: [
          'El viaje diurno entre el Titicaca y Cusco sigue el eje del antiguo Qollasuyu, deteniéndose en el Museo Lítico de Pukara (3,870 m), el abra glaciar de La Raya (4,335 m), el santuario inca de Wiracocha en Raqchi (3,450 m) y el templo de San Pedro Apóstol de Andahuaylillas (3,122 m).'
        ]
      }
    ],
    relatedTourSlugs: ['gran-circuito-sur-peru-12-dias-lima-paracas-nazca-arequipa-titicaca-cusco', 'arequipa-canon-del-colca-2-dias-chivay-cruz-del-condor', 'ruta-del-sol-cusco-puno-raqchi-andahuaylillas'],
    relatedDestinationSlug: 'arequipa-colca'
  }
];
