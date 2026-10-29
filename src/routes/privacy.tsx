import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Mohammad Rehxnn" },
      { name: "description", content: "Privacy Policy for the Mohammad Rehxnn portfolio website." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 text-neutral-200 sm:px-10 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="text-xs tracking-[0.2em] text-neutral-500 hover:text-white">
          ← BACK TO PORTFOLIO
        </Link>
        <p className="mt-20 text-xs tracking-[0.25em] text-neutral-500">MOHAMMAD REHXNN / PRIVACY</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Privacy Policy</h1>
        <p className="mt-5 text-sm text-neutral-500">Last updated: October 29, 2026</p>
        <div className="mt-14 space-y-10 text-sm leading-8 text-neutral-400">
          <section><h2 className="mb-3 text-xl font-medium text-white">Information you provide</h2><p>If you use the contact form, we may receive your name, email address, and message so that we can respond to your inquiry.</p></section>
          <section><h2 className="mb-3 text-xl font-medium text-white">How information is used</h2><p>Contact details are used to respond to project inquiries and related communication. We do not sell your personal information.</p></section>
          <section><h2 className="mb-3 text-xl font-medium text-white">Storage and sharing</h2><p>Messages may be processed through the website email flow or configured database provider. Information is not shared except where needed to operate the website or comply with law.</p></section>
          <section><h2 className="mb-3 text-xl font-medium text-white">Your choices</h2><p>You can request access to, correction of, or deletion of information you submitted by emailing mohammadrehxnn@gmail.com.</p></section>
          <section><h2 className="mb-3 text-xl font-medium text-white">Changes</h2><p>This policy may be updated when the website or its data practices change. The latest version will remain available on this page.</p></section>
        </div>
      </div>
    </main>
  );
}
