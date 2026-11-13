import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Pause,
  Play,
  Star
} from 'lucide-react';
import { ALL_TOURS } from '../data/catalog';
import { PERU_PHOTOS } from '../data/mediaAssets';
import { usePreferences } from '../context/PreferencesContext';

interface HeroAdventure3DStageProps {
  totalToursCount: number;
  children?: React.ReactNode;
}

interface CarouselBlueprint {
  slug: string;
  shortLabel: string;
  regionLabel: string;
  titleOverride: string;
  highlightTag: string;
  image: string;
  objectPosition: string;
}

const SLIDE_BLUEPRINTS: CarouselBlueprint[] = [
  {
    slug: 'machu-picchu-full-day-tren-panoramico',
    shortLabel: 'Machu Picchu',
    regionLabel: 'Cusco & Valle Sagrado',
    titleOverride: 'Machu Picchu & Tren Vistadome',
    highlightTag: 'Circuito 2 Garantizado',
    image: PERU_PHOTOS.machuPicchuClassic,
    objectPosition: 'center 42%'
  },
  {
    slug: 'montana-siete-colores-vinicunca-valle-rojo',
    shortLabel: 'Vinicunca 7 Colores',
    regionLabel: 'Cordillera Vilcanota',
    titleOverride: 'Montaña 7 Colores & Valle Rojo',
    highlightTag: 'Primera Salida 04:00 h',
    image: PERU_PHOTOS.vinicunca,
    objectPosition: 'center 45%'
  },
  {
    slug: 'paracas-islas-ballestas-reserva-oasis-huacachina-full-day',
    shortLabel: 'Paracas & Huacachina',
    regionLabel: 'Costa Sur & Desierto de Ica',
    titleOverride: 'Paracas, Ballestas & Huacachina',
    highlightTag: 'Pacífico & Oasis',
    image: PERU_PHOTOS.huacachina,
    objectPosition: 'center 55%'
  },
  {
    slug: 'experiencia-gastronomica-lima-mercado-ceviche-pisco-huaca',
    shortLabel: 'Lima & Costa Verde',
    regionLabel: 'Lima Gastronómica',
    titleOverride: 'Lima Histórica & Costa Verde',
    highlightTag: 'Experiencia Gourmet',
    image: PERU_PHOTOS.mirafloresCosta,
    objectPosition: 'center 45%'
  },
  {
    slug: 'expedicion-fotografica-7-lagunas-ausangate-aguas-termales-pacchanta',
    shortLabel: 'Ausangate & Lagunas',
    regionLabel: 'Nevado Ausangate',
    titleOverride: 'Ausangate & 7 Lagunas Glaciares',
    highlightTag: 'Expedición Andina',
    image: PERU_PHOTOS.ausangate,
    objectPosition: 'center 50%'
  }
];

const SLIDE_DURATION_MS = 5600;

