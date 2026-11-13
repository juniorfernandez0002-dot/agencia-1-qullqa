import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Compass,
  CreditCard,
  FileText,
  Info,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

type TrustSectionKey = 'pagos' | 'cancelaciones' | 'faqs' | 'aviso-legal';

const SECTION_TABS: readonly { key: TrustSectionKey; label: string }[] = [
  { key: 'pagos', label: 'Condiciones de Pago (30%)' },
  { key: 'cancelaciones', label: 'Políticas de Cancelación' },
  { key: 'faqs', label: 'Preguntas Frecuentes' },
  { key: 'aviso-legal', label: 'Transparencia y Alcance' },
];

const GENERAL_FAQS = [
  {
    q: '¿Por qué el proceso en la web genera una Solicitud de Cotización y no cobra automáticamente con tarjeta?',
    a: 'En el Perú, el ingreso al Santuario Histórico de Machu Picchu, la montaña Huayna Picchu, el Camino Inca y los trenes en temporada alta dependen de cupos nominales vinculados al número de pasaporte o DNI de cada viajero. Verificar primero el cupo exacto en tu fecha antes de recibir tu depósito garantiza que obtendrás el circuito y horario prometidos.',
  },
  {
    q: '¿Con cuánta anticipación debo reservar un paquete que incluya Machu Picchu o Camino Inca?',
    a: 'Para obtener el Circuito 2 (Circuito Clásico) en Machu Picchu recomendamos reservar entre 30 y 60 días antes de tu fecha de viaje (y hasta 90 días antes si viajas en junio, julio o agosto). Para el Camino Inca Corto (Km 104) sugerimos de 2 a 4 meses de antelación. Para excursiones en Lima, Paracas, Nazca, Valle Sagrado, Humantay o Vinicunca bastan de 3 a 7 días.',
  },
  {
    q: '¿Cómo funciona el depósito inicial del 30% y cuándo se abona el 70% restante?',
    a: 'Una vez que nuestro coordinador te envía la confirmación de cupos oficiales, bloqueas tu itinerario abonando el 30% del valor total (destinado a la emisión inmediata de boletos ministeriales y ferroviarios). El 70% restante se abona hasta 15 días antes de tu llegada en paquetes multidía, o hasta 48 horas antes en excursiones de un día.',
  },
  {
    q: '¿Puedo pagar en Dólares Estadounidenses (USD) o en Soles Peruanos (PEN)?',
    a: 'Sí. Nuestra referencia comercial principal está expresada en USD, pero puedes visualizar todas las tarifas en Soles Peruanos (PEN) desde la barra superior de la web y abonar en cualquiera de las dos monedas mediante enlace de pago seguro, transferencia bancaria o presencialmente en oficina.',
  },
  {
    q: '¿Qué sucede si mi vuelo a Lima o Cusco sufre un retraso o reprogramación por parte de la aerolínea?',
    a: 'Monitoreamos en tiempo real el número de vuelo de cada pasajero. Si tu avión se retrasa, nuestro equipo de recepción en el aeropuerto reprograma automáticamente el horario de tu traslado privado y ajusta las visitas del primer día sin penalidad.',
  },
  {
    q: '¿Es posible modificar un paquete existente para añadir noches libres o cambiar hoteles?',
    a: 'Totalmente. Todos nuestros paquetes de 5, 9, 10 y 12 días son modulares: podemos subir la categoría hotelera (3★ Boutique, 4★ Superior o 5★), cambiar el tren Expedition por Vistadome o First Class, o añadir días en Arequipa, Puno o Tambopata.',
  },
] as const;

