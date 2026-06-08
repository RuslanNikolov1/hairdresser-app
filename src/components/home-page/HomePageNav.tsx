"use client";

import { SiteNav } from "@/components/site/SiteNav";

import styles from "./HomePage.module.scss";

const navItems = [
  { href: "#learning", label: "Обучение" },
  { href: "#modules", label: "Модули" },
  { href: "#gallery", label: "Галерия" },
  { href: "#mentor", label: "Инструктор" },
  { href: "#contacts", label: "Контакти" },
] as const;

export function HomePageNav() {
  return (
    <SiteNav
      items={navItems}
      ctaHref="#contacts"
      ctaLabel="Свържи се"
      styles={{
        nav: styles.nav,
        navOpen: styles.navOpen,
        navInner: styles.navInner,
        brand: styles.brand,
        navLinks: styles.navLinks,
        navLinksOpen: styles.navLinksOpen,
        navMenuCta: styles.navMenuCta,
        navActions: styles.navActions,
        navCta: styles.navCta,
        navToggle: styles.navToggle,
        navBackdrop: styles.navBackdrop,
      }}
    />
  );
}
