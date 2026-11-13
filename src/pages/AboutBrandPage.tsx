import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowUpRight,
  Compass,
  FileCheck2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { BrandSymbol } from '../components/BrandSymbol';
import { PERU_PHOTOS } from '../data/mediaAssets';

export const AboutBrandPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pb-20 space-y-16">
      {/* Hero Editorial: Historia del nombre Qullqa y propósito */}
      <section className="bg-[#18221F] text-[#FAF8F5] py-16 border-b border-white/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="eyebrow-editorial text-[#E8B954] block">
              Quiénes Somos · Qullqa Travesías
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAF8F5] leading-tight">
              Operación directa en los Andes, la Costa y la Amazonía del Perú.
            </h1>
            <p className="text-base sm:text-lg text-[#C7C2B8] prose-measure leading-relaxed">
              En quechua, las <strong className="text-[#FAF8F5]">Qullqas</strong>{' '}
              eran las edificaciones de piedra erigidas en las laderas andinas
              para resguardar granos, textiles y provisiones a lo largo del{' '}
              <em>Qhapaq Ñan</em>. Honramos ese principio de previsión y
              hospitalidad preparando cada ruta por el Perú con logística
              directa, guías especialistas y tiempos reales en territorio.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm p-7 rounded-md bg-[#1E2B27] border border-[#D49B35]/35 space-y-4">
              <div className="flex items-center gap-4">
                <BrandSymbol className="w-20 h-20 shrink-0" variant="seal" />
                <div>
                  <div className="font-serif-editorial text-2xl font-bold text-[#FAF8F5] tracking-tight">
                    QULLQA
                  </div>
                  <div className="eyebrow-editorial text-[#E8B954] mt-1">
                    Travesías del Perú
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#C7C2B8] leading-relaxed pt-2 border-t border-white/10">
                Nuestro emblema evoca el vano trapezoidal incaico de umbral
                abierto junto al rombo <em>tokapu</em>: umbral entre regiones y
                resguardo del saber de ruta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Presencia real en destino */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="eyebrow-editorial text-[#B84020] block">
            1. Operación en Territorio
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F] leading-tight">
            Un operador con base física en Cusco y Lima, sin intermediarios
            anónimos
          </h2>
          <p className="text-sm sm:text-base text-[#525E5A] prose-measure leading-relaxed">
            Cuando viajas por geografías exigentes como los Andes o la selva de
            Madre de Dios, contar con un equipo propio en destino marca toda la
            diferencia ante cualquier ajuste de clima o itinerario ferroviario.
            Desde nuestras oficinas de Cusco y Lima coordinamos directamente
            conductores, guías oficiales, ingresos ministeriales y albergues.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-md bg-[#FFFFFF] border border-[#18221F]/12 space-y-2">
              <MapPin className="w-5 h-5 text-[#D9532F]" />
              <h3 className="font-serif-editorial font-bold text-lg text-[#18221F]">
                Despacho Operativo Cusco
              </h3>
              <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                Calle Santa Catalina Ancha <span className="num-tabular">370</span>{' '}
                (<span className="num-tabular">3,399 m s.n.m.</span>). Charlas
                previas presenciales, custodia gratuita de equipaje y respuesta
                inmediata en ruta.
              </p>
            </div>

            <div className="p-5 rounded-md bg-[#FFFFFF] border border-[#18221F]/12 space-y-2">
              <MapPin className="w-5 h-5 text-[#1F513F]" />
              <h3 className="font-serif-editorial font-bold text-lg text-[#18221F]">
                Oficina Comercial Lima
              </h3>
              <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                Av. La Paz <span className="num-tabular">640</span>, Miraflores.
                Recepción en el aeropuerto Jorge Chávez, coordinación de Costa
                Sur y rutas gastronómicas.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4 items-start">
          <img
            src={PERU_PHOTOS.sacsayhuaman}
            alt="Murallas megalíticas de Sacsayhuamán en Cusco"
            loading="lazy"
            className="w-full h-72 sm:h-80 object-cover rounded-md border border-[#18221F]/15"
          />
          <img
            src={PERU_PHOTOS.marasSalineras}
            alt="Pozas artesanales de sal en Maras, Valle Sagrado"
            loading="lazy"
            className="w-full h-72 sm:h-80 object-cover rounded-md border border-[#18221F]/15 mt-8"
          />
        </div>
      </section>

      {/* Nuestro Estándar en Campo y Equipo de Especialistas */}
      <section className="bg-[#FFFFFF] py-16 border-y border-[#18221F]/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-10">
          <div className="space-y-2 max-w-3xl">
            <span className="eyebrow-editorial text-[#B84020] block">
              2. Rigor Técnico y Cuidado en Ruta
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F]">
              Nuestro Estándar en Campo y Equipo de Especialistas
            </h2>
            <p className="text-sm sm:text-base text-[#525E5A] prose-measure leading-relaxed">
              Cada ruta se planifica considerando la fisiología de la altura, la
              estacionalidad andina y amazónica y la relación respetuosa con las
              comunidades anfitrionas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <article className="p-6 rounded-md bg-[#FAF8F5] border border-[#18221F]/12 space-y-3">
              <div className="w-10 h-10 rounded bg-[#F2EFE9] flex items-center justify-center text-[#D9532F]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
                Protocolos Médicos de Altura
              </h3>
              <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                Todas nuestras salidas sobre{' '}
                <span className="num-tabular font-semibold text-[#18221F]">
                  4,000 m s.n.m.
                </span>{' '}
                (Vinicunca, Humantay, Ausangate y Patapampa) llevan oxímetro de
                pulso, botiquín de montaña y balón de oxígeno portátil con
                guías capacitados en primeros auxilios.
              </p>
            </article>

            <article className="p-6 rounded-md bg-[#FAF8F5] border border-[#18221F]/12 space-y-3">
              <div className="w-10 h-10 rounded bg-[#F2EFE9] flex items-center justify-center text-[#1F513F]">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
                Gestión Nominal Oficial
              </h3>
              <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                Verificamos y emitimos directamente boletos ante el Ministerio de
                Cultura (Machu Picchu y Camino Inca), PeruRail, Inca Rail y
                permisos de áreas naturales protegidas por SERNANP (Paracas,
                Tambopata y Titicaca).
              </p>
            </article>

            <article className="p-6 rounded-md bg-[#FAF8F5] border border-[#18221F]/12 space-y-3">
              <div className="w-10 h-10 rounded bg-[#F2EFE9] flex items-center justify-center text-[#D9532F]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
                Especialistas por Disciplina
              </h3>
              <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                Arqueólogos en Cusco y Valle Sagrado, historiadores del arte
                virreinal en Lima y Arequipa, biólogos naturalistas en
                Tambopata y sommeliers de pisco y cacao en nuestras rutas
                gastronómicas.
              </p>
            </article>

            <article className="p-6 rounded-md bg-[#FAF8F5] border border-[#18221F]/12 space-y-3">
              <div className="w-10 h-10 rounded bg-[#F2EFE9] flex items-center justify-center text-[#1F513F]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
                Comunidades Anfitrionas
              </h3>
              <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                Colaboramos de forma estable y con retribución directa con
                maestras tejedoras de Chinchero y Patacancha, boteros de los
                Uros y Taquile y proyectos de conservación local en Tambopata.
              </p>
            </article>
          </div>

          <div className="p-6 sm:p-8 rounded-md bg-[#18221F] text-[#FAF8F5] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E8B954]" />
                <span className="eyebrow-editorial text-[#E8B954]">
                  Asistencia Continua en Destino
                </span>
              </div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#FAF8F5]">
                ¿Listo para organizar tu travesía por el Perú con nuestro equipo?
              </h3>
              <p className="text-sm text-[#C7C2B8] leading-relaxed">
                Explora nuestras 28 rutas operativas o diseña un itinerario a
                medida según tu fecha de llegada y ritmo de aclimatación.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/catalogo"
                className="px-5 py-3 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors duration-200"
              >
                <span>Explorar el Catálogo</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/planificador"
                className="px-5 py-3 rounded border border-white/25 hover:border-[#E8B954] text-[#FAF8F5] hover:text-[#E8B954] text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors duration-200"
              >
                <Compass className="w-4 h-4" />
                <span>Diseñar Viaje a Medida</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
