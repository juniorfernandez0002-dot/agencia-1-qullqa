import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  FileText,
  Mail,
  Minus,
  Plus,
  Train
} from 'lucide-react';
import { WhatsAppLogo } from '../components/SocialIcons';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { ALL_TOURS } from '../data/catalog';
import { usePreferences } from '../context/PreferencesContext';
import type { DestinationSlug, TourProduct } from '../types/tourism';

let proposalSequence = 1000;
function createProposalCode(): string {
  proposalSequence = ((proposalSequence + 317) % 8999) + 1000;
  return `QUL-MEDIDA-${proposalSequence}`;
}

const HOTEL_LABELS: Record<'3-star' | '4-star' | '5-star', string> = {
  '3-star': '3★ Boutique',
  '4-star': '4★ Superior',
  '5-star': '5★ Colección'
};

const TRAIN_LABELS: Record<'expedition' | 'vistadome' | 'first-class', string> = {
  expedition: 'Expedition / Voyager',
  vistadome: 'Vistadome / 360°',
  'first-class': 'First Class / Observatory'
};

interface TripPlannerContentProps {
  baseSlug: string;
  destinoSlug: string;
  compararParam: string;
  initialFecha: string;
  initialViajeros?: number;
}

const TripPlannerContent: React.FC<TripPlannerContentProps> = ({
  baseSlug,
  destinoSlug,
  compararParam,
  initialFecha,
  initialViajeros
}) => {
  const baseTour: TourProduct | undefined = baseSlug
    ? ALL_TOURS.find((t) => t.slug === baseSlug)
    : undefined;

  const compareSlugs = compararParam
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

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

  const resolveInitialRegions = (): DestinationSlug[] => {
    if (baseTour) {
      return baseTour.visitedDestinations.length > 0
        ? baseTour.visitedDestinations
        : [baseTour.destinationSlug];
    }
    if (destinoSlug && DESTINATIONS_DATA.some((d) => d.slug === destinoSlug)) {
      return [destinoSlug as DestinationSlug];
    }
    if (compareSlugs.length > 0) {
      const matched = ALL_TOURS.filter((t) => compareSlugs.includes(t.slug));
      const merged = Array.from(
        new Set(matched.flatMap((t) => t.visitedDestinations))
      ) as DestinationSlug[];
      if (merged.length > 0) return merged;
    }
    return ['cusco', 'valle-sagrado-machu-picchu', 'lima'];
  };

  const [selectedRegions, setSelectedRegions] = useState<DestinationSlug[]>(resolveInitialRegions);
  const [daysCount, setDaysCount] = useState<number>(() =>
    baseTour ? Math.max(3, Math.min(18, baseTour.durationDays)) : 8
  );
  const [travelers, setTravelers] = useState<number>(() =>
    Math.max(1, Math.min(12, initialViajeros ?? preferredTravelers))
  );
  const [hotelTier, setHotelTier] = useState<'3-star' | '4-star' | '5-star'>('4-star');
  const [trainTier, setTrainTier] = useState<'expedition' | 'vistadome' | 'first-class'>(
    'vistadome'
  );
  const [serviceStyle, setServiceStyle] = useState<'grupal' | 'privado'>('privado');
  const [startDate, setStartDate] = useState<string>(() => initialFecha || preferredDate);
  const [includeDayTourExtensions, setIncludeDayTourExtensions] = useState<boolean>(false);
  const [dismissedSlugs, setDismissedSlugs] = useState<string[]>([]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState<{
    code: string;
    perPersonUsd: number;
    totalUsd: number;
    depositUsd: number;
  } | null>(null);

  const syncedBaseSlugRef = useRef<string>('');
  useEffect(() => {
    if (baseTour && syncedBaseSlugRef.current !== baseTour.slug) {
      syncedBaseSlugRef.current = baseTour.slug;
      if (!savedSlugs.includes(baseTour.slug)) {
        toggleSavedSlug(baseTour.slug);
      }
    }
  }, [baseTour, savedSlugs, toggleSavedSlug]);

  const syncedTripParamsRef = useRef(false);
  useEffect(() => {
    if (syncedTripParamsRef.current) return;
    syncedTripParamsRef.current = true;
    if (initialFecha && initialFecha !== preferredDate) {
      setPreferredDate(initialFecha);
    }
    if (initialViajeros !== undefined && initialViajeros !== preferredTravelers) {
      setPreferredTravelers(initialViajeros);
    }
  }, [
    initialFecha,
    initialViajeros,
    preferredDate,
    preferredTravelers,
    setPreferredDate,
    setPreferredTravelers
  ]);

  const toggleRegion = (slug: DestinationSlug) => {
    setSelectedRegions((prev) =>
      prev.includes(slug) ? prev.filter((r) => r !== slug) : [...prev, slug]
    );
  };

  const handleTravelersChange = (nextCount: number) => {
    const clamped = Math.max(1, Math.min(12, nextCount));
    setTravelers(clamped);
    setPreferredTravelers(clamped);
  };

  const handleStartDateChange = (nextDate: string) => {
    setStartDate(nextDate);
    setPreferredDate(nextDate);
  };

  const handleDismissStep3Tour = (slug: string) => {
    setDismissedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    if (savedSlugs.includes(slug)) {
      toggleSavedSlug(slug);
    }
  };

  // Routes to display in Step 3 (saved routes + highlighted compare/base routes, minus dismissed)
  const step3Slugs = Array.from(
    new Set([...savedSlugs, ...compareSlugs, ...(baseTour ? [baseTour.slug] : [])])
  ).filter((slug) => !dismissedSlugs.includes(slug));
  const savedTours = ALL_TOURS.filter((t) => step3Slugs.includes(t.slug));
  const oneDaySavedTours = savedTours.filter((t) => t.durationDays === 1);
  const oneDayExtensionsPerPaxUsd = includeDayTourExtensions
    ? oneDaySavedTours.reduce(
        (sum, t) => sum + (serviceStyle === 'privado' ? t.privatePriceUsd : t.priceUsd),
        0
      )
    : 0;

  // Honest & geographically accurate pricing logic
  const includesMachuPicchuCorridor =
    selectedRegions.includes('valle-sagrado-machu-picchu') ||
    selectedRegions.includes('cusco');

  const hotelDailyRate =
    hotelTier === '3-star' ? 65 : hotelTier === '4-star' ? 115 : 240;

  // Only include train fare if Cusco or Valle Sagrado / Machu Picchu is selected
  const trainRate = includesMachuPicchuCorridor
    ? trainTier === 'expedition'
      ? 150
      : trainTier === 'vistadome'
        ? 225
        : 460
    : 0;

  const modalityMultiplier =
    serviceStyle === 'privado' ? (travelers >= 4 ? 1.18 : 1.32) : 1.0;

  // Honest solo traveler adjustment (single-room accommodation + solo private logistics)
  const soloSupplementPerPaxUsd =
    travelers === 1
      ? Math.round(hotelDailyRate * 0.35 * Math.max(1, daysCount - 1)) +
        (serviceStyle === 'privado' ? selectedRegions.length * 85 : 0)
      : 0;

  const basePerPersonUsd = Math.round(
    (daysCount * hotelDailyRate + trainRate + selectedRegions.length * 85) * modalityMultiplier +
      soloSupplementPerPaxUsd +
      oneDayExtensionsPerPaxUsd
  );
  const totalEstimatedUsd = basePerPersonUsd * travelers;
  const deposit30Usd = Math.round(totalEstimatedUsd * 0.3);

  const selectedRegionNames = DESTINATIONS_DATA.filter((d) =>
    selectedRegions.includes(d.slug)
  ).map((d) => d.name);

  const buildSummaryText = (proposalCode?: string) => {
    const trainSummary = includesMachuPicchuCorridor
      ? TRAIN_LABELS[trainTier]
      : 'No aplica (sin Cusco/Valle Sagrado)';

    const lines = [
      proposalCode
        ? `Expediente a medida Qullqa: ${proposalCode}`
        : 'Propuesta personalizada Qullqa Travesías',
      ...(baseTour ? [`Ruta base tomada: ${baseTour.title} (${baseTour.code})`] : []),
      `Regiones (${selectedRegions.length}): ${selectedRegionNames.join(', ') || 'Sin definir'}`,
      `Fecha tentativa: ${startDate}`,
      `Duración: ${daysCount} días · Viajeros: ${travelers}`,
      `Alojamiento: ${HOTEL_LABELS[hotelTier]} · Estilo: ${serviceStyle === 'privado' ? 'Privado a Medida' : 'Grupal Reducido'}`,
      `Tren Machu Picchu: ${trainSummary}`,
      ...(savedTours.length > 0
        ? [
            `Rutas de referencia (${savedTours.length}): ${savedTours
              .map((t) => `${t.code} (${t.title})`)
              .join('; ')}`
          ]
        : []),
      `Estimado por viajero: ${formatPrice(basePerPersonUsd)}`,
      `Total estimado: ${formatPrice(totalEstimatedUsd)} (Depósito 30%: ${formatPrice(deposit30Usd)})`,
      ...(fullName.trim() ? [`Titular: ${fullName.trim()}`] : []),
      ...(email.trim() ? [`Correo: ${email.trim()}`] : []),
      ...(phone.trim() ? [`WhatsApp: ${phone.trim()}`] : []),
      ...(notes.trim() ? [`Notas del viajero: ${notes.trim()}`] : [])
    ];
    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.includes('@') || selectedRegions.length === 0) {
      setError(
        'Por favor selecciona al menos una región e ingresa tu nombre y correo electrónico válido.'
      );
      return;
    }
    setError('');
    setGeneratedProposal({
      code: createProposalCode(),
      perPersonUsd: basePerPersonUsd,
      totalUsd: totalEstimatedUsd,
      depositUsd: deposit30Usd
    });
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText(generatedProposal?.code));
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2200);
    } catch {
      setCopiedSummary(false);
    }
  };

  return (
    <div className="pb-20 space-y-12">
      {/* Header */}
      <section className="bg-[#18221F] text-[#FAF8F5] py-14 border-b border-white/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-4">
          <span className="eyebrow-editorial text-[#E8B954] inline-flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#E87A5A]" /> CONFIGURADOR DE VIAJES A MEDIDA POR EL PERÚ
          </span>
          <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-white">
            Diseña y Cotiza tu Itinerario Personalizado
          </h1>
          <p className="text-sm sm:text-base text-[#C7C2B8] max-w-3xl prose-measure">
            Configura las regiones que deseas recorrer, los días disponibles, la categoría hotelera y el estándar ferroviario hacia Machu Picchu cuando incluyas la sierra sur. Calculamos al instante un presupuesto referencial transparente.
          </p>

          {baseTour && (
            <div className="p-3.5 rounded bg-[#1E2B27] border border-[#D49B35]/50 flex flex-wrap items-center justify-between gap-3 text-xs text-[#FAF8F5]">
              <div>
                <span className="eyebrow-editorial text-[#E8B954] mr-2">RUTA BASE ACTIVA:</span>
                <strong>Tomando como base: {baseTour.title}</strong> ({baseTour.code} ·{' '}
                {baseTour.durationLabel})
              </div>
              <Link
                to={`/tours/${baseTour.slug}`}
                className="text-[#E8B954] hover:underline font-semibold inline-flex items-center gap-1 shrink-0"
              >
                <span>Ver ficha base</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-10 items-start">
        {/* Left 8 Cols: Interactive Configurator Steps */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Regions */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/15 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="eyebrow-editorial text-[#B84020] block">
                  PASO 01 · SELECCIÓN TERRITORIAL
                </span>
                <h2 className="font-serif-editorial text-2xl font-bold text-[#18221F]">
                  ¿Qué regiones del Perú deseas incluir?
                </h2>
              </div>
              <span className="num-tabular text-xs font-semibold px-2.5 py-1 rounded bg-[#F2EFE9] text-[#18221F]">
                {selectedRegions.length} seleccionadas
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {DESTINATIONS_DATA.map((dest) => {
                const active = selectedRegions.includes(dest.slug);
                return (
                  <button
                    key={dest.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleRegion(dest.slug)}
                    className={`p-3.5 rounded border text-left flex items-center gap-3.5 transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer ${
                      active
                        ? 'border-[#D9532F] bg-white shadow-xs'
                        : 'border-[#18221F]/15 bg-[#FAF8F5]/50 hover:bg-[#F2EFE9]/70'
                    }`}
                  >
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-14 h-14 rounded object-cover shrink-0 border border-[#18221F]/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif-editorial font-bold text-base text-[#18221F] truncate">
                          {dest.name}
                        </span>
                        {active && <CheckCircle2 className="w-4 h-4 text-[#B84020] shrink-0" />}
                      </div>
                      <span className="num-tabular text-[11px] text-[#525E5A] block mt-0.5">
                        Estadía sugerida: {dest.recommendedStay}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Duration, Hotel & Train */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/15 space-y-6">
            <div>
              <span className="eyebrow-editorial text-[#B84020] block">
                PASO 02 · CONFORT, TRENES Y MODALIDAD
              </span>
              <h2 className="font-serif-editorial text-2xl font-bold text-[#18221F]">
                Configura el estándar operativo de tu viaje
              </h2>
            </div>

            {/* Days, Travelers & Date */}
            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="planner-days-range"
                  className="block eyebrow-editorial text-[11px] text-[#525E5A] mb-1.5"
                >
                  Duración Total: <strong className="num-tabular text-[#18221F]">{daysCount} Días</strong>
                </label>
                <input
                  id="planner-days-range"
                  type="range"
                  min={3}
                  max={18}
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full accent-[#D9532F] cursor-pointer"
                />
                <div className="flex justify-between num-tabular text-[10px] text-[#525E5A]">
                  <span>3 Días</span>
                  <span>10 Días</span>
                  <span>18 Días</span>
                </div>
              </div>

              <div>
                <span className="block eyebrow-editorial text-[11px] text-[#525E5A] mb-1.5">
                  Número de Viajeros
                </span>
                <div className="flex items-center justify-between gap-2 p-1 rounded border border-[#18221F]/20 bg-white">
                  <button
                    type="button"
                    onClick={() => handleTravelersChange(travelers - 1)}
                    disabled={travelers <= 1}
                    aria-label="Reducir viajeros"
                    className="w-7 h-7 rounded bg-[#FAF8F5] hover:bg-[#F2EFE9] disabled:opacity-40 flex items-center justify-center text-[#18221F] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="num-tabular text-xs font-bold text-[#18221F]">
                    {travelers} {travelers === 1 ? 'Viajero' : 'Viajeros'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleTravelersChange(travelers + 1)}
                    disabled={travelers >= 12}
                    aria-label="Aumentar viajeros"
                    className="w-7 h-7 rounded bg-[#FAF8F5] hover:bg-[#F2EFE9] disabled:opacity-40 flex items-center justify-center text-[#18221F] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="planner-start-date"
                  className="block eyebrow-editorial text-[11px] text-[#525E5A] mb-1.5"
                >
                  Fecha Aproximada
                </label>
                <input
                  id="planner-start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#18221F]/20 text-xs num-tabular bg-white text-[#18221F]"
                />
              </div>
            </div>

            {/* Hotel Category */}
            <div className="space-y-2">
              <span className="block eyebrow-editorial text-[11px] text-[#525E5A]">
                Categoría de Alojamiento
              </span>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    id: '3-star',
                    title: '3★ Boutique Seleccionado',
                    desc: 'Tierra Viva / Casa Andina Standard. Céntricos y cálidos.'
                  },
                  {
                    id: '4-star',
                    title: '4★ Superior Confort',
                    desc: 'Costa del Sol Wyndham / El Mapi by Inkaterra / Sonesta.'
                  },
                  {
                    id: '5-star',
                    title: '5★ Colección & Lujo',
                    desc: 'Palacio del Inka / Tambo del Inka / Inkaterra Pueblo.'
                  }
                ].map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    aria-pressed={hotelTier === h.id}
                    onClick={() => setHotelTier(h.id as typeof hotelTier)}
                    className={`p-3.5 rounded border text-left cursor-pointer transition-colors duration-200 ease-[var(--ease-out-snappy)] ${
                      hotelTier === h.id
                        ? 'border-[#D9532F] bg-white shadow-xs'
                        : 'border-[#18221F]/15 bg-[#FAF8F5]/50 hover:bg-[#F2EFE9]/70'
                    }`}
                  >
                    <div className="font-serif-editorial font-bold text-sm text-[#18221F]">
                      {h.title}
                    </div>
                    <p className="text-[11px] text-[#525E5A] mt-1">{h.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Train & Service Modality */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="eyebrow-editorial text-[11px] text-[#525E5A]">
                    Categoría de Tren a Machu Picchu
                  </span>
                  {!includesMachuPicchuCorridor && (
                    <span className="text-[11px] font-medium text-[#B84020]">
                      No aplica sin Cusco/Valle Sagrado
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'expedition', label: 'Tren Expedition / The Voyager (Turístico)' },
                    { id: 'vistadome', label: 'Tren Vistadome / The 360° (Ventanas Panorámicas)' },
                    { id: 'first-class', label: 'Tren First Class / Coche Observatorio Gourmet' }
                  ].map((tr) => (
                    <button
                      key={tr.id}
                      type="button"
                      disabled={!includesMachuPicchuCorridor}
                      aria-pressed={includesMachuPicchuCorridor && trainTier === tr.id}
                      onClick={() => setTrainTier(tr.id as typeof trainTier)}
                      className={`w-full p-2.5 rounded border text-left text-xs font-medium flex items-center justify-between transition-colors duration-200 ${
                        !includesMachuPicchuCorridor
                          ? 'border-[#18221F]/10 bg-[#F2EFE9]/60 text-[#525E5A]/60 cursor-not-allowed'
                          : trainTier === tr.id
                            ? 'border-[#18221F] bg-[#18221F] text-white cursor-pointer'
                            : 'border-[#18221F]/15 bg-[#FAF8F5] text-[#18221F] hover:border-[#18221F] cursor-pointer'
                      }`}
                    >
                      <span>{tr.label}</span>
                      {includesMachuPicchuCorridor && trainTier === tr.id && (
                        <Train className="w-4 h-4 text-[#E8B954] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="block eyebrow-editorial text-[11px] text-[#525E5A]">
                  Estilo de Guiado y Transporte
                </span>
                <div className="space-y-2">
                  {[
                    {
                      id: 'privado',
                      label: 'Servicio Privado a Medida (Vehículo y guía exclusivos)'
                    },
                    {
                      id: 'grupal',
                      label: 'Grupos Reducidos Seleccionados (Máx. 10-14 viajeros)'
                    }
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      aria-pressed={serviceStyle === st.id}
                      onClick={() => setServiceStyle(st.id as typeof serviceStyle)}
                      className={`w-full p-3 rounded border text-left text-xs font-medium flex items-center justify-between transition-colors duration-200 cursor-pointer ${
                        serviceStyle === st.id
                          ? 'border-[#D9532F] bg-[#D9532F] text-white'
                          : 'border-[#18221F]/15 bg-[#FAF8F5] text-[#18221F] hover:border-[#18221F]'
                      }`}
                    >
                      <span>{st.label}</span>
                      {serviceStyle === st.id && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    </button>
                  ))}
                </div>
                {serviceStyle === 'privado' && travelers >= 4 && (
                  <p className="text-[11px] text-[#1F513F] font-medium">
                    ✓ Eficiencia grupal aplicada al prorratear vehículo y guía privado entre {travelers} viajeros.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Saved / Compared Tours from Catalog */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-md border border-[#18221F]/15 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="eyebrow-editorial text-[#1F513F] block">
                  PASO 03 · RUTAS DE TU CARRITO ({savedTours.length})
                </span>
                <h3 className="font-serif-editorial text-xl font-bold text-[#18221F]">
                  Experiencias específicas a articular en la propuesta
                </h3>
              </div>
              <Link to="/catalogo" className="text-xs font-semibold text-[#B84020] hover:underline">
                + Explorar catálogo completo
              </Link>
            </div>

            {savedTours.length === 0 ? (
              <p className="text-xs text-[#525E5A]">
                Aún no has marcado rutas específicas. Puedes agregar excursiones desde el catálogo con el ícono de marcador o enviarnos tu configuración por regiones.
              </p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  {savedTours.map((t) => {
                    const isHighlightedCompare =
                      compareSlugs.includes(t.slug) || baseTour?.slug === t.slug;
                    return (
                      <div
                        key={t.id}
                        className={`p-3 rounded border flex items-center justify-between gap-2 text-xs ${
                          isHighlightedCompare
                            ? 'bg-white border-[#D9532F]'
                            : 'bg-[#FAF8F5] border-[#18221F]/12'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="num-tabular text-[11px] text-[#B84020] font-semibold block">
                            {t.code} · {t.durationLabel}
                            {isHighlightedCompare ? ' · Destacada' : ''}
                          </span>
                          <Link
                            to={`/tours/${t.slug}`}
                            className="font-semibold text-[#18221F] hover:text-[#B84020] truncate block"
                          >
                            {t.title}
                          </Link>
                          <span className="num-tabular text-[11px] text-[#525E5A]">
                            Ref.: {formatPrice(serviceStyle === 'privado' ? t.privatePriceUsd : t.priceUsd)} / pax
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDismissStep3Tour(t.slug)}
                          className="text-xs text-[#525E5A] hover:text-[#B84020] shrink-0 cursor-pointer"
                        >
                          Quitar
                        </button>
                      </div>
                    );
                  })}
                </div>

                {oneDaySavedTours.length > 0 && (
                  <label className="flex items-start gap-2.5 p-3 rounded bg-[#F2EFE9]/70 border border-[#18221F]/12 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeDayTourExtensions}
                      onChange={(e) => setIncludeDayTourExtensions(e.target.checked)}
                      className="mt-0.5 accent-[#D9532F]"
                    />
                    <span className="text-[#18221F]">
                      Incluir el estimado de tus{' '}
                      <strong>{oneDaySavedTours.length} excursiones de 1 día</strong> como
                      extensiones sumadas al presupuesto (las rutas multidía permanecen como guía de diseño sin duplicar hotelería).
                    </span>
                  </label>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right 4 Cols: Live Quotation Summary & Form */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="bg-[#FFFFFF] rounded-md border-2 border-[#18221F] shadow-xl overflow-hidden">
            <div className="bg-[#18221F] text-white p-5 space-y-1">
              <span className="eyebrow-editorial text-[11px] text-[#E8B954] block">
                ESTIMACIÓN REFERENCIAL EN VIVO
              </span>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-[#C7C2B8]">Estimado por viajero:</span>
                <span className="num-tabular text-2xl sm:text-3xl font-bold text-white">
                  {formatPrice(basePerPersonUsd)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#E8B954] num-tabular pt-1">
                <span>
                  Total ({travelers} {travelers === 1 ? 'viajero' : 'viajeros'} · {daysCount} días):
                </span>
                <strong>{formatPrice(totalEstimatedUsd)}</strong>
              </div>
            </div>

            {generatedProposal ? (
              <div className="p-6 space-y-4 bg-[#FFFFFF]">
                <div className="p-4 rounded bg-[#1F513F]/12 border border-[#1F513F]/35 text-xs space-y-1.5">
                  <div className="font-bold text-sm text-[#1F513F] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Propuesta Personalizada Generada</span>
                  </div>
                  <p className="text-[#18221F]">
                    Expediente: <strong className="num-tabular">{generatedProposal.code}</strong>
                  </p>
                </div>

                <div className="p-4 rounded bg-white border border-[#18221F]/15 num-tabular text-xs space-y-1.5">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">TITULAR:</span>
                    <strong className="text-right">{fullName}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">DURACIÓN / PAX:</span>
                    <strong>
                      {daysCount} Días / {travelers} Pax
                    </strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">HOTEL / TREN:</span>
                    <strong className="text-right">
                      {HOTEL_LABELS[hotelTier]} /{' '}
                      {includesMachuPicchuCorridor ? TRAIN_LABELS[trainTier] : 'No aplica'}
                    </strong>
                  </div>
                  <div className="flex justify-between gap-2 pt-1.5 border-t border-[#18221F]/10">
                    <span className="text-[#525E5A]">TOTAL ESTIMADO:</span>
                    <strong className="text-[#B84020]">
                      {formatPrice(generatedProposal.totalUsd)}
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#1F513F]">
                    <span>Depósito 30%:</span>
                    <strong>{formatPrice(generatedProposal.depositUsd)}</strong>
                  </div>
                </div>

                <a
                  href={buildWhatsAppUrl(buildSummaryText(generatedProposal.code))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded bg-[#1F513F] hover:bg-[#173F30] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200 ease-[var(--ease-out-snappy)]"
                >
                  <WhatsAppLogo className="w-4 h-4 shrink-0" />
                  <span>Enviar a mi Especialista por WhatsApp</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="py-2.5 px-3 rounded border border-[#18221F]/20 bg-white hover:bg-[#F2EFE9] text-[#18221F] font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer"
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
                    href={`mailto:hola@qullqatravesias.pe?subject=${encodeURIComponent(
                      `Propuesta a medida ${generatedProposal.code}`
                    )}&body=${encodeURIComponent(buildSummaryText(generatedProposal.code))}`}
                    className="py-2.5 px-3 rounded border border-[#18221F]/20 bg-white hover:bg-[#F2EFE9] text-[#18221F] font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors duration-200"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#B84020]" />
                    <span>Por correo</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setGeneratedProposal(null)}
                  className="w-full py-2 text-xs text-[#525E5A] hover:text-[#18221F] cursor-pointer"
                >
                  Ajustar parámetros de mi viaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
                <div className="space-y-2 text-xs bg-[#FAF8F5] p-3.5 rounded border border-[#18221F]/10">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">Regiones incluidas:</span>
                    <strong className="num-tabular text-[#18221F]">
                      {selectedRegions.length} destinos
                    </strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">Categoría Hotelera:</span>
                    <strong className="text-[#18221F] text-right">{HOTEL_LABELS[hotelTier]}</strong>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525E5A]">Tren Machu Picchu:</span>
                    <strong className="text-[#18221F] text-right">
                      {includesMachuPicchuCorridor ? TRAIN_LABELS[trainTier] : 'No aplica'}
                    </strong>
                  </div>
                  {soloSupplementPerPaxUsd > 0 && (
                    <div className="flex justify-between gap-2 text-[#B84020]">
                      <span>Suplemento pasajero individual:</span>
                      <strong className="num-tabular">
                        +{formatPrice(soloSupplementPerPaxUsd)}
                      </strong>
                    </div>
                  )}
                  {oneDayExtensionsPerPaxUsd > 0 && (
                    <div className="flex justify-between gap-2 text-[#1F513F]">
                      <span>Extensiones de 1 día ({oneDaySavedTours.length}):</span>
                      <strong className="num-tabular">
                        +{formatPrice(oneDayExtensionsPerPaxUsd)} / pax
                      </strong>
                    </div>
                  )}
                  <div className="flex justify-between gap-2 pt-1.5 border-t border-[#18221F]/10">
                    <span className="text-[#525E5A]">Depósito 30% al confirmar:</span>
                    <strong className="num-tabular text-[#1F513F]">
                      {formatPrice(deposit30Usd)}
                    </strong>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nombre y Apellido *"
                    aria-label="Nombre y apellido"
                    className="w-full px-3 py-2.5 rounded border border-[#18221F]/20 bg-white text-xs text-[#18221F]"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico *"
                    aria-label="Correo electrónico"
                    className="w-full px-3 py-2.5 rounded border border-[#18221F]/20 bg-white text-xs text-[#18221F]"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp (con código de país)"
                    aria-label="WhatsApp"
                    className="w-full px-3 py-2.5 rounded border border-[#18221F]/20 bg-white text-xs text-[#18221F]"
                  />
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Cuéntanos detalles importantes: ¿viajan niños o adultos mayores?, ¿alguna celebración especial?"
                    aria-label="Notas del viaje"
                    className="w-full px-3 py-2.5 rounded border border-[#18221F]/20 bg-white text-xs text-[#18221F]"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs text-[#B84020] font-semibold">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded bg-[#D9532F] hover:bg-[#B84020] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generar Cotización Formal a Medida</span>
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export const TripPlannerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const baseSlug = searchParams.get('base') || '';
  const destinoSlug = searchParams.get('destino') || '';
  const compararParam = searchParams.get('comparar') || '';
  const rawFecha = searchParams.get('fecha') || '';
  const fechaParam = /^\d{4}-\d{2}-\d{2}$/.test(rawFecha) ? rawFecha : '';
  const rawViajeros = Number(searchParams.get('viajeros'));
  const viajerosParam =
    Number.isInteger(rawViajeros) && rawViajeros >= 1 && rawViajeros <= 12
      ? rawViajeros
      : undefined;

  return (
    <TripPlannerContent
      key={`${baseSlug}|${destinoSlug}|${compararParam}|${fechaParam}|${viajerosParam ?? ''}`}
      baseSlug={baseSlug}
      destinoSlug={destinoSlug}
      compararParam={compararParam}
      initialFecha={fechaParam}
      initialViajeros={viajerosParam}
    />
  );
};
