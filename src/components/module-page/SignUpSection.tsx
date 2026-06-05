"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { SectionHeading } from "./SectionHeading";

import type { SignupContacts } from "@/lib/signup/contacts";
import styles from "./SignUpSection.module.scss";

type SignUpSectionProps = {
  moduleSlug: string;
  moduleTitle: string;
  contacts: SignupContacts;
  surfaceClassName?: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function SignUpSection({
  moduleSlug,
  moduleTitle,
  contacts,
  surfaceClassName,
}: SignUpSectionProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          moduleSlug,
          moduleTitle,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Заявката не беше изпратена.");
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Мрежова грешка. Опитайте отново.");
    }
  }

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
          Попълнете формата и ще се свържем с вас за потвърждение на мястото ви в
          курса.
        </p>
        <div className={styles.grid}>
          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="signup-name">Име</label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Вашето име"
                  required
                  disabled={status === "submitting"}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="signup-phone">Телефон</label>
                <input
                  id="signup-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={contacts.phone}
                  required
                  disabled={status === "submitting"}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="signup-email">Имейл</label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={contacts.email}
                  required
                  disabled={status === "submitting"}
                />
              </div>
              {status === "error" && errorMessage ? (
                <p className={styles.formError} role="alert">
                  {errorMessage}
                </p>
              ) : null}
              {status === "success" ? (
                <p className={styles.formSuccess} role="status">
                  Заявката е изпратена. Ще се свържем с вас скоро.
                </p>
              ) : null}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "submitting" || status === "success"}
              >
                {status === "submitting"
                  ? "Изпращане…"
                  : status === "success"
                    ? "Заявката е изпратена"
                    : "Изпрати заявка"}
              </button>
            </form>
          </div>

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
      </div>
    </section>
  );
}
