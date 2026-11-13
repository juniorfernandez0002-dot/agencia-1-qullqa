import React from 'react';

export interface BrandSymbolProps {
  className?: string;
  variant?: 'seal' | 'mark';
}

/**
 * Isotipo arquitectónico de Qullqa:
 * Portal trapezoidal incaico simétrico con umbral abierto inferior y clave
 * romboidal tokapu en terracota (#D9532F) que proyecta una sutil «Q» lítica.
 */
export const BrandSymbol: React.FC<BrandSymbolProps> = ({
  className = 'w-10 h-10',
  variant = 'seal',
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      className={className}
      role="img"
      aria-label="Símbolo Qullqa Travesías del Perú"
    >
      {variant === 'seal' && (
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="12"
          fill="#18221F"
          stroke="#2A6B53"
          strokeWidth="2.5"
        />
      )}

      {/* Portal trapezoidal incaico simétrico con umbral abierto inferior */}
      <path
        d="M23 50 H12.5 L19.5 14 H44.5 L51.5 50 H41"
        stroke="#E8B954"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Receso interior de doble jamba inca (simétrico) */}
      <path
        d="M20.5 44.5 L24.5 20 H39.5 L43.5 44.5"
        stroke="#E8B954"
        strokeOpacity="0.65"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Clave romboidal tokapu + proyección lítica formando una sutil «Q» */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 23.5 L40.5 32 L37.75 34.75 L48.75 53.5 H44 L34.75 37.75 L32 40.5 L23.5 32 Z M32 28 L28 32 L32 36 L36 32 Z"
        fill="#D9532F"
      />
    </svg>
  );
};

export default BrandSymbol;
