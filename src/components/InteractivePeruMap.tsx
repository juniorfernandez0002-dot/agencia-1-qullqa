import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Clock, MapPin, Mountain } from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { ALL_TOURS } from '../data/catalog';
import type { DestinationSlug, TourProduct } from '../types/tourism';
import { usePreferences } from '../context/PreferencesContext';
import { PeruLeafletMap } from './PeruLeafletMap';

const EMBLEMATIC_VALLE_SAGRADO_SLUGS: readonly string[] = [
  'valle-sagrado-completo-pisac-maras-moray-ollantaytambo',
  'machu-picchu-full-day-tren-panoramico',
  'machu-picchu-2-dias-pernocte-aguas-calientes',
];

const ACCLIMATIZATION_NOTES: Record<DestinationSlug, string> = {
  'valle-sagrado-machu-picchu':
    'El piso templado del Valle (2,040–2,871 m) permite aclimatar el organismo con comodidad antes de ascender a mesetas sobre 3,500 m o retornar a Cusco (3,399 m).',
  cusco:
    'Recomendamos iniciar con recorridos urbanos pausados (3,399 m) e hidratación continua, reservando las rutas de alta montaña sobre 4,200 m para los últimos días.',
  'puno-titicaca':
    'Meseta altoandina sobre 3,812 m: conviene ritmo tranquilo el primer día o llegar progresivamente por carretera desde Arequipa o Cusco.',
  'arequipa-colca':
    'Arequipa (2,335 m) brinda una escala ideal de adaptación intermedia antes de cruzar el paso de Patapampa (4,910 m) rumbo al Valle del Colca.',
  lima:
    'Costa central a nivel del mar (0–161 m): no requiere aclimatación y funciona como prólogo o cierre descansado de tu circuito.',
  'paracas-huacachina':
    'Litoral y desierto de Ica (0–500 m): clima cálido a baja altitud apto para todo tipo de viajero desde el primer día.',
  nazca:
    'Cuenca desértica de altura baja (360–588 m): ideal para combinar por vía terrestre con Paracas antes de subir a los Andes del sur.',
  'amazonia-tambopata':
    'Llano amazónico a baja elevación (180–400 m): contraste climático cálido y húmedo tras el descenso desde los Andes.',
};

function selectRelatedTours(slug: DestinationSlug): TourProduct[] {
  const matching = ALL_TOURS.filter((tour) =>
    tour.visitedDestinations.includes(slug)
  );

  const sorted = [...matching].sort((a, b) => {
    if (slug === 'valle-sagrado-machu-picchu') {
      const aRank = EMBLEMATIC_VALLE_SAGRADO_SLUGS.indexOf(a.slug);
      const bRank = EMBLEMATIC_VALLE_SAGRADO_SLUGS.indexOf(b.slug);
      if (aRank !== -1 || bRank !== -1) {
        if (aRank === -1) return 1;
        if (bRank === -1) return -1;
        return aRank - bRank;
      }
    }

    const aPrimary = a.destinationSlug === slug ? 0 : 1;
    const bPrimary = b.destinationSlug === slug ? 0 : 1;
    return aPrimary - bPrimary;
  });

  return sorted.slice(0, 3);
}