export const HeroAdventure3DStage: React.FC<HeroAdventure3DStageProps> = ({
  totalToursCount,
  children
}) => {
  const { formatPrice } = usePreferences();

  const slides = useMemo(() => {
    return SLIDE_BLUEPRINTS.map((bp, idx) => {
      const tour = ALL_TOURS.find((t) => t.slug === bp.slug) ?? ALL_TOURS[idx];
      return {
        ...bp,
        indexStr: `0${idx + 1}`,
        duration: tour?.durationLabel ?? 'Full Day',
        altitude: tour?.altitudeMax ?? '',
        priceUsd: tour?.priceUsd ?? 190
      };
    });
  }, []);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [prevIdx, setPrevIdx] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const outgoingLayerRef = useRef<HTMLDivElement | null>(null);
  const incomingLayerRef = useRef<HTMLDivElement | null>(null);
  const incomingImgRef = useRef<HTMLImageElement | null>(null);
  const captionGroupRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const kenBurnsTweenRef = useRef<gsap.core.Tween | null>(null);

  const activeSlide = slides[activeIdx] ?? slides[0];
  const prevSlide = slides[prevIdx] ?? slides[0];

  const goToSlide = useCallback(
    (nextIndex: number, dirOverride?: 1 | -1) => {
      const normalized = (nextIndex + slides.length) % slides.length;
      if (normalized === activeIdx) return;
      const computedDir: 1 | -1 =
        dirOverride ?? (normalized > activeIdx ? 1 : -1);
      setPrevIdx(activeIdx);
      setDirection(computedDir);
      setActiveIdx(normalized);
    },
    [activeIdx, slides.length]
  );

  // Subtle motion entrance for Left Editorial Column without dimming above-the-fold CTAs
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-intro-stagger',
        { y: 10 },
        { y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out', clearProps: 'transform' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-advance timer (paused on hover or user pause or reduced motion)
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReduced) return;

    const timer = window.setInterval(() => {
      setPrevIdx(activeIdx);
      setDirection(1);
      setActiveIdx((curr) => (curr + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [activeIdx, isPaused, slides.length]);

  // Kinetic Progress Bar animation aligned with SLIDE_DURATION_MS
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    if (isPaused) {
      gsap.set(bar, { scaleX: 1 });
      return;
    }
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: SLIDE_DURATION_MS / 1000,
        ease: 'none'
      }
    );
  }, [activeIdx, isPaused]);

  // Cinematic Directional Shutter Wipe + Parallax + Ken Burns Motion Effect on every transition
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const inLayer = incomingLayerRef.current;
    const inImg = incomingImgRef.current;
    const outLayer = outgoingLayerRef.current;
    const captions = captionGroupRef.current;

    if (!inLayer || !inImg) return;

    if (kenBurnsTweenRef.current) {
      kenBurnsTweenRef.current.kill();
    }

    if (prefersReduced || prevIdx === activeIdx) {
      gsap.set(inLayer, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
      if (!prefersReduced) {
        gsap.set(inImg, { scale: 1.07, xPercent: 0 });
        kenBurnsTweenRef.current = gsap.to(inImg, {
          scale: 1.12,
          xPercent: -1.4,
          duration: SLIDE_DURATION_MS / 1000,
          ease: 'sine.inOut'
        });
      } else {
        gsap.set(inImg, { scale: 1, xPercent: 0 });
      }
      if (captions) {
        gsap.set(captions.children, { y: 0, opacity: 1 });
      }
      return;
    }

    const startClip =
      direction > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';

    const tl = gsap.timeline();

    // Outgoing slide stays visible underneath and drifts gently opposite
    if (outLayer) {
      tl.fromTo(
        outLayer,
        { xPercent: 0, scale: 1.06, opacity: 1 },
        {
          xPercent: -direction * 4,
          scale: 1.06,
          opacity: 0.85,
          duration: 0.85,
          ease: 'power3.out'
        },
        0
      );
    }

    // Incoming slide wipes seamlessly across via GPU clip-path over the outgoing photo
    tl.fromTo(
      inLayer,
      { clipPath: startClip, opacity: 1 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.85,
        ease: 'power3.inOut'
      },
      0
    );

    tl.fromTo(
      inImg,
      { scale: 1.14, xPercent: direction * 2.5 },
      {
        scale: 1.07,
        xPercent: 0,
        duration: 0.9,
        ease: 'power3.out',
        onComplete: () => {
          kenBurnsTweenRef.current = gsap.to(inImg, {
            scale: 1.12,
            xPercent: -direction * 1.6,
            duration: (SLIDE_DURATION_MS - 900) / 1000,
            ease: 'sine.inOut'
          });
        }
      },
      0
    );

    if (captions) {
      tl.fromTo(
        captions.children,
        { y: 10, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out'
        },
        0.15
      );
    }

    return () => {
      tl.kill();
      if (kenBurnsTweenRef.current) kenBurnsTweenRef.current.kill();
    };
  }, [activeIdx, prevIdx, direction]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF8F5] text-[#18221F] overflow-hidden border-b border-[#18221F]/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-5 pb-5 lg:pt-6 lg:pb-6">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* =================================================================
              LEFT COLUMN: CLEAN EDITORIAL TYPOGRAPHY & PRIMARY CTAS
          ================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            <div className="hero-intro-stagger inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2EFE9] border border-[#18221F]/12 text-[#18221F] text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#D9532F]" />
              <span>Operador Local en Perú · {totalToursCount} Rutas Directas</span>
            </div>

            <h1 className="hero-intro-stagger font-serif-editorial text-4xl sm:text-[44px] xl:text-[48px] font-bold tracking-tight text-[#18221F] leading-[1.07]">
              Explora el Perú con{' '}
              <span className="text-[#D9532F]">rutas auténticas</span> diseñadas a tu
              ritmo.
            </h1>

            <p className="hero-intro-stagger text-sm sm:text-[15px] text-[#525E5A] max-w-lg leading-relaxed">
              Desde el amanecer en <strong className="text-[#18221F] font-semibold">Machu Picchu</strong> y las
              cumbres de <strong className="text-[#18221F] font-semibold">Vinicunca</strong> hasta las dunas de{' '}
              <strong className="text-[#18221F] font-semibold">Huacachina</strong> y la selva de{' '}
              <strong className="text-[#18221F] font-semibold">Tambopata</strong>. Boletos oficiales,
              guías locales y asistencia 24/7.
            </p>

            <div className="hero-intro-stagger pt-1 flex flex-wrap items-center gap-3">
              <Link
                to="/catalogo"
                className="px-5 py-3 rounded-md bg-[#D9532F] hover:bg-[#B84020] text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <span>Explorar Catálogo ({totalToursCount})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/planificador"
                className="px-5 py-3 rounded-md bg-white hover:bg-[#F2EFE9] border border-[#18221F]/20 text-[#18221F] font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors duration-200"
              >
                <Compass className="w-4 h-4 text-[#D9532F]" />
                <span>Armar Viaje a Medida</span>
              </Link>
            </div>

            <div className="hero-intro-stagger pt-2 border-t border-[#18221F]/10 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#525E5A] num-tabular">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#18221F]">
                <Star className="w-3.5 h-3.5 fill-[#D49B35] text-[#D49B35]" />
                4.9 / 5 valoración
              </span>
              <span>·</span>
              <span>1,420+ viajeros verificados</span>
              <span>·</span>
              <span>08 regiones del Perú</span>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: EDGE-TO-EDGE CINEMATIC IMAGE CAROUSEL
          ================================================================= */}
          <div className="lg:col-span-7">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') goToSlide(activeIdx + 1, 1);
                else if (e.key === 'ArrowLeft') goToSlide(activeIdx - 1, -1);
              }}
              tabIndex={0}
              className="rounded-lg overflow-hidden border border-[#18221F]/15 bg-[#141C19] shadow-[0_22px_50px_rgba(24,34,31,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F]"
              role="region"
              aria-roledescription="carousel"
              aria-label="Destinos destacados del Perú"
            >
              {/* Main Edge-to-Edge Photo Viewport */}
              <div className="relative h-[290px] sm:h-[340px] lg:h-[372px] overflow-hidden bg-[#141C19]">
                {/* Outgoing Slide Layer (for seamless parallax cross-transition) */}
                {prevIdx !== activeIdx && (
                  <div
                    key={`out-${prevSlide.slug}`}
                    ref={outgoingLayerRef}
                    aria-hidden="true"
                    className="absolute inset-0 z-0 will-change-transform"
                  >
                    <img
                      src={prevSlide.image}
                      alt=""
                      style={{ objectPosition: prevSlide.objectPosition }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Incoming Active Slide Layer (Clip-Path Wipe + Ken Burns Zoom) */}
                <div
                  key={`in-${activeSlide.slug}`}
                  ref={incomingLayerRef}
                  className="absolute inset-0 z-10 will-change-[clip-path,transform]"
                >
                  <img
                    ref={incomingImgRef}
                    src={activeSlide.image}
                    alt={activeSlide.titleOverride}
                    style={{ objectPosition: activeSlide.objectPosition }}
                    className="w-full h-full object-cover will-change-transform"
                  />
                  {/* Scrim overlays exclusively for crisp typography legibility */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#141C19]/55 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#141C19]/92 via-[#141C19]/45 to-transparent" />
                </div>

                {/* Top Controls Row (Index Counter Left · Prev/Next/Pause Right) */}
                <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141C19]/65 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold num-tabular">
                    <span className="text-[#E8B954] font-bold">
                      {activeSlide.indexStr} / 0{slides.length}
                    </span>
                    <span className="text-white/40">|</span>
                    <span className="tracking-wide uppercase text-[10px]">
                      {activeSlide.regionLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsPaused((p) => !p)}
                      aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
                      className="w-8 h-8 rounded bg-[#141C19]/60 hover:bg-[#141C19]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => goToSlide(activeIdx - 1, -1)}
                      aria-label="Destino anterior"
                      className="w-8 h-8 rounded bg-[#141C19]/60 hover:bg-[#D9532F] backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => goToSlide(activeIdx + 1, 1)}
                      aria-label="Siguiente destino"
                      className="w-8 h-8 rounded bg-[#141C19]/60 hover:bg-[#D9532F] backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay Info, Action Bar & Minimalist Progress Dots */}
                <div className="absolute bottom-6 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div ref={captionGroupRef} className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#E8B954] num-tabular">
                      <span className="px-2 py-0.5 rounded-xs bg-[#D9532F] text-white uppercase tracking-wider text-[10px]">
                        {activeSlide.highlightTag}
                      </span>
                      <span>{activeSlide.duration}</span>
                      {activeSlide.altitude && (
                        <>
                          <span className="text-white/40">·</span>
                          <span className="text-white/95">
                            {activeSlide.altitude.split('(')[0].split('/')[0].trim()}
                          </span>
                        </>
                      )}
                    </div>
                    <Link
                      to={`/tours/${activeSlide.slug}`}
                      className="font-serif-editorial text-lg sm:text-2xl font-bold text-white hover:text-[#E8B954] leading-tight block truncate transition-colors"
                    >
                      {activeSlide.titleOverride}
                    </Link>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
                    {/* Subtle Glass Dot Indicators inside viewport */}
                    <div className="hidden md:flex items-center gap-1.5 mr-1">
                      {slides.map((slide, idx) => (
                        <button
                          key={slide.slug}
                          type="button"
                          onClick={() => goToSlide(idx, idx > activeIdx ? 1 : -1)}
                          aria-label={`Ver ${slide.shortLabel}`}
                          aria-current={idx === activeIdx ? 'true' : undefined}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === activeIdx
                              ? 'w-7 bg-[#E8B954]'
                              : 'w-2.5 bg-white/45 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>

                    <Link
                      to={`/tours/${activeSlide.slug}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-white/95 hover:bg-[#D9532F] text-[#18221F] hover:text-white text-xs font-bold transition-colors shadow-md num-tabular"
                    >
                      <span>Desde {formatPrice(activeSlide.priceUsd)}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Ultra-Thin Bottom Edge Playback Progress Rail */}
                <div className="absolute bottom-0 inset-x-0 z-20 h-[3px] bg-white/15 overflow-hidden">
                  <div
                    ref={progressBarRef}
                    style={{ transformOrigin: 'left center' }}
                    className="h-full w-full bg-[#D9532F]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            DOCKED ABOVE-THE-FOLD SEARCH BAR
        ================================================================= */}
        <div>{children}</div>
      </div>
    </section>
  );
};

export default HeroAdventure3DStage;
