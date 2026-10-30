import { createFileRoute } from "@tanstack/react-router";
import { AdminPanel } from "@/site/AdminPanel";
import "@/site/style.css";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Mohammad Rehxnn Portfolio" },
      { name: "description", content: "Manage portfolio projects and inquiries." },
      { property: "og:title", content: "Admin | Mohammad Rehxnn Portfolio" },
      { property: "og:description", content: "Manage portfolio projects and inquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPanel,
});
