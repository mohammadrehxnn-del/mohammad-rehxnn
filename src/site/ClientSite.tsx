import { lazy, Suspense, useEffect, useState } from "react";

// The original site uses window/Spline at render time, so it only runs in the browser.
const App = lazy(() => import("./App.jsx"));

export function ClientSite() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div style={{ minHeight: "100vh", background: "#050505" }} />;
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#050505" }} />}>
      <App />
    </Suspense>
  );
}
