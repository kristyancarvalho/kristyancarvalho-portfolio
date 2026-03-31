import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocaleContext } from "@/app/providers";

const HomePage = lazy(() => import("@/pages/home").then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("@/pages/about").then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import("@/pages/projects").then(m => ({ default: m.ProjectsPage })));
const ContactPage = lazy(() => import("@/pages/contact").then(m => ({ default: m.ContactPage })));
const PostsPage = lazy(() => import("@/pages/posts").then(m => ({ default: m.PostsPage })));
const PostPage = lazy(() => import("@/pages/post").then(m => ({ default: m.PostPage })));
const NotFoundPage = lazy(() => import("@/pages/not-found").then(m => ({ default: m.NotFoundPage })));

function PageFallback() {
  return (
    <div
      style={{
        minHeight: "calc(100svh - 3.5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.3rem",
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              animation: `glowPulse 1s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              boxShadow: "0 0 8px var(--color-primary-glow)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function AppRouter() {
  const { t } = useLocaleContext();
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<HomePage t={t} />} />
        <Route path="/sobre" element={<AboutPage t={t} />} />
        <Route path="/projetos" element={<ProjectsPage t={t} />} />
        <Route path="/contato" element={<ContactPage t={t} />} />
        <Route path="/posts" element={<PostsPage t={t} />} />
        <Route path="/post/:id" element={<PostPage t={t} />} />
        <Route path="*" element={<NotFoundPage t={t} />} />
      </Routes>
    </Suspense>
  );
}