import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import { useScrollReveal } from "@/shared/hooks";
import type { Post } from "@/shared/types";
import type { Translations } from "@/shared/i18n";

type SortType = "recent" | "relevant";

interface PostsPageProps {
  t: Translations;
}

function PostCardSkeleton() {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <Skeleton style={{ aspectRatio: "16/9", width: "100%" }} />
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        <Skeleton style={{ height: "1rem", width: "75%" }} />
        <Skeleton style={{ height: "0.75rem", width: "100%" }} />
        <Skeleton style={{ height: "0.75rem", width: "55%" }} />
      </div>
    </div>
  );
}

function PostCard({
  post,
  isMostViewed,
  t,
}: {
  post: Post;
  isMostViewed: boolean;
  t: Translations;
}) {
  const ref = useScrollReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      to={`/post/${post.id}`}
      className="page-section card-hover"
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        display: "block",
        textDecoration: "none",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          backgroundColor: "var(--color-surface2)",
        }}
      >
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
        />
        {isMostViewed && (
          <span
            style={{
              position: "absolute",
              top: "0.625rem",
              right: "0.625rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.04em",
              backgroundColor: "var(--color-primary)",
              color: "white",
              padding: "0.2rem 0.5rem",
              borderRadius: "var(--radius-full)",
              boxShadow: "0 0 10px var(--color-primary-glow)",
            }}
          >
            {t.posts.mostViewed}
          </span>
        )}
      </div>
      <div style={{ padding: "1.25rem" }}>
        <h2
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "0.4rem",
            letterSpacing: "-0.02em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-muted)",
            lineHeight: 1.65,
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-muted)",
            }}
          >
            {new Intl.DateTimeFormat("pt-BR", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(post.createdAt)}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-muted)",
            }}
          >
            {post.views} {t.posts.views}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PostsPage({ t }: PostsPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("recent");
  const headerRef = useScrollReveal();

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts
    .filter(
      p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "recent"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : (b.views || 0) - (a.views || 0),
    );

  const mostViewed =
    posts.length > 0
      ? posts.reduce((prev, cur) => (cur.views > prev.views ? cur : prev))
      : null;

  return (
    <div style={{ marginTop: "3.5rem", paddingTop: "4.5rem", paddingBottom: "6rem" }}>
      <div className="wrap">
        <div ref={headerRef} className="page-section" style={{ marginBottom: "3rem" }}>
          <p className="label" style={{ marginBottom: "0.875rem" }}>{t.posts.title}</p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "var(--color-text)",
              lineHeight: 1.1,
            }}
          >
            Posts
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "2.5rem",
            alignItems: "center",
          }}
        >
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t.posts.search}
            aria-label={t.posts.search}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              flex: 1,
              minWidth: "12rem",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-full)",
              padding: "0.55rem 1.1rem",
              color: "var(--color-text)",
              outline: "none",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            }}
            onFocus={e => {
              e.target.style.borderColor = "var(--color-primary)";
              e.target.style.boxShadow = "0 0 0 3px var(--color-primary-dim)";
            }}
            onBlur={e => {
              e.target.style.borderColor = "var(--color-border)";
              e.target.style.boxShadow = "none";
            }}
          />
          <div
            style={{
              display: "flex",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-full)",
              overflow: "hidden",
              backgroundColor: "var(--color-surface)",
            }}
          >
            {(["recent", "relevant"] as SortType[]).map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  padding: "0.5rem 1rem",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                  border: "none",
                  backgroundColor: sort === s ? "var(--color-primary)" : "transparent",
                  color: sort === s ? "white" : "var(--color-muted)",
                  cursor: "pointer",
                }}
              >
                {s === "recent" ? t.posts.recent : t.posts.relevant}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.125rem",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", paddingBlock: "5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                color: "var(--color-muted)",
              }}
            >
              {t.posts.notFound}
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-muted)",
                marginTop: "0.375rem",
              }}
            >
              {t.posts.notFoundHint}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.125rem",
            }}
          >
            {filtered.map(post => (
              <PostCard
                key={post.id}
                post={post}
                isMostViewed={sort === "recent" && post.id === mostViewed?.id}
                t={t}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}