import type { LucideIcon } from "lucide-react";

import {
  audienceCards,
  normalizeTargetAudience,
  type TargetAudienceValue,
} from "./audience-content";
import styles from "./ModulePage.module.scss";

type AudienceSectionProps = {
  targetAudience?: string;
};

type AudienceCardProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

function AudienceCard({ title, description, Icon }: AudienceCardProps) {
  return (
    <article className={styles.audienceCard}>
      <div className={styles.iconCircle} aria-hidden="true">
        <Icon strokeWidth={1.75} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

function getVisibleAudiences(
  audience: TargetAudienceValue,
): AudienceCardProps[] {
  if (audience === "both") {
    return [
      audienceCards.beginners,
      audienceCards.advanced,
    ];
  }

  if (audience === "advanced") {
    return [audienceCards.advanced];
  }

  return [audienceCards.beginners];
}

export function AudienceSection({
  targetAudience,
}: AudienceSectionProps) {
  const audience = normalizeTargetAudience(targetAudience);
  const cards = getVisibleAudiences(audience);

  return (
    <section id="audience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.centeredHeading}>
          <h2>За кого е този курс?</h2>
        </div>
        <div
          className={
            cards.length > 1 ? styles.audienceGrid : styles.audienceSingle
          }
        >
          {cards.map((card) => (
            <AudienceCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
