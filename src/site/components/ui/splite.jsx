import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';

// Runtime sirf tab download hoga jab zarurat padegi
const importSpline = () => import('@splinetool/react-spline');
const Spline = lazy(importSpline);

// Slow net / data saver / mobile (agar poster-only mode ho) pe 3D skip karne ka check
function shouldSkip3D(poster, mobileMode) {
  if (typeof window === 'undefined' || !poster) return false;
  const nav = navigator;
  const c = nav.connection || {};
  const slow = c.saveData === true || ['slow-2g', '2g'].includes(c.effectiveType);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  return slow || (isMobile && mobileMode === 'poster-only');
}

/**
 * Props:
 *  scene       : Spline scene URL (pehle jaisa)
 *  className   : pehle jaisa
 *  poster      : (optional) chhoti .webp image, e.g. "/hero-poster.webp"
 *  mobile      : (optional) "lazy" (default) ya "poster-only"
 */
export function SplineScene({ scene, className = '', poster, mobile = 'lazy' }) {
  const hostRef = useRef(null);
  const splineRef = useRef(null);
  const targetRef = useRef(null);
  const originalRotation = useRef(null);
  const rafRef = useRef(0);

  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setSkip(shouldSkip3D(poster, mobile));
  }, [poster, mobile]);

  // Spline server se connection pehle hi khol do
  useEffect(() => {
    try {
      const origin = new URL(scene).origin;
      if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    } catch (_) {}
  }, [scene]);

  // Screen ke paas aane pe hi load shuru
  useEffect(() => {
    if (skip) return;
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry || !entry.isIntersecting) return;
        io.disconnect();
        const start = () => { importSpline(); setLoad(true); };
        if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1200 });
        else setTimeout(start, 50);
      },
      { rootMargin: '400px' }
    );
    io.observe(host);
    return () => io.disconnect();
  }, [skip]);

  const onLoad = useCallback((app) => {
    splineRef.current = app;
    setReady(true);
    // Prefer rotating the head/face object in the Spline scene, when it is named.
    const candidates = ['Head', 'head', 'Face', 'face', 'Robot Head', 'Robot_Head', 'RobotHead'];
    let target = null;
    for (const name of candidates) {
      try { target = app.findObjectByName?.(name); } catch (_) {}
      if (target) break;
    }
    if (target?.rotation) {
      targetRef.current = target;
      originalRotation.current = { x: target.rotation.x || 0, y: target.rotation.y || 0, z: target.rotation.z || 0 };
    }
  }, []);

  // Mouse tracking sirf tab chalu jab 3D load ho chuka ho aur device pe mouse ho
  useEffect(() => {
    if (!load || skip) return;
    if (window.matchMedia('(hover: none)').matches) return; // touch device pe zarurat nahi
    const host = hostRef.current;
    if (!host) return;
    let nx = 0, ny = 0;
    const move = (event) => {
      const rect = host.getBoundingClientRect();
      nx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      ny = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const target = targetRef.current;
        const base = originalRotation.current;
        if (target?.rotation && base) {
          // Gentle head tracking; clamp angle to keep the pose natural.
          target.rotation.y = base.y + nx * 0.42;
          target.rotation.x = base.x - ny * 0.22;
        } else {
          // Safe visual fallback when the Spline scene does not expose a named head object.
          host.style.setProperty('--look-x', `${(-ny * 3.5).toFixed(2)}deg`);
          host.style.setProperty('--look-y', `${(nx * 5.5).toFixed(2)}deg`);
        }
      });
    };
    const reset = () => {
      const target = targetRef.current; const base = originalRotation.current;
      if (target?.rotation && base) { target.rotation.x = base.x; target.rotation.y = base.y; }
      host.style.setProperty('--look-x', '0deg'); host.style.setProperty('--look-y', '0deg');
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', reset);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [load, skip]);

  const placeholder = poster ? (
    <img
      src={poster}
      alt=""
      decoding="async"
      fetchPriority="high"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ) : (
    <div className="spline-loader" role="status" aria-label="Loading 3D scene"><span className="loader" /></div>
  );

  return (
    <div ref={hostRef} className="spline-look-tracker">
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {!ready && placeholder}
        {load && !skip && (
          <Suspense fallback={null}>
            <div style={{ width: '100%', height: '100%', opacity: ready ? 1 : 0, transition: 'opacity .6s ease' }}>
              <Spline scene={scene} className={className} onLoad={onLoad} />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
}
