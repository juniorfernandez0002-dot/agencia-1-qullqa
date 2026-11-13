import React, { createContext, useContext, useState, useEffect } from 'react';
import { PEN_EXCHANGE_RATE } from '../data/catalog';

type Currency = 'USD' | 'PEN';
type Language = 'ES' | 'EN';

interface PreferencesContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  formatPrice: (usdAmount: number) => string;
  toPen: (usdAmount: number) => number;
  savedSlugs: string[];
  toggleSavedSlug: (slug: string) => void;
  clearSavedSlugs: () => void;
  preferredDate: string;
  setPreferredDate: (d: string) => void;
  preferredTravelers: number;
  setPreferredTravelers: (n: number) => void;
  buildWhatsAppUrl: (customMessage: string) => string;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const STORAGE_KEYS = {
  currency: 'qullqa_currency_v2',
  language: 'qullqa_lang_v2',
  saved: 'qullqa_compare_v2'
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.currency);
      return saved === 'PEN' ? 'PEN' : 'USD';
    } catch {
      return 'USD';
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.language);
      return saved === 'EN' ? 'EN' : 'ES';
    } catch {
      return 'ES';
    }
  });

  const [savedSlugs, setSavedSlugs] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.saved);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage failure
    }
    return [];
  });

  const [preferredDate, setPreferredDate] = useState<string>('2026-12-12');
  const [preferredTravelers, setPreferredTravelers] = useState<number>(2);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.currency, currency);
    } catch {
      // ignore
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.language, language);
    } catch {
      // ignore
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(savedSlugs));
    } catch {
      // ignore
    }
  }, [savedSlugs]);

  const setCurrency = (c: Currency) => setCurrencyState(c);
  const setLanguage = (l: Language) => setLanguageState(l);

  const toPen = (usdAmount: number): number => Math.round(usdAmount * PEN_EXCHANGE_RATE);

  const formatPrice = (usdAmount: number): string => {
    if (currency === 'USD') {
      return `USD $${usdAmount.toLocaleString('en-US')}`;
    }
    const penAmount = toPen(usdAmount);
    return `S/ ${penAmount.toLocaleString('es-PE')}`;
  };

  const toggleSavedSlug = (slug: string) => {
    setSavedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      }
      // Cap at 4 for clean side-by-side comparison
      if (prev.length >= 4) {
        return [...prev.slice(1), slug];
      }
      return [...prev, slug];
    });
  };

  const clearSavedSlugs = () => setSavedSlugs([]);

  const buildWhatsAppUrl = (customMessage: string): string => {
    const phone = '51984000111';
    const encoded = encodeURIComponent(customMessage);
    return `https://wa.me/${phone}?text=${encoded}`;
  };

  return (
    <PreferencesContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        toPen,
        savedSlugs,
        toggleSavedSlug,
        clearSavedSlugs,
        preferredDate,
        setPreferredDate,
        preferredTravelers,
        setPreferredTravelers,
        buildWhatsAppUrl
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return context;
};
