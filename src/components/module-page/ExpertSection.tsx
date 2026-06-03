import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import styles from "./ExpertSection.module.scss";

const EXPERT = {
  name: "Елена Иванова",
  bio: "С над 15 години опит в международни академии, Елена е признат експерт в областта на колористиката. Нейният подход съчетава строгата наука за химията на багрилата с фината естетика на модерния дизайн.",
  quote: "Цветът не е просто боя, той е емоция и форма.",
};

export function ExpertSection() {
  return (
    <section id="mentor" className={styles.section} aria-labelledby="mentor-heading">
      <div className={styles.container}>
        <article className={styles.card}>
          <div className={styles.media}>
            <div className={styles.mediaFrame}>
              <Image
                src="/mentor.png"
                alt={EXPERT.name}
                width={640}
                height={800}
                className={styles.portrait}
                sizes="(min-width: 900px) 38vw, 90vw"
              />
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.headingLockup}>
              <p className={styles.eyebrow}>Вашият ментор</p>
              <h2 id="mentor-heading" className={styles.name}>
                {EXPERT.name}
              </h2>
            </div>
            <p className={styles.bio}>{EXPERT.bio}</p>
            <blockquote className={styles.quote}>
              <span className={styles.quoteIcon} aria-hidden="true">
                <BadgeCheck strokeWidth={1.5} />
              </span>
              <p>&ldquo;{EXPERT.quote}&rdquo;</p>
            </blockquote>
          </div>
        </article>
      </div>
    </section>
  );
}
