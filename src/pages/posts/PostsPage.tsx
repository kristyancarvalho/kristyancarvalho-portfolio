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
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Skeleton style={{ height: "1rem", width: "75%" }} />
        <Skeleton style={{ height: "0.75rem", width: "100%" }} />
        <Skeleton style={{ height: "0.75rem", width: "50%" }} />
      </div>
    </div>
  );
}

function PostCard({ post, isMostViewed, t }: { post: Post; isMostViewed: boolean; t: Translations }) {
  const ref = useScrollReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      to={`/post/${post.id}`}
      className="page-section card-glow"
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
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={e => ((e.target as HTMLElement).style.transform = "scale(1.03)")}
          onMouseLeave={e => ((e.target as HTMLElement).style.transform = "scale(1)")}
        />
        {isMostViewed && (
          <span
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              backgroundColor: "var(--color-accent)",
              color: "white",
              padding: "0.15rem 0.4rem",
              borderRadius: "var(--radius-xs)",
              boxShadow: "0 0 8px var(--color-accent-glow)",
              letterSpacing: "0.02em",
            }}
          >
            {t.posts.mostViewed}
          </span>
        )}
      </div>
      <div style={{ padding: "1.1rem" }}>
        <h2
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--color-text)",
            marginBottom: "0.375rem",
            letterSpacing: "-0.01em",
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
            fontSize: "0.72rem",
            color: "var(--color-muted)",
            lineHeight: 1.6,
            marginBottom: "0.75rem",
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
            {post.views} views
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
    <div style={{ marginTop: "3.25rem", paddingTop: "4rem", paddingBottom: "5rem" }}>
      <div className="wrap">
        <div ref={headerRef} className="page-section" style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "0.375rem",
            }}
          >
            {t.posts.title}
          </p>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
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
            marginBottom: "2rem",
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
              borderRadius: "var(--radius-lg)",
              padding: "0.5rem 1rem",
              color: "var(--color-text)",
              outline: "none",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            }}
            onFocus={e => {
              e.target.style.borderColor = "var(--color-accent)";
              e.target.style.boxShadow = "0 0 0 3px var(--color-accent-dim)";
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
              borderRadius: "var(--radius-lg)",
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
                  backgroundColor: sort === s ? "var(--color-accent)" : "transparent",
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
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "1rem",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: "4rem", paddingBottom: "4rem" }}>
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
                marginTop: "0.25rem",
              }}
            >
              {t.posts.notFoundHint}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "1rem",
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