export const TrustProcessPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get('seccion');

  const handleSelectSection = (sectionKey: TrustSectionKey) => {
    setSearchParams({ seccion: sectionKey });
  };

  return (
    <div className="pb-20 space-y-16">
      {/* Hero */}
      <section className="bg-[#18221F] text-[#FAF8F5] py-14 border-b border-white/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-5">
          <span className="eyebrow-editorial text-[#E8B954] inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#E87A5A]" />
            <span>Transparencia Comercial y Operativa</span>
          </span>
          <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#FAF8F5]">
            Confianza, Proceso de Reserva, Pagos y Preguntas Frecuentes
          </h1>
          <p className="text-sm sm:text-base text-[#C7C2B8] prose-measure leading-relaxed">
            Conoce paso a paso cómo gestionamos tu viaje desde tu primera
            consulta hasta tu retorno a casa, nuestras condiciones de pago y
            políticas de cancelación.
          </p>

          {/* Navegación rápida sincronizada con ?seccion=... */}
          <nav
            aria-label="Secciones de proceso y confianza"
            className="flex flex-wrap gap-2 pt-2"
          >
            {SECTION_TABS.map((tab) => {
              const isCurrent = activeSection === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => handleSelectSection(tab.key)}
                  className={`px-3.5 py-1.5 rounded text-xs font-medium border transition-colors duration-200 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#D9532F] text-white border-[#E87A5A]/60'
                      : 'bg-[#1E2B27] text-[#C7C2B8] border-white/12 hover:text-[#FAF8F5] hover:border-[#D49B35]/45'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Step-by-Step Operational Workflow */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
        <div>
          <span className="eyebrow-editorial text-[#B84020] block">
            Flujo Operativo Paso a Paso
          </span>
          <h2 className="font-serif-editorial text-3xl font-bold text-[#18221F] mt-1">
            ¿Qué sucede exactamente después de solicitar una cotización o
            reserva?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: FileText,
              step: '01 · Recepción del Expediente',
              title: 'Generación de Código Único',
              text: 'Al completar el panel en cualquier ficha de producto o en el Planificador, el sistema emite un código de expediente (ej. COT-QUL-MAP-01) con el desglose estimado en USD o PEN.',
            },
            {
              icon: CheckCircle2,
              step: '02 · Auditoría de Cupos (< 2 hrs)',
              title: 'Verificación Oficial en Cusco',
              text: 'Un coordinador verifica en la plataforma oficial del Ministerio de Cultura y en PeruRail / Inca Rail la disponibilidad exacta para tus fechas y te envía la propuesta formal.',
            },
            {
              icon: CreditCard,
              step: '03 · Depósito del 30%',
              title: 'Emisión Nominativa de Boletos',
              text: 'Con tu conformidad y los datos de pasaporte o DNI de los viajeros, abonas el 30% inicial. Ese mismo día emitimos y te enviamos copia de tus entradas oficiales y boletos de tren.',
            },
            {
              icon: PhoneCall,
              step: '04 · Asistencia 24/7 en Destino',
              title: 'Acompañamiento Continuo',
              text: '48 horas antes de tu vuelo abrimos un canal operativo contigo, tu coordinador y el equipo de transporte en destino para acompañarte en cada traslado y excursión.',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#FFFFFF] p-6 rounded-md border border-[#18221F]/14 space-y-3"
              >
                <div className="w-10 h-10 rounded bg-[#F2EFE9] flex items-center justify-center text-[#D9532F]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="eyebrow-editorial text-[#B84020] block num-tabular">
                  {item.step}
                </span>
                <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Payments, Cancellation Policies & Itinerary Customization */}
      <section className="bg-[#FFFFFF] py-16 border-y border-[#18221F]/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-3 gap-8">
          <div
            id="pagos"
            data-section-anchor="pagos"
            className={`scroll-mt-36 p-6 rounded-md bg-[#FAF8F5] border space-y-4 transition-colors duration-200 ${
              activeSection === 'pagos'
                ? 'border-[#D9532F] ring-1 ring-[#D9532F]/35'
                : 'border-[#18221F]/12'
            }`}
          >
            <div className="flex items-center gap-2.5 text-[#18221F]">
              <CreditCard className="w-5 h-5 text-[#D9532F] shrink-0" />
              <h3 className="font-serif-editorial text-2xl font-bold">
                Condiciones de Pago
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-[#18221F]/85 leading-relaxed">
              <li>
                • <strong>Paquetes Multidía y Machu Picchu:</strong>{' '}
                <span className="num-tabular font-semibold">30%</span> de
                depósito inicial al confirmar cupos oficiales; el{' '}
                <span className="num-tabular font-semibold">70%</span> restante
                hasta <span className="num-tabular">15</span> días antes del
                inicio del viaje.
              </li>
              <li>
                • <strong>Excursiones de Un Día (sin tren):</strong> Reserva con
                el <span className="num-tabular font-semibold">30%</span> o
                cancelación total hasta{' '}
                <span className="num-tabular">48</span> horas antes de la salida.
              </li>
              <li>
                • <strong>Monedas aceptadas:</strong> Dólares Estadounidenses
                (USD) y Soles Peruanos (PEN).
              </li>
            </ul>
          </div>

          <div
            id="cancelaciones"
            data-section-anchor="cancelaciones"
            className={`scroll-mt-36 p-6 rounded-md bg-[#FAF8F5] border space-y-4 transition-colors duration-200 ${
              activeSection === 'cancelaciones'
                ? 'border-[#D9532F] ring-1 ring-[#D9532F]/35'
                : 'border-[#18221F]/12'
            }`}
          >
            <div className="flex items-center gap-2.5 text-[#18221F]">
              <RefreshCw className="w-5 h-5 text-[#1F513F] shrink-0" />
              <h3 className="font-serif-editorial text-2xl font-bold">
                Políticas de Cancelación
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-[#18221F]/85 leading-relaxed">
              <li>
                •{' '}
                <strong>
                  Tours de <span className="num-tabular">1</span> Día (Lima,
                  Valle Sagrado, Humantay, Vinicunca, Paracas):
                </strong>{' '}
                Cancelación o cambio de fecha sin penalidad hasta{' '}
                <span className="num-tabular">48</span> horas antes.
              </li>
              <li>
                • <strong>Paquetes Multidía:</strong> Reprogramación terrestre
                libre hasta <span className="num-tabular">15</span> días antes
                de la fecha de arribo.
              </li>
              <li>
                •{' '}
                <strong>
                  Permisos Ministeriales (Machu Picchu / Camino Inca):
                </strong>{' '}
                Por norma estatal peruana, los boletos nominales emitidos por el
                Ministerio de Cultura no son reembolsables ni transferibles a
                terceros.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-md bg-[#FAF8F5] border border-[#18221F]/12 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[#18221F]">
                <Compass className="w-5 h-5 text-[#D9532F] shrink-0" />
                <h3 className="font-serif-editorial text-2xl font-bold">
                  Personalización de Rutas
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#18221F]/85 leading-relaxed">
                Cada viajero tiene un ritmo distinto. Podemos convertir
                cualquier salida grupal en un servicio privado, ajustar horarios
                de recojo, contemplar requerimientos alimentarios o diseñar un
                circuito desde cero.
              </p>
            </div>
            <div className="space-y-2.5">
              <Link
                to="/planificador"
                className="w-full py-3 px-4 rounded bg-[#D9532F] hover:bg-[#B84020] text-white text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-colors duration-200"
              >
                <span>Ir al Planificador Personalizado</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/catalogo"
                className="w-full py-2.5 px-4 rounded border border-[#18221F]/20 hover:border-[#18221F] text-[#18221F] text-center text-xs font-semibold tracking-wide block transition-colors duration-200"
              >
                Explorar Catálogo de Rutas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* General FAQ Section */}
      <section
        id="faqs"
        data-section-anchor="faqs"
        className="scroll-mt-36 max-w-4xl mx-auto px-4 sm:px-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <span className="eyebrow-editorial text-[#B84020] block">
            Centro de Respuestas al Viajero
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#18221F]">
            Preguntas Frecuentes Generales
          </h2>
        </div>

        <div className="space-y-3">
          {GENERAL_FAQS.map((item, idx) => {
            const isOpen = openFaq === idx;
            const triggerId = `faq-trigger-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={item.q}
                className="bg-[#FFFFFF] rounded-md border border-[#18221F]/15 overflow-hidden"
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9532F]"
                >
                  <span className="font-serif-editorial text-lg font-bold text-[#18221F]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B84020] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  inert={!isOpen || undefined}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 text-sm text-[#525E5A] leading-relaxed border-t border-[#18221F]/8 prose-measure">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Transparencia y Alcance Comercial */}
      <section
        id="aviso-legal"
        data-section-anchor="aviso-legal"
        className="scroll-mt-36 max-w-4xl mx-auto px-4 sm:px-8"
      >
        <div
          className={`p-6 sm:p-8 rounded-md bg-[#F2EFE9] border space-y-4 transition-colors duration-200 ${
            activeSection === 'aviso-legal'
              ? 'border-[#D9532F] ring-1 ring-[#D9532F]/35'
              : 'border-[#18221F]/15'
          }`}
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#B84020] shrink-0 mt-0.5" />
            <div className="space-y-3">
              <div>
                <span className="eyebrow-editorial text-[#B84020] block">
                  Aviso Comercial y Operativo
                </span>
                <h2 className="font-serif-editorial text-2xl font-bold text-[#18221F] mt-0.5">
                  Transparencia y Alcance Comercial
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#18221F]/85 leading-relaxed prose-measure">
                <p>
                  Cada solicitud enviada desde las fichas de producto o desde el
                  Planificador a Medida genera un expediente codificado de
                  cotización y verificación de disponibilidad (
                  <span className="num-tabular font-medium">COT-...</span>). Los
                  cupos del Santuario Histórico de Machu Picchu, Camino Inca,
                  servicios ferroviarios de PeruRail / Inca Rail y reservas
                  protegidas requieren validación nominal previa con los
                  documentos de identidad de los pasajeros.
                </p>
                <p>
                  Este portal{' '}
                  <strong>
                    no procesa cobros automáticos ni captura datos de tarjetas
                    bancarias en línea
                  </strong>
                  . Cualquier confirmación de pago se cursa únicamente tras
                  validar disponibilidad real por escrito con un coordinador de
                  ruta. Asimismo, la plataforma funciona como modelo de
                  referencia comercial y arquitectura digital especializada para
                  el sector turístico receptivo del Perú.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/planificador"
                  className="px-4 py-2 rounded bg-[#18221F] hover:bg-[#D9532F] text-white text-xs font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors duration-200"
                >
                  <span>Solicitar cotización de ruta</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/catalogo"
                  className="text-xs font-semibold text-[#B84020] hover:text-[#18221F] transition-colors duration-200"
                >
                  Ver catálogo completo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
