import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Calendar,
  Users,
  X,
  ArrowRight,
  Pencil,
  ShoppingCart
} from 'lucide-react';
import { ALL_TOURS, COMMERCIAL_SECTIONS } from '../data/catalog';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TourCard } from '../components/TourCard';
import type { CommercialSectionId, DestinationSlug, TourProduct } from '../types/tourism';
import { usePreferences } from '../context/PreferencesContext';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';
type AltitudeFilter = 'todos' | 'baja' | 'media' | 'alta';
type ModalityFilter = 'todos' | 'grupal-privado' | 'solo-privado';

const DEFAULT_MAX_PRICE_USD = 3500;

function parseMaxAltitudeMeters(altitudeMax: string): number {
  const matches = [...altitudeMax.matchAll(/(\d[\d,]*)\s*m/gi)];
  if (matches.length === 0) return 0;
  return Math.max(...matches.map((m) => Number(m[1].replace(/,/g, ''))));
}

function parseSortOption(value: string | null): SortOption {
  if (
    value === 'price-asc' ||
    value === 'price-desc' ||
    value === 'duration-asc' ||
    value === 'duration-desc'
  ) {
    return value;
  }
  return 'featured';
}

function parseAltitudeFilter(value: string | null): AltitudeFilter {
  if (value === 'baja' || value === 'media' || value === 'alta') {
    return value;
  }
  return 'todos';
}

function parseModalityFilter(value: string | null): ModalityFilter {
  if (value === 'grupal-privado' || value === 'solo-privado') {
    return value;
  }
  return 'todos';
}

function parseMaxPrice(value: string | null): number {
  if (!value) return DEFAULT_MAX_PRICE_USD;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 50 || parsed > DEFAULT_MAX_PRICE_USD) {
    return DEFAULT_MAX_PRICE_USD;
  }
  return parsed;
}

interface FilterState {
  query: string;
  selectedDest: string;
  selectedCat: string;
  durationFilter: string;
  difficultyFilter: string;
  altitudeFilter: AltitudeFilter;
  modalityFilter: ModalityFilter;
  maxPriceUsd: number;
}

