import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Mountain,
  ShieldCheck,
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import type { TourProduct } from '../types/tourism';
import { usePreferences } from '../context/PreferencesContext';

export interface TourCardProps {
  tour: TourProduct;
  variant?: 'catalog-technical' | 'editorial-feature' | 'compact-horizontal';
  surface?: 'light' | 'dark';
  revealIndex?: number;
}

type CardSurface = NonNullable<TourCardProps['surface']>;

interface SurfaceTheme {
  card: string;
  title: string;
  titleHover: string;
  muted: string;
  accent: string;
  exclusive: string;
  divider: string;
  footer: string;
  cta: string;
  secondaryBox: string;
  chip: string;
  inlineBookmarkUnsaved: string;
}

const SURFACE_THEMES: Record<CardSurface, SurfaceTheme> = {
  light: {
    card: 'bg-[#FFFFFF] border border-[#18221F]/12 text-[#18221F] hover:border-[#D9532F]/55 hover:shadow-[0_18px_40px_rgba(20,22,24,0.09)]',
    title: 'text-[#18221F]',
    titleHover: 'group-hover:text-[#B84020]',
    muted: 'text-[#525E5A]',
    accent: 'text-[#B84020]',
    exclusive: 'text-[#B84020]',
    divider: 'border-[#18221F]/10',
    footer: 'bg-[#F5F2EC] border-t border-[#18221F]/10',
    cta: 'bg-[#D9532F] hover:bg-[#B84020] text-white',
    secondaryBox: 'bg-[#F5F2EC]/90 border border-[#18221F]/10',
    chip: 'bg-white border border-[#18221F]/12 text-[#18221F]',
    inlineBookmarkUnsaved:
      'bg-transparent border-[#18221F]/18 text-[#525E5A] hover:border-[#D9532F] hover:text-[#B84020]'
  },
  dark: {
    card: 'bg-[#1E2B27] border border-white/12 text-[#FAF8F5] hover:border-[#E8B954]/50 hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]',
    title: 'text-[#FAF8F5]',
    titleHover: 'group-hover:text-[#E87A5A]',
    muted: 'text-[#C7C2B8]',
    accent: 'text-[#E87A5A]',
    exclusive: 'text-[#E8B954]',
    divider: 'border-white/10',
    footer: 'bg-[#192420] border-t border-white/10',
    cta: 'bg-[#D9532F] hover:bg-[#B84020] text-white',
    secondaryBox: 'bg-[#18221F]/70 border border-white/10',
    chip: 'bg-[#263832] border border-white/12 text-[#FAF8F5]',
    inlineBookmarkUnsaved:
      'bg-transparent border-white/18 text-[#C7C2B8] hover:border-[#E87A5A] hover:text-[#E87A5A]'
  }
};

interface SaveBookmarkButtonProps {
  isSaved: boolean;
  onToggle: () => void;
  placement: 'overlay' | 'inline';
  theme: SurfaceTheme;
}

const SaveBookmarkButton: React.FC<SaveBookmarkButtonProps> = ({
  isSaved,
  onToggle,
  placement,
  theme
}) => {
  const label = isSaved ? 'Quitar del carrito' : 'Agregar al carrito';
  const baseClass =
    placement === 'overlay'
      ? 'p-2 rounded-full border backdrop-blur-xs'
      : 'p-2 rounded border shrink-0';

  const stateClass = isSaved
    ? 'bg-[#D9532F] border-[#D9532F] text-white'
    : placement === 'overlay'
      ? 'bg-[#18221F]/70 border-white/25 text-[#FAF8F5] hover:bg-[#D9532F] hover:border-[#D9532F]'
      : theme.inlineBookmarkUnsaved;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSaved}
      aria-label={label}
      title={label}
      className={`${baseClass} ${stateClass} cursor-pointer transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F]`}
    >
      <ShoppingCart className="w-4 h-4" />
    </button>
  );
};

interface CardMediaFrameProps {
  imageSrc: string;
  imageAlt: string;
  promoLabel?: string;
  destinationName: string;
  isSaved: boolean;
  onToggleSave: () => void;
  theme: SurfaceTheme;
  containerClassName: string;
  controlsClassName: string;
  bottomOverlay?: React.ReactNode;
}

