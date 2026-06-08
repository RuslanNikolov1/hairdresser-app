import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ElementType } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  University,
  Users,
} from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/module-page/SocialIcons";
import { SanityImage } from "@/components/module-page/SanityImage";
import type { SanityImageValue } from "@/components/module-page/types";
import type { SignupContacts } from "@/lib/signup/contacts";
import {
  STUDIO_ADDRESS,
  STUDIO_ADDRESS_FULL,
  STUDIO_ADDRESS_MAPS_URL,
} from "@/lib/site/address";
import { getAudienceLabel } from "@/lib/site/audience";
import { HOME_HERO_LEAD, HOME_TITLE } from "@/lib/site/metadata";

import {
  galleryBeforeAfter,
  galleryHair,
  galleryHairImages,
  galleryProcess,
  galleryProcessImages,
  galleryStudioImages,
  galleryVideoEmbeds,
  homeContactIntro,
  homeModulesIntro,
  instructor,
  learningFormats,
  learningHighlights,
  learningLevels,
  testimonials,
} from "./content";
import styles from "./HomePage.module.scss";

export type HomePageModule = {
  _id: string;
  title?: string;
  slug?: string;
  targetAudience?: string;
  startAt?: string;
  price?: number;
  backgroundImage?: SanityImageValue;
};

type HomePageProps = {
  modules: HomePageModule[];
  contacts: SignupContacts;
};

type IconComponent = ElementType<{ strokeWidth?: number; "aria-hidden"?: boolean }>;

const highlightIcons: IconComponent[] = [BookOpen, Scissors, Award];

