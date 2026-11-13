import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Mountain,
  Calendar,
  Clock,
  Thermometer,
  Compass,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { ALL_TOURS } from '../data/catalog';
import { TourCard } from '../components/TourCard';
import { InteractivePeruMap } from '../components/InteractivePeruMap';
import { PeruLeafletMap } from '../components/PeruLeafletMap';
import type { DestinationGuide, DestinationSlug } from '../types/tourism';

const ACCLIMATIZATION_EXPLANATIONS: Record<DestinationSlug, string> = {
  'valle-sagrado-machu-picchu':
    'Dormir las primeras noches en el Valle Sagrado (Urubamba a 2,871 m o Ollantaytambo a 2,792 m) y visitar Machu Picchu (2,430 m) o Aguas Calientes (2,040 m) antes de pernoctar en Cusco (3,399 m) permite una aclimatación gradual y reduce notablemente la fatiga de altura.',
  cusco:
    'La ciudad de Cusco se sitúa a 3,399 m s.n.m.; conviene destinar las primeras 24–48 horas a paseos urbanos o descender al Valle Sagrado antes de ascender a lagunas y pasos sobre los 4,200 m.',
  'puno-titicaca':
    'Al situarse sobre la meseta del Collao a 3,812 m s.n.m., se recomienda llegar desde Arequipa o Cusco con hidratación constante y actividades pausadas en la primera jornada.',
  'arequipa-colca':
    'La Ciudad Blanca (2,335 m) brinda una transición fisiológica ideal entre la costa y el altiplano antes de cruzar el paso de Patapampa (4,910 m) rumbo al Valle del Colca.',
  lima:
    'Sobre los acantilados del Pacífico entre 0 y 161 m s.n.m., Lima no requiere aclimatación previa y permite iniciar el viaje descansado.',
  'paracas-huacachina':
    'Costa sur desértica entre el nivel del mar y los 500 m de las dunas de Ica: temperatura cálida y cero exigencia de altura.',
  nazca:
    'Cuenca desértica entre los 360 y 588 m s.n.m., ideal para recorridos aéreos y arqueológicos terrestres en transición hacia la sierra sur.',
  'amazonia-tambopata':
    'Selva baja amazónica entre los 180 y 400 m s.n.m.: clima tropical húmedo sin requerimiento de aclimatación de altura.',
};

function countToursForDestination(slug: DestinationSlug): number {
  return ALL_TOURS.filter((tour) => tour.visitedDestinations.includes(slug))
    .length;
}

interface DestinationEditorialCardProps {
  dest: DestinationGuide;
  layout?: 'featured-wide' | 'featured-tall' | 'standard';
}

