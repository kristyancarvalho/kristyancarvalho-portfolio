import { Link } from "react-router-dom";
import { Button } from "@/shared/ui";
import { profile } from "@/entities/profile";
import type { Translations } from "@/shared/i18n";

interface HomePageProps {
  t: Translations;
}

export function HomePage({ t }: HomePageProps) {
  return (
    <div
      style={{
        minHeight: "calc(100svh - 3rem)",
        marginTop: "3rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="wrap"
        style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
      >
        <p
          className="font-mono text-xs text-[var(--color-muted)]"
          style={{ marginBottom: "1rem" }}
        >
          {t.home.greeting}
        </p>
        <h1
          className="font-mono font-bold text-[var(--color-text)]"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.75rem)",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          <span className="text-[var(--color-accent)]">_</span>
          {t.home.role}
        </h1>
        <p
          className="font-mono text-sm text-[var(--color-muted)] leading-relaxed"
          style={{ maxWidth: "36rem", marginBottom: "2.5rem" }}
        >
          {t.home.bio}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <a href={profile.cvUrl} download>
            <Button size="md">{t.home.downloadCv}</Button>
          </a>
          <Link to="/projetos">
            <Button variant="outline" size="md">
              {t.home.viewProjects}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
