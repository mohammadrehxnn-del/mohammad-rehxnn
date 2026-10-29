import { createFileRoute } from "@tanstack/react-router";
import { ClientSite } from "@/site/ClientSite";

const title = "Mohammad Rehxnn | Creative Developer, UI/UX Designer & Video Editor";
const description =
  "Mohammad Rehxnn is a creative developer and digital designer focused on responsive websites, UI/UX, graphic design, and cinematic video editing.";
const siteUrl = import.meta.env.VITE_SITE_URL || "https://mohammadrehxnn.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "Mohammad Rehxnn — Creative Developer & Digital Designer" },
      { property: "og:description", content: "Responsive websites, visual design, and cinematic storytelling by Mohammad Rehxnn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "author", content: "Mohammad Rehxnn" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: siteUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mohammad Rehxnn",
          url: siteUrl,
          jobTitle: "Creative Developer, UI/UX Designer and Video Editor",
          description,
          knowsAbout: ["Frontend Development", "UI/UX Design", "Graphic Design", "Video Editing"],
          sameAs: ["https://www.instagram.com/creative_novary/"],
        }),
      },
    ],
  }),
  component: ClientSite,
});
