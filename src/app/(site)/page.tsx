import Link from "next/link";

import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Aura & Bloom</p>
          <h1 className={styles.title}>Модулни страници за курсове</h1>
          <p className={styles.text}>
            Създавайте и управлявайте курсoви модулни страници през Sanity
            Studio, след което ги публикувайте като динамични страници.
          </p>
          <div className={styles.actions}>
            <Link className={styles.button} href="/studio">
              Отвори Studio
            </Link>
            <Link className={styles.secondaryButton} href="/modules/колористика">
              Виж примерен URL
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
