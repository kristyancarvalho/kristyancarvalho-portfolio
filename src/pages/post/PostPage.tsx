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
  if (!list.includes(id))
    localStorage.setItem(VIEWED_KEY, JSON.stringify([...list, id]));
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
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div style={{ marginTop: "3.25rem", paddingTop: "4rem", paddingBottom: "5rem" }}>
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
            marginBottom: "2.5rem",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-accent)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "var(--color-muted)")}
        >
          ← {t.posts.title}
        </Link>

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Skeleton style={{ width: "100%", aspectRatio: "16/9", borderRadius: "var(--radius-xl)" }} />
            <Skeleton style={{ height: "2rem", width: "75%" }} />
            <Skeleton style={{ height: "1rem", width: "100%" }} />
            <Skeleton style={{ height: "1rem", width: "66%" }} />
          </div>
        ) : post ? (
          <article className="animate-fade-up">
            <img
              src={post.coverImage}
              alt={post.title}
              style={{
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                borderRadius: "var(--radius-xl)",
                marginBottom: "2rem",
                border: "1px solid var(--color-border)",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                marginBottom: "1rem",
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
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-border)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
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
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--color-muted)",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
                paddingBottom: "2rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {post.description}
            </p>
            <div
              className="post-content"
              style={{ fontSize: "0.875rem", color: "var(--color-text)", lineHeight: 1.8 }}
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