import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpDown, ArrowUpRight, Info, ShoppingCart, Tag } from 'lucide-react';
import { ALL_TOURS, PEN_EXCHANGE_RATE } from '../data/catalog';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TourCard } from '../components/TourCard';
import { usePreferences } from '../context/PreferencesContext';

type SegmentFilter = 'all' | 'paquetes-peru' | 'full-day' | 'experiencias-privadas' | 'promos';
type SortOption = 'code' | 'price-asc' | 'price-desc' | 'duration';

export const OffersPage: React.FC = () => {
  const { formatPrice, currency, setCurrency, savedSlugs, toggleSavedSlug } = usePreferences();

  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>('all');
  const [destinationFilter, setDestinationFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('code');

  const promotionalTours = ALL_TOURS.filter(
    (t) => Boolean(t.originalPriceUsd) && (t.originalPriceUsd ?? 0) > t.priceUsd
  );

  const filteredAndSortedTours = useMemo(() => {
    const filtered = ALL_TOURS.filter((tour) => {
      if (segmentFilter === 'promos') {
        if (!tour.originalPriceUsd || tour.originalPriceUsd <= tour.priceUsd) return false;
      } else if (segmentFilter !== 'all') {
        if (!tour.sections.includes(segmentFilter)) return false;
      }

      if (destinationFilter !== 'all') {
        if (
          tour.destinationSlug !== destinationFilter &&
          !tour.visitedDestinations.includes(destinationFilter as typeof tour.destinationSlug)
        ) {
          return false;
        }
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc' || sortBy === 'price-desc') {
        const aPrivateOnly =
          a.modalities.length === 1 && a.modalities[0] === 'Privado a Medida';
        const bPrivateOnly =
          b.modalities.length === 1 && b.modalities[0] === 'Privado a Medida';
        if (aPrivateOnly !== bPrivateOnly) {
          return aPrivateOnly ? 1 : -1;
        }
        if (aPrivateOnly && bPrivateOnly) {
          return sortBy === 'price-asc'
            ? a.privatePriceUsd - b.privatePriceUsd
            : b.privatePriceUsd - a.privatePriceUsd;
        }
        return sortBy === 'price-asc' ? a.priceUsd - b.priceUsd : b.priceUsd - a.priceUsd;
      }
      if (sortBy === 'duration') return a.durationDays - b.durationDays || a.priceUsd - b.priceUsd;
      return a.code.localeCompare(b.code);
    });
  }, [segmentFilter, destinationFilter, sortBy]);

  return (
    <div className="pb-20 space-y-16">
      {/* Header */}
      <section className="bg-[#18221F] text-[#FAF8F5] py-14 border-b border-white/12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="eyebrow-editorial text-[#E8B954] inline-flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#E87A5A]" /> TARIFARIO COMPARATIVO &amp; SALIDAS CON BONIFICACIÓN
            </span>
            <div className="flex items-center gap-2 num-tabular text-xs bg-white/10 px-3 py-1.5 rounded">
              <span className="text-[#C7C2B8]">Moneda activa:</span>
              <button
                type="button"
                aria-pressed={currency === 'USD'}
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded transition-colors duration-200 cursor-pointer ${
                  currency === 'USD' ? 'bg-[#D9532F] text-white font-bold' : 'text-[#C7C2B8]'
                }`}
              >
                USD $
              </button>
              <button
                type="button"
                aria-pressed={currency === 'PEN'}
                onClick={() => setCurrency('PEN')}
                className={`px-2 py-0.5 rounded transition-colors duration-200 cursor-pointer ${
                  currency === 'PEN' ? 'bg-[#D9532F] text-white font-bold' : 'text-[#C7C2B8]'
                }`}
              >
                PEN S/
              </button>
            </div>
          </div>

          <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-white">
            Ofertas por Reserva Anticipada &amp; Tarifario Oficial
          </h1>
          <p className="text-sm sm:text-base text-[#C7C2B8] max-w-3xl prose-measure">
            Consulta nuestros circuitos combinados con bonificación vigente y compara la matriz completa de tarifas grupales y privadas de los {ALL_TOURS.length} itinerarios operativos en Perú.
          </p>

          <div className="p-4 rounded bg-[#1E2B27] border border-[#D49B35]/45 flex flex-wrap items-center justify-between gap-3 text-xs text-[#FAF8F5]">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#E8B954] shrink-0 mt-0.5" />
              <span>
                <strong>Condiciones Comerciales:</strong> Vigencia aplicable en reservas confirmadas con 30 días de anticipación en salidas seleccionadas, sujeto a cupos oficiales de tren y santuario.
              </span>
            </div>
            <Link
              to="/confianza?seccion=pagos"
              className="text-[#E8B954] hover:underline font-semibold whitespace-nowrap shrink-0"
            >
              Ver condiciones de pago y reserva →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Promotional Combos */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-8">
        <div>
          <span className="eyebrow-editorial text-[#B84020] block">
            SALIDAS CON TARIFA BONIFICADA
          </span>
          <h2 className="font-serif-editorial text-3xl font-bold text-[#18221F] mt-1">
            Programas con Bonificación por Reserva Anticipada
          </h2>
        </div>

        <div className="space-y-6">
          {promotionalTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} variant="editorial-feature" />
          ))}
        </div>
      </section>

      {/* Complete Tariff Ledger Table (All Tours) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="eyebrow-editorial text-[#1F513F] block">
              MATRIZ TARIFARIA INTEGRAL · {ALL_TOURS.length} PRODUCTOS
            </span>
            <h2 className="font-serif-editorial text-3xl font-bold text-[#18221F] mt-1">
              Comparador General de Tarifas Grupales vs. Privadas
            </h2>
          </div>
          <span className="num-tabular text-xs text-[#525E5A]">
            Tipo de cambio referencial: 1 USD = S/ {PEN_EXCHANGE_RATE.toFixed(2)} PEN
          </span>
        </div>

        {/* Quick Segment Filters & Sorting */}
        <div className="p-4 rounded-md bg-[#F2EFE9]/70 border border-[#18221F]/12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `Todos (${ALL_TOURS.length})` },
              { id: 'paquetes-peru', label: 'Paquetes' },
              { id: 'full-day', label: '1 Día' },
              { id: 'experiencias-privadas', label: 'Privados' },
              { id: 'promos', label: `Solo Promociones (${promotionalTours.length})` }
            ].map((pill) => (
              <button
                key={pill.id}
                type="button"
                aria-pressed={segmentFilter === pill.id}
                onClick={() => setSegmentFilter(pill.id as SegmentFilter)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors duration-200 ease-[var(--ease-out-snappy)] cursor-pointer ${
                  segmentFilter === pill.id
                    ? 'bg-[#18221F] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] text-[#18221F] border border-[#18221F]/15 hover:border-[#18221F]'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <label htmlFor="offers-destination-filter" className="sr-only">
              Filtrar por destino
            </label>
            <select
              id="offers-destination-filter"
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="px-3 py-1.5 rounded border border-[#18221F]/20 bg-[#FFFFFF] text-[#18221F] font-medium"
            >
              <option value="all">Todos los destinos</option>
              {DESTINATIONS_DATA.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>

            <div className="inline-flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#B84020]" />
              <label htmlFor="offers-sort-select" className="sr-only">
                Ordenar tarifario
              </label>
              <select
                id="offers-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 rounded border border-[#18221F]/20 bg-[#FFFFFF] text-[#18221F] font-medium"
              >
                <option value="code">Ordenar: Código</option>
                <option value="price-asc">Precio Grupal: Menor a Mayor</option>
                <option value="price-desc">Precio Grupal: Mayor a Menor</option>
                <option value="duration">Duración</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-md border border-[#18221F]/15 overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#18221F] text-white eyebrow-editorial text-[11px]">
                <th className="py-3.5 px-4">Código</th>
                <th className="py-3.5 px-4">Producto / Circuito</th>
                <th className="py-3.5 px-4">Destino</th>
                <th className="py-3.5 px-4">Duración</th>
                <th className="py-3.5 px-4">Tarifa Grupal / Pax</th>
                <th className="py-3.5 px-4">Tarifa Privada / Pax</th>
                <th className="py-3.5 px-4 text-right">Carrito &amp; Ficha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18221F]/10">
              {filteredAndSortedTours.map((tour) => {
                const isSaved = savedSlugs.includes(tour.slug);
                const isPrivateOnly =
                  tour.modalities.length === 1 && tour.modalities[0] === 'Privado a Medida';
                const privateTier = tour.pricingTiers.find((pt) => pt.modality === 'Privado');
                const privateMinNote = isPrivateOnly
                  ? 'Solo Privado'
                  : privateTier && privateTier.minPax >= 2
                    ? `Privado (Base ${privateTier.minPax} pax)`
                    : 'Privado (desde 1 pax)';
                const hasValidDiscount =
                  !isPrivateOnly &&
                  Boolean(tour.originalPriceUsd) &&
                  (tour.originalPriceUsd ?? 0) > tour.priceUsd;
                const savingsPct =
                  hasValidDiscount && tour.originalPriceUsd
                    ? Math.round(
                        ((tour.originalPriceUsd - tour.priceUsd) / tour.originalPriceUsd) * 100
                      )
                    : 0;

                return (
                  <tr
                    key={tour.id}
                    className="hover:bg-white transition-colors duration-150 ease-[var(--ease-out-snappy)]"
                  >
                    <td className="py-3.5 px-4 num-tabular font-bold text-[#B84020] whitespace-nowrap">
                      {tour.code}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#18221F]">
                      <Link
                        to={`/tours/${tour.slug}`}
                        className="hover:text-[#B84020] transition-colors duration-150"
                      >
                        {tour.title}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-[#525E5A] whitespace-nowrap">
                      {tour.destinationName}
                    </td>
                    <td className="py-3.5 px-4 num-tabular text-xs text-[#18221F] whitespace-nowrap">
                      {tour.durationLabel}
                    </td>
                    <td className="py-3.5 px-4 num-tabular whitespace-nowrap">
                      {isPrivateOnly ? (
                        <span className="text-xs text-[#525E5A] font-medium">Solo Privado</span>
                      ) : (
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="font-bold text-[#18221F]">
                            {formatPrice(tour.priceUsd)}
                          </span>
                          {hasValidDiscount && tour.originalPriceUsd && (
                            <>
                              <span className="text-[11px] text-[#525E5A] line-through font-normal">
                                {formatPrice(tour.originalPriceUsd)}
                              </span>
                              <span className="px-1.5 py-0.5 rounded-xs bg-[#1F513F]/12 text-[#1F513F] text-[10px] font-bold">
                                -{savingsPct}%
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 num-tabular whitespace-nowrap">
                      <span className="font-semibold text-[#1F513F] block">
                        {formatPrice(tour.privatePriceUsd)}
                      </span>
                      <span className="text-[10px] text-[#525E5A] font-medium">
                        {privateMinNote}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleSavedSlug(tour.slug)}
                          aria-pressed={isSaved}
                          aria-label={
                            isSaved
                              ? `Quitar ${tour.title} del carrito`
                              : `Agregar ${tour.title} al carrito`
                          }
                          title={isSaved ? 'En tu carrito' : 'Agregar al carrito'}
                          className={`p-1.5 rounded border transition-colors duration-200 cursor-pointer ${
                            isSaved
                              ? 'bg-[#D9532F] border-[#D9532F] text-white'
                              : 'bg-white border-[#18221F]/20 text-[#525E5A] hover:border-[#D9532F] hover:text-[#B84020]'
                          }`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          to={`/tours/${tour.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#B84020] hover:underline"
                        >
                          <span>Ver</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
