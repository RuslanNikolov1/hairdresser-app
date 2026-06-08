import { Mail, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { SectionHeading } from "./SectionHeading";

import type { SignupContacts } from "@/lib/signup/contacts";
import styles from "./SignUpSection.module.scss";

type SignUpSectionProps = {
  contacts: SignupContacts;
  surfaceClassName?: string;
};

export function SignUpSection({
  contacts,
  surfaceClassName,
}: SignUpSectionProps) {
  return (
    <section
      id="signup"
      className={[styles.section, surfaceClassName].filter(Boolean).join(" ")}
      aria-labelledby="signup-heading"
    >
      <div className={styles.container}>
        <SectionHeading id="signup-heading" titleClassName={styles.heading}>
          Запиши се
        </SectionHeading>
        <p className={styles.lead}>
          Свържете се с нас по телефон или имейл и ще потвърдим мястото ви в
          курса.
        </p>
        <aside className={styles.contactsCard} aria-label="Контакти">
          <h3 className={styles.contactsTitle}>Контакти</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <Phone strokeWidth={1.75} />
              </span>
              <div className={styles.contactBody}>
                <span>Телефон</span>
                <a href={contacts.phoneHref}>{contacts.phone}</a>
              </div>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <Mail strokeWidth={1.75} />
              </span>
              <div className={styles.contactBody}>
                <span>Имейл</span>
                <a href={contacts.emailHref}>{contacts.email}</a>
              </div>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <FacebookIcon strokeWidth={1.75} />
              </span>
              <div className={styles.contactBody}>
                <span>Facebook</span>
                <a
                  href={contacts.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contacts.facebookLabel}
                </a>
              </div>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <InstagramIcon strokeWidth={1.75} />
              </span>
              <div className={styles.contactBody}>
                <span>Instagram</span>
                <a
                  href={contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contacts.instagramLabel}
                </a>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
