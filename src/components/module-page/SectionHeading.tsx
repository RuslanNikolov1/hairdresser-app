import type { ReactNode } from "react";

import styles from "./SectionHeading.module.scss";

const WAVE_PATH =
  "M0 8 Q8 2 16 8 Q24 14 32 8 Q40 2 48 8 Q56 14 64 8 Q72 2 80 8 Q88 14 96 8 Q104 2 112 8 Q120 14 128 8 Q136 2 144 8 Q152 14 160 8 Q168 2 176 8 Q184 14 192 8 Q200 2 208 8 Q216 14 224 8 Q232 2 240 8 Q248 14 256 8 Q264 2 272 8 Q280 14 288 8 Q296 2 304 8 Q312 14 320 8";

type SectionHeadingProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  titleClassName?: string;
  /** Decorative underline; off for mentor name only. */
  showWave?: boolean;
  /** Wave on most sections; straight line on certificate. */
  accent?: "wave" | "line";
};

export function SectionHeading({
  children,
  id,
  className,
  titleClassName,
  showWave = true,
  accent = "wave",
}: SectionHeadingProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <h2 id={id} className={titleClassName}>
        {children}
      </h2>
      {showWave ? (
        accent === "line" ? (
          <div
            className={[styles.accent, styles.accentLine].join(" ")}
            aria-hidden="true"
          />
        ) : (
          <div
            className={[styles.accent, styles.accentWave].join(" ")}
            aria-hidden="true"
          >
            <svg viewBox="0 0 320 16" preserveAspectRatio="none">
              <path d={WAVE_PATH} />
            </svg>
          </div>
        )
      ) : null}
    </div>
  );
}
