import { Link } from "react-router-dom";
import type { Translations } from "@/shared/i18n";

interface NotFoundPageProps {
  t: Translations;
}

export function NotFoundPage({ t }: NotFoundPageProps) {
  return (
    <div
      style={{
        minHeight: "calc(100svh - 3rem)",
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 1.5rem",
      }}
    >
      <p
        className="font-mono font-bold text-[var(--color-accent)]"
        style={{ fontSize: "4rem", marginBottom: "1rem" }}
      >
        {t.notFound.code}
      </p>
      <p
        className="font-mono text-sm text-[var(--color-muted)]"
        style={{ marginBottom: "2rem" }}
      >
        {t.notFound.message}
      </p>
      <Link
        to="/"
        className="font-mono text-xs text-[var(--color-accent)] hover:underline transition-colors"
      >
        ← {t.notFound.back}
      </Link>
    </div>
  );
}