const CardMediaFrame: React.FC<CardMediaFrameProps> = ({
  imageSrc,
  imageAlt,
  promoLabel,
  destinationName,
  isSaved,
  onToggleSave,
  theme,
  containerClassName,
  controlsClassName,
  bottomOverlay
}) => (
  <div className={`relative overflow-hidden bg-[#18221F] ${containerClassName}`}>
    <img
      src={imageSrc}
      alt={imageAlt}
      loading="lazy"
      className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-28 photo-scrim-top" />
    {bottomOverlay && (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#18221F]/92 via-[#18221F]/50 to-transparent" />
    )}

    <div className={`absolute flex items-start justify-between gap-2 ${controlsClassName}`}>
      {promoLabel ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#D9532F] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
          <Sparkles className="w-3 h-3" />
          {promoLabel}
        </span>
      ) : (
        <span className="inline-block px-2.5 py-1 rounded-xs bg-[#18221F]/80 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-semibold tracking-wide border border-white/15">
          {destinationName}
        </span>
      )}

      <SaveBookmarkButton
        isSaved={isSaved}
        onToggle={onToggleSave}
        placement="overlay"
        theme={theme}
      />
    </div>

    {bottomOverlay && (
      <div className="absolute bottom-3.5 left-4 right-4 z-10">{bottomOverlay}</div>
    )}
  </div>
);

interface TourSpecsLineProps {
  durationLabel: string;
  altitudeMax: string;
  theme: SurfaceTheme;
  className?: string;
}

