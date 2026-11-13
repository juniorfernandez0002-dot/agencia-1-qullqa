import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  ArrowLeftRight,
  ArrowUpRight,
  ChevronDown,
  Compass,
  Globe,
  Menu,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  X
} from 'lucide-react';
import { WhatsAppLogo } from './SocialIcons';
import { usePreferences } from '../context/PreferencesContext';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { ALL_TOURS } from '../data/catalog';
import { BrandSymbol } from './BrandSymbol';

export { BrandSymbol };

export const Navbar: React.FC = () => {
  const {
    currency,
    setCurrency,
    formatPrice,
    savedSlugs,
    toggleSavedSlug,
    clearSavedSlugs,
    buildWhatsAppUrl
  } = usePreferences();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [shortlistOpen, setShortlistOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [languageInfoOpen, setLanguageInfoOpen] = useState(false);

  const location = useLocation();
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const destinationsButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const shortlistButtonRef = useRef<HTMLButtonElement | null>(null);
  const languageContainerRef = useRef<HTMLDivElement | null>(null);
  const languageButtonRef = useRef<HTMLButtonElement | null>(null);

  const savedTours = ALL_TOURS.filter((tour) => savedSlugs.includes(tour.slug)).slice(0, 4);
  const isCompareView = compareMode && savedTours.length >= 2;
  const plannerCompareUrl =
    savedSlugs.length > 0 ? `/planificador?comparar=${savedSlugs.join(',')}` : '/planificador';

  const t = {
    topMobile: 'QULLQA · ASISTENCIA 24/7',
    topOperational: 'Atención directa en Perú · Asistencia en ruta 24/7',
    topBases: 'Bases operativas en Cusco (3,399 m), Lima, Arequipa y Tambopata',
    subtitle: 'TRAVESÍAS DEL PERÚ',
    destinos: 'Destinos',
    regionsHeading: `${DESTINATIONS_DATA.length} REGIONES OPERATIVAS EN PERÚ`,
    viewAtlas: 'Ver atlas completo',
    tours: 'Tours 1 Día',
    paquetes: 'Paquetes',
    experiencias: 'Experiencias',
    ofertas: 'Ofertas',
    nosotros: 'Nosotros',
    blog: 'Blog & Guías',
    confianza: 'Proceso & Confianza',
    cta: 'Diseñar Viaje',
    shortlist: 'Carrito',
    shortlistAria: `Abrir carrito de compras (${savedSlugs.length} rutas agregadas)`,
    currencyLabel: 'Moneda',
    languageLabel: 'ES · Español',
    languageAria: 'Información sobre idioma del portal y atención multilingüe',
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
    catalogAll: `Catálogo Completo (${ALL_TOURS.length})`,
    destinationsCount: `${DESTINATIONS_DATA.length} Destinos Perú`,
    multiDay: 'Paquetes Multidía',
    oneDay: 'Tours de 1 Día',
    offersMobile: 'Ofertas y Salidas',
    aboutMobile: 'Nosotros & Marca',
    blogMobile: 'Blog & Guías',
    trustMobile: 'Proceso y FAQs',
    whatsappConsult: 'Consultar por WhatsApp',
    customQuote: 'Diseñar Viaje',
    drawerTag: 'CARRITO DE COMPRAS',
    drawerTitle: `Tu Carrito (${savedTours.length})`,
    drawerEmpty:
      'Tu carrito de viajes está vacío. Pulsa el ícono del carrito en cualquier tour para agregar rutas, comparar precios o cotizar todo junto.',
    remove: 'Quitar',
    fromGroup: 'Desde (Grupal):',
    fromPrivate: 'Desde (Privado):',
    compareSideBySide: 'Comparar lado a lado',
    compareMinHint: 'Agrega al menos 2 rutas al carrito para activar el comparador lado a lado.',
    quoteSelection: 'Cotizar carrito en Planificador',
    clearSelection: 'Vaciar carrito',
    keepBrowsing: 'Seguir explorando el catálogo',
    compareTag: 'COMPARADOR DEL CARRITO',
    compareTitle: `Comparativa de ${savedTours.length} rutas`,
    backToList: 'Ver carrito',
    closeDrawer: 'Cerrar carrito de compras',
    viewDossier: 'Ver ficha',
    rowCode: 'Código',
    rowDestination: 'Destino',
    rowDuration: 'Duración',
    rowAltitude: 'Altitud Máx.',
    rowDifficulty: 'Dificultad',
    rowModality: 'Modalidad',
    rowGroupRate: 'Tarifa Grupal',
    rowPrivateRate: 'Tarifa Privada',
    rowSingleSupp: 'Suplemento Individual',
    rowActions: 'Acciones',
    noSupplement: 'No aplica'
  };

  const isCatalogCategory = (cat: string) =>
    location.pathname === '/catalogo' && location.search.includes(`categoria=${cat}`);

  const closeShortlist = (restoreFocus = false) => {
    setShortlistOpen(false);
    setCompareMode(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        shortlistButtonRef.current?.focus();
      });
    }
  };

  useEffect(() => {
    if (!destinationsOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownContainerRef.current?.contains(event.target as Node)) {
        setDestinationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [destinationsOpen]);

  useEffect(() => {
    if (!languageInfoOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!languageContainerRef.current?.contains(event.target as Node)) {
        setLanguageInfoOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [languageInfoOpen]);

  useEffect(() => {
    if (!shortlistOpen && !destinationsOpen && !mobileOpen && !languageInfoOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (shortlistOpen) {
        setShortlistOpen(false);
        setCompareMode(false);
        window.requestAnimationFrame(() => {
          shortlistButtonRef.current?.focus();
        });
        return;
      }

      if (destinationsOpen) {
        setDestinationsOpen(false);
        destinationsButtonRef.current?.focus();
        return;
      }

      if (languageInfoOpen) {
        setLanguageInfoOpen(false);
        languageButtonRef.current?.focus();
        return;
      }

      if (mobileOpen) {
        setMobileOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [shortlistOpen, destinationsOpen, mobileOpen, languageInfoOpen]);

  return (
    <>
      {/* Top Operational Bar */}
      <div className="bg-gradient-to-r from-[#18221F] via-[#1F332C] to-[#1F513F] text-[#FAF8F5] border-b border-white/15 text-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#E8B954] min-w-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E87A5A] shrink-0" />
              <span className="sm:hidden truncate">{t.topMobile}</span>
              <span className="hidden sm:inline">{t.topOperational}</span>
            </span>
            <span className="hidden lg:inline text-white/30" aria-hidden="true">
              |
            </span>
            <span className="hidden lg:inline text-[#C7C2B8]">{t.topBases}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto shrink-0">
            <Link
              to="/confianza"
              className="hidden sm:inline-flex items-center gap-1 text-[#C7C2B8] hover:text-[#E8B954] transition-colors duration-200 ease-[var(--ease-out-snappy)] whitespace-nowrap"
            >
              {t.confianza}
            </Link>

            {/* Currency Toggle USD / PEN */}
            <div
              role="group"
              aria-label={t.currencyLabel}
              className="flex items-center bg-white/5 border border-white/15 rounded px-1 py-0.5 num-tabular text-[11px]"
            >
              <button
                type="button"
                aria-pressed={currency === 'USD'}
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded transition-colors duration-200 ease-[var(--ease-out-snappy)] whitespace-nowrap cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#D9532F] text-white font-semibold'
                    : 'text-[#C7C2B8] hover:text-white'
                }`}
              >
                USD $
              </button>
              <button
                type="button"
                aria-pressed={currency === 'PEN'}
                onClick={() => setCurrency('PEN')}
                className={`px-2 py-0.5 rounded transition-colors duration-200 ease-[var(--ease-out-snappy)] whitespace-nowrap cursor-pointer ${
                  currency === 'PEN'
                    ? 'bg-[#D9532F] text-white font-semibold'
                    : 'text-[#C7C2B8] hover:text-white'
                }`}
              >
                PEN S/
              </button>
            </div>

            {/* Informative Language Scope Popover */}
            <div
              ref={languageContainerRef}
              className="relative"
              onBlur={(e) => {
                if (!languageContainerRef.current?.contains(e.relatedTarget as Node | null)) {
                  setLanguageInfoOpen(false);
                }
              }}
            >
              <button
                ref={languageButtonRef}
                type="button"
                onClick={() => setLanguageInfoOpen((prev) => !prev)}
                aria-expanded={languageInfoOpen}
                aria-haspopup="true"
                aria-controls="language-scope-popover"
                aria-label={t.languageAria}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FAF8F5] hover:text-[#E8B954] border border-white/15 rounded px-2 py-1 transition-colors duration-200 ease-[var(--ease-out-snappy)] whitespace-nowrap cursor-pointer"
              >
                <Globe className="w-3 h-3 text-[#E8B954] shrink-0" />
                <span>{t.languageLabel}</span>
                <ChevronDown
                  className={`w-3 h-3 opacity-75 transition-transform duration-200 ease-[var(--ease-out-snappy)] ${
                    languageInfoOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {languageInfoOpen && (
                <div
                  id="language-scope-popover"
                  role="region"
                  aria-label="Idiomas disponibles de operación"
                  className="absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-1.5rem))] z-50 bg-[#FFFFFF] text-[#18221F] border border-[#18221F]/15 rounded-md shadow-2xl p-4 space-y-2.5"
                >
                  <p className="text-xs leading-relaxed text-[#18221F]">
                    Edición del portal: <strong>Español</strong> · Operación presencial, guías certificados y cotizaciones disponibles en{' '}
                    <strong>Español, Inglés (EN), Francés (FR) y Portugués (PT)</strong>.
                  </p>
                  <a
                    href={buildWhatsAppUrl(
                      'Hello Qullqa Travesías team, I would like travel assistance and a quote in English for Peru.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setLanguageInfoOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F513F] hover:text-[#B84020] transition-colors duration-200"
                  >
                    <WhatsAppLogo className="w-4 h-4 shrink-0" />
                    <span>Atención directa en inglés por WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Editorial & Commercial Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#18221F]/10 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 min-w-0">
            <BrandSymbol className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 transition-transform duration-200 ease-[var(--ease-out-snappy)] group-hover:scale-[1.03]" />
            <div className="min-w-0">
              <span className="font-serif-editorial text-xl sm:text-[25px] font-bold tracking-[0.08em] text-[#18221F] leading-none block">
                QULLQA
              </span>
              <p className="eyebrow-editorial text-[10px] tracking-[0.16em] text-[#1F513F] mt-1 leading-none whitespace-nowrap font-bold">
                {t.subtitle}
              </p>
            </div>
          </Link>

          {/* Primary Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6 text-[13px] 2xl:text-sm font-medium text-[#18221F] whitespace-nowrap">
            {/* Destinations Accessible Dropdown */}
            <div
              ref={dropdownContainerRef}
              className="relative"
              onMouseEnter={() => setDestinationsOpen(true)}
              onMouseLeave={() => setDestinationsOpen(false)}
              onBlur={(e) => {
                if (!dropdownContainerRef.current?.contains(e.relatedTarget as Node | null)) {
                  setDestinationsOpen(false);
                }
              }}
            >
              <button
                ref={destinationsButtonRef}
                type="button"
                aria-expanded={destinationsOpen}
                aria-haspopup="true"
                aria-controls="destinations-dropdown-panel"
                onClick={() => setDestinationsOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1 py-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] hover:text-[#B84020] cursor-pointer ${
                  location.pathname.startsWith('/destinos') ? 'text-[#B84020] font-semibold' : ''
                }`}
              >
                <span>{t.destinos}</span>
                <ChevronDown
                  className={`w-4 h-4 opacity-75 transition-transform duration-200 ease-[var(--ease-out-snappy)] ${
                    destinationsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {destinationsOpen && (
                <div
                  id="destinations-dropdown-panel"
                  className="absolute left-0 top-full pt-2 w-[620px] z-50"
                >
                  <div className="bg-[#FFFFFF] border border-[#18221F]/15 shadow-2xl rounded-md p-5 grid grid-cols-2 gap-3">
                    <div className="col-span-2 flex items-center justify-between pb-2.5 mb-1 border-b border-[#18221F]/10">
                      <span className="eyebrow-editorial text-[#525E5A]">{t.regionsHeading}</span>
                      <Link
                        to="/destinos"
                        onClick={() => setDestinationsOpen(false)}
                        className="text-xs font-semibold text-[#B84020] hover:underline inline-flex items-center gap-1"
                      >
                        {t.viewAtlas} <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    {DESTINATIONS_DATA.map((dest) => (
                      <Link
                        key={dest.slug}
                        to={`/destinos/${dest.slug}`}
                        onClick={() => setDestinationsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded hover:bg-[#F2EFE9] transition-colors duration-200 ease-[var(--ease-out-snappy)] group"
                      >
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          className="w-12 h-12 rounded object-cover shrink-0 border border-[#18221F]/10"
                        />
                        <div className="min-w-0">
                          <div className="font-serif-editorial font-semibold text-[#18221F] group-hover:text-[#B84020] transition-colors duration-200 text-sm truncate">
                            {dest.name}
                          </div>
                          <div className="num-tabular text-[11px] text-[#525E5A] truncate">
                            {dest.altitudeRange}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/catalogo?categoria=full-day"
              className={`py-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                isCatalogCategory('full-day') ? 'text-[#B84020] font-semibold' : 'hover:text-[#B84020]'
              }`}
            >
              {t.tours}
            </Link>

            <Link
              to="/catalogo?categoria=paquetes-peru"
              className={`py-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                isCatalogCategory('paquetes-peru') ? 'text-[#B84020] font-semibold' : 'hover:text-[#B84020]'
              }`}
            >
              {t.paquetes}
            </Link>

            <Link
              to="/catalogo?categoria=experiencias-privadas"
              className={`py-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                isCatalogCategory('experiencias-privadas')
                  ? 'text-[#B84020] font-semibold'
                  : 'hover:text-[#B84020]'
              }`}
            >
              {t.experiencias}
            </Link>

            <NavLink
              to="/ofertas"
              className={({ isActive }) =>
                `py-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                  isActive ? 'text-[#B84020] font-semibold' : 'hover:text-[#B84020]'
                }`
              }
            >
              {t.ofertas}
            </NavLink>

            <NavLink
              to="/nosotros"
              className={({ isActive }) =>
                `py-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                  isActive ? 'text-[#B84020] font-semibold' : 'hover:text-[#B84020]'
                }`
              }
            >
              {t.nosotros}
            </NavLink>

            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `py-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                  isActive ? 'text-[#B84020] font-semibold' : 'hover:text-[#B84020]'
                }`
              }
            >
              {t.blog}
            </NavLink>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Saved Trips / Shortlist Button */}
            <button
              ref={shortlistButtonRef}
              type="button"
              onClick={() => setShortlistOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={shortlistOpen}
              aria-controls="shortlist-dialog"
              aria-label={t.shortlistAria}
              className="relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded border border-[#18221F]/20 hover:border-[#18221F] bg-[#F2EFE9]/80 text-xs font-medium text-[#18221F] transition-colors duration-200 ease-[var(--ease-out-snappy)] whitespace-nowrap cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#D9532F] shrink-0" />
              <span className="hidden sm:inline">{t.shortlist}</span>
              <span className="num-tabular text-[11px] font-semibold bg-[#18221F] text-[#FAF8F5] px-1.5 py-0.5 rounded-sm leading-none">
                {savedSlugs.length}
              </span>
            </button>

            {/* Direct WhatsApp Button with Official Brand Logo */}
            <a
              href={buildWhatsAppUrl(
                'Hola equipo de Qullqa Travesías, estoy explorando sus rutas por Perú y deseo asesoría de un especialista.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#1F513F] text-[#18221F] hover:text-white text-xs font-semibold transition-colors duration-200 ease-[var(--ease-out-snappy)] whitespace-nowrap"
            >
              <WhatsAppLogo className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Planning CTA (hidden below sm to keep 390px header zero-overflow) */}
            <Link
              to="/planificador"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 ease-[var(--ease-out-snappy)] shadow-sm whitespace-nowrap"
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>{t.cta}</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              ref={mobileMenuButtonRef}
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
              className="xl:hidden p-2 rounded border border-[#18221F]/20 text-[#18221F] hover:bg-[#F2EFE9] transition-colors duration-200 ease-[var(--ease-out-snappy)] shrink-0 cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div
            id="mobile-navigation-drawer"
            className="xl:hidden bg-[#FAF8F5] border-b border-[#18221F]/15 px-3 sm:px-6 pt-3 pb-6 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link
                to="/catalogo"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded bg-[#F2EFE9] text-[#18221F] font-semibold"
              >
                {t.catalogAll}
              </Link>
              <Link
                to="/destinos"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded bg-[#F2EFE9] text-[#18221F] font-semibold"
              >
                {t.destinationsCount}
              </Link>
              <Link
                to="/catalogo?categoria=paquetes-peru"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded border border-[#18221F]/12"
              >
                {t.multiDay}
              </Link>
              <Link
                to="/catalogo?categoria=full-day"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded border border-[#18221F]/12"
              >
                {t.oneDay}
              </Link>
              <Link
                to="/ofertas"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded border border-[#18221F]/12"
              >
                {t.offersMobile}
              </Link>
              <Link
                to="/nosotros"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded border border-[#18221F]/12"
              >
                {t.aboutMobile}
              </Link>
              <Link
                to="/blog"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded border border-[#18221F]/12"
              >
                {t.blogMobile}
              </Link>
              <Link
                to="/confianza"
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded border border-[#18221F]/12"
              >
                {t.trustMobile}
              </Link>
            </div>
            <div className="pt-2 flex gap-2">
              <a
                href={buildWhatsAppUrl('Hola Qullqa Travesías, quisiera cotizar un viaje por Perú.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded bg-[#1F513F] text-white text-center text-xs font-semibold inline-flex items-center justify-center gap-1.5"
              >
                <WhatsAppLogo className="w-4 h-4 shrink-0" />
                <span>{t.whatsappConsult}</span>
              </a>
              <Link
                to="/planificador"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2.5 px-3 rounded bg-[#D9532F] text-white text-center text-xs font-semibold"
              >
                {t.customQuote}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Saved Trips / Comparison Drawer & Side-by-Side Modal */}
      {shortlistOpen && (
        <div
          id="shortlist-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortlist-dialog-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeShortlist(true);
            }
          }}
          className={`fixed inset-0 z-50 bg-[#18221F]/65 flex ${
            isCompareView ? 'items-center justify-center p-3 sm:p-6' : 'justify-end'
          }`}
        >
          {isCompareView ? (
            <div className="w-full max-w-5xl max-h-[90vh] bg-[#FAF8F5] rounded-md shadow-2xl border border-[#18221F]/15 flex flex-col overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-[#18221F]/12 bg-[#FFFFFF] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="eyebrow-editorial text-[#B84020] block">{t.compareTag}</span>
                  <h3
                    id="shortlist-dialog-title"
                    className="font-serif-editorial text-xl sm:text-2xl font-bold text-[#18221F]"
                  >
                    {t.compareTitle}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCompareMode(false)}
                    className="px-3 py-1.5 rounded border border-[#18221F]/20 text-xs font-semibold text-[#18221F] hover:bg-[#F2EFE9] transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
                  >
                    {t.backToList}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      clearSavedSlugs();
                      setCompareMode(false);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-[#18221F]/20 text-xs font-medium text-[#525E5A] hover:text-[#B84020] hover:border-[#B84020]/40 transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.clearSelection}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => closeShortlist(true)}
                    aria-label={t.closeDrawer}
                    className="p-2 rounded hover:bg-[#F2EFE9] text-[#18221F] transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 sm:p-6">
                <table className="w-full min-w-[680px] border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#18221F]/15">
                      <th className="py-3 pr-4 align-bottom w-40 eyebrow-editorial text-[#525E5A]">
                        &nbsp;
                      </th>
                      {savedTours.map((tour) => (
                        <th
                          key={tour.id}
                          className="p-3 align-top min-w-[180px] bg-[#FFFFFF] border-l border-[#18221F]/10"
                        >
                          <img
                            src={tour.heroImage}
                            alt={tour.title}
                            className="w-full h-24 object-cover rounded mb-2.5 border border-[#18221F]/10"
                          />
                          <div className="font-serif-editorial font-bold text-sm text-[#18221F] leading-snug line-clamp-2">
                            {tour.title}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#18221F]/10">
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowCode}
                      </th>
                      {savedTours.map((tour) => (
                        <td
                          key={tour.id}
                          className="p-3 border-l border-[#18221F]/10 num-tabular font-semibold text-[#B84020]"
                        >
                          {tour.code}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowDestination}
                      </th>
                      {savedTours.map((tour) => (
                        <td key={tour.id} className="p-3 border-l border-[#18221F]/10 text-[#18221F]">
                          {tour.destinationName}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowDuration}
                      </th>
                      {savedTours.map((tour) => (
                        <td
                          key={tour.id}
                          className="p-3 border-l border-[#18221F]/10 num-tabular text-[#18221F]"
                        >
                          {tour.durationLabel}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowAltitude}
                      </th>
                      {savedTours.map((tour) => (
                        <td
                          key={tour.id}
                          className="p-3 border-l border-[#18221F]/10 num-tabular text-[#18221F]"
                        >
                          {tour.altitudeMax}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowDifficulty}
                      </th>
                      {savedTours.map((tour) => (
                        <td key={tour.id} className="p-3 border-l border-[#18221F]/10 text-[#18221F]">
                          {tour.difficulty}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowModality}
                      </th>
                      {savedTours.map((tour) => (
                        <td key={tour.id} className="p-3 border-l border-[#18221F]/10 text-[#18221F]">
                          {tour.modalities.join(' · ')}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-[#F2EFE9]/45">
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#18221F]">
                        {t.rowGroupRate}
                      </th>
                      {savedTours.map((tour) => {
                        const isPrivateOnly =
                          tour.modalities.length === 1 &&
                          tour.modalities[0] === 'Privado a Medida';
                        return (
                          <td
                            key={tour.id}
                            className="p-3 border-l border-[#18221F]/10 num-tabular font-bold text-[#18221F]"
                          >
                            {isPrivateOnly ? 'Solo Privado' : formatPrice(tour.priceUsd)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowPrivateRate}
                      </th>
                      {savedTours.map((tour) => (
                        <td
                          key={tour.id}
                          className="p-3 border-l border-[#18221F]/10 num-tabular font-semibold text-[#18221F]"
                        >
                          {formatPrice(tour.privatePriceUsd)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowSingleSupp}
                      </th>
                      {savedTours.map((tour) => (
                        <td
                          key={tour.id}
                          className="p-3 border-l border-[#18221F]/10 num-tabular text-[#525E5A]"
                        >
                          {tour.singleSupplementUsd
                            ? formatPrice(tour.singleSupplementUsd)
                            : t.noSupplement}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="py-3 pr-4 font-semibold text-[#525E5A]">
                        {t.rowActions}
                      </th>
                      {savedTours.map((tour) => (
                        <td key={tour.id} className="p-3 border-l border-[#18221F]/10">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              to={`/tours/${tour.slug}`}
                              onClick={() => closeShortlist(false)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#18221F] hover:bg-[#B84020] text-white text-xs font-semibold transition-colors duration-200 ease-[var(--ease-out-snappy)]"
                            >
                              <span>{t.viewDossier}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => toggleSavedSlug(tour.slug)}
                              className="px-2 py-1.5 text-xs font-medium text-[#525E5A] hover:text-[#B84020] transition-colors duration-200 cursor-pointer"
                            >
                              {t.remove}
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="px-4 sm:px-6 py-4 border-t border-[#18221F]/12 bg-[#F2EFE9] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    clearSavedSlugs();
                    setCompareMode(false);
                  }}
                  className="text-xs font-semibold text-[#525E5A] hover:text-[#B84020] transition-colors duration-200 cursor-pointer"
                >
                  {t.clearSelection}
                </button>
                <Link
                  to={plannerCompareUrl}
                  onClick={() => closeShortlist(false)}
                  className="px-5 py-2.5 rounded bg-[#D9532F] hover:bg-[#B84020] text-white font-semibold text-xs sm:text-sm transition-colors duration-200 ease-[var(--ease-out-snappy)]"
                >
                  {t.quoteSelection}
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl border-l border-[#18221F]/15 flex flex-col justify-between">
              <div className="p-5 sm:p-6 border-b border-[#18221F]/12 flex items-center justify-between gap-3">
                <div>
                  <span className="eyebrow-editorial text-[#B84020] block">{t.drawerTag}</span>
                  <h3
                    id="shortlist-dialog-title"
                    className="font-serif-editorial text-xl font-bold text-[#18221F]"
                  >
                    {t.drawerTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => closeShortlist(true)}
                  aria-label={t.closeDrawer}
                  className="p-2 rounded hover:bg-[#F2EFE9] text-[#18221F] transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
                {savedTours.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-10 h-10 text-[#525E5A] mx-auto mb-3 opacity-60" />
                    <p className="text-sm text-[#525E5A] leading-relaxed">{t.drawerEmpty}</p>
                  </div>
                ) : (
                  savedTours.map((tour) => {
                    const isPrivateOnly =
                      tour.modalities.length === 1 && tour.modalities[0] === 'Privado a Medida';
                    return (
                      <div
                        key={tour.id}
                        className="p-3.5 rounded bg-[#FFFFFF] border border-[#18221F]/12 flex gap-3.5 items-start"
                      >
                        <img
                          src={tour.heroImage}
                          alt={tour.title}
                          className="w-20 h-20 rounded object-cover shrink-0 border border-[#18221F]/10"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="num-tabular text-[11px] text-[#B84020] font-semibold">
                              {tour.code} · {tour.durationLabel}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleSavedSlug(tour.slug)}
                              className="text-xs text-[#525E5A] hover:text-[#B84020] transition-colors duration-200 cursor-pointer"
                            >
                              {t.remove}
                            </button>
                          </div>
                          <Link
                            to={`/tours/${tour.slug}`}
                            onClick={() => closeShortlist(false)}
                            className="font-serif-editorial font-semibold text-sm text-[#18221F] hover:text-[#B84020] line-clamp-2 mt-0.5 block transition-colors duration-200"
                          >
                            {tour.title}
                          </Link>
                          <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-[#525E5A]">
                              {isPrivateOnly ? t.fromPrivate : t.fromGroup}
                            </span>
                            <span className="num-tabular font-semibold text-[#18221F]">
                              {formatPrice(isPrivateOnly ? tour.privatePriceUsd : tour.priceUsd)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-5 sm:p-6 border-t border-[#18221F]/12 bg-[#F2EFE9] space-y-2.5">
                <button
                  type="button"
                  disabled={savedTours.length < 2}
                  onClick={() => setCompareMode(true)}
                  className={`w-full py-2.5 px-4 rounded font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                    savedTours.length >= 2
                      ? 'bg-[#18221F] hover:bg-[#1E2B27] text-[#FFFFFF] cursor-pointer'
                      : 'bg-[#18221F]/12 text-[#525E5A] cursor-not-allowed'
                  }`}
                >
                  <ArrowLeftRight className="w-4 h-4 text-[#D49B35]" />
                  <span>{t.compareSideBySide}</span>
                </button>
                {savedTours.length === 1 && (
                  <p className="text-[11px] text-[#525E5A] text-center">{t.compareMinHint}</p>
                )}

                <Link
                  to={plannerCompareUrl}
                  onClick={() => closeShortlist(false)}
                  className="w-full py-3 px-4 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-center font-semibold text-sm block transition-colors duration-200 ease-[var(--ease-out-snappy)]"
                >
                  {t.quoteSelection}
                </Link>

                <div className="flex items-center justify-between pt-1">
                  {savedTours.length > 0 ? (
                    <button
                      type="button"
                      onClick={clearSavedSlugs}
                      className="text-xs text-[#525E5A] hover:text-[#B84020] font-medium transition-colors duration-200 cursor-pointer"
                    >
                      {t.clearSelection}
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => closeShortlist(true)}
                    className="text-xs text-[#525E5A] hover:text-[#18221F] font-medium transition-colors duration-200 cursor-pointer"
                  >
                    {t.keepBrowsing}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
