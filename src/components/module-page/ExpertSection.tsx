import Image from "next/image";

import { instructor } from "@/components/home-page/content";
import { SectionHeading } from "./SectionHeading";
import styles from "./ExpertSection.module.scss";

const EXPERT = {
  name: instructor.name,
  bio: instructor.bio,
  quote: instructor.quote,
};

export function ExpertSection() {
  return (
    <section id="mentor" className={styles.section} aria-labelledby="mentor-heading">
      <div className={styles.container}>
        <article className={styles.card}>
          <div className={styles.media}>
            <div className={styles.mediaFrame}>
              <Image
                src={instructor.image}
                alt={EXPERT.name}
                width={instructor.imageWidth}
                height={instructor.imageHeight}
                className={styles.portrait}
                sizes="(min-width: 900px) 38vw, 90vw"
              />
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.headingLockup}>
              <p className={styles.eyebrow}>Вашият ментор</p>
              <SectionHeading
                id="mentor-heading"
                titleClassName={styles.name}
                showWave={false}
              >
                {EXPERT.name}
              </SectionHeading>
            </div>
            <p className={styles.bio}>{EXPERT.bio}</p>
            <blockquote className={styles.quote}>
              <p>&ldquo;{EXPERT.quote}&rdquo;</p>
            </blockquote>
          </div>
        </article>
      </div>
    </section>
  );
}
