import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';

// Runtime sirf tab download hoga jab zarurat padegi
const importSpline = () => import('@splinetool/react-spline');
const Spline = lazy(importSpline);

const clamp = (v, a = -1, b = 1) => Math.max(a, Math.min(b, v));

// Slow net / data saver / mobile (agar poster-only mode ho) pe 3D skip karne ka check
function shouldSkip3D(poster, mobileMode) {
  if (typeof window === 'undefined' || !poster) return false;
  const c = navigator.connection || {};
  const slow = c.saveData === true || ['slow-2g', '2g'].includes(c.effectiveType);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  return slow || (isMobile && mobileMode === 'poster-only');
}

/**
 * Props:
 *  scene        : Spline scene URL
 *  className    : pehle jaisa
 *  poster       : (optional) chhoti .webp image, e.g. "/hero-poster.webp"
 *  mobile       : (optional) "lazy" (default) ya "poster-only"
 *  touchCursor  : (optional, default true) mobile pe nakli mouse pointer dikhao
 *  autoLook     : (optional, default true) mobile pe touch na ho to pointer apne aap ghoomta rahe
 */
export function SplineScene({
  scene,
  className = '',
  poster,
  mobile = 'lazy',
  touchCursor = true,
  autoLook = true,
}) {
  const hostRef = useRef(null);
  const dotRef = useRef(null);
  const splineRef = useRef(null);
  const targetRef = useRef(null);
  const originalRotation = useRef(null);

  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [skip, setSkip] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setSkip(shouldSkip3D(poster, mobile));
    setIsTouch(window.matchMedia('(hover: none)').matches);
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

  // Robot ka look-tracking: desktop pe mouse se, mobile pe touch + auto-look se
  useEffect(() => {
    if (!load || skip) return;
    const host = hostRef.current;
    if (!host) return;

    const touchDevice = window.matchMedia('(hover: none)').matches;
    const goal = { x: 0, y: 0 };  // jahan dekhna hai (-1 se 1)
    const cur = { x: 0, y: 0 };   // abhi kahan dekh raha hai (smooth)
    let raf = 0;
    let touching = false;
    let touchTimer = 0;
    let wanderTimer = 0;

    const render = () => {
      const target = targetRef.current;
      const base = originalRotation.current;
      if (target?.rotation && base) {
        // Gentle head tracking; clamp angle to keep the pose natural.
        target.rotation.y = base.y + cur.x * 0.42;
        target.rotation.x = base.x - cur.y * 0.22;
      } else {
        // Safe visual fallback when the Spline scene does not expose a named head object.
        host.style.setProperty('--look-x', `${(-cur.y * 3.5).toFixed(2)}deg`);
        host.style.setProperty('--look-y', `${(cur.x * 5.5).toFixed(2)}deg`);
      }
      // Mobile pe nakli mouse pointer ki position
      const dot = dotRef.current;
      if (dot) {
        const r = host.getBoundingClientRect();
        const px = ((cur.x + 1) / 2) * r.width;
        const py = ((cur.y + 1) / 2) * r.height;
        dot.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
      }
    };

    const tick = () => {
      raf = 0;
      cur.x += (goal.x - cur.x) * 0.12;
      cur.y += (goal.y - cur.y) * 0.12;
      render();
      if (Math.abs(goal.x - cur.x) > 0.002 || Math.abs(goal.y - cur.y) > 0.002) {
        raf = requestAnimationFrame(tick);
      }
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const lookAt = (clientX, clientY) => {
      const r = host.getBoundingClientRect();
      goal.x = clamp(((clientX - r.left) / r.width - 0.5) * 2);
      goal.y = clamp(((clientY - r.top) / r.height - 0.5) * 2);
      go();
    };

    const reset = () => { goal.x = 0; goal.y = 0; go(); };

    // Desktop: mouse
    const onPointerMove = (e) => { if (e.pointerType === 'mouse' || !touchDevice) lookAt(e.clientX, e.clientY); };

    // Mobile: touch
    const onTouch = (e) => {
      const t = e.touches[0];
      if (!t) return;
      touching = true;
      clearTimeout(touchTimer);
      lookAt(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      clearTimeout(touchTimer);
      touchTimer = setTimeout(() => { touching = false; }, 1800);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', reset);

    if (touchDevice) {
      window.addEventListener('touchstart', onTouch, { passive: true });
      window.addEventListener('touchmove', onTouch, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });

      // Touch na ho to pointer apne aap idhar-udhar ghoome aur robot dekhta rahe
      if (autoLook) {
        wanderTimer = setInterval(() => {
          if (touching || document.hidden) return;
          goal.x = (Math.random() * 2 - 1) * 0.9;
          goal.y = (Math.random() * 2 - 1) * 0.7;
          go();
        }, 2200);
      }
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', reset);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
      clearInterval(wanderTimer);
      clearTimeout(touchTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [load, skip, autoLook]);

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

  const showCursor = touchCursor && isTouch && ready;

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

        {/* Mobile ke liye nakli mouse pointer */}
        {showCursor && (
          <div
            ref={dotRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              pointerEvents: 'none',
              zIndex: 20,
              willChange: 'transform',
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              style={{ display: 'block', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.55))' }}
            >
              <path
                d="M4 2.5 L4 19 L8.6 14.8 L11.6 21.5 L14.4 20.3 L11.4 13.7 L17.8 13.4 Z"
                fill="#ffffff"
                stroke="#111111"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
