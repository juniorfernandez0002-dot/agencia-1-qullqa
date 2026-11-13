import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { WhatsAppLogo } from './components/SocialIcons';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { DestinationDetailPage, DestinationsListPage } from './pages/DestinationsPage';
import { BlogListPage, BlogPostDetailPage } from './pages/BlogPage';
import { AboutBrandPage } from './pages/AboutBrandPage';
import { TrustProcessPage } from './pages/TrustProcessPage';
import { OffersPage } from './pages/OffersPage';
import { TripPlannerPage } from './pages/TripPlannerPage';

const ScrollManager: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const section = params.get('seccion');

    if (!section) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const escapedSection =
        typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
          ? CSS.escape(section)
          : section;
      const target =
        document.querySelector(`[data-section-anchor="${escapedSection}"]`) ??
        document.getElementById(section);

      if (target) {
        const prefersReduced =
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, search]);

  return null;
};

const FloatingWhatsAppDesk: React.FC = () => {
  const { buildWhatsAppUrl } = usePreferences();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-3 right-3 z-30 flex items-center">
      <a
        href={buildWhatsAppUrl(
          'Hola equipo de Qullqa Travesías, deseo asesoría para organizar mi viaje por Perú.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        title="Mesa Operativa 24/7 · WhatsApp"
        aria-label="Mesa Operativa 24/7 · WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl border-2 border-white flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        <WhatsAppLogo className="w-10 h-10" />
      </a>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        title="Ocultar acceso rápido de WhatsApp"
        aria-label="Ocultar acceso rápido de WhatsApp"
        className="w-5 h-5 -ml-2.5 -mt-7 rounded-full bg-[#18221F] hover:bg-[#1E2B27] text-[#C7C2B8] hover:text-white border border-[#D49B35]/45 flex items-center justify-center shadow-md transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export function App() {
  return (
    <PreferencesProvider>
      <HashRouter>
        <ScrollManager />
        <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#18221F]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/tours/:slug" element={<TourDetailPage />} />
              <Route path="/destinos" element={<DestinationsListPage />} />
              <Route path="/destinos/:slug" element={<DestinationDetailPage />} />
              <Route path="/ofertas" element={<OffersPage />} />
              <Route path="/planificador" element={<TripPlannerPage />} />
              <Route path="/nosotros" element={<AboutBrandPage />} />
              <Route path="/confianza" element={<TrustProcessPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
              <Route path="*" element={<CatalogPage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsAppDesk />
        </div>
      </HashRouter>
    </PreferencesProvider>
  );
}

export default App;
