"use client";

import { SiteNav, type SiteNavItem } from "@/components/site/SiteNav";

import styles from "./ModulePage.module.scss";

type ModulePageNavProps = {
  items: SiteNavItem[];
};

export function ModulePageNav({ items }: ModulePageNavProps) {
  return (
    <SiteNav
      items={items}
      ctaHref="#signup"
      ctaLabel="Запиши се"
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
