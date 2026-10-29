import React, { Suspense, lazy, useCallback, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className = '' }) {
  const hostRef = useRef(null);
  const splineRef = useRef(null);
  const targetRef = useRef(null);
  const originalRotation = useRef(null);
  const rafRef = useRef(0);

  const onLoad = useCallback((app) => {
    splineRef.current = app;
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

  useEffect(() => {
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
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('blur', reset); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div ref={hostRef} className="spline-look-tracker">
      <Suspense fallback={<div className="spline-loader" role="status" aria-label="Loading 3D scene"><span className="loader" /></div>}>
        <Spline scene={scene} className={className} onLoad={onLoad} />
      </Suspense>
    </div>
  );
}
