import { useLottie } from "lottie-react";
import { usePrefersReducedMotion } from "@/shared/hooks";
import type { CSSProperties } from "react";

interface PageLottieProps {
  animationData: object;
  className?: string;
  style?: CSSProperties;
}

export function PageLottie({ animationData, className, style }: PageLottieProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { View } = useLottie({
    animationData,
    autoplay: !prefersReducedMotion,
    loop: !prefersReducedMotion,
    rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
  });

  return (
    <div aria-hidden="true" className={className} style={style}>
      {View}
    </div>
  );
}
