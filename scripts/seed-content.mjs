/**
 * One-off migration: moves the projects and certificates that used to be
 * hardcoded arrays in .tsx files into Supabase.
 *
 * Image paths are kept exactly as they are - the existing assets stay in
 * public/ and only new uploads go to Supabase Storage, so this script moves
 * data and nothing else.
 *
 * Idempotent: upserts on slug, so re-running overwrites rather than duplicates.
 *
 *   npm run seed:content
 */
import { createClient } from "@supabase/supabase-js";

process.loadEnvFile(".env.local");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const projects = [
  {
    slug: "weather-forecast",
    title: "Weather Forecast",
    description:
      "An application that predicts current weather and forecasts future conditions. Connected to the OpenWeatherMap API.",
    href: "https://wilbertfe.github.io/weatherapp/",
    year: 2023,
    image_url: "/img/projects/mockups/weather-forecast.png",
    icons: [
      { key: "DiHtml5", color: "red" },
      { key: "DiCss3", color: "lightblue" },
      { key: "RiJavascriptFill", color: "yellow" },
    ],
    badges: ["API Integration", "Responsive"],
  },
  {
    slug: "habit-tracker",
    title: "Habit Tracker",
    description:
      "My first React application. It helps users build new habits by allowing them to add, complete, and delete tasks of various types.",
    href: "https://wilbertfe.github.io/habittracker/",
    year: 2024,
    image_url: "/img/projects/mockups/habit-tracker.png",
    icons: [
      { key: "RiTailwindCssFill", color: "cyan" },
      { key: "FaReact", color: "cyan" },
      { key: "RiJavascriptFill", color: "yellow" },
    ],
    badges: ["Frontend", "Responsive", "Local Data"],
  },
  {
    slug: "nimeku",
    title: "NimeKu",
    description:
      "A frontend anime website integrated with the MyAnimeList (MAL) API.",
    href: "https://wilbertfe.github.io/nimeku/",
    year: 2024,
    image_url: "/img/projects/mockups/nimeku.png",
    icons: [
      { key: "RiTailwindCssFill", color: "cyan" },
      { key: "FaReact", color: "cyan" },
      { key: "RiJavascriptFill", color: "yellow" },
    ],
    badges: ["Frontend", "Responsive", "API Integration"],
  },
  {
    slug: "github-search",
    title: "Github Search",
    description:
      "Connected to the GitHub API. An application to search for GitHub user profiles and repositories.",
    href: "https://wilbertfe.github.io/githubsearch/",
    year: 2024,
    image_url: "/img/projects/mockups/github-search.png",
    icons: [
      { key: "DiHtml5", color: "red" },
      { key: "RiTailwindCssFill", color: "cyan" },
      { key: "RiJavascriptFill", color: "yellow" },
    ],
    badges: ["API Integration", "Responsive"],
  },
  {
    slug: "methonam-osis",
    title: "Methonam OSIS Website",
    description:
      "A website I built for the school's student council (OSIS) and students.",
    href: "https://web-osis-five.vercel.app/",
    year: 2025,
    image_url: "/img/projects/mockups/methonam-osis.png",
    icons: [
      { key: "FaReact", color: "cyan" },
      { key: "RiTailwindCssFill", color: "cyan" },
      { key: "RiNextjsFill", color: "white" },
      { key: "BiLogoTypescript", color: "blue" },
      { key: "IoLogoFirebase", color: "orange" },
    ],
    badges: ["Fullstack", "Responsive"],
  },
  {
    slug: "portofolio-v3",
    title: "Portofolio V3",
    description: "The latest version of my personal portfolio website.",
    href: "https://wilbertbernardi.vercel.app/",
    year: 2025,
    image_url: "/img/projects/mockups/portofolio-v3.png",
    icons: [
      { key: "FaReact", color: "cyan" },
      { key: "RiTailwindCssFill", color: "cyan" },
      { key: "RiNextjsFill", color: "white" },
      { key: "BiLogoTypescript", color: "blue" },
      { key: "RiSupabaseFill", color: "lightgreen" },
    ],
    badges: ["Fullstack", "Responsive"],
  },
  {
    slug: "ringkas-cv",
    title: "Ringkas CV",
    description:
      "A free CV builder with AI-assisted writing, 15 templates, and ATS-friendly PDF/DOCX export.",
    href: "https://ringkascv.com/",
    year: 2026,
    image_url: "/img/projects/mockups/ringkas-cv.png",
    icons: [
      { key: "RiNextjsFill", color: "white" },
      { key: "FaReact", color: "cyan" },
      { key: "BiLogoTypescript", color: "blue" },
      { key: "RiTailwindCssFill", color: "cyan" },
      { key: "RiGeminiLine", color: "purple" },
    ],
    badges: ["Fullstack", "AI-Powered", "SAAS", "Auth & Database"],
  },
  {
    slug: "snapenda",
    title: "Snapenda",
    description:
      "A free financial planning tool for individuals expenses tracking.",
    href: "https://snapenda.my.id/",
    // No mockup yet - null keeps the <Skeleton> placeholder the old
    // `image: ""` produced.
    year: 2026,
    image_url: null,
    icons: [
      { key: "RiNextjsFill", color: "white" },
      { key: "FaReact", color: "cyan" },
      { key: "BiLogoTypescript", color: "blue" },
      { key: "RiTailwindCssFill", color: "cyan" },
      { key: "RiGeminiLine", color: "purple" },
    ],
    badges: ["Fullstack", "AI-Powered", "SAAS", "Auth & Database"],
  },
].map((project) => ({ ...project, published: true }));

