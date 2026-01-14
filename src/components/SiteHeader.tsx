"use client";

import Link from "next/link";
import { Globe, MapPin, User } from "lucide-react";
import styles from "./SiteHeader.module.css";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [userCity, setUserCity] = useState<string>("...");

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.city) {
          setUserCity(data.city);
        } else {
          setUserCity("الدوحة"); // Default for Doha as shown in screenshot
        }
      } catch (error) {
        setUserCity("الدوحة");
      }
    };
    fetchCity();
  }, []);

  return (
    <header className={styles.siteHeader}>
      <div className={styles.leftSection}>
        <div className={styles.userProfile}>
          <User size={20} className={styles.userIcon} />
        </div>
        <div className={styles.citySelector}>
          <span className={styles.cityName}>{userCity}</span>
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
