import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { BrandSymbol } from './BrandSymbol';
import {
  FacebookLogo,
  InstagramLogo,
  TikTokLogo,
  WhatsAppLogo,
  YouTubeLogo
} from './SocialIcons';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { usePreferences } from '../context/PreferencesContext';

const NEWSLETTER_STORAGE_KEY = 'qullqa_newsletter_v2';

export const Footer: React.FC = () => {
  const { buildWhatsAppUrl } = usePreferences();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(NEWSLETTER_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Ingresa un correo electrónico válido para recibir nuestras alertas de ruta.');
      return;
    }
    setError('');
    try {
      localStorage.setItem(NEWSLETTER_STORAGE_KEY, 'true');
    } catch {
      // ignore storage unavailability
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="section-deferred bg-[#141C19] text-[#FAF8F5] border-t border-white/10">
      {/* Newsletter & Seasonal Dispatch Section */}
      <div className="border-b border-white/10 bg-[#192420]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="eyebrow-editorial text-[#E8B954] block">
              DESPACHO CARTOGRÁFICO &amp; ALERTAS ESTACIONALES
            </span>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
              Recibe disponibilidad de turnos en Machu Picchu, aperturas del Camino Inca y rutas de temporada
            </h3>
            <p className="text-sm text-[#C7C2B8] prose-measure">
              Enviamos una edición mensual curada por nuestros especialistas en Cusco y Lima con consejos reales de aclimatación, estado de carreteras y tarifas vigentes de temporada.
            </p>
          </div>

          <div className="lg:col-span-5" aria-live="polite">
            {subscribed ? (
              <div className="p-4 rounded bg-[#1F513F]/50 border border-[#D49B35]/50 flex items-center gap-3 text-sm text-[#FAF8F5]">
                <CheckCircle2 className="w-5 h-5 text-[#E8B954] shrink-0" />
                <span>
                  Alerta estacional registrada en este dispositivo. Recibirás las próximas actualizaciones de temporada y cupos.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Correo electrónico para alertas estacionales de Qullqa
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu.correo@dominio.com"
                    className="flex-1 bg-white/8 border border-white/20 rounded px-4 py-3 text-sm text-white placeholder:text-[#C7C2B8]/70 focus:outline-none focus:border-[#E8B954]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded bg-[#D9532F] hover:bg-[#B84020] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] shrink-0"
                  >
                    <span>Suscribirme</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && (
                  <p role="alert" className="text-xs font-medium text-[#E87A5A]">
                    {error}
                  </p>
                )}
                <p className="text-[11px] text-[#C7C2B8]">
                  Envío mensual curado. Puedes cancelar la suscripción en cualquier momento.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Directory */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Col 1: Brand & Offices */}
        <div className="lg:col-span-4 space-y-5">
          <Link to="/" className="flex items-center gap-3">
            <BrandSymbol className="w-11 h-11 shrink-0" />
            <div>
              <span className="font-serif-editorial text-2xl font-bold tracking-tight text-white block leading-none">
                QULLQA
              </span>
              <span className="eyebrow-editorial text-[#E8B954] mt-1 block">
                TRAVESÍAS DEL PERÚ
              </span>
            </div>
          </Link>

          <p className="text-sm text-[#C7C2B8] leading-relaxed">
            Operador especializado en articular viajes, circuitos multidía, rutas terrestres y experiencias de autor en las tres regiones del Perú. Logística directa sin intermediarios innecesarios.
          </p>

          <div className="space-y-2.5 text-xs text-[#C7C2B8] pt-2 border-t border-white/10">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E8B954] shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Base Operativa Cusco:</strong> Calle Santa Catalina Ancha 370, Centro Histórico, Cusco (3,399 m s.n.m.)
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E8B954] shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Oficina Comercial Lima:</strong> Av. La Paz 640, Miraflores, Lima
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#E8B954] shrink-0" />
              <span className="num-tabular text-[#FAF8F5]">+51 (084) 248 890 · Mesa Cusco &amp; Lima</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#E8B954] shrink-0" />
              <span className="text-[#FAF8F5]">hola@qullqatravesias.pe</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#E8B954] shrink-0" />
              <span className="num-tabular">
                Asistencia al viajero en ruta 24/7 · Lunes a Sábado 08:00 – 20:00 hrs (PET)
              </span>
            </div>
          </div>

          {/* Redes Sociales Oficiales en Footer */}
          <div className="pt-3 flex items-center gap-2.5">
            <span className="eyebrow-editorial text-[10px] text-[#E8B954] mr-1">Redes:</span>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Qullqa"
              className="p-1.5 rounded bg-white/8 hover:bg-white/18 transition-colors"
            >
              <InstagramLogo className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Qullqa"
              className="p-1.5 rounded bg-white/8 hover:bg-white/18 transition-colors"
            >
              <TikTokLogo className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Qullqa"
              className="p-1.5 rounded bg-white/8 hover:bg-white/18 transition-colors"
            >
              <FacebookLogo className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube de Qullqa"
              className="p-1.5 rounded bg-white/8 hover:bg-white/18 transition-colors"
            >
              <YouTubeLogo className="w-5 h-5" />
            </a>
            <a
              href={buildWhatsAppUrl('Hola Qullqa Travesías, vengo desde sus redes sociales.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Qullqa"
              className="p-1.5 rounded bg-white/8 hover:bg-white/18 transition-colors"
            >
              <WhatsAppLogo className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Col 2: Destinations */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="eyebrow-editorial text-[#E8B954]">Destinos Operativos</h4>
          <ul className="space-y-2.5 text-sm">
            {DESTINATIONS_DATA.map((dest) => (
              <li key={dest.slug}>
                <Link
                  to={`/destinos/${dest.slug}`}
                  className="text-[#C7C2B8] hover:text-[#E8B954] transition-colors duration-200 ease-[var(--ease-out-snappy)] flex items-center justify-between group"
                >
                  <span>{dest.name}</span>
                  <span className="text-xs text-[#C7C2B8]/70 group-hover:text-[#E8B954] transition-colors duration-200">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Catálogo Comercial */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="eyebrow-editorial text-[#E8B954]">Líneas Comerciales</h4>
          <ul className="space-y-2.5 text-sm text-[#C7C2B8]">
            <li>
              <Link to="/catalogo?categoria=paquetes-peru" className="hover:text-[#E8B954] transition-colors duration-200">
                1. Paquetes Turísticos por Perú
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=full-day" className="hover:text-[#E8B954] transition-colors duration-200">
                2. Experiencias de Un Día
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=rutas-terrestres" className="hover:text-[#E8B954] transition-colors duration-200">
                3. Rutas Terrestres Escénicas
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=cusco-machu-picchu" className="hover:text-[#E8B954] transition-colors duration-200">
                4. Cusco, Valle Sagrado y Machu Picchu
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=lima-urbana" className="hover:text-[#E8B954] transition-colors duration-200">
                5. Lima Virreinal y Urbana
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=paracas-huacachina" className="hover:text-[#E8B954] transition-colors duration-200">
                6. Paracas, Ica y Huacachina
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=nazca" className="hover:text-[#E8B954] transition-colors duration-200">
                7. Sobrevuelo Líneas de Nazca
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=aventura-naturaleza" className="hover:text-[#E8B954] transition-colors duration-200">
                8. Aventura, Colca y Amazonía
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=gastronomia" className="hover:text-[#E8B954] transition-colors duration-200">
                9. Gastronomía, Cacao y Pisco
              </Link>
            </li>
            <li>
              <Link to="/catalogo?categoria=experiencias-privadas" className="hover:text-[#E8B954] transition-colors duration-200">
                10. Experiencias Privadas de Autor
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Confianza, Proceso y Cotización */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="eyebrow-editorial text-[#E8B954]">Atención al Viajero</h4>
          <ul className="space-y-2.5 text-sm text-[#C7C2B8]">
            <li>
              <Link to="/nosotros" className="hover:text-[#E8B954] transition-colors duration-200">
                Quiénes Somos &amp; Identidad
              </Link>
            </li>
            <li>
              <Link to="/confianza" className="hover:text-[#E8B954] transition-colors duration-200">
                Cómo Funciona la Reserva
              </Link>
            </li>
            <li>
              <Link to="/confianza?seccion=pagos" className="hover:text-[#E8B954] transition-colors duration-200">
                Condiciones de Pago (30%)
              </Link>
            </li>
            <li>
              <Link to="/confianza?seccion=cancelaciones" className="hover:text-[#E8B954] transition-colors duration-200">
                Políticas de Cancelación
              </Link>
            </li>
            <li>
              <Link to="/confianza?seccion=faqs" className="hover:text-[#E8B954] transition-colors duration-200">
                Preguntas Frecuentes
              </Link>
            </li>
            <li>
              <Link to="/ofertas" className="hover:text-[#E8B954] transition-colors duration-200">
                Ofertas y Salidas de Temporada
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[#E8B954] transition-colors duration-200">
                Guías y Artículos de Viaje
              </Link>
            </li>
          </ul>

          <div className="pt-3 space-y-2">
            <Link
              to="/planificador"
              className="w-full py-2.5 px-3 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 ease-[var(--ease-out-snappy)]"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Solicitar Cotización</span>
            </Link>
            <a
              href={buildWhatsAppUrl(
                'Hola Qullqa Travesías, necesito ayuda para planificar mi viaje a Perú.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded border border-white/20 hover:border-[#E8B954] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 ease-[var(--ease-out-snappy)]"
            >
              <WhatsAppLogo className="w-4 h-4 shrink-0" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Transparency */}
      <div className="border-t border-white/10 bg-[#0D0F11]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C7C2B8]">
          <div>© 2026 Qullqa Travesías del Perú — Cusco &amp; Lima</div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/confianza?seccion=aviso-legal"
              className="text-[#E8B954] hover:text-white underline-offset-4 hover:underline transition-colors duration-200"
            >
              Transparencia tarifaria y condiciones comerciales
            </Link>
            <span className="text-white/20">·</span>
            <span className="text-white/40 text-[9.5px] font-sans font-normal tracking-tight">
              Diseñado & Desarrollado por{' '}
              <a
                href="https://www.myfriendinc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/80 hover:underline transition-colors font-medium"
              >
                My Friend Inc.
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
