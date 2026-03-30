import { useState, useCallback } from "react";

export function useCopyLink() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback((url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return { copied, copy };
}