function matchesCatalogFilters(
  tour: TourProduct,
  filters: FilterState,
  skipFacet?: 'dest' | 'cat'
): boolean {
  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    const matchText =
      tour.title.toLowerCase().includes(q) ||
      (tour.shortTitle?.toLowerCase().includes(q) ?? false) ||
      tour.subtitle.toLowerCase().includes(q) ||
      tour.code.toLowerCase().includes(q) ||
      tour.destinationName.toLowerCase().includes(q) ||
      tour.placesVisited.some((p) => p.toLowerCase().includes(q));
    if (!matchText) return false;
  }

  if (
    skipFacet !== 'dest' &&
    filters.selectedDest !== 'todos' &&
    !tour.visitedDestinations.includes(filters.selectedDest as DestinationSlug)
  ) {
    return false;
  }

  if (
    skipFacet !== 'cat' &&
    filters.selectedCat !== 'todos' &&
    tour.primaryCategory !== filters.selectedCat &&
    !tour.sections.includes(filters.selectedCat as CommercialSectionId)
  ) {
    return false;
  }

  if (filters.durationFilter === '1-dia' && tour.durationDays !== 1) return false;
  if (
    filters.durationFilter === '2-4-dias' &&
    (tour.durationDays < 2 || tour.durationDays > 4)
  ) {
    return false;
  }
  if (filters.durationFilter === '5-mas' && tour.durationDays < 5) return false;

  if (filters.difficultyFilter !== 'todos' && tour.difficulty !== filters.difficultyFilter) {
    return false;
  }

  if (filters.altitudeFilter !== 'todos') {
    const meters = parseMaxAltitudeMeters(tour.altitudeMax);
    if (filters.altitudeFilter === 'baja' && meters >= 2500) return false;
    if (filters.altitudeFilter === 'media' && (meters < 2500 || meters >= 4000)) return false;
    if (filters.altitudeFilter === 'alta' && meters < 4000) return false;
  }

  if (filters.modalityFilter === 'grupal-privado') {
    const hasBoth =
      tour.modalities.includes('Grupal Reducido') &&
      tour.modalities.includes('Privado a Medida');
    if (!hasBoth) return false;
  } else if (filters.modalityFilter === 'solo-privado') {
    const isPrivateOnly =
      tour.modalities.length === 1 && tour.modalities[0] === 'Privado a Medida';
    if (!isPrivateOnly) return false;
  }

  if (tour.priceUsd > filters.maxPriceUsd) return false;

  return true;
}

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    formatPrice,
    savedSlugs,
    toggleSavedSlug,
    preferredDate,
    setPreferredDate,
    preferredTravelers,
    setPreferredTravelers
  } = usePreferences();

  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');
  const [isEditingTripContext, setIsEditingTripContext] = useState(false);

  const query = searchParams.get('q') ?? '';
  const selectedDest = searchParams.get('destino') ?? 'todos';
  const selectedCat = searchParams.get('categoria') ?? 'todos';
  const durationFilter = searchParams.get('duracion') ?? 'todos';
  const difficultyFilter = searchParams.get('dificultad') ?? 'todos';
  const altitudeFilter = parseAltitudeFilter(searchParams.get('altitud'));
  const modalityFilter = parseModalityFilter(searchParams.get('modalidad'));
  const maxPriceUsd = parseMaxPrice(searchParams.get('max'));
  const sortBy = parseSortOption(searchParams.get('orden'));
  const urlDate = searchParams.get('fecha');
  const urlTravelers = searchParams.get('viajeros');

  const lastSyncedUrlDateRef = useRef<string | null>(null);
  const lastSyncedUrlTravelersRef = useRef<string | null>(null);

  // Sync incoming Hero / shared link date & travelers into PreferencesContext
  useEffect(() => {
    if (
      urlDate &&
      urlDate !== lastSyncedUrlDateRef.current &&
      /^\d{4}-\d{2}-\d{2}$/.test(urlDate)
    ) {
      lastSyncedUrlDateRef.current = urlDate;
      if (urlDate !== preferredDate) {
        setPreferredDate(urlDate);
      }
    } else if (!urlDate) {
      lastSyncedUrlDateRef.current = null;
    }

    if (urlTravelers && urlTravelers !== lastSyncedUrlTravelersRef.current) {
      lastSyncedUrlTravelersRef.current = urlTravelers;
      const parsed = Number(urlTravelers);
      if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 20 && parsed !== preferredTravelers) {
        setPreferredTravelers(parsed);
      }
    } else if (!urlTravelers) {
      lastSyncedUrlTravelersRef.current = null;
    }
  }, [
    urlDate,
    urlTravelers,
    preferredDate,
    preferredTravelers,
    setPreferredDate,
    setPreferredTravelers
  ]);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, val] of Object.entries(updates)) {
      const shouldDelete =
        val === null ||
        val === '' ||
        val === 'todos' ||
        (key === 'max' && Number(val) >= DEFAULT_MAX_PRICE_USD) ||
        (key === 'orden' && val === 'featured');
      if (shouldDelete) {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    }
    setSearchParams(next, { replace: true });
  };

  const filterState: FilterState = useMemo(
    () => ({
      query,
      selectedDest,
      selectedCat,
      durationFilter,
      difficultyFilter,
      altitudeFilter,
      modalityFilter,
      maxPriceUsd
    }),
    [
      query,
      selectedDest,
      selectedCat,
      durationFilter,
      difficultyFilter,
      altitudeFilter,
      modalityFilter,
      maxPriceUsd
    ]
  );

  const filteredTours = useMemo(() => {
    return ALL_TOURS.filter((tour) => matchesCatalogFilters(tour, filterState)).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUsd - b.priceUsd;
      if (sortBy === 'price-desc') return b.priceUsd - a.priceUsd;
      if (sortBy === 'duration-asc') return a.durationDays - b.durationDays;
      if (sortBy === 'duration-desc') return b.durationDays - a.durationDays;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filterState, sortBy]);

  // Dynamic real counts per destination & commercial section
  const destCounts = useMemo(() => {
    const base = ALL_TOURS.filter((tour) => matchesCatalogFilters(tour, filterState, 'dest'));
    const counts: Record<string, number> = { todos: base.length };
    for (const dest of DESTINATIONS_DATA) {
      counts[dest.slug] = base.filter((t) => t.visitedDestinations.includes(dest.slug)).length;
    }
    return counts;
  }, [filterState]);

  const catCounts = useMemo(() => {
    const base = ALL_TOURS.filter((tour) => matchesCatalogFilters(tour, filterState, 'cat'));
    const counts: Record<string, number> = { todos: base.length };
    for (const sec of COMMERCIAL_SECTIONS) {
      counts[sec.id] = base.filter(
        (t) => t.primaryCategory === sec.id || t.sections.includes(sec.id)
      ).length;
    }
    return counts;
  }, [filterState]);

  const savedTours = useMemo(
    () => ALL_TOURS.filter((t) => savedSlugs.includes(t.slug)).slice(0, 4),
    [savedSlugs]
  );

  const hasTripContext = Boolean(urlDate || urlTravelers);
  const activeDate = urlDate ?? preferredDate;
  const activeTravelers = urlTravelers ? Number(urlTravelers) || preferredTravelers : preferredTravelers;

  const plannerWithContextUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (activeDate) params.set('fecha', activeDate);
    if (activeTravelers) params.set('viajeros', String(activeTravelers));
    if (savedSlugs.length > 0) params.set('comparar', savedSlugs.join(','));
    return `/planificador?${params.toString()}`;
  }, [activeDate, activeTravelers, savedSlugs]);

  const resetAllFilters = () => {
    setIsEditingTripContext(false);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="pb-20 bg-[#FAF8F5]">
      {/* Header Banner */}
      <section className="bg-[#18221F] text-[#FAF8F5] py-12 border-b border-white/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-3">
          <span className="eyebrow-editorial text-[#E8B954] num-tabular">
            Directorio comercial de rutas · {ALL_TOURS.length} productos verificados
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#FAF8F5]">
            Catálogo de Tours, Rutas Terrestres y Paquetes por Perú
          </h1>
          <p className="text-sm sm:text-base text-[#C7C2B8] max-w-3xl">
            Filtra por destino visitado, línea comercial, altitud, modalidad, duración o
            presupuesto. Cada producto dispone de ficha técnica individual con itinerario detallado.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filters (3 Cols) */}
        <aside className="lg:col-span-3 bg-[#FFFFFF] p-5 rounded-md border border-[#18221F]/12 space-y-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#18221F]/10">
            <div className="flex items-center gap-2 eyebrow-editorial text-[#18221F]">
              <SlidersHorizontal className="w-4 h-4 text-[#B84020]" />
              <span>Filtros operativos</span>
            </div>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1 text-xs text-[#B84020] hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Limpiar
            </button>
          </div>

          {/* Text search */}
          <div>
            <label
              htmlFor="catalog-search-q"
              className="block eyebrow-editorial text-[#525E5A] mb-1.5"
            >
              Palabra o código
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#525E5A] absolute left-3 top-2.5 pointer-events-none" />
              <input
                id="catalog-search-q"
                type="text"
                value={query}
                onChange={(e) => updateParams({ q: e.target.value })}
                placeholder="Ej. Maras, Nazca, QUL..."
                className="w-full pl-9 pr-3 py-2 rounded bg-[#FAF8F5] border border-[#18221F]/18 text-xs text-[#18221F] focus:outline-none focus:border-[#B84020]"
              />
            </div>
          </div>

          {/* Destination Filter (visitedDestinations) */}
          <div>
            <label
              htmlFor="catalog-filter-dest"
              className="block eyebrow-editorial text-[#525E5A] mb-1.5"
            >
              Destino visitado
            </label>
            <select
              id="catalog-filter-dest"
              value={selectedDest}
              onChange={(e) => updateParams({ destino: e.target.value })}
              className="w-full px-3 py-2 rounded border border-[#18221F]/18 text-xs font-medium bg-[#FAF8F5] text-[#18221F] num-tabular focus:outline-none focus:border-[#B84020]"
            >
              <option value="todos">
                Todos los destinos ({destCounts.todos ?? ALL_TOURS.length})
              </option>
              {DESTINATIONS_DATA.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name} ({destCounts[d.slug] ?? 0})
                </option>
              ))}
            </select>
          </div>

          {/* Commercial Section Filter */}
          <div>
            <span
              id="catalog-filter-cat-label"
              className="block eyebrow-editorial text-[#525E5A] mb-1.5"
            >
              Línea comercial ({COMMERCIAL_SECTIONS.length})
            </span>
            <div
              role="group"
              aria-labelledby="catalog-filter-cat-label"
              className="space-y-1 max-h-60 overflow-y-auto pr-1"
            >
              <button
                type="button"
                aria-pressed={selectedCat === 'todos'}
                onClick={() => updateParams({ categoria: 'todos' })}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors duration-200 cursor-pointer flex items-center justify-between gap-2 num-tabular ${
                  selectedCat === 'todos'
                    ? 'bg-[#18221F] text-[#FAF8F5] font-semibold'
                    : 'hover:bg-[#F2EFE9] text-[#18221F]'
                }`}
              >
                <span className="truncate">Todas las líneas comerciales</span>
                <span className="shrink-0 opacity-80">({catCounts.todos ?? ALL_TOURS.length})</span>
              </button>
              {COMMERCIAL_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  aria-pressed={selectedCat === sec.id}
                  onClick={() => updateParams({ categoria: sec.id })}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors duration-200 cursor-pointer flex items-center justify-between gap-2 num-tabular ${
                    selectedCat === sec.id
                      ? 'bg-[#D9532F] text-white font-semibold'
                      : 'hover:bg-[#F2EFE9] text-[#18221F]'
                  }`}
                >
                  <span className="truncate">
                    {sec.number}. {sec.shortLabel}
                  </span>
                  <span className="shrink-0 opacity-80">({catCounts[sec.id] ?? 0})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <span
              id="catalog-filter-duration-label"
              className="block eyebrow-editorial text-[#525E5A] mb-1.5"
            >
              Duración del viaje
            </span>
            <div
              role="group"
              aria-labelledby="catalog-filter-duration-label"
              className="grid grid-cols-2 gap-1.5 text-xs num-tabular"
            >
              {[
                { id: 'todos', label: 'Todas' },
                { id: '1-dia', label: '1 Día / Full Day' },
                { id: '2-4-dias', label: '2 a 4 Días' },
                { id: '5-mas', label: '5 a 12 Días' }
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={durationFilter === d.id}
                  onClick={() => updateParams({ duracion: d.id })}
                  className={`py-1.5 px-2 rounded border text-center cursor-pointer transition-colors duration-200 ${
                    durationFilter === d.id
                      ? 'bg-[#18221F] text-[#FAF8F5] border-[#18221F] font-semibold'
                      : 'bg-[#FAF8F5] text-[#18221F] border-[#18221F]/15 hover:border-[#18221F]/35'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modality Filter */}
          <div>
            <span
              id="catalog-filter-modality-label"
              className="block eyebrow-editorial text-[#525E5A] mb-1.5"
            >
              Modalidad operativa
            </span>
            <div
              role="group"
              aria-labelledby="catalog-filter-modality-label"
              className="grid grid-cols-1 gap-1.5 text-xs"
            >
              {[
                { id: 'todos', label: 'Todas las modalidades' },
                { id: 'grupal-privado', label: 'Grupal y Privado' },
                { id: 'solo-privado', label: 'Solo Privado' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={modalityFilter === m.id}
                  onClick={() => updateParams({ modalidad: m.id })}
                  className={`py-1.5 px-2.5 rounded border text-left cursor-pointer transition-colors duration-200 ${
                    modalityFilter === m.id
                      ? 'bg-[#18221F] text-[#FAF8F5] border-[#18221F] font-semibold'
                      : 'bg-[#FAF8F5] text-[#18221F] border-[#18221F]/15 hover:border-[#18221F]/35'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Altitude Filter */}
          <div>
            <label
              htmlFor="catalog-filter-alt"
              className="block eyebrow-editorial text-[#525E5A] mb-1.5"
            >
              Altitud máxima
            </label>
            <select
              id="catalog-filter-alt"
              value={altitudeFilter}
              onChange={(e) => updateParams({ altitud: e.target.value })}
              className="w-full px-3 py-2 rounded border border-[#18221F]/18 text-xs font-medium bg-[#FAF8F5] text-[#18221F] num-tabular focus:outline-none focus:border-[#B84020]"
            >
              <option value="todos">Todas las altitudes</option>
              <option value="baja">&lt; 2,500 m (Costa/Selva/M. Picchu)</option>
              <option value="media">2,500–3,999 m (Andes Medios)</option>
              <option value="alta">&gt; 4,000 m (Alta Montaña)</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label
              htmlFor="catalog-filter-diff"
              className="block eyebrow-editorial text-[#525E5A] mb-1.5"
            >
              Nivel de exigencia
            </label>
            <select
              id="catalog-filter-diff"
              value={difficultyFilter}
              onChange={(e) => updateParams({ dificultad: e.target.value })}
              className="w-full px-3 py-2 rounded border border-[#18221F]/18 text-xs font-medium bg-[#FAF8F5] text-[#18221F] focus:outline-none focus:border-[#B84020]"
            >
              <option value="todos">Todos los niveles</option>
              <option value="Suave / Cultural">Suave / Cultural</option>
              <option value="Moderada">Moderada</option>
              <option value="Exigente / Alta Montaña">Exigente / Alta Montaña</option>
            </select>
          </div>

          {/* Price Range Slider (Expanded to $3,500) */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#525E5A] mb-1.5 num-tabular">
              <span className="eyebrow-editorial">Presupuesto máx.</span>
              <strong className="text-[#18221F] font-bold">{formatPrice(maxPriceUsd)}</strong>
            </div>
            <input
              type="range"
              min={50}
              max={DEFAULT_MAX_PRICE_USD}
              step={50}
              value={maxPriceUsd}
              onChange={(e) => updateParams({ max: e.target.value })}
              aria-label="Presupuesto máximo en dólares por persona"
              className="w-full accent-[#D9532F] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#525E5A] num-tabular mt-0.5">
              <span>{formatPrice(50)}</span>
              <span>{formatPrice(DEFAULT_MAX_PRICE_USD)}</span>
            </div>
          </div>
        </aside>

        {/* Right Results Column (9 Cols) */}
        <div className="lg:col-span-9 space-y-5">
          {/* Sorting, Trip Context Chip & View Controls Bar */}
          <div className="bg-[#FFFFFF] p-4 rounded-md border border-[#18221F]/12 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm font-medium text-[#18221F] num-tabular">
                Mostrando <strong className="text-[#B84020]">{filteredTours.length}</strong> de{' '}
                {ALL_TOURS.length} productos turísticos
              </div>

              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-2 text-xs">
                  <label
                    htmlFor="catalog-sort-by"
                    className="text-[#525E5A] sr-only sm:not-sr-only"
                  >
                    Ordenar por:
                  </label>
                  <select
                    id="catalog-sort-by"
                    value={sortBy}
                    onChange={(e) => updateParams({ orden: e.target.value })}
                    className="px-3 py-1.5 rounded border border-[#18221F]/18 bg-[#FAF8F5] font-medium text-[#18221F] focus:outline-none focus:border-[#B84020]"
                  >
                    <option value="featured">Recomendados por Qullqa</option>
                    <option value="price-asc">Precio: Menor a Mayor</option>
                    <option value="price-desc">Precio: Mayor a Menor</option>
                    <option value="duration-asc">Duración: Corta a Larga</option>
                    <option value="duration-desc">Duración: Larga a Corta</option>
                  </select>
                </div>

                <div
                  role="group"
                  aria-label="Modo de visualización"
                  className="flex items-center border border-[#18221F]/18 rounded overflow-hidden"
                >
                  <button
                    type="button"
                    aria-pressed={viewMode === 'grid'}
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 cursor-pointer transition-colors duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-[#18221F] text-[#FAF8F5]'
                        : 'bg-[#FFFFFF] text-[#18221F] hover:bg-[#F2EFE9]'
                    }`}
                    title="Vista en cuadrícula"
                    aria-label="Vista en cuadrícula"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-pressed={viewMode === 'editorial'}
                    onClick={() => setViewMode('editorial')}
                    className={`p-1.5 cursor-pointer transition-colors duration-200 ${
                      viewMode === 'editorial'
                        ? 'bg-[#18221F] text-[#FAF8F5]'
                        : 'bg-[#FFFFFF] text-[#18221F] hover:bg-[#F2EFE9]'
                    }`}
                    title="Vista editorial detallada"
                    aria-label="Vista editorial detallada"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contextual Trip Chip (fecha & viajeros from Hero or editable inline) */}
            {hasTripContext || isEditingTripContext ? (
              <div className="pt-3 border-t border-[#18221F]/10 flex flex-wrap items-center justify-between gap-3">
                {!isEditingTripContext ? (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#F2EFE9] border border-[#18221F]/12 text-[#18221F] font-medium num-tabular">
                      <Users className="w-3.5 h-3.5 text-[#B84020]" />
                      <span>
                        Viaje para <strong>{activeTravelers}</strong>{' '}
                        {activeTravelers === 1 ? 'viajero' : 'viajeros'} · Fecha tentativa{' '}
                        <strong>{activeDate}</strong>
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingTripContext(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-[#18221F]/15 text-[#525E5A] hover:text-[#18221F] hover:border-[#18221F]/35 transition-colors duration-200 cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Editar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingTripContext(false);
                        updateParams({ fecha: null, viajeros: null });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-[#B84020] hover:underline cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      <span>Limpiar</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <label className="inline-flex items-center gap-1.5 text-[#525E5A]">
                      <Calendar className="w-3.5 h-3.5 text-[#B84020]" />
                      <input
                        type="date"
                        value={activeDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          updateParams({ fecha: e.target.value });
                        }}
                        className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#18221F]/20 text-[#18221F] num-tabular focus:outline-none focus:border-[#B84020]"
                      />
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-[#525E5A]">
                      <Users className="w-3.5 h-3.5 text-[#B84020]" />
                      <select
                        value={activeTravelers}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setPreferredTravelers(val);
                          updateParams({ viajeros: String(val) });
                        }}
                        className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#18221F]/20 text-[#18221F] num-tabular focus:outline-none focus:border-[#B84020]"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n === 6 ? '6+ viajeros' : `${n} ${n === 1 ? 'viajero' : 'viajeros'}`}
                          </option>
                        ))}
                        {activeTravelers > 6 && (
                          <option value={activeTravelers}>{activeTravelers} viajeros</option>
                        )}
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingTripContext(false);
                        updateParams({
                          fecha: activeDate,
                          viajeros: String(activeTravelers)
                        });
                      }}
                      className="px-2.5 py-1 rounded bg-[#18221F] text-[#FAF8F5] font-medium cursor-pointer"
                    >
                      Listo
                    </button>
                  </div>
                )}

                <Link
                  to={plannerWithContextUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B84020] hover:underline shrink-0"
                >
                  <span>Cotizar en Planificador con estos datos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-[#18221F]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingTripContext(true);
                    updateParams({
                      fecha: preferredDate,
                      viajeros: String(preferredTravelers)
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-[#B84020] hover:underline font-medium cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Añadir fecha tentativa y número de viajeros</span>
                </button>
                <Link
                  to={plannerWithContextUrl}
                  className="text-[#525E5A] hover:text-[#18221F] hover:underline"
                >
                  Ir al Planificador a medida →
                </Link>
              </div>
            )}
          </div>

          {/* Sticky Quick Comparison Bar when savedSlugs.length > 0 */}
          {savedTours.length > 0 && (
            <div className="sticky top-20 sm:top-24 z-20 bg-[#18221F] text-[#FAF8F5] p-3.5 sm:p-4 rounded-md border border-[#D49B35]/35 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 eyebrow-editorial text-[#E8B954] num-tabular">
                    <ShoppingCart className="w-3.5 h-3.5 text-[#E87A5A]" />
                    Carrito de rutas ({savedTours.length}/4)
                  </span>
                  <span className="text-xs text-[#C7C2B8]">
                    Pulsa el botón Carrito en la cabecera para comparar lado a lado o cotizar
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {savedTours.map((tour) => (
                    <span
                      key={tour.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#1E2B27] border border-white/12 text-xs text-[#FAF8F5]"
                    >
                      <span className="truncate max-w-[190px]">
                        {tour.shortTitle ?? tour.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleSavedSlug(tour.slug)}
                        aria-label={`Quitar ${tour.shortTitle ?? tour.title} de comparación`}
                        className="text-[#C7C2B8] hover:text-[#E87A5A] cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={plannerWithContextUrl}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors duration-200 whitespace-nowrap"
              >
                <span>Ir al Planificador</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Results Grid or Editorial List */}
          {filteredTours.length === 0 ? (
            <div className="bg-[#FFFFFF] p-12 rounded-md border border-[#18221F]/12 text-center space-y-4">
              <p className="font-serif-editorial text-2xl font-bold text-[#18221F]">
                No encontramos productos exactos con esa combinación de filtros
              </p>
              <p className="text-sm text-[#525E5A] max-w-md mx-auto">
                Prueba ampliando el rango de presupuesto, altitud o limpiando los filtros para
                explorar las {ALL_TOURS.length} experiencias disponibles.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-5 py-2.5 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-200"
              >
                Restablecer Todos los Filtros
              </button>
            </div>
          ) : viewMode === 'editorial' ? (
            <div className="space-y-6">
              {filteredTours.map((tour, idx) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  variant="editorial-feature"
                  surface="light"
                  revealIndex={idx}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTours.map((tour, idx) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  variant="catalog-technical"
                  surface="light"
                  revealIndex={idx}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