function formatDate(value?: string) {
  if (!value) {
    return "Очаквайте скоро";
  }

  return new Intl.DateTimeFormat("bg-BG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatPrice(value?: number) {
  if (typeof value !== "number") {
    return "Цена при запитване";
  }

  return `${value} евро`;
}

const navItems = [
  { href: "#learning", label: "Обучение" },
  { href: "#modules", label: "Модули" },
  { href: "#gallery", label: "Галерия" },
  { href: "#mentor", label: "Инструктор" },
  { href: "#contacts", label: "Контакти" },
] as const;

export function HomePage({ modules, contacts }: HomePageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.brand} aria-label="DR & D начало">
            DR & D
          </Link>
          <nav className={styles.navLinks} aria-label="Основна навигация">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className={styles.navCta} href="#contacts">
            Свържи се
          </a>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="home-hero-title">
          <div className={styles.heroCopy}>
            <h1 id="home-hero-title">{HOME_TITLE}</h1>
            <p>{HOME_HERO_LEAD}</p>
            <div className={styles.heroLinks}>
              <a href="#modules">Виж модулите</a>
              <a href="#contacts">Свържи се</a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="/tale-1-hd.jpg"
              alt="DR & D студио"
              fill
              priority
              className={styles.heroImage}
              sizes="(min-width: 960px) 50vw, 100vw"
            />
          </div>
        </section>

        <section
          id="learning"
          className={styles.learningSection}
          aria-labelledby="learning-title"
        >
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Формати</p>
            <h2 id="learning-title">
              Обучение за фризьори според нивото и ритъма ти
            </h2>
          </div>
          <div className={styles.modeGrid}>
            {learningFormats.map((mode) => (
              <article key={mode.title} className={styles.modeCard}>
                <h3>{mode.title}</h3>
                <p>{mode.text}</p>
              </article>
            ))}
          </div>
          <div className={styles.levelGrid}>
            {learningLevels.map((level) => {
              const Icon = level.id === "beginners" ? University : Sparkles;
              const levelClassName =
                level.id === "beginners"
                  ? styles.levelCardBeginners
                  : styles.levelCardAdvanced;

              return (
                <article
                  key={level.id}
                  className={`${styles.levelCard} ${levelClassName}`}
                >
                  <span className={styles.levelIcon} aria-hidden="true">
                    <Icon strokeWidth={1.75} />
                  </span>
                  <div className={styles.levelBody}>
                    <p className={styles.levelEyebrow}>{level.eyebrow}</p>
                    <h3>{level.title}</h3>
                    <p>{level.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className={styles.highlightGrid}>
            {learningHighlights.map((highlight, index) => {
              const Icon = highlightIcons[index] || Sparkles;

              return (
                <article key={highlight.title} className={styles.highlightCard}>
                  <span className={styles.highlightIcon} aria-hidden="true">
                    <Icon strokeWidth={1.65} />
                  </span>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="modules"
          className={styles.moduleSection}
          aria-labelledby="modules-title"
        >
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Каталог</p>
            <h2 id="modules-title">Курсове и модули за фризьори</h2>
            <p>{homeModulesIntro}</p>
          </div>

          {modules.length > 0 ? (
            <div className={styles.moduleGrid}>
              {modules.map((module, index) => (
                <ModuleCard key={module._id || module.slug || index} module={module} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyModules}>
              <p>В момента няма публикувани модули.</p>
              <a href={contacts.phoneHref}>Обадете се за предстоящи дати</a>
            </div>
          )}
        </section>

        <section className={styles.certificateSection} aria-labelledby="certificate-title">
          <div className={styles.certificateCopy}>
            <p className={styles.sectionLabel}>Удостоверение</p>
            <h2 id="certificate-title">Документ за преминато обучение</h2>
            <p>
              След завършване получаваш удостоверение за обучение. То служи като
              знак за преминат модул, усвоена тема и практическа работа в студио.
            </p>
          </div>
          <div className={styles.certificatePreview} aria-label="Примерен сертификат">
            <span>DR & D</span>
            <strong>Удостоверение за обучение</strong>
            <p>Име на курсист · Модул · Дата</p>
          </div>
        </section>

        <section id="gallery" className={styles.gallerySection} aria-labelledby="gallery-title">
          <div className={styles.sectionHeader}>
            <h2 id="gallery-title">Галерия</h2>
          </div>
          <div className={styles.galleryLayout}>
            <div className={styles.galleryProcessBlock}>
              <div className={styles.galleryProcessHeading}>
                <h3>{galleryProcess.title}</h3>
              </div>
              <div className={styles.galleryProcessGrid}>
                {galleryProcessImages.map((image) => (
                  <div key={image.src} className={styles.galleryLandscapeItem}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.galleryLandscapeImage}
                      sizes="(min-width: 641px) 45vw, 90vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.galleryProcessBlock}>
              <div className={styles.galleryProcessHeading}>
                <h3>{galleryHair.title}</h3>
              </div>
              <div className={styles.galleryProcessGrid}>
                {galleryHairImages.map((image) => (
                  <div key={image.src} className={styles.galleryLandscapeItem}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.galleryLandscapeImage}
                      sizes="(min-width: 641px) 45vw, 90vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.galleryBeforeAfterBlock}>
              <h3 className={styles.gallerySubheading}>
                Трансформации
                <br />
                Преди &amp; След
              </h3>
              <div className={styles.beforeAfterGrid}>
                {galleryBeforeAfter.map((item, index) => (
                  <figure key={item.badge} className={styles.beforeAfterCard}>
                    <div className={styles.beforeAfterMedia}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className={styles.beforeAfterImage}
                        sizes="(min-width: 641px) 45vw, 90vw"
                      />
                      <span
                        className={
                          index === 0 ? styles.beforeBadge : styles.afterBadge
                        }
                      >
                        {item.badge}
                      </span>
                    </div>
                  </figure>
                ))}
                <div className={styles.beforeAfterDivider} aria-hidden="true">
                  <svg
                    className={styles.beforeAfterWave}
                    viewBox="0 0 28 320"
                    preserveAspectRatio="none"
                  >
                    <path d="M14 0 Q26 8 14 16 Q2 24 14 32 Q26 40 14 48 Q2 56 14 64 Q26 72 14 80 Q2 88 14 96 Q26 104 14 112 Q2 120 14 128 Q26 136 14 144 Q2 152 14 160 Q26 168 14 176 Q2 184 14 192 Q26 200 14 208 Q2 216 14 224 Q26 232 14 240 Q2 248 14 256 Q26 264 14 272 Q2 280 14 288 Q26 296 14 304 Q2 312 14 320" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.galleryVideoRow}>
            {galleryVideoEmbeds.map((video) => (
              <div
                key={video.src}
                className={styles.galleryVideoEmbed}
                style={
                  {
                    "--video-width": video.width,
                    "--video-height": video.height,
                  } as CSSProperties
                }
              >
                <iframe
                  src={video.src}
                  title={video.title}
                  width={video.width}
                  height={video.height}
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </div>

          <div className={styles.galleryProcessBlock}>
            <div className={styles.galleryProcessHeading}>
              <h3>Студио</h3>
            </div>
            <article className={`${styles.galleryCard} ${styles.galleryCardWide}`}>
              <div className={styles.galleryLandscapeGrid}>
                {galleryStudioImages.map((image) => (
                  <div key={image.src} className={styles.galleryLandscapeItem}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.galleryLandscapeImage}
                      sizes="(min-width: 641px) 50vw, 90vw"
                    />
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="mentor" className={styles.mentorSection} aria-labelledby="mentor-title">
          <div className={styles.mentorPortrait}>
            <Image
              src={instructor.image}
              alt={instructor.name}
              width={instructor.imageWidth}
              height={instructor.imageHeight}
              className={styles.mentorImage}
              sizes="(min-width: 900px) 38vw, 90vw"
            />
          </div>
          <div className={styles.mentorCopy}>
            <p className={styles.sectionLabel}>{instructor.role}</p>
            <h2 id="mentor-title">{instructor.name}</h2>
            <p>{instructor.bio}</p>
            <blockquote>&ldquo;{instructor.quote}&rdquo;</blockquote>
          </div>
        </section>

        <section className={styles.reviewSection} aria-labelledby="reviews-title">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Отзиви</p>
            <h2 id="reviews-title">Какво споделят курсистите</h2>
          </div>
          <div className={styles.reviewGrid}>
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className={styles.reviewCard}>
                <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <figcaption>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contacts" className={styles.contactSection} aria-labelledby="contacts-title">
          <div className={styles.contactCopy}>
            <p className={styles.sectionLabel}>Контакти</p>
            <h2 id="contacts-title">Попитай за подходящ курс</h2>
            <p>{homeContactIntro}</p>
          </div>
          <address className={styles.contactCard}>
            <ContactLink
              icon={Phone}
              label="Телефон"
              href={contacts.phoneHref}
              value={contacts.phone}
            />
            <ContactLink
              icon={Mail}
              label="Имейл"
              href={contacts.emailHref}
              value={contacts.email}
            />
            <ContactLink
              icon={MapPin}
              label="Адрес"
              href={STUDIO_ADDRESS_MAPS_URL}
              value={STUDIO_ADDRESS}
              external
            />
            <ContactLink
              icon={FacebookIcon}
              label="Facebook"
              href={contacts.facebook}
              value={contacts.facebookLabel}
              external
            />
            <ContactLink
              icon={InstagramIcon}
              label="Instagram"
              href={contacts.instagram}
              value={contacts.instagramLabel}
              external
            />
          </address>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerBrand}>DR & D</p>
        <p>Модулно обучение за фризьори · {STUDIO_ADDRESS_FULL} · 2026</p>
      </footer>
    </div>
  );
}

function ModuleCard({ module }: { module: HomePageModule }) {
  const title = module.title || "Модул без заглавие";
  const href = module.slug ? `/modules/${module.slug}` : "#contacts";

  return (
    <article className={styles.moduleCard}>
      <Link href={href} className={styles.moduleMedia} aria-label={`Виж ${title}`}>
        {module.backgroundImage?.asset ? (
          <SanityImage
            fill
            image={module.backgroundImage}
            fallbackAlt={title}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          />
        ) : (
          <div className={styles.modulePlaceholder} aria-hidden="true">
            <GraduationCap strokeWidth={1.4} />
          </div>
        )}
      </Link>
      <div className={styles.moduleBody}>
        <p className={styles.moduleAudience}>
          <Users strokeWidth={1.7} aria-hidden="true" />
          {getAudienceLabel(module.targetAudience)}
        </p>
        <h3>
          <Link href={href}>{title}</Link>
        </h3>
        <dl className={styles.moduleMeta}>
          <div>
            <dt>
              <Calendar strokeWidth={1.6} aria-hidden="true" />
              Старт
            </dt>
            <dd>{formatDate(module.startAt)}</dd>
          </div>
          <div>
            <dt>Цена</dt>
            <dd>{formatPrice(module.price)}</dd>
          </div>
        </dl>
        <Link href={href} className={styles.moduleLink}>
          Детайли за модула
        </Link>
      </div>
    </article>
  );
}

function ContactLink({
  icon: Icon,
  label,
  href,
  value,
  external = false,
}: {
  icon: IconComponent;
  label: string;
  href: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      className={styles.contactItem}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.contactIcon} aria-hidden="true">
        <Icon strokeWidth={1.75} />
      </span>
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
    </a>
  );
}
