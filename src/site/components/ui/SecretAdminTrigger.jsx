import React, { useCallback, useEffect, useRef } from 'react';

/**
 * Naam (ya logo) ko is component me wrap karo.
 * 5 second dabaye rakhne par /admin khul jayega.
 * Chhota click/tap pehle jaisa hi kaam karega (jaise home pe scroll).
 *
 * Use:
 *   <SecretAdminTrigger>Mohammad Rehxnn</SecretAdminTrigger>
 */
export function SecretAdminTrigger({
  children,
  holdMs = 5000,
  to = '/admin',
  as: Tag = 'span',
  className = '',
  style,
  ...rest
}) {
  const timerRef = useRef(0);
  const firedRef = useRef(false);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = 0;
    }
  }, []);

  const start = useCallback(() => {
    firedRef.current = false;
    cancel();
    timerRef.current = window.setTimeout(() => {
      firedRef.current = true;
      timerRef.current = 0;
      if (navigator.vibrate) {
        try { navigator.vibrate(40); } catch (_) {}
      }
      window.location.assign(to);
    }, holdMs);
  }, [cancel, holdMs, to]);

  useEffect(() => cancel, [cancel]);

  return (
    <Tag
      {...rest}
      className={className}
      style={{
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'manipulation',
        ...style,
      }}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onContextMenu={(e) => e.preventDefault()}
      onClickCapture={(e) => {
        // Lamba dabane ke baad aane wala click ignore karo
        if (firedRef.current) {
          e.preventDefault();
          e.stopPropagation();
          firedRef.current = false;
        }
      }}
    >
      {children}
    </Tag>
  );
}

export default SecretAdminTrigger;
