// src/components/FastSpline.tsx
// Ek hi file: desktop + mobile dono pe lazy load, idle prefetch, aur poster support.
//
// Use:
//   import { FastSpline } from "@/components/FastSpline";
//   <FastSpline
//     scene="https://prod.spline.design/XXXX/scene.splinecode"
//     poster="/hero-poster.webp"        // optional but highly recommended
//     className="h-[500px] w-full"
//   />

import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Spline runtime sirf tab download hoga jab zarurat padegi
const importSpline = () => import("@splinetool/react-spline");
const Spline = lazy(importSpline);

type Props = {
  scene: string;
  className?: string | undefined;
  /** Chhoti .webp image jo 3D ready hone tak dikhegi */
  poster?: string | undefined;
  /** Mobile pe 3D load karna hai ya sirf poster dikhana hai */
  mobile?: "poster-only" | "lazy" | undefined;
  /** Screen se kitna pehle load shuru ho */
  rootMargin?: string | undefined;
};

function shouldSkip3D(mobileMode: "poster-only" | "lazy") {
  if (typeof window === "undefined") return false;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const saveData = nav.connection?.saveData === true;
  const slowNet = ["slow-2g", "2g"].includes(nav.connection?.effectiveType ?? "");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return saveData || slowNet || reduceMotion || (isMobile && mobileMode === "poster-only");
}

export function FastSpline({
  scene,
  className,
  poster,
  mobile = "lazy",
  rootMargin = "400px",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [skip, setSkip] = useState(false);

  // 1) Device/network check (sirf browser me)
  useEffect(() => {
    setSkip(shouldSkip3D(mobile));
  }, [mobile]);

  // 2) Preconnect: Spline server se connection pehle hi khol do
  useEffect(() => {
    try {
      const origin = new URL(scene).origin;
      if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = origin;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    } catch {
      /* local file hai to ignore */
    }
  }, [scene]);

  // 3) Section screen ke paas aaye to hi load karo
  useEffect(() => {
    if (skip) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        // Browser idle ho tab runtime chunk fetch karo, main thread block nahi hoga
        const start = () => {
          void importSpline();
          setLoad(true);
        };
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(start, { timeout: 1200 });
        } else {
          setTimeout(start, 50);
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skip, rootMargin]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Poster / placeholder: 3D ready hone tak (ya mobile pe hamesha) */}
      {!ready && (
        <>
          {poster ? (
            <img
              src={poster}
              alt=""
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
        </>
      )}

      {load && !skip && (
        <Suspense fallback={null}>
          <Spline
            scene={scene}
            onLoad={() => setReady(true)}
            style={{
              width: "100%",
              height: "100%",
              opacity: ready ? 1 : 0,
              transition: "opacity .6s ease",
            }}
          />
        </Suspense>
      )}
    </div>
  );
}

export default FastSpline;
