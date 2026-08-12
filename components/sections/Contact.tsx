"use client";

import { FormEvent, ReactNode, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { IconCalendar, IconInstagram, IconLinkedin, IconTikTok } from "@/components/icons";
import { BOOK_A_CALL_URL, CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/nav";
import { cn } from "@/lib/cn";

const budgetOptions = [
  "Under $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = { name: "", email: "", company: "", budget: "", message: "" };
const fieldOrder: (keyof FormState)[] = ["name", "email", "company", "budget", "message"];

const socialIcon = {
  instagram: IconInstagram,
  tiktok: IconTikTok,
  linkedin: IconLinkedin,
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) {
    errors.email = "Please add an email so we can reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "That email doesn't look quite right.";
  }
  if (!values.message.trim()) errors.message = "Tell us a bit about the project.";
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleBlur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate({ ...values }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, company: true, budget: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      const firstErrorKey = fieldOrder.find((key) => nextErrors[key]);
      if (firstErrorKey) document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      setValues(initialState);
      setTouched({});
    } catch (err) {
      // Never show a false success — a swallowed enquiry is a lost client.
      // The error state offers a mailto fallback so the message still lands.
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  }

  /** Prefilled mailto used as the fallback when the API call fails. */
  const mailtoFallback = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `New enquiry — ${values.name}${values.company ? ` (${values.company})` : ""}`,
  )}&body=${encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\nBrand or company: ${values.company || "—"}\nBudget: ${values.budget || "—"}\n\n${values.message}`,
  )}`;

  return (
    <Section id="contact" tone="paper" folio="10">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow text-forest">Contact</p>
            </Reveal>
            <MaskReveal as="h2" delay={0.05} className="text-display-lg text-ink mt-4 font-serif italic">
              Let&rsquo;s Climb.
            </MaskReveal>
            <Reveal delay={0.1}>
              <p className="text-ink/70 mt-6 max-w-sm text-lg leading-relaxed">
                Tell us where your brand is standing right now. We&rsquo;ll tell you what the
                climb looks like.
              </p>

              <a
                href={BOOK_A_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow btn-wipe border-forest text-forest hover:text-paper mt-8 inline-flex min-h-11 items-center gap-3 rounded-full border px-6 py-3 transition-colors"
              >
                <IconCalendar className="size-4" />
                Book a call
            </a>

            <ul className="mt-10 flex items-center gap-4" aria-label="Social links">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcon[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={`${social.label} (opens in a new tab)`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-ink/15 text-ink/70 hover:border-forest hover:text-forest grid size-11 place-items-center rounded-full border transition-colors"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {status === "success" ? (
              <div
                role="status"
                className="border-forest/30 bg-forest/5 text-ink rounded-sm border p-8"
              >
                <p className="text-forest font-serif text-2xl italic">Message received.</p>
                <p className="text-ink/70 mt-3">
                  Thank you for reaching out — we&rsquo;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {status === "error" && (
                  <div
                    role="alert"
                    className="rounded-sm border border-red-700/30 bg-red-700/5 p-6"
                  >
                    <p className="text-ink font-medium">That didn&rsquo;t go through.</p>
                    <p className="text-ink/70 mt-2 text-sm">
                      Something went wrong on our end — your message wasn&rsquo;t sent. Email it
                      over directly and it&rsquo;ll reach us straight away.
                    </p>
                    <a
                      href={mailtoFallback}
                      className="eyebrow text-forest link-draw mt-4 inline-block"
                    >
                      Email {CONTACT_EMAIL}
                    </a>
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="name" label="Name" error={touched.name ? errors.name : undefined}>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      aria-invalid={Boolean(touched.name && errors.name)}
                      className={inputClass(touched.name && errors.name)}
                    />
                  </Field>

                  <Field id="email" label="Email" error={touched.email ? errors.email : undefined}>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      aria-invalid={Boolean(touched.email && errors.email)}
                      className={inputClass(touched.email && errors.email)}
                    />
                  </Field>
                </div>

                <Field id="company" label="Brand or company" required={false}>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className={inputClass(false)}
                  />
                </Field>

                <Field id="budget" label="Project budget" required={false}>
                  <select
                    id="budget"
                    value={values.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    className={inputClass(false)}
                  >
                    <option value="">Select a range</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="message"
                  label="Message"
                  error={touched.message ? errors.message : undefined}
                >
                  <textarea
                    id="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    aria-invalid={Boolean(touched.message && errors.message)}
                    className={inputClass(touched.message && errors.message)}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="eyebrow bg-forest text-paper hover:bg-forest-dim inline-flex min-h-11 items-center justify-center rounded-full px-8 py-3.5 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send it up"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function inputClass(hasError: boolean | string | undefined) {
  return cn(
    "min-h-11 w-full rounded-sm border bg-paper px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-forest",
    hasError ? "border-red-700" : "border-ink/20",
  );
}

function Field({
  id,
  label,
  error,
  required = true,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-ink/60 block">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
