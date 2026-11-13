import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  FacebookLogo,
  InstagramLogo,
  TikTokLogo,
  WhatsAppLogo,
  YouTubeLogo
} from './SocialIcons';
import { usePreferences } from '../context/PreferencesContext';

export const SocialGatewaySection: React.FC = () => {
  const { buildWhatsAppUrl } = usePreferences();

  const channels = [
    {
      name: 'Instagram',
      handle: '@qullqa.peru',
      tagline: 'Reels y crónicas diarias',
      href: 'https://www.instagram.com/',
      icon: <InstagramLogo className="w-8 h-8 shrink-0" />,
      borderAccent: 'hover:border-[#D6249F]/45'
    },
    {
      name: 'TikTok',
      handle: '@qullqaviajes',
      tagline: 'Rutas andinas en 60 seg',
      href: 'https://www.tiktok.com/',
      icon: <TikTokLogo className="w-8 h-8 shrink-0" />,
      borderAccent: 'hover:border-[#18221F]/45'
    },
    {
      name: 'YouTube',
      handle: '@qullqa',
      tagline: 'Guías 4K y trenes',
      href: 'https://www.youtube.com/',
      icon: <YouTubeLogo className="w-8 h-8 shrink-0" />,
      borderAccent: 'hover:border-[#FF0000]/45'
    },
    {
      name: 'Facebook',
      handle: '/qullqaperu',
      tagline: 'Reseñas y salidas',
      href: 'https://www.facebook.com/',
      icon: <FacebookLogo className="w-8 h-8 shrink-0" />,
      borderAccent: 'hover:border-[#1877F2]/45'
    },
    {
      name: 'WhatsApp',
      handle: 'Canal 24/7',
      tagline: '+51 984 248 890',
      href: buildWhatsAppUrl(
        'Hola equipo Qullqa Travesías, los encontré en su pasarela de redes y quiero cotizar mi viaje a Perú.'
      ),
      icon: <WhatsAppLogo className="w-8 h-8 shrink-0" />,
      borderAccent: 'hover:border-[#25D366]/60'
    }
  ];

  return (
    <section className="py-12 bg-[#F2EFE9] border-t border-[#18221F]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="eyebrow-editorial text-[#B84020]">
              Pasarela de Redes Sociales · Comunidad en Vivo
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
              Sigue nuestras expediciones diarias por el Perú
            </h2>
          </div>
          <span className="text-xs text-[#525E5A] font-medium">
            Reportes en tiempo real desde Cusco, Huacachina, Arequipa y Amazonía
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {channels.map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-4 rounded-lg bg-white border border-[#18221F]/12 ${ch.borderAccent} hover:shadow-md flex items-center justify-between gap-3 transition-all duration-200`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {ch.icon}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-editorial text-sm font-bold text-[#18221F]">
                      {ch.name}
                    </span>
                    <span className="text-[11px] font-medium text-[#525E5A] truncate">
                      {ch.handle}
                    </span>
                  </div>
                  <p className="text-xs text-[#525E5A] truncate mt-0.5">{ch.tagline}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#525E5A] group-hover:text-[#D9532F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialGatewaySection;
