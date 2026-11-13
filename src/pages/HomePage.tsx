import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Compass,
  ArrowUpRight,
  Train,
  Utensils,
  Plane,
  BookOpen,
  Tag
} from 'lucide-react';
import {
  ALL_TOURS,
  COMMERCIAL_SECTIONS,
  TRAVELER_GALLERY,
  REFERENCE_TESTIMONIALS
} from '../data/catalog';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { BLOG_POSTS } from '../data/blogData';
import { TourCard } from '../components/TourCard';
import { InteractivePeruMap } from '../components/InteractivePeruMap';
import { HeroAdventure3DStage } from '../components/HeroAdventure3DStage';
import { SocialGatewaySection } from '../components/SocialGatewaySection';
import { usePreferences } from '../context/PreferencesContext';
import { useRevealObserver } from '../hooks/useRevealObserver';
import type { BlogPost, CommercialSectionId, DestinationSlug } from '../types/tourism';

const ASPECT_CLASSES: Record<'tall' | 'wide' | 'square', string> = {
  tall: 'aspect-[4/5]',
  wide: 'aspect-[16/10]',
  square: 'aspect-square'
};

interface BlogRevealCardProps {
  post: BlogPost;
  index: number;
}

const BlogRevealCard: React.FC<BlogRevealCardProps> = ({ post, index }) => {
  const { ref, isVisible } = useRevealObserver<HTMLElement>({ threshold: 0.05 });

  return (
    <article
      ref={ref}
      style={{ '--stagger-index': index } as React.CSSProperties}
      className="group bg-[#FFFFFF] border border-[#18221F]/12 hover:border-[#18221F]/28 hover:shadow-lg rounded-md overflow-hidden flex flex-col justify-between transition-[border-color,box-shadow] duration-200"
    >
      <div>
        <div
          className={`relative h-48 overflow-hidden bg-[#18221F] clip-reveal-media ${
            isVisible ? 'clip-reveal-visible' : 'clip-reveal-pending'
          }`}
        >
          <img
            src={post.heroImage}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 photo-scrim-top" />
          <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-[#18221F]/85 text-[#E8B954] rounded-xs">
            {post.category}
          </span>
        </div>

        <div className="p-5 space-y-2.5">
          <div className="text-xs text-[#525E5A] num-tabular">
            {post.publishedAt} · {post.readTime}
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F] rounded-xs"
          >
            <h3 className="font-serif-editorial text-lg font-bold text-[#18221F] group-hover:text-[#B84020] transition-colors duration-200 leading-snug">
              {post.title}
            </h3>
          </Link>
          <p className="text-xs text-[#525E5A] leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-5 py-3.5 bg-[#FAF8F5] border-t border-[#18221F]/10 flex items-center justify-between gap-2">
        <span className="text-xs text-[#525E5A] truncate">{post.author.name}</span>
        <Link
          to={`/blog/${post.slug}`}
          className="text-xs font-semibold text-[#B84020] hover:underline shrink-0"
        >
          Leer guía →
        </Link>
      </div>
    </article>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    formatPrice,
    preferredDate,
    setPreferredDate,
    preferredTravelers,
    setPreferredTravelers
  } = usePreferences();

  // Functional Search State
  const [searchDestination, setSearchDestination] = useState<string>('todos');
  const [searchCategory, setSearchCategory] = useState<string>('todos');
  const [quickFilterDay, setQuickFilterDay] = useState<string>('todos');

  // Live filtered results from the search bar (checking visitedDestinations)
  const liveMatchingTours = useMemo(() => {
    return ALL_TOURS.filter((tour) => {
      const matchDest =
        searchDestination === 'todos' ||
        tour.visitedDestinations.includes(searchDestination as DestinationSlug);
      const matchCat =
        searchCategory === 'todos' ||
        tour.primaryCategory === searchCategory ||
        tour.sections.includes(searchCategory as CommercialSectionId);
      return matchDest && matchCat;
    });
  }, [searchDestination, searchCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDestination !== 'todos') params.set('destino', searchDestination);
    if (searchCategory !== 'todos') params.set('categoria', searchCategory);
    if (preferredDate) params.set('fecha', preferredDate);
    if (preferredTravelers) params.set('viajeros', String(preferredTravelers));
    navigate(`/catalogo?${params.toString()}`);
  };

  const scrollToCommercialSection = (sectionId: CommercialSectionId) => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document
      .getElementById(`sec-${sectionId}`)
      ?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  // Helper to get tours by commercial section
  const getToursForSection = (sectionId: CommercialSectionId) =>
    ALL_TOURS.filter((t) => t.sections.includes(sectionId));

  const packagesTours = getToursForSection('paquetes-peru');
  const fullDayTours = useMemo(() => {
    const base = getToursForSection('full-day');
    if (quickFilterDay === 'todos') return base.slice(0, 6);
    return base
      .filter((t) => t.visitedDestinations.includes(quickFilterDay as DestinationSlug))
      .slice(0, 6);
  }, [quickFilterDay]);

  const terrestrialRoutes = getToursForSection('rutas-terrestres');
  const cuscoMachuPicchuTours = getToursForSection('cusco-machu-picchu').slice(0, 4);
  const limaUrbanaTours = getToursForSection('lima-urbana');
  const paracasHuacachinaTours = getToursForSection('paracas-huacachina');
  const nazcaTours = getToursForSection('nazca');
  const adventureNatureTours = getToursForSection('aventura-naturaleza');
  const gastronomyTours = getToursForSection('gastronomia');
  const privateSignatureTours = getToursForSection('experiencias-privadas');
  const promoTours = ALL_TOURS.filter((t) => Boolean(t.originalPriceUsd));

  return (
    <div className="space-y-0">
      {/* =====================================================================
          1. HERO WITH KINETIC IMAGE CAROUSEL & ABOVE-THE-FOLD SEARCH ENGINE
      ===================================================================== */}
      <HeroAdventure3DStage totalToursCount={ALL_TOURS.length}>
          {/* =====================================================================
              2. ABOVE-THE-FOLD FUNCTIONAL TOURIST SEARCH ENGINE BAR
          ===================================================================== */}
          <div className="mt-4 bg-white text-[#18221F] p-3.5 sm:p-4 rounded-lg shadow-[0_12px_36px_rgba(24,34,31,0.08)] border border-[#18221F]/15">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-[#18221F]/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D9532F]" />
                <Search className="w-3.5 h-3.5 text-[#B84020]" />
                <span className="eyebrow-editorial text-[11px] text-[#18221F]">
                  Buscador directo de viajes, paquetes y experiencias en Perú
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-[#1F513F] font-bold num-tabular">
                  {liveMatchingTours.length} rutas disponibles en tiempo real
                </span>
              </div>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end"
            >
              {/* Destino */}
              <div className="lg:col-span-3">
                <label
                  htmlFor="hero-search-dest"
                  className="block eyebrow-editorial text-[10.5px] text-[#525E5A] mb-1"
                >
                  1. Destino o Región
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#B84020] absolute left-3 top-2.5 pointer-events-none" />
                  <select
                    id="hero-search-dest"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded bg-white border border-[#18221F]/20 text-xs sm:text-sm font-semibold text-[#18221F] focus:outline-none focus:border-[#B84020] h-[38px]"
                  >
                    <option value="todos">
                      Todos los destinos del Perú ({DESTINATIONS_DATA.length})
                    </option>
                    {DESTINATIONS_DATA.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tipo de experiencia */}
              <div className="lg:col-span-3">
                <label
                  htmlFor="hero-search-cat"
                  className="block eyebrow-editorial text-[10.5px] text-[#525E5A] mb-1"
                >
                  2. Tipo de Experiencia
                </label>
                <div className="relative">
                  <Compass className="w-4 h-4 text-[#B84020] absolute left-3 top-2.5 pointer-events-none" />
                  <select
                    id="hero-search-cat"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded bg-white border border-[#18221F]/20 text-xs sm:text-sm font-semibold text-[#18221F] focus:outline-none focus:border-[#B84020] h-[38px]"
                  >
                    <option value="todos">
                      Todas las líneas comerciales ({COMMERCIAL_SECTIONS.length})
                    </option>
                    {COMMERCIAL_SECTIONS.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.number}. {sec.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fecha aproximada */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="hero-search-date"
                  className="block eyebrow-editorial text-[10.5px] text-[#525E5A] mb-1"
                >
                  3. Fecha Aproximada
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#B84020] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    id="hero-search-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-2.5 py-2 rounded bg-white border border-[#18221F]/20 text-xs sm:text-sm font-semibold num-tabular text-[#18221F] focus:outline-none focus:border-[#B84020] h-[38px] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-8"
                  />
                </div>
              </div>

              {/* Viajeros */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="hero-search-pax"
                  className="block eyebrow-editorial text-[10.5px] text-[#525E5A] mb-1"
                >
                  4. N° de Viajeros
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#B84020] absolute left-3 top-2.5 pointer-events-none" />
                  <select
                    id="hero-search-pax"
                    value={preferredTravelers}
                    onChange={(e) => setPreferredTravelers(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 rounded bg-white border border-[#18221F]/20 text-xs sm:text-sm font-semibold num-tabular text-[#18221F] focus:outline-none focus:border-[#B84020] h-[38px]"
                  >
                    <option value={1}>1 Viajero</option>
                    <option value={2}>2 Viajeros (Dúo)</option>
                    <option value={3}>3 Viajeros</option>
                    <option value={4}>4 Viajeros (Familia)</option>
                    <option value={6}>6+ Viajeros (Grupo)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 lg:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded bg-[#D9532F] hover:bg-[#B84020] text-white font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors duration-200 shadow-md cursor-pointer h-[38px] whitespace-nowrap num-tabular"
                >
                  <Search className="w-4 h-4 shrink-0" />
                  <span>Buscar ({liveMatchingTours.length})</span>
                </button>
              </div>
            </form>

            {/* Instant Preview Strip when user changes filters */}
            {(searchDestination !== 'todos' || searchCategory !== 'todos') && (
              <div className="mt-3 pt-3 border-t border-[#18221F]/12">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="eyebrow-editorial text-[#525E5A] num-tabular">
                    Vista rápida de coincidencias ({liveMatchingTours.length} resultados)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchDestination('todos');
                      setSearchCategory('todos');
                    }}
                    className="text-xs text-[#B84020] hover:underline font-semibold cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {liveMatchingTours.slice(0, 3).map((tour) => (
                    <Link
                      key={tour.id}
                      to={`/tours/${tour.slug}`}
                      className="p-2.5 rounded bg-[#FFFFFF] border border-[#18221F]/12 hover:border-[#B84020] flex items-center justify-between gap-3 transition-colors duration-200"
                    >
                      <div className="min-w-0">
                        <span className="num-tabular text-[11px] font-semibold text-[#B84020] block">
                          {tour.code} · {tour.durationLabel}
                        </span>
                        <span className="text-xs font-semibold text-[#18221F] block leading-snug truncate">
                          {tour.shortTitle ?? tour.title}
                        </span>
                      </div>
                      <span className="num-tabular text-xs font-bold text-[#18221F] shrink-0">
                        {formatPrice(tour.priceUsd)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
      </HeroAdventure3DStage>

      {/* =====================================================================
          QUICK COMMERCIAL SECTION INDEX BAR (10 SECCIONES COMERCIALES)
      ===================================================================== */}
      <nav
        aria-label="Índice de líneas comerciales"
        className="bg-[#F2EFE9] border-b border-[#18221F]/12 sticky top-16 sm:top-[74px] z-30 overflow-x-auto"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 flex items-center gap-0.5 whitespace-nowrap text-[11px] xl:text-[11.5px]">
          <span className="eyebrow-editorial text-[#525E5A] mr-1 shrink-0">
            Índice<span className="sr-only"> comercial</span>:
          </span>
          {COMMERCIAL_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToCommercialSection(sec.id)}
              className="px-1.5 py-1 rounded text-[#18221F] hover:bg-[#18221F] hover:text-[#FAF8F5] font-medium transition-colors duration-200 cursor-pointer num-tabular shrink-0"
            >
              {sec.number}. {sec.shortLabel}
            </button>
          ))}
        </div>
      </nav>

      {/* =====================================================================
          SECCIÓN COMERCIAL 01: PAQUETES TURÍSTICOS POR PERÚ (GRAN FORMATO)
      ===================================================================== */}
      <section
        id="sec-paquetes-peru"
        className="py-16 sm:py-20 bg-[#FAF8F5] scroll-mt-36"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#18221F]/12">
            <div>
              <span className="eyebrow-editorial text-[#B84020]">
                Sección 01 · Circuitos integrales multidía
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F] mt-1">
                Paquetes Turísticos por el Perú (5 a 12 Días)
              </h2>
              <p className="text-sm text-[#525E5A] mt-1 max-w-2xl">
                Programas llave en mano con hoteles seleccionados, traslados privados de aeropuerto,
                boletos ministeriales a Machu Picchu, trenes y asistencia 24/7.
              </p>
            </div>
            <Link
              to="/catalogo?categoria=paquetes-peru"
              className="inline-flex items-center gap-1.5 eyebrow-editorial text-[#B84020] hover:text-[#18221F] shrink-0 transition-colors duration-200 num-tabular"
            >
              <span>Ver todos los paquetes ({packagesTours.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-8 space-y-8">
            {packagesTours.slice(0, 4).map((tour, idx) => (
              <TourCard
                key={tour.id}
                tour={tour}
                variant="editorial-feature"
                surface="light"
                revealIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN COMERCIAL 02: EXPERIENCIAS DE UN DÍA (CON FILTRO EN VIVO)
      ===================================================================== */}
      <section
        id="sec-full-day"
        className="py-16 sm:py-20 bg-[#F2EFE9] border-y border-[#18221F]/12 scroll-mt-36"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#18221F]/12">
            <div>
              <span className="eyebrow-editorial text-[#1F513F]">
                Sección 02 · Salidas diarias confirmadas
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F] mt-1">
                Experiencias de Un Día (Full Day &amp; Medio Día)
              </h2>
              <p className="text-sm text-[#525E5A] mt-1 max-w-2xl">
                Excursiones modulares que puedes reservar de forma individual o integrar a tu
                estadía en Cusco, Lima, Paracas, Nazca o Puno.
              </p>
            </div>

            {/* Quick Interactive Filter by Region */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { slug: 'todos', label: 'Todas las regiones' },
                { slug: 'cusco', label: 'Cusco' },
                { slug: 'valle-sagrado-machu-picchu', label: 'Valle Sagrado & M. Picchu' },
                { slug: 'lima', label: 'Lima' },
                { slug: 'paracas-huacachina', label: 'Paracas & Huacachina' },
                { slug: 'puno-titicaca', label: 'Lago Titicaca' }
              ].map((tab) => (
                <button
                  key={tab.slug}
                  type="button"
                  aria-pressed={quickFilterDay === tab.slug}
                  onClick={() => setQuickFilterDay(tab.slug)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200 cursor-pointer ${
                    quickFilterDay === tab.slug
                      ? 'bg-[#18221F] text-[#FAF8F5]'
                      : 'bg-[#FFFFFF]/85 text-[#18221F] hover:bg-[#FFFFFF] border border-[#18221F]/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullDayTours.map((tour, idx) => (
              <TourCard
                key={tour.id}
                tour={tour}
                variant="catalog-technical"
                surface="light"
                revealIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN COMERCIAL 03: RUTAS TERRESTRES INTERPROVINCIALES
      ===================================================================== */}
      <section
        id="sec-rutas-terrestres"
        className="py-16 sm:py-20 bg-[#FFFFFF] border-b border-[#18221F]/10 scroll-mt-36"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-36">
            <span className="eyebrow-editorial text-[#B84020]">
              Sección 03 · Corredores transandinos y costeros
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F] leading-tight">
              Rutas Terrestres entre Ciudades
            </h2>
            <p className="text-sm text-[#525E5A] leading-relaxed">
              En el Perú, el trayecto entre dos ciudades es en sí mismo un espectáculo geográfico.
              Nuestras rutas terrestres convierten el traslado entre Cusco, Puno, el Cañón del
              Colca, Paracas e Ica en una jornada guiada con paradas arqueológicas, almuerzos
              regionales y custodia de equipaje en bodega.
            </p>
            <div className="p-4 rounded bg-[#F2EFE9] border border-[#18221F]/12 space-y-2 text-xs">
              <div className="eyebrow-editorial text-[#18221F]">
                Ventaja fisiológica
              </div>
              <p className="text-[#525E5A] leading-relaxed num-tabular">
                Ascender gradualmente por carretera desde la costa hacia Arequipa (2,335 m), Colca
                (3,635 m), Titicaca (3,812 m) y Cusco (3,399 m) elimina el choque brusco de altitud.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {terrestrialRoutes.map((tour, idx) => (
              <TourCard
                key={tour.id}
                tour={tour}
                variant="compact-horizontal"
                surface="light"
                revealIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN COMERCIAL 04: CUSCO Y MACHU PICCHU (CONTRASTE OBSIDIANA)
      ===================================================================== */}
      <section
        id="sec-cusco-machu-picchu"
        className="section-deferred py-16 sm:py-20 bg-[#18221F] text-[#FAF8F5] scroll-mt-36"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/12">
            <div>
              <span className="eyebrow-editorial text-[#E8B954]">
                Sección 04 · Logística ferroviaria y Ministerio de Cultura
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#FAF8F5] mt-1">
                Especialistas en Cusco, Valle Sagrado &amp; Machu Picchu
              </h2>
              <p className="text-sm text-[#C7C2B8] mt-1 max-w-2xl">
                Desde excursiones de un día en tren panorámico hasta pernoctes en Aguas Calientes y
                el Camino Inca Corto ingresando por la Puerta del Sol (Inti Punku).
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-[#E8B954] bg-[#1E2B27] px-4 py-2.5 rounded border border-white/12 num-tabular shrink-0">
              <Train className="w-4 h-4 text-[#E87A5A] shrink-0" />
              <span>Emisión en Trenes Expedition · Vistadome · 360° · First Class</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cuscoMachuPicchuTours.map((tour, idx) => (
              <TourCard
                key={tour.id}
                tour={tour}
                variant="catalog-technical"
                surface="dark"
                revealIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN COMERCIAL 05: LIMA Y EXPERIENCIAS URBANAS (ASIMÉTRICA 1 + 4)
      ===================================================================== */}
      <section
        id="sec-lima-urbana"
        className="section-deferred py-16 sm:py-20 bg-[#FAF8F5] scroll-mt-36"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#18221F]/12">
            <div>
              <span className="eyebrow-editorial text-[#B84020]">
                Sección 05 · Patrimonio virreinal, prehispánico y bohemio
              </span>
              <h2 className="font-serif-editorial text-3xl font-bold text-[#18221F] mt-1">
                Lima &amp; Experiencias Urbanas
              </h2>
            </div>
            <Link
              to="/destinos/lima"
              className="eyebrow-editorial text-[#B84020] hover:underline shrink-0"
            >
              Ver Guía de Destino Lima →
            </Link>
          </div>

          {limaUrbanaTours.length > 0 && (
            <div className="space-y-6">
              <TourCard
                tour={limaUrbanaTours[0]}
                variant="editorial-feature"
                surface="light"
                revealIndex={0}
              />

              {limaUrbanaTours.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {limaUrbanaTours.slice(1, 5).map((tour, idx) => (
                    <TourCard
                      key={tour.id}
                      tour={tour}
                      variant="catalog-technical"
                      surface="light"
                      revealIndex={idx + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECCIONES COMERCIALES 06 Y 07: PARACAS/HUACACHINA Y NAZCA (PARCHMENT WARM)
      ===================================================================== */}
      <section className="section-deferred py-16 sm:py-20 bg-[#EAE5DC] border-y border-[#18221F]/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-10">
          {/* 06. Paracas y Huacachina */}
          <div id="sec-paracas-huacachina" className="lg:col-span-6 space-y-5 scroll-mt-36">
            <div className="pb-4 border-b border-[#18221F]/12">
              <span className="eyebrow-editorial text-[#1F513F]">
                Sección 06 · Reserva marina, pisco y dunas
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
                Paracas, Islas Ballestas &amp; Huacachina
              </h3>
              <p className="text-xs text-[#525E5A] mt-1">
                Navegación a Islas Ballestas, Playa Roja en la Reserva Nacional de Paracas, viñedos
                de Ica y carros tubulares al atardecer.
              </p>
            </div>
            <div className="space-y-4">
              {paracasHuacachinaTours.slice(0, 3).map((tour, idx) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  variant="compact-horizontal"
                  surface="light"
                  revealIndex={idx}
                />
              ))}
            </div>
          </div>

          {/* 07. Nazca */}
          <div id="sec-nazca" className="lg:col-span-6 space-y-5 scroll-mt-36">
            <div className="pb-4 border-b border-[#18221F]/12">
              <span className="eyebrow-editorial text-[#B84020]">
                Sección 07 · Sobrevuelo en Cessna y acueductos
              </span>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
                Líneas de Nazca &amp; Cahuachi
              </h3>
              <p className="text-xs text-[#525E5A] mt-1 num-tabular">
                Vuelos certificados de 35 minutos sobre 13 geoglifos con asiento de ventana
                garantizado y arqueología hidráulica en Cantalloc.
              </p>
            </div>
            <div className="space-y-4">
              {nazcaTours.map((tour, idx) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  variant="compact-horizontal"
                  surface="light"
                  revealIndex={idx}
                />
              ))}
            </div>
            <div className="p-4 rounded bg-[#FFFFFF] border border-[#18221F]/12 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Plane className="w-5 h-5 text-[#B84020] shrink-0" />
                <p className="text-xs text-[#18221F] leading-relaxed">
                  <strong>13 Geoglifos en Ruta Aérea:</strong> Colibrí, Mono, Cóndor, Araña,
                  Astronauta, Alcatraz, Loro, Manos, Árbol, Ballena, Perro, Lagarto y Trapecios.
                </p>
              </div>
              <Link
                to="/destinos/nazca"
                className="text-xs font-semibold text-[#B84020] shrink-0 hover:underline"
              >
                Guía Nazca →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN COMERCIAL 08: AVENTURA, ALTA MONTAÑA Y AMAZONÍA (VERDE YUNGA)
      ===================================================================== */}
      <section
        id="sec-aventura-naturaleza"
        className="section-deferred py-16 sm:py-20 bg-[#173F30] text-[#FAF8F5] border-b border-white/12 scroll-mt-36"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/12">
            <div>
              <span className="eyebrow-editorial text-[#E8B954]">
                Sección 08 · Glaciares andinos, Cañón del Colca &amp; Reserva Tambopata
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#FAF8F5] mt-1">
                Aventura, Alta Montaña &amp; Naturaleza Amazónica
              </h2>
              <p className="text-sm text-[#C7C2B8] mt-1 max-w-2xl">
                Protocolos de seguridad en altura (oxímetro, oxígeno suplementario y bastones
                incluidos) y eco-lodges con naturalistas en Madre de Dios.
              </p>
            </div>
            <Link
              to="/catalogo?categoria=aventura-naturaleza"
              className="eyebrow-editorial text-[#E8B954] hover:text-[#FAF8F5] transition-colors duration-200 shrink-0 num-tabular"
            >
              Ver todas las rutas de naturaleza ({adventureNatureTours.length}) →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adventureNatureTours.slice(0, 6).map((tour, idx) => (
              <TourCard
                key={tour.id}
                tour={tour}
                variant="catalog-technical"
                surface="dark"
                revealIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN COMERCIAL 09: GASTRONOMÍA, MERCADOS, CACAO Y PISCO
      ===================================================================== */}
      <section
        id="sec-gastronomia"
        className="section-deferred py-16 sm:py-20 bg-[#FAF8F5] scroll-mt-36"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#18221F]/12">
            <div>
              <span className="eyebrow-editorial text-[#B84020] inline-flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" /> Sección 09 · Cultura culinaria y despensa nativa
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F] mt-1">
                Rutas Gastronómicas en Lima, Cusco e Ica
              </h2>
              <p className="text-sm text-[#525E5A] mt-1 max-w-2xl">
                Mercados de biodiversidad, clases participativas de Ceviche y Pisco Sour, picanterías
                cusqueñas, cacao nativo Chuncho y bodegas pisqueras.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gastronomyTours.map((tour, idx) => (
              <TourCard
                key={tour.id}
                tour={tour}
                variant="catalog-technical"
                surface="light"
                revealIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN COMERCIAL 10: COLECCIÓN SIGNATURE — EXPERIENCIAS PRIVADAS
      ===================================================================== */}
      <section
        id="sec-experiencias-privadas"
        className="section-deferred py-16 sm:py-20 bg-[#192420] text-[#FAF8F5] border-y border-white/12 scroll-mt-36"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/12">
            <div>
              <span className="eyebrow-editorial text-[#E8B954]">
                Sección 10 · Lujo silencioso y curaduría a medida
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#FAF8F5] mt-1">
                Experiencias Privadas &amp; Signature Edition
              </h2>
              <p className="text-sm text-[#C7C2B8] mt-1 max-w-2xl">
                Para viajeros que privilegian el ritmo propio: vehículos exclusivos, arqueólogos
                anfitriones, picnics frente a glaciares y trenes de lujo.
              </p>
            </div>
            <Link
              to="/planificador"
              className="px-5 py-2.5 rounded bg-[#E8B954] hover:bg-[#D49B35] text-[#18221F] text-xs font-bold uppercase tracking-wider transition-colors duration-200 shrink-0"
            >
              Solicitar Diseño Privado
            </Link>
          </div>

          <div className="mt-8 space-y-6">
            {privateSignatureTours.slice(0, 2).map((tour, idx) => (
              <TourCard
                key={tour.id}
                tour={tour}
                variant="editorial-feature"
                surface="dark"
                revealIndex={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          ATLAS CARTOGRÁFICO INTERACTIVO
      ===================================================================== */}
      <section className="section-deferred py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="eyebrow-editorial text-[#B84020] num-tabular">
                Geografía operativa · Del nivel del mar a los 5,036 metros
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F] mt-1">
                Explora Nuestros Destinos en el Mapa Interactivo
              </h2>
            </div>
            <Link
              to="/destinos"
              className="eyebrow-editorial text-[#B84020] hover:underline shrink-0"
            >
              Ver las {DESTINATIONS_DATA.length} Guías de Destino Completas →
            </Link>
          </div>

          <InteractivePeruMap />
        </div>
      </section>

      {/* =====================================================================
          OFERTAS Y COMBOS DE TEMPORADA
      ===================================================================== */}
      <section className="section-deferred py-16 bg-[#F2EFE9] border-y border-[#18221F]/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#18221F]/12">
            <div>
              <span className="eyebrow-editorial text-[#B84020] inline-flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Condiciones especiales · Reserva anticipada
              </span>
              <h2 className="font-serif-editorial text-3xl font-bold text-[#18221F] mt-1">
                Ofertas y Combos Inteligentes de Temporada
              </h2>
              <p className="text-xs text-[#525E5A] mt-1 max-w-2xl">
                Tarifas combinadas y beneficios de temporada aplicados al enlazar múltiples rutas o
                confirmar cupos con antelación.
              </p>
            </div>
            <Link
              to="/ofertas"
              className="eyebrow-editorial text-[#B84020] hover:underline shrink-0"
            >
              Ver matriz de tarifas y ofertas →
            </Link>
          </div>

          {promoTours.length === 5 ? (
            <div className="mt-8 space-y-6">
              <TourCard
                tour={promoTours[0]}
                variant="editorial-feature"
                surface="light"
                revealIndex={0}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {promoTours.slice(1).map((tour, idx) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    variant="catalog-technical"
                    surface="light"
                    revealIndex={idx + 1}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promoTours.map((tour, idx) => (
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
      </section>

      {/* =====================================================================
          CRÓNICAS DE RUTA (TRAVELER_GALLERY) Y EXPERIENCIAS POR PERFIL
      ===================================================================== */}
      <section className="section-deferred py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#18221F]/12">
            <div>
              <span className="eyebrow-editorial text-[#B84020]">
                Bitácora de territorio · Escenarios reales en ruta
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F] mt-1">
                Crónicas de Ruta &amp; Experiencias en el Territorio
              </h2>
              <p className="text-sm text-[#525E5A] mt-1 max-w-2xl">
                Cada imagen corresponde a los escenarios reales de nuestras expediciones en Machu
                Picchu, Maras, Vinicunca, Humantay, Paracas y Lima.
              </p>
            </div>
          </div>

          {/* Editorial Masonry Photo Grid driven by item.aspect */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {TRAVELER_GALLERY.map((item) => (
              <div
                key={item.id}
                className={`break-inside-avoid group relative rounded-md overflow-hidden border border-[#18221F]/15 bg-[#18221F] ${ASPECT_CLASSES[item.aspect]}`}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 photo-scrim-top" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#18221F]/90 via-[#18221F]/25 to-transparent" />

                <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#FAF8F5]">
                  <span className="px-2.5 py-1 rounded-xs bg-[#18221F]/80 backdrop-blur-xs text-[#E8B954] font-medium num-tabular">
                    {item.location} · {item.altitude}
                  </span>
                  <span className="px-2.5 py-1 rounded-xs bg-[#18221F]/75 backdrop-blur-xs text-[#FAF8F5]/90">
                    {item.seasonNote}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <p className="text-sm text-[#FAF8F5] font-medium leading-snug">
                    {item.caption}
                  </p>
                  <Link
                    to={`/tours/${item.tourSlug}`}
                    className="px-3 py-1.5 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold shrink-0 transition-colors duration-200 whitespace-nowrap"
                  >
                    Ver ruta →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Reference Experiences by Trip Profile */}
          <div className="pt-8 border-t border-[#18221F]/12">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <span className="eyebrow-editorial text-[#B84020]">
                  Arquitectura de recorrido
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
                  Experiencias por Tipo de Viaje
                </h3>
              </div>
              <span className="text-xs text-[#525E5A] bg-[#F2EFE9] px-3 py-1.5 rounded font-medium">
                Crónicas de referencia por perfil de ruta
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REFERENCE_TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-md bg-[#FFFFFF] border border-[#18221F]/12 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <span className="inline-block eyebrow-editorial px-2.5 py-1 bg-[#F2EFE9] text-[#1F513F] rounded-xs">
                      {item.highlightMetric}
                    </span>
                    <p className="text-sm text-[#18221F] italic leading-relaxed">
                      “{item.quote}”
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#18221F]/10">
                    <div className="font-serif-editorial font-bold text-base text-[#18221F]">
                      {item.travelerName}
                    </div>
                    <div className="text-xs text-[#525E5A]">
                      {item.origin} · {item.tripType}
                    </div>
                    <Link
                      to={`/tours/${item.tourSlug}`}
                      className="mt-2 inline-block text-xs font-semibold text-[#B84020] hover:underline"
                    >
                      Ruta realizada: {item.tourTitle} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CÓMO FUNCIONA LA RESERVA Y PROCESO COMERCIAL TRANSPARENTE
      ===================================================================== */}
      <section className="section-deferred py-16 sm:py-20 bg-[#18221F] text-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/12">
            <div>
              <span className="eyebrow-editorial text-[#E8B954]">
                Arquitectura comercial · Transparencia de extremo a extremo
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#FAF8F5] mt-1">
                ¿Cómo Funciona el Proceso de Cotización y Reserva?
              </h2>
              <p className="text-sm text-[#C7C2B8] mt-1 max-w-2xl">
                En el Perú, los ingresos a Machu Picchu y Camino Inca dependen del cupo oficial del
                Ministerio de Cultura. Por ello auditamos los cupos reales y bloqueamos tus espacios
                con total rigor.
              </p>
            </div>
            <Link
              to="/confianza"
              className="px-5 py-2.5 rounded border border-[#E8B954] text-[#E8B954] hover:bg-[#E8B954] hover:text-[#18221F] text-xs font-semibold uppercase tracking-wider transition-colors duration-200 shrink-0"
            >
              Ver Políticas, Pagos y FAQs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: 'Paso 01',
                title: 'Solicitud de Disponibilidad o Diseño',
                desc: 'Eliges un tour o paquete en su ficha técnica o armas tu ruta en el Planificador indicando fecha tentativa, número de viajeros y modalidad (Grupal o Privada).'
              },
              {
                step: 'Paso 02',
                title: 'Verificación Oficial de Cupos en < 2 Horas',
                desc: 'Un especialista en Cusco verifica en tiempo real la disponibilidad en Circuito 2 de Machu Picchu, horarios de tren (Expedition/Vistadome) y hoteles.'
              },
              {
                step: 'Paso 03',
                title: 'Bloqueo con Depósito del 30%',
                desc: 'Confirmas tu propuesta abonando el 30% inicial para la emisión inmediata de tus boletos nominativos ministeriales y ferroviarios. El 70% restante se abona hasta 15 días antes del viaje.'
              },
              {
                step: 'Paso 04',
                title: 'Dossier Nominativo & Asistencia 24/7',
                desc: 'Recibes tu voucher oficial detallado con códigos QR, horarios exactos de recojo y un canal directo de WhatsApp operativo las 24 horas durante todo tu viaje.'
              }
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-md bg-[#1E2B27] border border-white/10 space-y-3"
              >
                <span className="eyebrow-editorial num-tabular text-[#E87A5A] px-2.5 py-1 rounded bg-[#D9532F]/15 inline-block">
                  {item.step}
                </span>
                <h3 className="font-serif-editorial text-xl font-bold text-[#FAF8F5]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C7C2B8] leading-relaxed num-tabular">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BLOG EDITORIAL Y GUÍAS DE PREPARACIÓN (8 ARTÍCULOS)
      ===================================================================== */}
      <section className="section-deferred py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#18221F]/12">
            <div>
              <span className="eyebrow-editorial text-[#B84020] inline-flex items-center gap-1.5 num-tabular">
                <BookOpen className="w-3.5 h-3.5" /> Cuadernos de campo · {BLOG_POSTS.length}{' '}
                publicaciones especializadas
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F] mt-1">
                Guías Editoriales para Planificar tu Viaje a Perú
              </h2>
              <p className="text-sm text-[#525E5A] mt-1 max-w-2xl">
                Artículos técnicos redactados por nuestro equipo sobre los circuitos de Machu
                Picchu, cómo aclimatarse sin soroche, diferencias entre trenes y rutas
                gastronómicas.
              </p>
            </div>
            <Link
              to="/blog"
              className="eyebrow-editorial text-[#B84020] hover:underline shrink-0 num-tabular"
            >
              Explorar los {BLOG_POSTS.length} artículos del Blog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOG_POSTS.slice(0, 4).map((post, idx) => (
              <BlogRevealCard key={post.id} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          PASARELA DE REDES SOCIALES (INSTAGRAM, TIKTOK, YOUTUBE, FACEBOOK, WHATSAPP)
      ===================================================================== */}
      <SocialGatewaySection />
    </div>
  );
};
