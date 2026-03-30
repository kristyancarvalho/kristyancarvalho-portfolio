import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocaleContext } from "@/app/providers";

const HomePage = lazy(() => import("@/pages/home").then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("@/pages/about").then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import("@/pages/projects").then(m => ({ default: m.ProjectsPage })));
const PostsPage = lazy(() => import("@/pages/posts").then(m => ({ default: m.PostsPage })));
const PostPage = lazy(() => import("@/pages/post").then(m => ({ default: m.PostPage })));
const NotFoundPage = lazy(() => import("@/pages/not-found").then(m => ({ default: m.NotFoundPage })));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="font-mono text-xs text-[var(--color-muted)] animate-pulse">loading...</span>
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
        <Route path="/posts" element={<PostsPage t={t} />} />
        <Route path="/post/:id" element={<PostPage t={t} />} />
        <Route path="*" element={<NotFoundPage t={t} />} />
      </Routes>
    </Suspense>
  );
}
