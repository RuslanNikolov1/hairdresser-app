"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";

export type SiteNavItem = {
  href: string;
  label: string;
};

type SiteNavStyles = {
  nav: string;
  navOpen: string;
  navInner: string;
  brand: string;
  navLinks: string;
  navLinksOpen: string;
  navMenuCta: string;
  navActions: string;
  navCta: string;
  navToggle: string;
  navBackdrop: string;
};

type SiteNavProps = {
  items: readonly SiteNavItem[];
  ctaHref: string;
  ctaLabel: string;
  styles: SiteNavStyles;
};

export function SiteNav({ items, ctaHref, ctaLabel, styles }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(width > 768px)");

    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        close();
      }
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [close]);

  return (
    <header className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.brand} aria-label="DR & D начало">
          DR & D
        </Link>

        <nav
          id={menuId}
          className={`${styles.navLinks} ${open ? styles.navLinksOpen : ""}`}
          aria-label="Основна навигация"
        >
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
          <a className={styles.navMenuCta} href={ctaHref} onClick={close}>
            {ctaLabel}
          </a>
        </nav>

        <div className={styles.navActions}>
          <a className={styles.navCta} href={ctaHref}>
            {ctaLabel}
          </a>
          <button
            type="button"
            className={styles.navToggle}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Затвори меню" : "Отвори меню"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          className={styles.navBackdrop}
          aria-label="Затвори меню"
          onClick={close}
        />
      ) : null}
    </header>
  );
}
