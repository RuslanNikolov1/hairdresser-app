import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarCheck, Scissors } from "lucide-react";

import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";

import type { SignupContacts } from "@/lib/signup/contacts";

import { AudienceSection } from "./AudienceSection";
import { ExpertSection } from "./ExpertSection";
import { SignUpSection } from "./SignUpSection";
import { SanityImage } from "./SanityImage";
import styles from "./ModulePage.module.scss";
import type { ModulePageData } from "./types";

type ModulePageProps = {
  module: ModulePageData;
  signupContacts: SignupContacts;
};

const formatLabels: Record<NonNullable<ModulePageData["format"]>, string> = {
  group: "Групово",
  individual: "Индивидуално",
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
  const formatLabel = module.format ? formatLabels[module.format] : "";
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
    <>
      <header className={styles.nav}>
        <Link href="/" className={styles.brand} aria-label="Aura & Bloom home">
          Aura & Bloom
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
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <SanityImage
              image={module.backgroundImage}
              fallbackAlt={module.title}
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.heroOverlay} />
          <div className={styles.container}>
            <div className={styles.heroContent}>
              {formatClassLabel ? (
                <span className={styles.heroFormatBadge}>{formatClassLabel}</span>
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
          </div>
        </section>

        <Divider />

        <AudienceSection targetAudience={module.targetAudience} />

        <Divider soft />

        <section id="learning" className={`${styles.section} ${styles.soft}`}>
          <div className={styles.container}>
            <div className={styles.centeredHeading}>
              <h2>Какво ще научиш?</h2>
            </div>
            <div className={styles.learningGrid}>
              <article className={styles.learningCard}>
                <div className={styles.cardTitle}>
                  <span className={styles.iconSquare} aria-hidden="true">
                    <BookOpen strokeWidth={1.75} />
                  </span>
                  <h3>Теория</h3>
                </div>
                <PortableTextRenderer value={module.theory} />
              </article>
              <article className={styles.learningCard}>
                <div className={styles.cardTitle}>
                  <span className={styles.iconSquare} aria-hidden="true">
                    <Scissors strokeWidth={1.75} />
                  </span>
                  <h3>Практика</h3>
                </div>
                <PortableTextRenderer value={module.practice} />
              </article>
            </div>
          </div>
        </section>

        <section id="certificate" className={styles.section}>
          <div className={`${styles.container} ${styles.certificateGrid}`}>
            <div>
              <h2>Официално признание за вашите умения</h2>
              <p className={styles.lead}>
                След успешно завършване ще получите сертификат, който показва
                придобитите знания и практическа подготовка.
              </p>
              <div className={styles.badge}>Международно признат сертификат</div>
            </div>
            <div className={styles.certificateImage}>
              <SanityImage
                image={module.certificateImage}
                fallbackAlt={`Сертификат за ${module.title}`}
                sizes="(min-width: 900px) 42vw, 90vw"
              />
            </div>
          </div>
        </section>

        <Divider />

        <section id="studio" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.studioHeading}>
              <h2>Пространство за Творчество</h2>
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
                alt="Интериор на студиото Aura & Bloom"
                width={1200}
                height={675}
                className={styles.studioImage}
                sizes="(min-width: 900px) 90vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section id="details" className={`${styles.section} ${styles.soft}`}>
          <div className={`${styles.container} ${styles.detailsGrid}`}>
            <div>
              <h2>Детайли на курса</h2>
              <p className={styles.lead}>
                Инвестирайте в своето развитие с програма, създадена за реална
                практика и увереност в салонна среда.
              </p>
              <div className={styles.detailCards}>
                <DetailCard label="Старт" value={formatDate(module.startAt)} />
                <DetailCard
                  label="Час"
                  value={formatTime(module.startAt) || "По график"}
                />
                <DetailCard
                  label="Продължителност"
                  value={`${module.durationMinutes || 0} минути`}
                />
                <DetailCard label="Място" value={module.location || ""} />
                <DetailCard label="Формат" value={formatLabel} />
                <DetailCard label="Цена" value={`${module.price || 0} евро`} />
              </div>
            </div>
            <aside className={styles.bookingCard}>
              <span className={styles.bookingIcon} aria-hidden="true">
                <CalendarCheck strokeWidth={1.75} />
              </span>
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
          <section id="gallery" className={styles.section}>
            <div className={styles.container}>
              <div className={styles.centeredHeading}>
                <h2>Галерия</h2>
                <span className={styles.galleryRule} aria-hidden="true" />
              </div>

              {processImages.length > 0 && (
                <div className={styles.galleryBlock}>
                  <h3 className={styles.gallerySubheading}>Процес</h3>
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
                            sizes="(min-width: 900px) 40vw, 90vw"
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
          <p className={styles.brand}>Aura & Bloom</p>
          <p>© 2026 Aura & Bloom Hairdressing Academy.</p>
        </div>
      </footer>
    </>
  );
}

function Divider({ soft = false }: { soft?: boolean }) {
  return (
    <div className={`${styles.divider} ${soft ? styles.dividerSoft : ""}`}>
      <span />
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <article className={styles.detailCard}>
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}