const pages = (slug, count) =>
  Array.from(
    { length: count },
    (_, i) => `/img/certificates/${slug}/page-${i + 1}.webp`
  );

const certificates = [
  {
    slug: "dicoding-git-github",
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding",
    issued_at: "2026-08-22",
    valid_until: "2029-08-22",
    credential_id: "4EXGJY23EXRL",
    credential_url: "https://www.dicoding.com/certificates/4EXGJY23EXRL",
    pdf_url: "/certificates/dicoding-git-github.pdf",
    page_urls: pages("dicoding-git-github", 3),
    sort_order: 0,
  },
  {
    slug: "dicoding-programming-logic-101",
    title: "Pengenalan ke Logika Pemrograman (Programming Logic 101)",
    issuer: "Dicoding",
    issued_at: "2026-08-22",
    valid_until: "2029-08-22",
    credential_id: "53XEME9M0PRN",
    credential_url: "https://www.dicoding.com/certificates/53XEME9M0PRN",
    pdf_url: "/certificates/dicoding-programming-logic-101.pdf",
    page_urls: pages("dicoding-programming-logic-101", 2),
    sort_order: 1,
  },
  {
    slug: "dicoding-memulai-dasar-pemrograman",
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding",
    issued_at: "2026-08-21",
    valid_until: "2029-08-21",
    credential_id: "QLZ9N8N49Z5D",
    credential_url: "https://www.dicoding.com/certificates/QLZ9N8N49Z5D",
    pdf_url: "/certificates/dicoding-memulai-dasar-pemrograman.pdf",
    page_urls: pages("dicoding-memulai-dasar-pemrograman", 3),
    sort_order: 2,
  },
  {
    slug: "kaggle-intro-to-programming",
    title: "Intro to Programming",
    issuer: "Kaggle",
    issued_at: "2026-08-07",
    valid_until: null,
    credential_id: null,
    credential_url:
      "https://www.kaggle.com/learn/certification/bernardiwilbert/intro-to-programming",
    pdf_url: "/certificates/kaggle-intro-to-programming.pdf",
    page_urls: pages("kaggle-intro-to-programming", 1),
    sort_order: 3,
  },
].map((certificate) => ({ ...certificate, published: true }));

async function upsert(table, rows) {
  const { error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: "slug" });

  if (error) {
    console.error(`  failed: ${error.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`  ${rows.length} rows`);
}

async function main() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("SUPABASE_SERVICE_ROLE_KEY is not set in .env.local");
    process.exit(1);
  }

  console.log("projects");
  await upsert("projects", projects);
  console.log("certificates");
  await upsert("certificates", certificates);
  console.log("\nDone. Check /projects and /certificates.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
