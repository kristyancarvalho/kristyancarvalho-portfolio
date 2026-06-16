import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { profile } from "@/entities/profile";

interface ExternalBlogRedirectProps {
  preserveSlug?: boolean;
}

export function ExternalBlogRedirect({ preserveSlug = false }: ExternalBlogRedirectProps) {
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    const target = preserveSlug && slug
      ? `${profile.blog}/posts/${encodeURIComponent(slug)}`
      : profile.blog;

    window.location.replace(target);
  }, [preserveSlug, slug]);

  return null;
}
