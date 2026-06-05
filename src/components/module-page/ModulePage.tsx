import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Scissors,
  Timer,
} from "lucide-react";

import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";

import type { SignupContacts } from "@/lib/signup/contacts";

import { AudienceSection } from "./AudienceSection";
import { ExpertSection } from "./ExpertSection";
import { SectionHeading } from "./SectionHeading";
import { SignUpSection } from "./SignUpSection";
import { SanityImage } from "./SanityImage";
import styles from "./ModulePage.module.scss";
import type { ModulePageData } from "./types";

type ModulePageProps = {
  module: ModulePageData;
  signupContacts: SignupContacts;
};

const formatClassLabels: Record<NonNullable<ModulePageData["format"]>, string> =
  {
    group: "Групов",
    individual: "Индивидуален",
  };

function formatDate(value?: string) {
  if (!value) {
    return "Очаквайте скоро";
  }

  return new Intl.DateTimeFormat("bg-BG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value?: string) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("bg-BG", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ModulePage({ module, signupContacts }: ModulePageProps) {
  const processImages = module.processImages || [];
  const beforeAfterImages = module.beforeAfterImages || [];
  const showGallery =
    processImages.length > 0 || beforeAfterImages.length >= 2;
  const formatClassLabel = module.format
    ? formatClassLabels[module.format]
    : "";
  const navItems = [
    { href: "#learning", label: "Програма" },
    { href: "#certificate", label: "Сертификат" },
    { href: "#studio", label: "Студио" },
    { href: "#details", label: "Детайли" },
    ...(showGallery ? [{ href: "#gallery", label: "Галерия" }] : []),
    { href: "#mentor", label: "Ментор" },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.brand} aria-label="DR & D home">
            DR & D
          </Link>
          <nav className={styles.navLinks} aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className={styles.navCta} href="#signup">
            Запиши се
          </a>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                {formatClassLabel ? (
                  <span className={styles.heroFormatBadge}>
                    {formatClassLabel}
                  </span>
                ) : null}
                <h1>
                  Майсторски клас по <span>{module.title}</span>
                </h1>
                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#signup">
                    Запиши се
                  </a>
                  <a className={styles.secondaryButton} href="#learning">
                    Научи повече
                  </a>
                </div>
              </div>
              <div className={styles.heroImage}>
                <SanityImage
                  image={module.backgroundImage}
                  fallbackAlt={module.title}
                  fill
                  priority
                  className={styles.heroImageMedia}
                  sizes="(min-width: 900px) 46vw, 92vw"
                />
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <AudienceSection targetAudience={module.targetAudience} />

        <Divider soft />

        <section
          id="learning"
          className={`${styles.section} ${styles.soft} ${styles.learningSection}`}
        >
          <div className={styles.container}>
            <div className={styles.centeredHeading}>
              <SectionHeading>Какво ще научиш?</SectionHeading>
            </div>
            <div className={styles.learningStack}>
              <article className={styles.theoryPanel}>
                <header className={styles.theoryPanelHead}>
                  <span className={styles.theoryIcon} aria-hidden="true">
                    <BookOpen strokeWidth={1.75} />
                  </span>
                  <h3>Теория</h3>
                </header>
                <PortableTextRenderer value={module.theory} variant="theory" />
              </article>
              <article className={styles.practicePanel}>
                <header className={styles.practicePanelHead}>
                  <span className={styles.practiceIcon} aria-hidden="true">
                    <Scissors strokeWidth={1.75} />
                  </span>
                  <h3>Практика</h3>
                </header>
                <div className={styles.practicePanelBody}>
                  <PortableTextRenderer
                    value={module.practice}
                    variant="practice"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="certificate"
          className={`${styles.section} ${styles.certificateSection}`}
        >
          <div className={`${styles.container} ${styles.certificateGrid}`}>
            <div>
              <SectionHeading accent="line">
                Официално признание за вашите умения
              </SectionHeading>
              <p className={styles.lead}>
                След успешно завършване ще получите сертификат, който показва
                придобитите знания и практическа подготовка.
              </p>
            </div>
            <div className={styles.certificateImage}>
              <SanityImage
                image={module.certificateImage}
                fallbackAlt={`Сертификат за ${module.title}`}
                sizes="(min-width: 900px) 42vw, 90vw"
              />
              <div className={styles.badge}>Международно признат сертификат</div>
            </div>
          </div>
        </section>

        <Divider />

        <section id="studio" className={`${styles.section} ${styles.studioSection}`}>
          <div className={styles.container}>
            <div className={styles.studioHeading}>
              <SectionHeading>Пространство за Творчество</SectionHeading>
              <p>
                Нашето студио е проектирано да вдъхновява. Оборудвано с най-новата
                професионална техника и разположено в светла, минималистична
                обстановка, то предлага идеалните условия за вашето развитие като
                топ колорист.
              </p>
            </div>
            <div className={styles.studioFrame}>
              <Image
                src="/studio.jpg"
                alt="Интериор на студиото DR & D"
                width={1200}
                height={675}
                className={styles.studioImage}
                sizes="(min-width: 900px) 90vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section id="details" className={`${styles.section} ${styles.detailsSection}`}>
          <div className={`${styles.container} ${styles.detailsGrid}`}>
            <div>
              <SectionHeading accent="line">Детайли на курса</SectionHeading>
              <p className={styles.lead}>
                Инвестирайте в своето развитие с програма, създадена за реална
                практика и увереност в салонна среда.
              </p>
              <div className={styles.detailCards}>
                <DetailCard
                  label="Старт"
                  value={formatDate(module.startAt)}
                  icon={Calendar}
                />
                <DetailCard
                  label="Час"
                  value={formatTime(module.startAt) || "По график"}
                  icon={Clock}
                />
                <DetailCard
                  label="Продължителност"
                  value={`${module.durationMinutes || 0} минути`}
                  icon={Timer}
                />
                <DetailCard
                  label="Място"
                  value={module.location || ""}
                  icon={MapPin}
                />
              </div>
            </div>
            <aside className={styles.bookingCard}>
              <p className={styles.bookingPrice}>
                <span>Цена</span>
                <strong>{`${module.price || 0} евро`}</strong>
              </p>
              <h3>Ограничени места</h3>
              <p>
                Групите са малки, за да има персонално внимание към всеки
                участник.
              </p>
              <a className={styles.primaryButton} href="#signup">
                Запиши своето място
              </a>
            </aside>
          </div>
        </section>

        {showGallery && (
          <section id="gallery" className={`${styles.section} ${styles.gallerySection}`}>
            <div className={styles.container}>
              <div className={styles.centeredHeading}>
                <SectionHeading>Галерия</SectionHeading>
              </div>

              {processImages.length > 0 && (
                <div className={styles.galleryBlock}>
                  <div className={styles.galleryGrid}>
                    {processImages.map((image, index) => (
                      <div
                        key={image._key || image.asset?._id || index}
                        className={styles.galleryGridItem}
                      >
                        <div className={styles.galleryGridMedia}>
                          <SanityImage
                            fill
                            image={image}
                            fallbackAlt={`Процес ${module.title}`}
                            sizes="(min-width: 900px) 28vw, (min-width: 520px) 45vw, 90vw"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {beforeAfterImages.length >= 2 && (
                <div className={styles.galleryBlock}>
                  <h3 className={styles.gallerySubheading}>
                    Трансформации Преди &amp; След
                  </h3>
                  <div className={styles.beforeAfterGrid}>
                    <figure className={styles.beforeAfterCard}>
                      <div className={styles.beforeAfterMedia}>
                        <SanityImage
                          fill
                          image={beforeAfterImages[0]}
                          fallbackAlt={`Преди ${module.title}`}
                          sizes="(min-width: 900px) 45vw, 90vw"
                        />
                        <span className={styles.beforeBadge}>Преди</span>
                      </div>
                    </figure>
                    <div className={styles.beforeAfterDivider} aria-hidden="true">
                      <svg
                        className={styles.beforeAfterWave}
                        viewBox="0 0 28 320"
                        preserveAspectRatio="none"
                      >
                        <path d="M14 0 Q26 8 14 16 Q2 24 14 32 Q26 40 14 48 Q2 56 14 64 Q26 72 14 80 Q2 88 14 96 Q26 104 14 112 Q2 120 14 128 Q26 136 14 144 Q2 152 14 160 Q26 168 14 176 Q2 184 14 192 Q26 200 14 208 Q2 216 14 224 Q26 232 14 240 Q2 248 14 256 Q26 264 14 272 Q2 280 14 288 Q26 296 14 304 Q2 312 14 320" />
                      </svg>
                    </div>
                    <figure className={styles.beforeAfterCard}>
                      <div className={styles.beforeAfterMedia}>
                        <SanityImage
                          fill
                          image={beforeAfterImages[1]}
                          fallbackAlt={`След ${module.title}`}
                          sizes="(min-width: 900px) 45vw, 90vw"
                        />
                        <span className={styles.afterBadge}>След</span>
                      </div>
                    </figure>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <ExpertSection />

        <SignUpSection
          moduleSlug={module.slug}
          moduleTitle={module.title}
          contacts={signupContacts}
        />
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.brand}>DR & D</p>
          <p>© 2026 DR & D Hairdressing Academy.</p>
        </div>
      </footer>
    </div>
  );
}

function Divider({ soft = false }: { soft?: boolean }) {
  return (
    <div className={`${styles.divider} ${soft ? styles.dividerSoft : ""}`}>
      <span />
    </div>
  );
}

function DetailCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <article className={styles.detailCard}>
      <p className={styles.detailCardLabel}>
        <span className={styles.detailCardIcon} aria-hidden="true">
          <Icon strokeWidth={1.75} />
        </span>
        {label}
      </p>
      <strong>{value}</strong>
    </article>
  );
}