const DestinationEditorialCard: React.FC<DestinationEditorialCardProps> = ({
  dest,
  layout = 'standard',
}) => {
  const countTours = countToursForDestination(dest.slug);
  const bestSeasonShort = dest.bestSeason.split('(')[0].trim();

  if (layout === 'featured-wide') {
    const highlightLocalities = dest.localityAltitudes ?? [];
    return (
      <article className="group bg-[#FFFFFF] rounded-md border border-[#18221F]/14 overflow-hidden hover:border-[#18221F]/30 hover:shadow-xl transition-shadow duration-300 grid lg:grid-cols-12">
        <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] overflow-hidden bg-[#18221F]">
          <img
            src={dest.heroImage}
            alt={dest.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          />
          <div className="photo-scrim-top absolute inset-x-0 top-0 h-28 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#18221F]/90 via-[#18221F]/45 to-transparent pointer-events-none" />

          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-xs bg-[#18221F]/85 text-[#E8B954] font-medium backdrop-blur-xs">
              Guía Destacada · {dest.region}
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#D9532F] text-white font-semibold num-tabular">
              {countTours} experiencias vinculadas
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-[#FAF8F5]">
            <Link to={`/destinos/${dest.slug}`}>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white group-hover:text-[#E8B954] transition-colors duration-200">
                {dest.name}
              </h3>
            </Link>
            <p className="text-xs sm:text-sm text-[#FAF8F5] mt-1">
              {dest.tagline}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-7 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <p className="text-sm text-[#525E5A] leading-relaxed prose-measure">
              {dest.editorialIntro}
            </p>

            {highlightLocalities.length > 0 && (
              <div className="p-4 rounded bg-[#FAF8F5] border border-[#18221F]/10 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="eyebrow-editorial text-[#B84020]">
                    Pisos Altitudinales por Localidad
                  </span>
                  <span className="text-xs text-[#525E5A] num-tabular">
                    {dest.recommendedStay}
                  </span>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1">
                  {highlightLocalities.map((loc) => (
                    <div
                      key={loc.place}
                      className="flex items-baseline justify-between gap-2 py-1 border-b border-[#18221F]/8 text-xs"
                    >
                      <dt className="text-[#18221F] font-medium truncate">
                        {loc.place.split('(')[0].trim()}
                      </dt>
                      <dd className="text-[#B84020] font-semibold num-tabular whitespace-nowrap shrink-0">
                        {loc.altitude}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs text-[#525E5A] leading-relaxed">
                  Escala templada ideal para aclimatarse antes de dormir en Cusco
                  (<span className="num-tabular font-medium">3,399 m</span>).
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#18221F]/10 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#525E5A]">
              Temporada ideal: <strong className="text-[#18221F]">{bestSeasonShort}</strong>
            </span>
            <Link
              to={`/destinos/${dest.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold tracking-wide transition-colors duration-200"
            >
              <span>Explorar {dest.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  const imageHeight = layout === 'featured-tall' ? 'h-64 sm:h-72' : 'h-56';

  return (
    <article className="group bg-[#FFFFFF] rounded-md border border-[#18221F]/14 overflow-hidden hover:border-[#18221F]/30 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className={`relative ${imageHeight} overflow-hidden bg-[#18221F]`}>
          <img
            src={dest.heroImage}
            alt={dest.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          />
          <div className="photo-scrim-top absolute inset-x-0 top-0 h-24 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#18221F]/90 via-[#18221F]/40 to-transparent pointer-events-none" />

          <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-xs bg-[#18221F]/85 text-[#E8B954] font-medium backdrop-blur-xs">
              {dest.region}
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#D9532F] text-white font-semibold num-tabular">
              {countTours} rutas
            </span>
          </div>

          <div className="absolute bottom-3.5 left-4 right-4 text-[#FAF8F5]">
            <Link to={`/destinos/${dest.slug}`}>
              <h3 className="font-serif-editorial text-2xl font-bold text-white group-hover:text-[#E8B954] transition-colors duration-200">
                {dest.name}
              </h3>
            </Link>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-sm text-[#18221F] font-semibold leading-snug">
            {dest.tagline}
          </p>
          <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
            {dest.editorialIntro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
            <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#18221F]/8">
              <span className="eyebrow-editorial text-[#525E5A] block mb-0.5">
                Altitud
              </span>
              <strong className="text-[#18221F] num-tabular leading-snug block">
                {dest.altitudeRange}
              </strong>
            </div>
            <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#18221F]/8">
              <span className="eyebrow-editorial text-[#525E5A] block mb-0.5">
                Estadía sugerida
              </span>
              <strong className="text-[#18221F] num-tabular leading-snug block">
                {dest.recommendedStay}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-4 bg-[#FAF8F5] border-t border-[#18221F]/10 flex items-center justify-between gap-2">
        <span className="text-xs text-[#525E5A]">{bestSeasonShort}</span>
        <Link
          to={`/destinos/${dest.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#B84020] hover:text-[#18221F] transition-colors duration-200 shrink-0"
        >
          <span>Explorar destino</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export const DestinationsListPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sacredValley = DESTINATIONS_DATA.find(
    (d) => d.slug === 'valle-sagrado-machu-picchu'
  );
  const cusco = DESTINATIONS_DATA.find((d) => d.slug === 'cusco');
  const otherDestinations = DESTINATIONS_DATA.filter(
    (d) => d.slug !== 'valle-sagrado-machu-picchu' && d.slug !== 'cusco'
  );

  return (
    <div className="pb-20 space-y-16">
      {/* Hero Banner */}
      <section className="bg-[#18221F] text-[#FAF8F5] py-14 border-b border-white/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-4">
          <span className="eyebrow-editorial text-[#E8B954] block">
            Atlas Territorial del Perú · 8 Regiones Operativas
          </span>
          <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#FAF8F5]">
            Destinos del Perú: Costa, Andes y Amazonía
          </h1>
          <p className="text-sm sm:text-base text-[#C7C2B8] prose-measure leading-relaxed">
            Cada territorio cuenta con guía editorial propia, desglose altitudinal
            por localidad, estacionalidad climática y enlace directo a las rutas
            de un día y circuitos multidía que operamos en la región.
          </p>
        </div>
      </section>

      {/* Interactive Real Atlas */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <InteractivePeruMap />
      </section>

      {/* Asymmetric Editorial Destinations Showcase */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
        <div className="space-y-1.5">
          <span className="eyebrow-editorial text-[#B84020] block">
            Guías Individuales de Destino
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F]">
            Explora cada región y sus pisos altitudinales
          </h2>
        </div>

        {/* Asymmetric Priority Spread: Valle Sagrado (7 cols) + Cusco (5 cols) */}
        {(sacredValley || cusco) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            {sacredValley && (
              <div className="lg:col-span-7 flex">
                <DestinationEditorialCard
                  dest={sacredValley}
                  layout="featured-wide"
                />
              </div>
            )}
            {cusco && (
              <div className="lg:col-span-5 flex">
                <DestinationEditorialCard
                  dest={cusco}
                  layout="featured-tall"
                />
              </div>
            )}
          </div>
        )}

        {/* Remaining 6 Regions: Balanced 3-col / 2-col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {otherDestinations.map((dest) => (
            <DestinationEditorialCard
              key={dest.slug}
              dest={dest}
              layout="standard"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const dest = DESTINATIONS_DATA.find((d) => d.slug === slug);

  if (!dest) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-24 text-center space-y-4">
        <h1 className="font-serif-editorial text-4xl font-bold text-[#18221F]">
          Destino No Encontrado
        </h1>
        <Link
          to="/destinos"
          className="inline-block px-6 py-3 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-sm font-semibold transition-colors duration-200"
        >
          Volver al Atlas de Destinos
        </Link>
      </div>
    );
  }

  const primaryTours = ALL_TOURS.filter(
    (t) => t.destinationSlug === dest.slug
  );
  const connectingTours = ALL_TOURS.filter(
    (t) =>
      t.destinationSlug !== dest.slug &&
      t.visitedDestinations.includes(dest.slug)
  );
  const totalLinkedTours = primaryTours.length + connectingTours.length;

  return (
    <div className="pb-20 space-y-14">
      {/* Hero Editorial Section */}
      <section className="relative bg-[#18221F] text-[#FAF8F5] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="photo-scrim-top absolute inset-x-0 top-0 h-32 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18221F] via-[#18221F]/65 to-transparent" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 relative z-10 w-full space-y-4">
          <nav
            aria-label="Ruta de navegación"
            className="flex flex-wrap items-center gap-1.5 text-xs text-[#C7C2B8]"
          >
            <Link to="/" className="hover:text-[#E8B954] transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to="/destinos"
              className="hover:text-[#E8B954] transition-colors"
            >
              Destinos
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#E8B954] font-medium">{dest.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="px-2.5 py-1 rounded bg-[#D9532F] text-white font-semibold">
              {dest.region}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#1E2B27]/90 border border-white/15 text-[#E8B954] num-tabular">
              {dest.coordinates}
            </span>
          </div>

          <h1 className="font-serif-editorial text-4xl sm:text-6xl font-bold text-white">
            {dest.name}
          </h1>
          <p className="text-base sm:text-xl text-[#FAF8F5] max-w-3xl">
            {dest.tagline}
          </p>
        </div>
      </section>

      {/* Key Metrics Bar */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-[#FFFFFF] p-6 rounded-md border border-[#18221F]/15 shadow-lg">
          <div className="flex items-start gap-3">
            <Mountain className="w-5 h-5 text-[#B84020] shrink-0 mt-0.5" />
            <div>
              <span className="eyebrow-editorial text-[#525E5A] block mb-0.5">
                Rango Altitudinal
              </span>
              <strong className="text-xs sm:text-sm text-[#18221F] num-tabular leading-snug block">
                {dest.altitudeRange}
              </strong>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#B84020] shrink-0 mt-0.5" />
            <div>
              <span className="eyebrow-editorial text-[#525E5A] block mb-0.5">
                Duración Recomendada
              </span>
              <strong className="text-xs sm:text-sm text-[#18221F] num-tabular leading-snug block">
                {dest.recommendedStay}
              </strong>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#B84020] shrink-0 mt-0.5" />
            <div>
              <span className="eyebrow-editorial text-[#525E5A] block mb-0.5">
                Temporadas
              </span>
              <strong className="text-xs sm:text-sm text-[#18221F] leading-snug block">
                {dest.bestSeason}
              </strong>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Thermometer className="w-5 h-5 text-[#1F513F] shrink-0 mt-0.5" />
            <div>
              <span className="eyebrow-editorial text-[#525E5A] block mb-0.5">
                Clima / Temperatura
              </span>
              <strong className="text-xs sm:text-sm text-[#18221F] num-tabular leading-snug block">
                {dest.temperatureRange}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Presentation + Locality Altitude Profile + Real Leaflet Detail Map */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/12 space-y-4">
            <span className="eyebrow-editorial text-[#B84020] block">
              Presentación Editorial &amp; Contexto Territorial
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F]">
              Por qué viajar a {dest.name}
            </h2>
            <p className="text-base text-[#18221F] font-medium leading-relaxed prose-measure">
              {dest.editorialIntro}
            </p>
            <p className="text-sm sm:text-base text-[#525E5A] leading-relaxed prose-measure">
              {dest.editorialBody}
            </p>

            {/* Section Photo Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {dest.gallery.map((img, i) => (
                <img
                  key={img + i}
                  src={img}
                  alt={`${dest.name} vista ${i + 1}`}
                  loading="lazy"
                  className="w-full h-32 object-cover rounded border border-[#18221F]/10"
                />
              ))}
            </div>
          </div>

          {/* Altitudinal Profile by Locality + Acclimatization Note */}
          {dest.localityAltitudes && dest.localityAltitudes.length > 0 && (
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/12 space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <span className="eyebrow-editorial text-[#B84020] block">
                    Desglose Geográfico de Altura
                  </span>
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
                    Altitud por Localidad y Estrategia de Aclimatación
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#525E5A] num-tabular">
                  {dest.localityAltitudes.length} puntos clave
                </span>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {dest.localityAltitudes.map((item) => (
                  <div
                    key={item.place}
                    className="flex items-baseline justify-between gap-4 py-2.5 border-b border-[#18221F]/10"
                  >
                    <dt className="text-sm font-medium text-[#18221F]">
                      {item.place}
                    </dt>
                    <dd className="text-sm font-semibold text-[#B84020] num-tabular whitespace-nowrap shrink-0">
                      {item.altitude}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="p-4 rounded bg-[#F2EFE9] border-l-4 border-[#D9532F] text-xs sm:text-sm text-[#18221F] leading-relaxed">
                <strong className="font-semibold block mb-0.5">
                  Criterio de aclimatación en ruta:
                </strong>
                {ACCLIMATIZATION_EXPLANATIONS[dest.slug]}
              </div>
            </div>
          )}

          {/* Must Visit Places */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/12 space-y-6">
            <div>
              <span className="eyebrow-editorial text-[#B84020] block">
                Hitos Patrimoniales y Naturales
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
                Qué Visitar en {dest.name}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {dest.mustVisit.map((place) => (
                <div
                  key={place.name}
                  className="p-4 rounded bg-[#FAF8F5] border border-[#18221F]/10 space-y-2"
                >
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded bg-[#18221F] text-[#E8B954]">
                    {place.tag}
                  </span>
                  <h3 className="font-serif-editorial text-lg font-bold text-[#18221F]">
                    {place.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                    {place.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Real Leaflet Regional Map, Activities & Practical Tips */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Regional Leaflet Map Card */}
          <div className="bg-[#18221F] text-[#FAF8F5] p-5 rounded-md border border-white/15 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="eyebrow-editorial text-[#E8B954] block">
                  Cartografía Regional
                </span>
                <h3 className="font-serif-editorial text-lg font-semibold text-white mt-0.5">
                  Puntos clave de {dest.name}
                </h3>
              </div>
              <MapPin className="w-4 h-4 text-[#E87A5A] shrink-0" />
            </div>

            <PeruLeafletMap
              mode="detail"
              activeSlug={dest.slug}
              heightClass="h-[340px]"
            />

            <div className="text-xs text-[#C7C2B8] flex items-center justify-between gap-2 pt-1 border-t border-white/10">
              <span>Referencia geográfica:</span>
              <strong className="text-[#E8B954] num-tabular">
                {dest.coordinates}
              </strong>
            </div>
          </div>

          {/* Activities */}
          <div className="bg-[#FFFFFF] p-6 rounded-md border border-[#18221F]/12 space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
              Actividades Principales
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#18221F]">
              {dest.activities.map((act) => (
                <li key={act} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1F513F] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Information */}
          <div className="bg-[#F2EFE9] p-6 rounded-md border border-[#18221F]/12 space-y-4">
            <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
              Información Práctica
            </h3>
            {dest.practicalTips.map((tip) => (
              <div key={tip.title} className="space-y-1">
                <h4 className="eyebrow-editorial text-[#B84020]">
                  {tip.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#18221F]/85 leading-relaxed">
                  {tip.detail}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Available Tours & Packages in this Destination */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8 pt-6 border-t border-[#18221F]/12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-editorial text-[#B84020] block">
              Oferta Operativa en {dest.name}
            </span>
            <h2 className="font-serif-editorial text-3xl font-bold text-[#18221F] mt-1">
              Experiencias y Paquetes Disponibles (
              <span className="num-tabular">{totalLinkedTours}</span>)
            </h2>
          </div>
          <Link
            to={`/planificador?destino=${dest.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold tracking-wide transition-colors duration-200"
          >
            <Compass className="w-4 h-4" />
            <span>Personalizar viaje en {dest.name}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {primaryTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              variant="catalog-technical"
            />
          ))}
        </div>

        {/* Multi-region & connecting circuits that also include this destination */}
        {connectingTours.length > 0 && (
          <div className="pt-8 space-y-5">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#18221F]">
              Circuitos y Travesías que también visitan {dest.name}
            </h3>
            <div className="space-y-6">
              {connectingTours.map((pkg) => (
                <TourCard
                  key={pkg.id}
                  tour={pkg}
                  variant="editorial-feature"
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
