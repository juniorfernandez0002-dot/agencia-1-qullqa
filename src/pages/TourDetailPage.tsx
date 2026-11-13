import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  FileText,
  Globe,
  HelpCircle,
  Mail,
  MapPin,
  Minus,
  Mountain,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Users,
  XCircle
} from 'lucide-react';
import { WhatsAppLogo } from '../components/SocialIcons';
import { ALL_TOURS } from '../data/catalog';
import { usePreferences } from '../context/PreferencesContext';
import { TourCard } from '../components/TourCard';
import type { TourAddOn, TourProduct } from '../types/tourism';

function isAddOnIncludedInPrivate(addOn: TourAddOn): boolean {
  const maybeFlag = (addOn as TourAddOn & { includedInPrivate?: boolean }).includedInPrivate;
  if (typeof maybeFlag === 'boolean') {
    return maybeFlag;
  }
  return Boolean(addOn.note && /ya incluido en.*privad/i.test(addOn.note));
}

let quoteSequence = 1000;
function createQuoteCode(tourCode: string): string {
  quoteSequence = ((quoteSequence + 271) % 8999) + 1000;
  return `COT-${tourCode}-${quoteSequence}`;
}

interface TourDetailContentProps {
  tour: TourProduct;
}

const TourDetailContent: React.FC<TourDetailContentProps> = ({ tour }) => {
  const {
    formatPrice,
    savedSlugs,
    toggleSavedSlug,
    preferredDate,
    setPreferredDate,
    preferredTravelers,
    setPreferredTravelers,
    buildWhatsAppUrl
  } = usePreferences();

  const initialTier = tour.pricingTiers[0];
  const initialMinPax =
    initialTier && !tour.singleSupplementUsd && initialTier.minPax >= 2
      ? initialTier.minPax
      : initialTier && initialTier.minPax >= 3
        ? initialTier.minPax
        : 1;

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedTierIdx, setSelectedTierIdx] = useState(0);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [travelDate, setTravelDate] = useState(preferredDate);
  const [travelers, setTravelers] = useState(() =>
    Math.max(initialMinPax, Math.min(12, preferredTravelers))
  );
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState<{
    code: string;
    totalUsd: number;
    depositUsd: number;
    tierName: string;
    effectiveTravelers: number;
    singleSupplementUsd: number;
  } | null>(null);

  const activeTier = tour.pricingTiers[selectedTierIdx] || tour.pricingTiers[0];
  const isPrivateTier = activeTier.modality === 'Privado';

  // Determine minimum pax rules for the currently active tier
  const hasSingleSupplementOption = Boolean(tour.singleSupplementUsd) && activeTier.minPax === 2;
  const hardMinPax =
    activeTier.minPax >= 3 || (activeTier.minPax >= 2 && !hasSingleSupplementOption)
      ? activeTier.minPax
      : 1;
  const effectiveTravelers = Math.max(travelers, hardMinPax);

  // Fix double discount bug: only apply -12% private volume discount if tier isn't already volume-discounted
  const qualifiesPrivateVolumeDiscount =
    activeTier.modality === 'Privado' &&
    effectiveTravelers >= 4 &&
    !activeTier.isGroupVolumeTier;

  const unitPriceUsd = qualifiesPrivateVolumeDiscount
    ? Math.round(activeTier.priceUsd * 0.88)
    : activeTier.priceUsd;

  // Single traveler supplement when tier minPax >= 2 and singleSupplementUsd is defined
  const singleSupplementAppliedUsd =
    effectiveTravelers === 1 && activeTier.minPax >= 2 && tour.singleSupplementUsd
      ? tour.singleSupplementUsd
      : 0;

  // Optional add-ons sum per traveler (excluding items already included in Private tier)
  const selectedAddOns = (tour.addOns ?? []).filter(
    (addOn) =>
      selectedAddOnIds.includes(addOn.id) &&
      !(isPrivateTier && isAddOnIncludedInPrivate(addOn))
  );
  const addOnsPerPaxUsd = selectedAddOns.reduce((sum, addOn) => sum + addOn.priceUsd, 0);
  const addOnsTotalUsd = addOnsPerPaxUsd * effectiveTravelers;

  const baseSubtotalUsd = unitPriceUsd * effectiveTravelers;
  const estimatedTotalUsd = baseSubtotalUsd + singleSupplementAppliedUsd + addOnsTotalUsd;
  const deposit30Usd = Math.round(estimatedTotalUsd * 0.3);

  // Only show crossed-out original price on non-Private tiers when originalPriceUsd > unitPriceUsd
  const showOriginalPrice =
    Boolean(tour.originalPriceUsd) &&
    activeTier.modality !== 'Privado' &&
    (tour.originalPriceUsd ?? 0) > unitPriceUsd;

  const isSaved = savedSlugs.includes(tour.slug);

  const relatedTours = ALL_TOURS.filter(
    (t) =>
      t.id !== tour.id &&
      (t.destinationSlug === tour.destinationSlug || t.primaryCategory === tour.primaryCategory)
  ).slice(0, 3);

  const handleSelectTier = (idx: number) => {
    setSelectedTierIdx(idx);
    const nextTier = tour.pricingTiers[idx];
    if (!nextTier) return;
    if (nextTier.modality === 'Privado' && tour.addOns) {
      const privateIncludedIds = new Set(
        tour.addOns.filter(isAddOnIncludedInPrivate).map((addOn) => addOn.id)
      );
      if (privateIncludedIds.size > 0) {
        setSelectedAddOnIds((prev) => prev.filter((id) => !privateIncludedIds.has(id)));
      }
    }
    const nextHardMin =
      nextTier.minPax >= 3 || (nextTier.minPax >= 2 && !tour.singleSupplementUsd)
        ? nextTier.minPax
        : 1;
    if (travelers < nextHardMin) {
      setTravelers(nextHardMin);
      setPreferredTravelers(nextHardMin);
    }
  };

  const handleChangeTravelers = (nextCount: number) => {
    const clamped = Math.max(hardMinPax, Math.min(12, nextCount));
    setTravelers(clamped);
    setPreferredTravelers(clamped);
  };

  const handleDateChange = (nextDate: string) => {
    setTravelDate(nextDate);
    setPreferredDate(nextDate);
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.includes('@') || !travelDate) {
      setFormError(
        'Por favor completa tu nombre, un correo electrónico válido y la fecha aproximada de viaje.'
      );
      return;
    }
    setFormError('');
    setQuoteSubmitted({
      code: createQuoteCode(tour.code),
      totalUsd: estimatedTotalUsd,
      depositUsd: deposit30Usd,
      tierName: activeTier.name,
      effectiveTravelers,
      singleSupplementUsd: singleSupplementAppliedUsd
    });
  };

  const buildSummaryText = (expedienteCode?: string) => {
    const lines = [
      expedienteCode
        ? `Expediente Qullqa: ${expedienteCode}`
        : `Solicitud de disponibilidad Qullqa (${tour.code})`,
      `Ruta: ${tour.title} (${tour.code})`,
      `Fecha tentativa: ${travelDate}`,
      `Viajeros: ${effectiveTravelers} ${effectiveTravelers === 1 ? 'persona' : 'personas'}`,
      `Modalidad: ${activeTier.name} (${formatPrice(unitPriceUsd)} / pax)`,
      ...(singleSupplementAppliedUsd > 0
        ? [`Suplemento pasajero individual: +${formatPrice(singleSupplementAppliedUsd)}`]
        : []),
      ...(selectedAddOns.length > 0
        ? [
            `Opcionales seleccionados: ${selectedAddOns
              .map((a) => `${a.label} (${formatPrice(a.priceUsd)}/pax)`)
              .join('; ')} (+${formatPrice(addOnsTotalUsd)} total)`
          ]
        : ['Opcionales seleccionados: Ninguno']),
      `Total estimado: ${formatPrice(estimatedTotalUsd)} (Depósito reserva 30%: ${formatPrice(deposit30Usd)})`,
      ...(clientName.trim() ? [`Titular: ${clientName.trim()}`] : []),
      ...(clientEmail.trim() ? [`Correo: ${clientEmail.trim()}`] : []),
      ...(clientWhatsapp.trim() ? [`WhatsApp: ${clientWhatsapp.trim()}`] : []),
      ...(clientNotes.trim() ? [`Notas: ${clientNotes.trim()}`] : [])
    ];
    return lines.join('\n');
  };

  const whatsappPreMessage = `Hola Qullqa Travesías, solicito disponibilidad para la ruta "${tour.title}" (${tour.code}).\n${buildSummaryText()}`;
  const whatsappSubmittedMessage = quoteSubmitted
    ? `Hola Qullqa Travesías, acabo de generar el expediente ${quoteSubmitted.code}.\n${buildSummaryText(quoteSubmitted.code)}`
    : whatsappPreMessage;

  const emailSubject = encodeURIComponent(
    quoteSubmitted
      ? `Copia de Expediente ${quoteSubmitted.code} — ${tour.title}`
      : `Consulta de Ruta ${tour.code} — ${tour.title}`
  );
  const emailBody = encodeURIComponent(buildSummaryText(quoteSubmitted?.code));

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText(quoteSubmitted?.code));
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2200);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <div className="pb-20">
      {/* Breadcrumb & Utility Bar */}
      <div className="bg-[#F2EFE9] border-b border-[#18221F]/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <nav className="flex items-center gap-1.5 text-[#525E5A] overflow-x-auto">
            <Link to="/" className="hover:text-[#18221F]">
              Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link to="/catalogo" className="hover:text-[#18221F]">
              Catálogo
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link
              to={`/destinos/${tour.destinationSlug}`}
              className="hover:text-[#18221F] font-medium whitespace-nowrap"
            >
              {tour.destinationName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="num-tabular text-[#B84020] font-semibold truncate">{tour.code}</span>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] text-[#525E5A]">
              Tarifas vigentes · Conversión automática USD / PEN
            </span>
            <button
              type="button"
              onClick={() => toggleSavedSlug(tour.slug)}
              aria-pressed={isSaved}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-medium transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer ${
                isSaved
                  ? 'bg-[#D9532F] text-white border-[#D9532F]'
                  : 'bg-[#FFFFFF] text-[#18221F] border-[#18221F]/20 hover:border-[#18221F]'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{isSaved ? 'En tu Carrito' : 'Agregar al Carrito'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Header & Interactive Gallery */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 pb-10">
        {/* Title & Key Badges */}
        <div className="space-y-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="num-tabular text-xs px-2.5 py-1 rounded-xs bg-[#18221F] text-[#E8B954] font-semibold tracking-wide">
              CÓDIGO: {tour.code}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-xs bg-[#F2EFE9] text-[#18221F] font-medium">
              {tour.region}
            </span>
            {tour.promoLabel && (
              <span className="text-xs px-2.5 py-1 rounded-xs bg-[#D9532F] text-white font-semibold">
                {tour.promoLabel}
              </span>
            )}
            {tour.isExclusive && (
              <span className="eyebrow-editorial px-2.5 py-1 rounded-xs bg-[#EAE5DC] text-[#B84020] border border-[#D49B35]/50">
                Colección Privada de Autor
              </span>
            )}
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18221F] leading-tight">
            {tour.title}
          </h1>

          <p className="text-base sm:text-lg text-[#525E5A] max-w-4xl">{tour.subtitle}</p>
        </div>

        {/* Technical Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-4 rounded-md bg-[#FFFFFF] border border-[#18221F]/15 mb-8">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#B84020] shrink-0 mt-0.5" />
            <div>
              <span className="block eyebrow-editorial text-[10px] text-[#525E5A]">
                Destino Principal
              </span>
              <Link
                to={`/destinos/${tour.destinationSlug}`}
                className="text-xs sm:text-sm font-bold text-[#18221F] hover:text-[#B84020] underline underline-offset-2"
              >
                {tour.destinationName}
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#B84020] shrink-0 mt-0.5" />
            <div>
              <span className="block eyebrow-editorial text-[10px] text-[#525E5A]">
                Duración Operativa
              </span>
              <span className="num-tabular text-xs sm:text-sm font-bold text-[#18221F]">
                {tour.durationLabel}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mountain className="w-4 h-4 text-[#B84020] shrink-0 mt-0.5" />
            <div>
              <span className="block eyebrow-editorial text-[10px] text-[#525E5A]">
                Altitud Máx. / Nivel
              </span>
              <span className="num-tabular text-xs sm:text-sm font-bold text-[#18221F]">
                {tour.altitudeMax} · {tour.difficulty.split('/')[0].trim()}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-[#B84020] shrink-0 mt-0.5" />
            <div>
              <span className="block eyebrow-editorial text-[10px] text-[#525E5A]">
                Idiomas de Guiado
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#18221F]">
                {tour.languages.join(', ')}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
            <Users className="w-4 h-4 text-[#1F513F] shrink-0 mt-0.5" />
            <div>
              <span className="block eyebrow-editorial text-[10px] text-[#525E5A]">
                Modalidades
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#1F513F]">
                {tour.modalities.join(' / ')}
              </span>
            </div>
          </div>
        </div>

        {/* Navigable Photo Gallery */}
        <div className="grid lg:grid-cols-12 gap-3.5">
          <div className="lg:col-span-9 relative rounded-md overflow-hidden bg-[#18221F] h-[340px] sm:h-[480px] border border-[#18221F]/15">
            <img
              src={tour.gallery[selectedImageIdx] || tour.heroImage}
              alt={`${tour.title} - Vista ${selectedImageIdx + 1}`}
              className="w-full h-full object-cover transition-opacity duration-200 ease-[var(--ease-out-snappy)]"
            />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white bg-[#18221F]/85 px-4 py-2.5 rounded border border-white/10">
              <span className="num-tabular">
                Fotografía {selectedImageIdx + 1} de {tour.gallery.length} · {tour.destinationName}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Fotografía anterior"
                  onClick={() =>
                    setSelectedImageIdx((prev) =>
                      prev === 0 ? tour.gallery.length - 1 : prev - 1
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/12 hover:bg-white/25 text-white font-medium transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  aria-label="Fotografía siguiente"
                  onClick={() =>
                    setSelectedImageIdx((prev) =>
                      prev === tour.gallery.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/12 hover:bg-white/25 text-white font-medium transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-4 lg:grid-cols-1 gap-3">
            {tour.gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Ver fotografía ${idx + 1} de ${tour.title}`}
                aria-current={selectedImageIdx === idx ? 'true' : undefined}
                onClick={() => setSelectedImageIdx(idx)}
                className={`relative rounded-md overflow-hidden h-20 lg:h-[111px] border-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer ${
                  selectedImageIdx === idx
                    ? 'border-[#D9532F] shadow-md'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Availability / Quotation Panel */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-10 items-start">
        {/* Left 8 Columns: Deep Product Information */}
        <div className="lg:col-span-8 space-y-10">
          {/* 1. Editorial Description & Highlights */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/12 space-y-6">
            <div>
              <span className="eyebrow-editorial text-[#B84020] block">
                PROPUESTA OPERATIVA &amp; CURADURÍA
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
                Sobre esta Experiencia
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#18221F] leading-relaxed font-medium prose-measure">
              {tour.summary}
            </p>
            <p className="text-sm text-[#525E5A] leading-relaxed prose-measure">
              {tour.editorialDescription}
            </p>

            <div className="pt-4 border-t border-[#18221F]/10">
              <h3 className="eyebrow-editorial text-[#18221F] mb-3">
                Diferenciales Operativos de esta Ruta:
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {tour.highlights.map((item) => (
                  <div
                    key={item}
                    className="p-3.5 rounded bg-[#FAF8F5] border border-[#18221F]/10 flex items-start gap-2.5 text-xs sm:text-sm text-[#18221F]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1F513F] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Places visited & Operational Schedule */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-[#18221F]/10">
              <div>
                <h4 className="eyebrow-editorial text-[#525E5A] mb-2.5">Lugares Visitados:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tour.placesVisited.map((place) => (
                    <span
                      key={place}
                      className="text-xs px-2.5 py-1 rounded bg-[#F2EFE9] text-[#18221F] font-medium"
                    >
                      {place}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 text-xs bg-[#FAF8F5] p-4 rounded border border-[#18221F]/10">
                <div className="eyebrow-editorial text-[#B84020] mb-1">
                  Horarios y Logística de Recojo
                </div>
                <div>
                  <strong className="text-[#18221F]">Salida:</strong> {tour.schedule.departure}
                </div>
                <div>
                  <strong className="text-[#18221F]">Retorno:</strong> {tour.schedule.returnTime}
                </div>
                <div>
                  <strong className="text-[#18221F]">Frecuencia:</strong> {tour.schedule.frequency}
                </div>
                <div>
                  <strong className="text-[#18221F]">Punto de recojo:</strong>{' '}
                  {tour.schedule.pickupInfo}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Detailed Step-by-Step Itinerary */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/12 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#18221F]/10">
              <div>
                <span className="eyebrow-editorial text-[#B84020] block">
                  CRONOGRAMA OPERATIVO PASO A PASO
                </span>
                <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
                  Itinerario Detallado ({tour.durationLabel})
                </h2>
              </div>
              <span className="num-tabular text-xs font-semibold px-3 py-1 rounded bg-[#F2EFE9] text-[#18221F]">
                Altitud máx: {tour.altitudeMax}
              </span>
            </div>

            <div className="relative pl-6 border-l-2 border-[#D9532F]/40 space-y-8">
              {tour.itinerary.map((step, index) => (
                <div key={index} className="relative space-y-2">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#D9532F] border-2 border-[#FFFFFF]"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="num-tabular text-xs font-bold px-2.5 py-0.5 rounded bg-[#18221F] text-[#E8B954]">
                      {step.badge}
                    </span>
                    {step.altitude && (
                      <span className="num-tabular text-[11px] font-medium px-2 py-0.5 rounded bg-[#F2EFE9] text-[#18221F]">
                        Altitud: {step.altitude}
                      </span>
                    )}
                    {step.overnight && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#1F513F]/12 text-[#1F513F] font-semibold">
                        Pernocte: {step.overnight}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#525E5A] leading-relaxed prose-measure">
                    {step.description}
                  </p>

                  {step.meals && step.meals.length > 0 && (
                    <div className="pt-1 flex flex-wrap items-center gap-2 text-xs font-medium text-[#1F513F]">
                      <span>Alimentación incluida:</span>
                      {step.meals.map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 rounded bg-[#1F513F]/10 border border-[#1F513F]/25"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Tariff Matrix (Group vs Private & Upgrades) */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/12 space-y-6">
            <div>
              <span className="eyebrow-editorial text-[#B84020] block">
                ESTRUCTURA COMERCIAL Y TARIFAS VIGENTES
              </span>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
                Modalidades y Qué Incluye Cada Tarifa
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {tour.pricingTiers.map((tier, idx) => {
                const isSelected = selectedTierIdx === idx;
                return (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => handleSelectTier(idx)}
                    aria-pressed={isSelected}
                    className={`p-5 rounded-md border-2 text-left cursor-pointer transition-colors duration-200 ease-[var(--ease-out-snappy)] flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'border-[#D9532F] bg-white shadow-md'
                        : 'border-[#18221F]/12 hover:border-[#18221F]/30 bg-[#FAF8F5]/60'
                    }`}
                  >
                    <div className="space-y-2 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <span className="eyebrow-editorial text-[11px] px-2 py-0.5 rounded bg-[#18221F] text-[#E8B954]">
                          {tier.modality}
                        </span>
                        <span className="num-tabular text-[11px] text-[#525E5A] font-medium">
                          Mínimo {tier.minPax} {tier.minPax === 1 ? 'viajero' : 'viajeros'}
                        </span>
                      </div>
                      <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
                        {tier.name}
                      </h3>
                      <p className="text-xs text-[#525E5A] leading-relaxed">{tier.description}</p>
                      <ul className="space-y-1.5 pt-2">
                        {tier.perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-2 text-xs text-[#18221F]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1F513F] shrink-0" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[#18221F]/10 flex items-baseline justify-between w-full">
                      <span className="text-xs text-[#525E5A]">Tarifa por persona:</span>
                      <span className="num-tabular text-xl font-bold text-[#B84020]">
                        {formatPrice(tier.priceUsd)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Included vs Not Included Services */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#FFFFFF] p-6 rounded-md border border-[#18221F]/12 space-y-4">
              <h3 className="font-serif-editorial text-xl font-bold text-[#1F513F] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Servicios Incluidos
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#18221F]">
                {tour.included.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1F513F] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-md border border-[#18221F]/12 space-y-4">
              <h3 className="font-serif-editorial text-xl font-bold text-[#B84020] flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Servicios No Incluidos
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#525E5A]">
                {tour.notIncluded.map((exc) => (
                  <li key={exc} className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-[#B84020] shrink-0 mt-0.5" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. Practical Recommendations & Cancellation Policy */}
          <div className="bg-[#F2EFE9] p-6 sm:p-8 rounded-md border border-[#18221F]/12 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-serif-editorial text-xl font-bold text-[#18221F] flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#B84020]" />
                  Recomendaciones de Preparación
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#18221F]/90 list-disc pl-4">
                  {tour.recommendations.map((rec) => (
                    <li key={rec}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif-editorial text-xl font-bold text-[#18221F] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1F513F]" />
                  Condiciones de Pago y Cancelación
                </h3>
                <p className="text-xs sm:text-sm text-[#18221F]/90 leading-relaxed">
                  {tour.cancellationPolicy}
                </p>
                <p className="text-xs text-[#525E5A] font-medium">
                  • Bloqueo de espacios con el 30% de adelanto (en paquetes y rutas con tren o permisos nominativos).
                </p>
              </div>
            </div>
          </div>

          {/* 6. Product Specific FAQs */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/12 space-y-5">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#18221F] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#B84020]" />
              Preguntas Frecuentes sobre esta Ruta
            </h3>
            <div className="space-y-4">
              {tour.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded bg-[#FAF8F5] border border-[#18221F]/10 space-y-1.5"
                >
                  <h4 className="font-semibold text-sm text-[#18221F]">{faq.question}</h4>
                  <p className="text-xs sm:text-sm text-[#525E5A] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Sticky Availability / Quotation Panel */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
          <div className="bg-[#FFFFFF] rounded-md border-2 border-[#18221F] shadow-xl overflow-hidden">
            {/* Header Price Banner */}
            <div className="bg-[#18221F] text-white p-5">
              <div className="flex items-center justify-between eyebrow-editorial text-[11px] text-[#E8B954] mb-1">
                <span>COTIZACIÓN &amp; DISPONIBILIDAD</span>
                <span className="num-tabular">{tour.code}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <span className="text-xs text-[#C7C2B8] block">Precio por viajero:</span>
                  <span className="num-tabular text-2xl sm:text-3xl font-bold text-white">
                    {formatPrice(unitPriceUsd)}
                  </span>
                </div>
                {showOriginalPrice && tour.originalPriceUsd && (
                  <div className="text-right">
                    <span className="num-tabular text-[11px] text-[#C7C2B8] line-through block">
                      Antes: {formatPrice(tour.originalPriceUsd)}
                    </span>
                    <span className="text-[11px] text-[#E8B954] font-medium">
                      Tarifa vigente
                    </span>
                  </div>
                )}
              </div>
            </div>

            {quoteSubmitted ? (
              <div className="p-6 space-y-5 bg-[#FFFFFF]">
                <div className="p-4 rounded bg-[#1F513F]/12 border border-[#1F513F]/35 space-y-2">
                  <div className="flex items-center gap-2 text-[#1F513F] font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Solicitud de Cotización Generada</span>
                  </div>
                  <p className="text-xs text-[#18221F] leading-relaxed">
                    No procesamos cobros automáticos sin antes confirmar tus cupos en trenes o circuitos ministeriales. Hemos emitido tu expediente:
                  </p>
                </div>

                <div className="p-4 rounded bg-white border border-[#18221F]/15 num-tabular text-xs space-y-2">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">EXPEDIENTE:</span>
                    <strong className="text-[#B84020]">{quoteSubmitted.code}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">TITULAR:</span>
                    <strong className="text-[#18221F] text-right">{clientName}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">FECHA TENTATIVA:</span>
                    <strong className="text-[#18221F]">{travelDate}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">MODALIDAD:</span>
                    <strong className="text-[#18221F] text-right">{quoteSubmitted.tierName}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">VIAJEROS:</span>
                    <strong className="text-[#18221F]">
                      {quoteSubmitted.effectiveTravelers}{' '}
                      {quoteSubmitted.effectiveTravelers === 1 ? 'persona' : 'personas'}
                    </strong>
                  </div>
                  {quoteSubmitted.singleSupplementUsd > 0 && (
                    <div className="flex justify-between gap-2 text-[#B84020]">
                      <span>SUPLEMENTO INDIVIDUAL:</span>
                      <strong className="text-right">
                        +{formatPrice(quoteSubmitted.singleSupplementUsd)}
                      </strong>
                    </div>
                  )}
                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between gap-2">
                      <span className="text-[#525E5A]">OPCIONALES:</span>
                      <strong className="text-[#18221F] text-right">
                        +{formatPrice(addOnsTotalUsd)}
                      </strong>
                    </div>
                  )}
                  <div className="pt-2 border-t border-[#18221F]/10 flex justify-between text-sm">
                    <span className="font-bold text-[#18221F]">TOTAL ESTIMADO:</span>
                    <strong className="text-[#18221F]">
                      {formatPrice(quoteSubmitted.totalUsd)}
                    </strong>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#1F513F]">
                    <span>Depósito 30% al confirmar:</span>
                    <strong>{formatPrice(quoteSubmitted.depositUsd)}</strong>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={buildWhatsAppUrl(whatsappSubmittedMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded bg-[#1F513F] hover:bg-[#173F30] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200 ease-[var(--ease-out-snappy)]"
                  >
                    <WhatsAppLogo className="w-4 h-4 shrink-0" />
                    <span>Enviar Expediente por WhatsApp Ahora</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="py-2.5 px-3 rounded border border-[#18221F]/20 bg-white hover:bg-[#F2EFE9] text-[#18221F] font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#1F513F]" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#B84020]" />
                          <span>Copiar resumen</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:hola@qullqatravesias.pe?subject=${emailSubject}&body=${emailBody}`}
                      className="py-2.5 px-3 rounded border border-[#18221F]/20 bg-white hover:bg-[#F2EFE9] text-[#18221F] font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors duration-200 ease-[var(--ease-out-snappy)]"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#B84020]" />
                      <span>Enviar por correo</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setQuoteSubmitted(null)}
                    className="w-full py-2 text-xs text-[#525E5A] hover:text-[#18221F] font-medium cursor-pointer"
                  >
                    Modificar fechas o número de viajeros
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="p-5 sm:p-6 space-y-4" noValidate>
                {/* Date */}
                <div>
                  <label
                    htmlFor="tour-travel-date"
                    className="block eyebrow-editorial text-[11px] text-[#525E5A] mb-1.5"
                  >
                    1. Fecha de Salida Tentativa
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#B84020] absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      id="tour-travel-date"
                      type="date"
                      value={travelDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded border border-[#18221F]/20 bg-white text-sm num-tabular text-[#18221F]"
                    />
                  </div>
                </div>

                {/* Travelers Stepper (1-12) + Quick Shortcuts */}
                <div className="space-y-2">
                  <label className="block eyebrow-editorial text-[11px] text-[#525E5A]">
                    2. Cantidad de Viajeros
                  </label>
                  <div className="flex items-center justify-between gap-2 p-1.5 rounded border border-[#18221F]/20 bg-white">
                    <button
                      type="button"
                      onClick={() => handleChangeTravelers(effectiveTravelers - 1)}
                      disabled={effectiveTravelers <= hardMinPax}
                      aria-label="Reducir viajeros"
                      className="w-8 h-8 rounded bg-[#FAF8F5] hover:bg-[#F2EFE9] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-[#18221F] transition-colors duration-200 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="num-tabular text-sm font-bold text-[#18221F]">
                      {effectiveTravelers} {effectiveTravelers === 1 ? 'Viajero' : 'Viajeros'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleChangeTravelers(effectiveTravelers + 1)}
                      disabled={effectiveTravelers >= 12}
                      aria-label="Aumentar viajeros"
                      className="w-8 h-8 rounded bg-[#FAF8F5] hover:bg-[#F2EFE9] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-[#18221F] transition-colors duration-200 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 4, 6].map((num) => {
                      const isDisabled = num < hardMinPax;
                      return (
                        <button
                          key={num}
                          type="button"
                          disabled={isDisabled}
                          aria-pressed={effectiveTravelers === num}
                          onClick={() => handleChangeTravelers(num)}
                          className={`py-1.5 rounded num-tabular text-xs font-semibold border transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                            effectiveTravelers === num
                              ? 'bg-[#18221F] text-white border-[#18221F]'
                              : isDisabled
                                ? 'bg-[#F2EFE9]/60 text-[#525E5A]/50 border-[#18221F]/10 cursor-not-allowed'
                                : 'bg-[#FAF8F5] text-[#18221F] border-[#18221F]/15 hover:border-[#18221F] cursor-pointer'
                          }`}
                        >
                          {num} Pax
                        </button>
                      );
                    })}
                  </div>

                  {hardMinPax >= 2 && (
                    <p className="text-[11px] text-[#B84020] font-medium">
                      Salida garantizada desde {hardMinPax} viajeros para la modalidad {activeTier.name}.
                    </p>
                  )}
                </div>

                {/* Modality selector */}
                <div>
                  <label
                    htmlFor="tour-tier-select"
                    className="block eyebrow-editorial text-[11px] text-[#525E5A] mb-1.5"
                  >
                    3. Modalidad / Categoría
                  </label>
                  <select
                    id="tour-tier-select"
                    value={selectedTierIdx}
                    onChange={(e) => handleSelectTier(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded border border-[#18221F]/20 text-xs font-semibold text-[#18221F] bg-white num-tabular"
                  >
                    {tour.pricingTiers.map((tier, idx) => (
                      <option key={tier.name} value={idx}>
                        {tier.name} — {formatPrice(tier.priceUsd)} / pax
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Add-Ons */}
                {tour.addOns && tour.addOns.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="block eyebrow-editorial text-[11px] text-[#525E5A]">
                      4. Opcionales y Upgrades por Viajero
                    </span>
                    <div className="space-y-2">
                      {tour.addOns.map((addOn) => {
                        const includedInActivePrivate =
                          isPrivateTier && isAddOnIncludedInPrivate(addOn);
                        const checked =
                          includedInActivePrivate || selectedAddOnIds.includes(addOn.id);
                        return (
                          <label
                            key={addOn.id}
                            className={`flex items-start gap-2.5 p-2.5 rounded border text-xs transition-colors duration-200 ${
                              includedInActivePrivate
                                ? 'bg-[#1F513F]/8 border-[#1F513F]/30 cursor-default'
                                : checked
                                  ? 'bg-white border-[#D9532F] cursor-pointer'
                                  : 'bg-[#FAF8F5] border-[#18221F]/12 hover:border-[#18221F]/30 cursor-pointer'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled={includedInActivePrivate}
                              onChange={() => {
                                if (!includedInActivePrivate) {
                                  toggleAddOn(addOn.id);
                                }
                              }}
                              className="mt-0.5 accent-[#D9532F] shrink-0 disabled:accent-[#1F513F] disabled:cursor-not-allowed"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-medium text-[#18221F] leading-snug">
                                  {addOn.label}
                                </span>
                                {includedInActivePrivate ? (
                                  <span className="font-bold text-[#1F513F] shrink-0">
                                    Incluido en Privado
                                  </span>
                                ) : (
                                  <span className="num-tabular font-bold text-[#B84020] shrink-0">
                                    +{formatPrice(addOn.priceUsd)}
                                  </span>
                                )}
                              </div>
                              {addOn.note && (
                                <span className="block text-[11px] text-[#525E5A] mt-0.5">
                                  {addOn.note}
                                </span>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Live Estimate Breakdown Box */}
                <div className="p-3.5 rounded bg-[#FAF8F5] border border-[#18221F]/12 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#525E5A]">
                    <span className="num-tabular">
                      {formatPrice(unitPriceUsd)} × {effectiveTravelers}{' '}
                      {effectiveTravelers === 1 ? 'viajero' : 'viajeros'}
                    </span>
                    <span className="num-tabular font-semibold text-[#18221F]">
                      {formatPrice(baseSubtotalUsd)}
                    </span>
                  </div>

                  {activeTier.isGroupVolumeTier && (
                    <div className="text-[11px] text-[#1F513F] font-medium">
                      ✓ Tarifa preferencial grupal integrada ({activeTier.name})
                    </div>
                  )}

                  {qualifiesPrivateVolumeDiscount && (
                    <div className="text-[11px] text-[#1F513F] font-medium">
                      ✓ Bonificación grupal privada (-12% por 4+ viajeros aplicada)
                    </div>
                  )}

                  {singleSupplementAppliedUsd > 0 && (
                    <div className="flex justify-between text-[#B84020] font-medium">
                      <span>+ Suplemento pasajero individual</span>
                      <span className="num-tabular">
                        +{formatPrice(singleSupplementAppliedUsd)}
                      </span>
                    </div>
                  )}

                  {addOnsTotalUsd > 0 && (
                    <div className="flex justify-between text-[#525E5A]">
                      <span className="num-tabular">
                        + Opcionales ({selectedAddOns.length}) × {effectiveTravelers} pax
                      </span>
                      <span className="num-tabular font-semibold text-[#18221F]">
                        +{formatPrice(addOnsTotalUsd)}
                      </span>
                    </div>
                  )}

                  <div className="pt-1.5 border-t border-[#18221F]/10 flex justify-between font-bold text-sm text-[#18221F]">
                    <span>Total Estimado:</span>
                    <span className="num-tabular text-[#B84020]">
                      {formatPrice(estimatedTotalUsd)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#525E5A] num-tabular">
                    <span>Depósito reserva (30%):</span>
                    <span>{formatPrice(deposit30Usd)}</span>
                  </div>
                </div>

                {/* Mandatory Fees & Ministerial Permits Disclosure */}
                {(tour.mandatoryFeesNote || tour.requiresMinisterialPermit) && (
                  <div className="p-3 rounded bg-[#EAE5DC]/65 border border-[#D49B35]/50 space-y-1.5 text-[11px] text-[#18221F]">
                    {tour.requiresMinisterialPermit && (
                      <div className="flex items-start gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1F513F] shrink-0 mt-0.5" />
                        <span>
                          <strong>Permiso ministerial nominal:</strong> Requiere datos de pasaporte vigente para validar cupos oficiales.
                        </span>
                      </div>
                    )}
                    {tour.mandatoryFeesNote && (
                      <div className="flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-[#B84020] shrink-0 mt-0.5" />
                        <span>
                          <strong>Tasa externa obligatoria:</strong> {tour.mandatoryFeesNote}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Contact Inputs */}
                <div className="space-y-2.5 pt-1">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Tu nombre completo *"
                    aria-label="Nombre completo"
                    className="w-full px-3 py-2 rounded border border-[#18221F]/20 bg-white text-xs text-[#18221F]"
                  />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Correo electrónico para recibir la propuesta *"
                    aria-label="Correo electrónico"
                    className="w-full px-3 py-2 rounded border border-[#18221F]/20 bg-white text-xs text-[#18221F]"
                  />
                  <input
                    type="tel"
                    value={clientWhatsapp}
                    onChange={(e) => setClientWhatsapp(e.target.value)}
                    placeholder="Número de WhatsApp (con código de país)"
                    aria-label="Número de WhatsApp"
                    className="w-full px-3 py-2 rounded border border-[#18221F]/20 bg-white text-xs text-[#18221F]"
                  />
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Notas opcionales (hotel preferido, tren Vistadome, dieta, etc.)"
                    aria-label="Notas opcionales"
                    className="w-full px-3 py-2 rounded border border-[#18221F]/20 bg-white text-xs text-[#18221F]"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs text-[#B84020] font-semibold">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded bg-[#D9532F] hover:bg-[#B84020] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200 ease-[var(--ease-out-snappy)] shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Solicitar Disponibilidad &amp; Cotización</span>
                </button>

                <a
                  href={buildWhatsAppUrl(whatsappPreMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded border border-[#1F513F] text-[#1F513F] hover:bg-[#1F513F] hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors duration-200 ease-[var(--ease-out-snappy)]"
                >
                  <WhatsAppLogo className="w-4 h-4 shrink-0" />
                  <span>Consultar esta Ruta por WhatsApp</span>
                </a>

                <p className="text-[11px] text-[#525E5A] text-center leading-tight">
                  Sin cargos automáticos. Generamos una solicitud formal verificando cupos reales.
                </p>
              </form>
            )}
          </div>

          {/* Customizer Card */}
          <div className="p-5 rounded-md bg-[#18221F] text-white space-y-3">
            <span className="eyebrow-editorial text-[10px] text-[#E8B954] block">
              ¿QUIERES COMBINAR ESTA RUTA?
            </span>
            <h4 className="font-serif-editorial text-lg font-bold">
              Integra este producto en un itinerario a medida por el Perú
            </h4>
            <p className="text-xs text-[#C7C2B8]">
              Nuestro equipo puede unir esta experiencia con noches de hotel, vuelos internos y otros destinos.
            </p>
            <Link
              to={`/planificador?base=${tour.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8B954] hover:underline"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Abrir en el Planificador de Viajes →</span>
            </Link>
          </div>
        </aside>
      </section>

      {/* Related Products Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-16 mt-16 border-t border-[#18221F]/12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="eyebrow-editorial text-[#B84020] block">
              COMPLEMENTA TU ITINERARIO
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#18221F] mt-1">
              Productos Relacionados en {tour.destinationName}
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="eyebrow-editorial text-[#B84020] hover:underline"
          >
            Ver los {ALL_TOURS.length} itinerarios →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTours.map((rel) => (
            <TourCard key={rel.id} tour={rel} variant="catalog-technical" />
          ))}
        </div>
      </section>
    </div>
  );
};

export const TourDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tour = ALL_TOURS.find((t) => t.slug === slug);

  if (!tour) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-24 text-center space-y-4">
        <h1 className="font-serif-editorial text-4xl font-bold text-[#18221F]">
          Producto Turístico No Encontrado
        </h1>
        <p className="text-sm text-[#525E5A]">
          La ruta solicitada no existe o ha cambiado de identificador en el catálogo.
        </p>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#D9532F] hover:bg-[#B84020] text-white font-semibold text-sm transition-colors duration-200"
        >
          Explorar los {ALL_TOURS.length} itinerarios del catálogo
        </Link>
      </div>
    );
  }

  return <TourDetailContent key={tour.slug} tour={tour} />;
};
