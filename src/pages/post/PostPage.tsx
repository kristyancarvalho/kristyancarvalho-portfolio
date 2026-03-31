import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost, incrementViews } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import type { Post } from "@/shared/types";
import type { Translations } from "@/shared/i18n";

const VIEWED_KEY = "viewed_posts";

function wasViewed(id: string): boolean {
  const raw = localStorage.getItem(VIEWED_KEY);
  if (!raw) return false;
  return (JSON.parse(raw) as string[]).includes(id);
}

function markViewed(id: string): void {
  const raw = localStorage.getItem(VIEWED_KEY);
  const list: string[] = raw ? (JSON.parse(raw) as string[]) : [];
  if (!list.includes(id)) localStorage.setItem(VIEWED_KEY, JSON.stringify([...list, id]));
}

interface PostPageProps {
  t: Translations;
}

export function PostPage({ t }: PostPageProps) {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      const data = await getPost(id!);
      if (cancelled) return;
      if (data) {
        if (!wasViewed(id!)) {
          await incrementViews(id!);
          markViewed(id!);
          data.views += 1;
        }
        setPost(data);
      }
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [id]);

  return (
    <div style={{ marginTop: "3.5rem", paddingTop: "4.5rem", paddingBottom: "6rem" }}>
      <div className="wrap-sm">
        <Link
          to="/posts"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--color-muted)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            marginBottom: "3rem",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-primary)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-muted)")}
        >
          ← {t.posts.title}
        </Link>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Skeleton style={{ width: "100%", aspectRatio: "16/9", borderRadius: "var(--radius-xl)" }} />
            <Skeleton style={{ height: "2.25rem", width: "80%" }} />
            <Skeleton style={{ height: "1rem", width: "100%" }} />
            <Skeleton style={{ height: "1rem", width: "70%" }} />
          </div>
        ) : post ? (
          <article className="animate-fade-up">
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                marginBottom: "2.5rem",
                border: "1px solid var(--color-border)",
              }}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, var(--color-bg) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-muted)",
                }}
              >
                {new Intl.DateTimeFormat("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(post.createdAt)}
              </span>
              <span
                aria-hidden="true"
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-border)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-muted)",
                }}
              >
                {post.views} {t.posts.views}
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--color-text)",
                marginBottom: "0.875rem",
                lineHeight: 1.15,
              }}
            >
              {post.title}
            </h1>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--color-muted)",
                lineHeight: 1.75,
                marginBottom: "2.75rem",
                paddingBottom: "2rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {post.description}
            </p>

            <div
              className="post-content"
              style={{ fontSize: "0.9rem", color: "var(--color-text)", lineHeight: 1.85 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
            }}
          >
            Post não encontrado.
          </p>
        )}
      </div>
    </div>
  );
}