const TourSpecsLine: React.FC<TourSpecsLineProps> = ({
  durationLabel,
  altitudeMax,
  theme,
  className = ''
}) => (
  <div
    className={`flex flex-wrap items-center gap-x-3 gap-y-1 border-t text-xs num-tabular ${theme.divider} ${theme.muted} ${className}`}
  >
    <span className="inline-flex items-center gap-1.5 font-medium">
      <Clock className={`w-3.5 h-3.5 shrink-0 ${theme.accent}`} />
      {durationLabel}
    </span>
    <span aria-hidden="true">·</span>
    <span className="inline-flex items-center gap-1.5 font-medium">
      <Mountain className={`w-3.5 h-3.5 shrink-0 ${theme.accent}`} />
      {altitudeMax}
    </span>
  </div>
);

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  variant = 'catalog-technical',
  surface = 'light',
  revealIndex: _revealIndex
}) => {
  const { formatPrice, savedSlugs, toggleSavedSlug } = usePreferences();
  const isSaved = savedSlugs.includes(tour.slug);
  const theme = SURFACE_THEMES[surface];
  const displayTitle = tour.shortTitle ?? tour.title;
  const headerContextLabel = tour.promoLabel ? tour.destinationName : tour.region;
  const isPrivateOnly =
    tour.modalities.length === 1 && tour.modalities[0] === 'Privado a Medida';
  const handleToggleSave = () => toggleSavedSlug(tour.slug);

  const featuredHighlights = tour.highlights.slice(0, 3);
  const featuredStops = tour.placesVisited.slice(0, 5);

  if (variant === 'editorial-feature') {
    return (
      <article
        className={`group rounded-lg overflow-hidden grid lg:grid-cols-12 transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none ${theme.card}`}
      >
        <CardMediaFrame
          imageSrc={tour.heroImage}
          imageAlt={tour.title}
          promoLabel={tour.promoLabel}
          destinationName={tour.destinationName}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          theme={theme}
          containerClassName="lg:col-span-5 h-60 sm:h-72 lg:h-auto lg:min-h-[300px] lg:max-h-[360px]"
          controlsClassName="top-3.5 left-3.5 right-3.5"
          bottomOverlay={
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-xs bg-[#18221F]/85 border border-white/20 text-[#E8B954] text-[10px] font-bold uppercase tracking-wider num-tabular">
                  {tour.durationLabel}
                </span>
                <span className="px-2 py-0.5 rounded-xs bg-[#18221F]/85 border border-white/20 text-[#FAF8F5] text-[10px] font-semibold num-tabular">
                  Máx. {tour.altitudeMax}
                </span>
                <span className="px-2 py-0.5 rounded-xs bg-[#1F513F]/90 border border-white/20 text-white text-[10px] font-semibold">
                  {tour.difficulty}
                </span>
              </div>
              <p className="text-[11px] text-[#EAE5DC] font-medium truncate">
                Ruta: {featuredStops.join(' → ')}
              </p>
            </div>
          }
        />

        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="p-5 sm:p-6 space-y-3.5">
            {/* Top Meta Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${theme.muted}`}>
                {tour.isExclusive && (
                  <span className="px-2 py-0.5 rounded-xs bg-[#D9532F]/12 text-[#B84020] font-bold text-[10px] uppercase tracking-wider">
                    Signature
                  </span>
                )}
                <span className={`eyebrow-editorial ${theme.accent}`}>
                  {headerContextLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="num-tabular font-semibold">{tour.code}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold num-tabular text-[#18221F] bg-[#F2EFE9] px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1F513F]" />
                <span>{tour.schedule.frequency}</span>
              </div>
            </div>

            {/* Title & concise summary */}
            <div>
              <Link
                to={`/tours/${tour.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F] rounded-xs"
              >
                <h3
                  className={`font-serif-editorial text-xl sm:text-2xl font-bold leading-tight transition-colors duration-200 motion-reduce:transition-none ${theme.title} ${theme.titleHover}`}
                >
                  {displayTitle}
                </h3>
              </Link>
              <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 line-clamp-2 ${theme.muted}`}>
                {tour.subtitle}
              </p>
            </div>

            {/* Rich 2-Column Technical Dossier & Route Box (Eliminates all blank space) */}
            <div className={`p-3.5 rounded-md grid sm:grid-cols-12 gap-3.5 ${theme.secondaryBox}`}>
              <div className="sm:col-span-7 space-y-1.5">
                <span className={`eyebrow-editorial block text-[10px] ${theme.accent}`}>
                  Hitos incluidos en la operación
                </span>
                <ul className="space-y-1">
                  {featuredHighlights.map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-1.5 text-xs leading-snug ${theme.title}`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.accent}`} />
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`sm:col-span-5 sm:border-l sm:pl-3.5 space-y-2 ${theme.divider}`}>
                <span className={`eyebrow-editorial block text-[10px] ${theme.muted}`}>
                  Paradas &amp; Logística
                </span>
                <div className="flex flex-wrap gap-1">
                  {featuredStops.slice(0, 4).map((place) => (
                    <span
                      key={place}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${theme.chip}`}
                    >
                      <MapPin className={`w-2.5 h-2.5 ${theme.accent}`} />
                      {place}
                    </span>
                  ))}
                </div>
                <div className={`flex items-center gap-1.5 text-[11px] font-medium pt-0.5 ${theme.muted}`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1F513F] shrink-0" />
                  <span className="truncate">{tour.modalities.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact High-Conversion Footer Bar */}
          <div
            className={`px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 ${theme.footer}`}
          >
            <div className="flex flex-wrap items-center gap-5">
              <div>
                <span className={`eyebrow-editorial block text-[10px] ${theme.muted}`}>
                  {isPrivateOnly ? 'Tarifa Privada / Persona' : 'Tarifa Grupal / Persona'}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5 num-tabular">
                  <span className={`text-xl font-extrabold tracking-tight ${theme.title}`}>
                    {formatPrice(tour.priceUsd)}
                  </span>
                  {tour.originalPriceUsd && (
                    <span className={`text-xs line-through ${theme.muted}`}>
                      {formatPrice(tour.originalPriceUsd)}
                    </span>
                  )}
                </div>
              </div>

              {!isPrivateOnly && tour.privatePriceUsd !== tour.priceUsd && (
                <div className={`pl-4 border-l ${theme.divider}`}>
                  <span className={`eyebrow-editorial block text-[10px] ${theme.muted}`}>
                    Privado (2 Pax)
                  </span>
                  <span className={`block mt-0.5 num-tabular text-sm font-bold ${theme.accent}`}>
                    {formatPrice(tour.privatePriceUsd)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                to={`/planificador?tour=${tour.slug}`}
                className={`hidden sm:inline-flex items-center px-3 py-2 rounded border text-xs font-semibold transition-colors duration-200 ${theme.inlineBookmarkUnsaved}`}
              >
                Cotizar a medida
              </Link>
              <Link
                to={`/tours/${tour.slug}`}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider shrink-0 transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F] ${theme.cta}`}
              >
                <span>Ver Ficha &amp; Itinerario</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact-horizontal') {
    return (
      <article
        className={`group rounded-md p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none ${theme.card}`}
      >
        <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
          <div className="w-24 h-24 rounded overflow-hidden shrink-0 bg-[#18221F]">
            <img
              src={tour.heroImage}
              alt={tour.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>

          <div className="space-y-1.5 min-w-0">
            {tour.isExclusive && (
              <p className={`eyebrow-editorial ${theme.exclusive}`}>
                Colección Signature
              </p>
            )}

            <div className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs ${theme.muted}`}>
              <span className={`num-tabular font-semibold ${theme.accent}`}>
                {tour.code}
              </span>
              <span aria-hidden="true">·</span>
              <span>{tour.destinationName}</span>
              <span aria-hidden="true">·</span>
              <span className="num-tabular">{tour.durationLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="num-tabular">{tour.altitudeMax}</span>
              {tour.promoLabel && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className={`font-semibold ${theme.accent}`}>
                    {tour.promoLabel}
                  </span>
                </>
              )}
            </div>

            <Link
              to={`/tours/${tour.slug}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F] rounded-xs"
            >
              <h3
                className={`font-serif-editorial text-lg font-bold leading-snug transition-colors duration-200 motion-reduce:transition-none ${theme.title} ${theme.titleHover}`}
              >
                {displayTitle}
              </h3>
            </Link>

            <p className={`text-xs leading-relaxed line-clamp-2 ${theme.muted}`}>
              {tour.subtitle}
            </p>
          </div>
        </div>

        <div
          className={`w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 ${theme.divider}`}
        >
          <div className="text-left sm:text-right">
            <span className={`eyebrow-editorial block ${theme.muted}`}>
              Desde
            </span>
            <div className="flex items-baseline sm:justify-end gap-2 mt-0.5 num-tabular">
              <span className={`text-base font-bold ${theme.title}`}>
                {formatPrice(tour.priceUsd)}
              </span>
              {tour.originalPriceUsd && (
                <span className={`text-xs line-through ${theme.muted}`}>
                  {formatPrice(tour.originalPriceUsd)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SaveBookmarkButton
              isSaved={isSaved}
              onToggle={handleToggleSave}
              placement="inline"
              theme={theme}
            />
            <Link
              to={`/tours/${tour.slug}`}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-semibold shrink-0 whitespace-nowrap transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F] ${theme.cta}`}
            >
              <span>Explorar ruta</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Default: 'catalog-technical'
  return (
    <article
      className={`group rounded-lg overflow-hidden flex flex-col justify-between transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none ${theme.card}`}
    >
      <div>
        <CardMediaFrame
          imageSrc={tour.heroImage}
          imageAlt={tour.title}
          promoLabel={tour.promoLabel}
          destinationName={tour.destinationName}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          theme={theme}
          containerClassName="h-52"
          controlsClassName="top-3 left-3 right-3"
          bottomOverlay={
            <div className="flex items-center justify-between gap-2 text-[11px] text-[#FAF8F5] num-tabular">
              <span className="px-2 py-0.5 rounded-xs bg-[#18221F]/80 border border-white/15 font-semibold">
                {tour.durationLabel}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[#18221F]/80 border border-white/15 font-semibold text-[#E8B954]">
                {tour.difficulty}
              </span>
            </div>
          }
        />

        <div className="p-5 space-y-3">
          <div className="space-y-1">
            {tour.isExclusive && (
              <p className={`eyebrow-editorial ${theme.exclusive}`}>
                Colección Signature
              </p>
            )}
            <div className={`flex items-center justify-between gap-2 text-xs ${theme.muted}`}>
              <span className={`font-semibold truncate ${theme.accent}`}>
                {headerContextLabel}
              </span>
              <span className="num-tabular font-medium shrink-0">{tour.code}</span>
            </div>
          </div>

          <Link
            to={`/tours/${tour.slug}`}
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F] rounded-xs"
          >
            <h3
              className={`font-serif-editorial text-lg font-bold leading-snug transition-colors duration-200 motion-reduce:transition-none ${theme.title} ${theme.titleHover}`}
            >
              {displayTitle}
            </h3>
          </Link>

          <p className={`text-xs leading-relaxed line-clamp-2 ${theme.muted}`}>
            {tour.subtitle}
          </p>

          <div className="flex flex-wrap gap-1 pt-0.5">
            {featuredStops.slice(0, 3).map((stop) => (
              <span
                key={stop}
                className={`px-2 py-0.5 rounded text-[10px] font-medium ${theme.chip}`}
              >
                {stop}
              </span>
            ))}
          </div>

          <TourSpecsLine
            durationLabel={tour.durationLabel}
            altitudeMax={tour.altitudeMax}
            theme={theme}
            className="pt-2.5"
          />
        </div>
      </div>

      <div className={`px-5 py-3.5 flex items-center justify-between gap-3 ${theme.footer}`}>
        <div className="min-w-0">
          <span className={`eyebrow-editorial block text-[10px] ${theme.muted}`}>
            Desde
          </span>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-0.5 num-tabular">
            <span className={`text-base font-extrabold ${theme.title}`}>
              {formatPrice(tour.priceUsd)}
            </span>
            {tour.originalPriceUsd && (
              <span className={`text-xs line-through ${theme.muted}`}>
                {formatPrice(tour.originalPriceUsd)}
              </span>
            )}
          </div>
        </div>

        <Link
          to={`/tours/${tour.slug}`}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider shrink-0 whitespace-nowrap transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F] ${theme.cta}`}
        >
          <span>Ver ficha</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
