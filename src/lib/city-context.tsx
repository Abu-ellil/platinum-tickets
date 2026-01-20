"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface City {
  _id: string;
  name: {
    ar: string;
    en: string;
  };
  country: {
    ar: string;
    en: string;
  };
  image: string;
  slug: string;
  flag: string;
  currency: string;
}

interface CityContextType {
  selectedCity: City | null;
  selectedCityId: string;
  setSelectedCity: (city: City | null) => void;
  setSelectedCityId: (id: string) => void;
  cities: City[];
  loading: boolean;
  currency: string;
  currencySymbol: string;
  currencyFlag: string;
  fetchCities: () => Promise<void>;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCities = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/cities');
      const json = await res.json();
      if (json.success) {
        setCities(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    if (cities.length > 0 && !selectedCityId) {
      const savedCityId = localStorage.getItem('selectedCityId');
      if (savedCityId) {
        const city = cities.find((c) => c._id === savedCityId);
        if (city) {
          setSelectedCityId(savedCityId);
          setSelectedCity(city);
        }
      } else {
        const dubai = cities.find((c) => c.slug === 'dubai');
        if (dubai) {
          setSelectedCityId(dubai._id);
          setSelectedCity(dubai);
          localStorage.setItem('selectedCityId', dubai._id);
        } else if (cities.length > 0) {
          setSelectedCityId(cities[0]._id);
          setSelectedCity(cities[0]);
          localStorage.setItem('selectedCityId', cities[0]._id);
        }
      }
    }
  }, [cities, selectedCityId]);

  const handleSetCity = useCallback((city: City | null) => {
    setSelectedCity(city);
    if (city) {
      setSelectedCityId(city._id);
      localStorage.setItem('selectedCityId', city._id);
    } else {
      setSelectedCityId("");
      localStorage.removeItem('selectedCityId');
    }
  }, []);

  const handleSetCityId = useCallback((id: string) => {
    setSelectedCityId(id);
    const city = cities.find((c) => c._id === id);
    if (city) {
      setSelectedCity(city);
      localStorage.setItem('selectedCityId', id);
    }
  }, [cities]);

  const currency = selectedCity?.currency || "SAR";
  const currencySymbol = (() => {
    const currencyMap: Record<string, string> = {
      EGP: "ج.م",
      SAR: "ر.س",
      AED: "د.إ",
      QAR: "ر.ق",
      KWD: "د.ك",
      BHD: "د.ب",
      OMR: "ر.ع",
      JOD: "د.أ",
      LBP: "ل.ل",
      IQD: "د.ع",
      LYD: "د.ل",
      TND: "د.ت",
      DZD: "د.ج",
      MAD: "د.م",
      SYP: "ل.س",
      YER: "ر.ي",
      SOS: "ش.ص",
      DJD: "د.ج",
      MVR: "ر.م",
      PAB: "ب.ب",
    };
    return currencyMap[currency] || currency;
  })();

  const currencyFlag = selectedCity?.flag || "🇸🇦";

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        selectedCityId,
        setSelectedCity: handleSetCity,
        setSelectedCityId: handleSetCityId,
        cities,
        loading,
        currency,
        currencySymbol,
        currencyFlag,
        fetchCities,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
