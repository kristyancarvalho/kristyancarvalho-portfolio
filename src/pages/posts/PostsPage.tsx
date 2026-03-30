import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import type { Post } from "@/shared/types";
import type { Translations } from "@/shared/i18n";

type SortType = "recent" | "relevant";

interface PostsPageProps {
  t: Translations;
}

export function PostsPage({ t }: PostsPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("recent");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts
    .filter(
      (p) =>
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
    <div
      style={{ marginTop: "3rem", paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <div className="wrap">
        <h1
          className="font-mono text-2xl text-[var(--color-text)]"
          style={{ marginBottom: "2rem" }}
        >
          <span className="text-[var(--color-accent)]">&gt;</span>{" "}
          {t.posts.title}
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.posts.search}
            aria-label={t.posts.search}
            className="font-mono text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-3 py-2 text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            style={{ flex: 1, minWidth: "12rem" }}
          />
          <div
            style={{
              display: "flex",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            {(["recent", "relevant"] as SortType[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className="font-mono text-xs px-3 py-2 transition-colors duration-150"
                style={{
                  backgroundColor:
                    sort === s ? "var(--color-accent)" : "transparent",
                  color: sort === s ? "white" : "var(--color-muted)",
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
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                <Skeleton className="aspect-video" />
                <div
                  style={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              paddingTop: "4rem",
              paddingBottom: "4rem",
            }}
          >
            <p className="font-mono text-sm text-[var(--color-muted)]">
              {t.posts.notFound}
            </p>
            <p
              className="font-mono text-xs text-[var(--color-muted)]"
              style={{ marginTop: "0.25rem" }}
            >
              {t.posts.notFoundHint}
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  display: "block",
                  textDecoration: "none",
                  transition: "border-color 0.15s",
                }}
                className="hover:border-[var(--color-accent)] group"
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    overflow: "hidden",
                    backgroundColor: "var(--color-surface)",
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
                    }}
                    className="group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  {post.id === mostViewed?.id && sort === "recent" && (
                    <span
                      className="absolute top-2 right-2 font-mono"
                      style={{
                        fontSize: "0.625rem",
                        backgroundColor: "var(--color-accent)",
                        color: "white",
                        padding: "0.125rem 0.375rem",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      {t.posts.mostViewed}
                    </span>
                  )}
                </div>
                <div style={{ padding: "1rem" }}>
                  <h2
                    className="font-mono text-sm font-bold text-[var(--color-text)]"
                    style={{
                      marginBottom: "0.25rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="font-mono text-xs text-[var(--color-muted)] leading-relaxed"
                    style={{
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
                      className="font-mono text-[var(--color-muted)]"
                      style={{ fontSize: "0.625rem" }}
                    >
                      {new Intl.DateTimeFormat("pt-BR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(post.createdAt)}
                    </span>
                    <span
                      className="font-mono text-[var(--color-muted)]"
                      style={{ fontSize: "0.625rem" }}
                    >
                      {post.views} views
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