export const InteractivePeruMap: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState<DestinationSlug>(
    'valle-sagrado-machu-picchu'
  );
  const { formatPrice } = usePreferences();

  const activeDest = useMemo(
    () =>
      DESTINATIONS_DATA.find((d) => d.slug === activeSlug) ??
      DESTINATIONS_DATA[0],
    [activeSlug]
  );

  const relatedTours = useMemo(
    () => selectRelatedTours(activeDest.slug),
    [activeDest.slug]
  );

  const bestSeasonShort = activeDest.bestSeason.split('(')[0].trim();

  return (
    <div className="bg-[#18221F] text-[#FAF8F5] rounded-lg border border-white/12 overflow-hidden shadow-2xl">
      <div className="grid lg:grid-cols-12">
        {/* Columna Izquierda: Atlas Real Leaflet + Selector de 8 Regiones */}
        <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/12 flex flex-col justify-between gap-5">
          <div className="space-y-1.5">
            <span className="eyebrow-editorial text-[#E8B954] block">
              Atlas del Perú · 8 Regiones
            </span>
            <h3 className="font-serif-editorial text-2xl sm:text-[26px] font-semibold text-[#FAF8F5] leading-tight">
              Explora cada territorio sobre cartografía real
            </h3>
          </div>

          <PeruLeafletMap
            mode="atlas"
            activeSlug={activeSlug}
            onSelectDestination={setActiveSlug}
            heightClass="h-[430px] lg:h-[490px]"
          />

          <div className="space-y-2 pt-2 border-t border-white/10">
            <span className="eyebrow-editorial text-[#C7C2B8] block">
              Seleccionar región
            </span>
            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-label="Selector de regiones del Perú"
            >
              {DESTINATIONS_DATA.map((dest) => {
                const isSelected = dest.slug === activeSlug;
                return (
                  <button
                    key={dest.slug}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveSlug(dest.slug)}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors text-left max-w-full sm:whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#D9532F] text-[#FAF8F5] border-[#E87A5A]/60 shadow-sm'
                        : 'bg-[#1E2B27] text-[#C7C2B8] border-white/10 hover:text-[#FAF8F5] hover:border-[#D49B35]/45'
                    }`}
                  >
                    {dest.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Dossier Editorial, Perfil Altitudinal y Rutas */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-5">
            {/* Cabecera del destino */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="eyebrow-editorial text-[#E8B954]">
                {activeDest.region}
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-[#1E2B27] border border-white/10 text-[#C7C2B8] num-tabular">
                {activeDest.temperatureRange}
              </span>
            </div>

            <div className="grid sm:grid-cols-12 gap-5 items-start">
              <div className="sm:col-span-7 space-y-2.5">
                <h4 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#FAF8F5] leading-tight">
                  {activeDest.name}
                </h4>
                <p className="text-sm sm:text-[15px] text-[#E8B954] font-medium leading-snug">
                  {activeDest.tagline}
                </p>
                <p className="text-sm text-[#C7C2B8] leading-relaxed prose-measure">
                  {activeDest.editorialIntro}
                </p>
              </div>

              <div className="sm:col-span-5">
                <div className="rounded-md overflow-hidden bg-[#1E2B27] border border-white/10">
                  <img
                    src={activeDest.heroImage}
                    alt={activeDest.name}
                    className="w-full h-44 sm:h-48 object-cover block"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Perfil Altitudinal Estructurado por Localidad */}
            <div className="rounded-md bg-[#1E2B27] border border-white/10 p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-[#E8B954] shrink-0" />
                  <span className="eyebrow-editorial text-[#E8B954]">
                    Perfil Altitudinal por Localidad
                  </span>
                </div>
                <span className="text-xs text-[#C7C2B8] num-tabular">
                  {activeDest.recommendedStay}
                </span>
              </div>

              {activeDest.localityAltitudes &&
              activeDest.localityAltitudes.length > 0 ? (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {activeDest.localityAltitudes.map((item) => (
                    <div
                      key={item.place}
                      className="flex items-baseline justify-between gap-3 py-1.5 border-b border-white/8"
                    >
                      <dt className="text-xs sm:text-[13px] text-[#FAF8F5] font-medium leading-snug">
                        {item.place}
                      </dt>
                      <dd className="text-xs text-[#E8B954] font-semibold num-tabular whitespace-nowrap shrink-0">
                        {item.altitude}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="text-sm font-medium text-[#FAF8F5] num-tabular">
                  {activeDest.altitudeRange}
                </div>
              )}

              <p className="text-xs text-[#C7C2B8] leading-relaxed pt-0.5">
                <strong className="text-[#FAF8F5] font-semibold">
                  Nota de aclimatación:
                </strong>{' '}
                {ACCLIMATIZATION_NOTES[activeDest.slug]}
              </p>
            </div>

            {/* Datos prácticos de estadía y temporada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-md bg-[#1E2B27] border border-white/10 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E8B954] shrink-0 mt-0.5" />
                <div>
                  <span className="eyebrow-editorial text-[#C7C2B8] block">
                    Estadía sugerida
                  </span>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#FAF8F5] mt-0.5 block num-tabular">
                    {activeDest.recommendedStay}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-md bg-[#1E2B27] border border-white/10 flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#E8B954] shrink-0 mt-0.5" />
                <div>
                  <span className="eyebrow-editorial text-[#C7C2B8] block">
                    Mejor temporada
                  </span>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#FAF8F5] mt-0.5 block">
                    {bestSeasonShort}
                  </span>
                </div>
              </div>
            </div>

            {/* Experiencias y Paquetes Relacionados */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="eyebrow-editorial text-[#C7C2B8]">
                  Rutas destacadas en {activeDest.name}
                </span>
                <Link
                  to={`/destinos/${activeDest.slug}`}
                  className="text-xs text-[#E8B954] hover:text-[#FAF8F5] font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <span>Abrir dossier completo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {relatedTours.map((tour) => (
                  <Link
                    key={tour.id}
                    to={`/tours/${tour.slug}`}
                    className="p-3.5 rounded-md bg-[#1E2B27] hover:bg-[#24282E] border border-white/10 hover:border-[#D49B35]/45 flex items-center justify-between gap-4 transition-colors group"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-semibold text-[#E8B954] num-tabular">
                        <span>{tour.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{tour.durationLabel}</span>
                      </div>
                      <div className="text-sm font-semibold text-[#FAF8F5] group-hover:text-[#E8B954] leading-snug transition-colors">
                        {tour.shortTitle ?? tour.title}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="block text-[11px] text-[#C7C2B8]">
                        Desde
                      </span>
                      <span className="block text-sm font-bold text-[#FAF8F5] num-tabular">
                        {formatPrice(tour.priceUsd)}
                      </span>
                      <span className="text-[11px] text-[#E87A5A] group-hover:text-[#E8B954] inline-flex items-center gap-0.5 transition-colors">
                        Ver ficha <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Barra de Acción Editorial */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/destinos/${activeDest.slug}`}
              className="px-5 py-2.5 rounded bg-[#D9532F] hover:bg-[#B84020] text-[#FAF8F5] text-xs font-semibold tracking-wide inline-flex items-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Explorar guía de {activeDest.name}</span>
            </Link>

            <Link
              to={`/catalogo?destino=${activeDest.slug}`}
              className="text-xs font-medium text-[#C7C2B8] hover:text-[#E8B954] inline-flex items-center gap-1 transition-colors"
            >
              <span>Filtrar catálogo por esta región</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
