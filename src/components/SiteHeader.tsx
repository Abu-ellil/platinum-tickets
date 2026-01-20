"use client";

import Link from "next/link";
import { Globe, MapPin, User } from "lucide-react";
import styles from "./SiteHeader.module.css";
import { useCity } from "@/lib/city-context";
import { useLanguage } from "@/lib/language-context";

export function SiteHeader() {
  const { selectedCity } = useCity();
  const { language } = useLanguage();

  const cityName = selectedCity 
    ? selectedCity.name[language] 
    : (language === "ar" ? "الدوحة" : "Doha");

  return (
    <header className={styles.siteHeader}>
      <div className={styles.leftSection}>
        <div className={styles.userProfile}>
          <User size={20} className={styles.userIcon} />
        </div>
        <div className={styles.citySelector}>
          <span className={styles.cityName}>{cityName}</span>
          <MapPin size={18} className={styles.pinIcon} />
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <Link href="/" className={styles.logoLink}>
          <img src="/pl-logo.svg" alt="Platinumlist" className={styles.logoImage} />
        </Link>
      </div>
    </header>
  );
}
