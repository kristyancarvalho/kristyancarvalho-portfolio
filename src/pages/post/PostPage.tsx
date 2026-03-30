import { useState, useEffect, useCallback } from "react";
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

  const fetchPost = useCallback(async () => {
    if (!id) return;
    const data = await getPost(id);
    if (data) {
      if (!wasViewed(id)) {
        await incrementViews(id);
        markViewed(id);
        data.views += 1;
      }
      setPost(data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div
      style={{ marginTop: "3rem", paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <div className="wrap-sm">
        <Link
          to="/posts"
          className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-150"
          style={{ display: "inline-block", marginBottom: "2rem" }}
        >
          ← {t.posts.title}
        </Link>
        {loading ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Skeleton className="w-full aspect-video rounded-[var(--radius-md)]" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : post ? (
          <article>
            <img
              src={post.coverImage}
              alt={post.title}
              style={{
                width: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                borderRadius: "var(--radius-md)",
                marginBottom: "1.5rem",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <span className="font-mono text-xs text-[var(--color-muted)]">
                {new Intl.DateTimeFormat("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(post.createdAt)}
              </span>
              <span className="font-mono text-xs text-[var(--color-muted)]">
                {post.views} {t.posts.views}
              </span>
            </div>
            <h1
              className="font-mono text-2xl font-bold text-[var(--color-text)]"
              style={{ marginBottom: "0.75rem" }}
            >
              {post.title}
            </h1>
            <p
              className="font-mono text-sm text-[var(--color-muted)] leading-relaxed"
              style={{ marginBottom: "2rem" }}
            >
              {post.description}
            </p>
            <div
              className="post-content font-mono text-sm text-[var(--color-text)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        ) : (
          <p className="font-mono text-sm text-[var(--color-muted)]">
            Post não encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
