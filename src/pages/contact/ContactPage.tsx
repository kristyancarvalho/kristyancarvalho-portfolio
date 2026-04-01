import { useState } from "react";
import { Button } from "@/shared/ui";
import { profile } from "@/entities/profile";
import { useScrollReveal } from "@/shared/hooks";
import type { Translations } from "@/shared/i18n";

interface ContactPageProps {
  t: Translations;
}

type FormState = "idle" | "sending" | "sent" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

function GlowOrb({ style }: { style: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

function InputField({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
  disabled,
  multiline,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const baseStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "var(--font-mono)",
    fontSize: "0.82rem",
    color: "var(--color-text)",
    backgroundColor: "var(--color-surface)",
    border: `1px solid ${focused ? "var(--color-accent)" : "var(--color-border)"}`,
    borderRadius: "var(--radius-lg)",
    padding: "0.75rem 1rem",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    boxShadow: focused ? "0 0 0 3px var(--color-accent-dim)" : "none",
    resize: "none",
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: focused ? "var(--color-accent)" : "var(--color-muted)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          transition: "color 0.15s ease",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          disabled={disabled}
          rows={5}
          style={baseStyle}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          disabled={disabled}
          style={baseStyle}
        />
      )}
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        color: "var(--color-muted)",
        textDecoration: "none",
        padding: "0.5rem 0.875rem",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--color-surface)",
        transition: "color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--color-accent)";
        el.style.borderColor = "var(--color-accent)";
        el.style.boxShadow = "0 0 12px var(--color-accent-dim)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = "var(--color-muted)";
        el.style.borderColor = "var(--color-border)";
        el.style.boxShadow = "none";
      }}
    >
      {label}
    </a>
  );
}

async function sendEmail(data: FormData): Promise<void> {
  const emailjs = await import("@emailjs/browser");
  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
    {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
  );
}

export function ContactPage({ t }: ContactPageProps) {
  const titleRef = useScrollReveal();
  const formRef = useScrollReveal();
  const linksRef = useScrollReveal();

  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setState("sending");
    try {
      await sendEmail(form);
      setState("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setState("error");
    }
  }

  const isBusy = state === "sending";

  return (
    <div
      style={{
        marginTop: "3.25rem",
        paddingTop: "4rem",
        paddingBottom: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlowOrb
        style={{
          width: "400px",
          height: "400px",
          top: "-80px",
          right: "-100px",
          opacity: 0.3,
        }}
      />
      <GlowOrb
        style={{
          width: "250px",
          height: "250px",
          bottom: "10%",
          left: "-80px",
          opacity: 0.15,
          background: "radial-gradient(circle, var(--color-accent2-dim) 0%, transparent 70%)",
        }}
      />

      <div className="wrap-sm">
        <div ref={titleRef} className="page-section" style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            {t.contact.label}
          </p>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              marginBottom: "0.75rem",
            }}
          >
            {t.contact.title}
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              maxWidth: "30rem",
            }}
          >
            {t.contact.subtitle}
          </p>
        </div>

        <div
          ref={formRef}
          className="page-section card-glow"
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-2xl)",
            padding: "2rem",
            backgroundColor: "var(--color-surface)",
            marginBottom: "2rem",
          }}
        >
          {state === "sent" ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "2rem",
                  display: "block",
                  animation: "fadeIn 0.3s ease forwards",
                }}
              >
                ✦
              </span>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.875rem",
                  color: "var(--color-accent)",
                  fontWeight: 500,
                }}
              >
                {t.contact.successTitle}
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--color-muted)" }}>
                {t.contact.successMessage}
              </p>
              <button
                onClick={() => setState("idle")}
                style={{
                  marginTop: "0.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                {t.contact.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <InputField
                id="contact-name"
                label={t.contact.name}
                value={form.name}
                onChange={v => setForm(f => ({ ...f, name: v }))}
                required
                disabled={isBusy}
              />
              <InputField
                id="contact-email"
                label={t.contact.email}
                type="email"
                value={form.email}
                onChange={v => setForm(f => ({ ...f, email: v }))}
                required
                disabled={isBusy}
              />
              <InputField
                id="contact-message"
                label={t.contact.message}
                value={form.message}
                onChange={v => setForm(f => ({ ...f, message: v }))}
                required
                disabled={isBusy}
                multiline
              />

              {state === "error" && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "oklch(0.65 0.2 25)",
                    padding: "0.6rem 0.875rem",
                    border: "1px solid oklch(0.65 0.2 25 / 0.3)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "oklch(0.65 0.2 25 / 0.06)",
                  }}
                >
                  {t.contact.error}
                </p>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="glow"
                  size="md"
                  disabled={isBusy || !form.name || !form.email || !form.message}
                >
                  {isBusy ? t.contact.sending : t.contact.send}
                </Button>
              </div>
            </form>
          )}
        </div>

        <div ref={linksRef} className="page-section" style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-muted)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {t.contact.orReach}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            <SocialLink href={profile.github} label="github" />
            <SocialLink href={profile.linkedin} label="linkedin" />
            <SocialLink href={profile.instagram} label="instagram" />
            <SocialLink href={profile.whatsapp} label="whatsapp" />
          </div>
        </div>
      </div>
    </div>
  );
}