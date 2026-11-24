/**
 * CYBERX SOFT
 * GALLERY DATA  (Creative Media, Design & Animation gallery)
 *
 * HOW TO ADD WORK
 * Copy any item below and edit it. Fields:
 *   id          unique, lowercase, no spaces
 *   title       shown on the card and in the viewer
 *   category    "2D Animation" | "Motion Graphics" | "Video" | "Posters & Design"
 *               (a new category name automatically gets its own filter button)
 *   type        "video" or "image"
 *   ratio       "wide" | "portrait" | "square"   (card shape, optional)
 *   thumb       (optional for YouTube) Cloudinary image public ID used as the card picture
 *   image       (type "image")  Cloudinary public ID, full https:// URL,
 *               or a site path such as "/logos/name.png"
 *   video       (type "video")  one of:
 *                 { source: "cloudinary", id: "folder/video-public-id" }
 *                 { source: "file",       src: "https://.../video.mp4" }
 *                 { source: "youtube",    id: "YOUTUBE_VIDEO_ID" }
 *               YouTube items get their thumbnail automatically. Add `thumb`
 *               only if you want a custom card picture.
 *   caseStudy   (optional) id from workData.js, adds a "Read the case study" link
 *   draft       (optional) true = hidden from the live page.
 *               Remove this line once the item has REAL media and text.
 *
 * To preview the draft placeholders locally, set SHOW_DRAFTS to true.
 * Always set it back to false before committing.
 */

const SHOW_DRAFTS = false;

const CLOUD_NAME = "uao8z2fi";
const IMG = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
const VID = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

/* ---------- Media helpers ---------- */

/* Full URLs and site paths (like /logos/x.png) are used as they are.
   Anything else is treated as a Cloudinary public ID. */
export const cloudImage = (id, width = 900) =>
  /^(https?:|\/)/i.test(id) ? id : `${IMG}/f_auto,q_auto,c_limit,w_${width}/${id}`;

export const cloudVideoThumb = (id, width = 900) =>
  `${VID}/so_1,c_limit,w_${width},f_jpg,q_auto/${id}.jpg`;

/* YouTube gives every video a free thumbnail.
   If a video has no HD one, change "maxresdefault" to "hqdefault". */
export const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export function getThumb(item, width = 900) {
  if (item.thumb) return cloudImage(item.thumb, width);
  if (item.type === "image" && item.image) return cloudImage(item.image, width);
  if (item.video?.source === "youtube") return youtubeThumb(item.video.id);
  if (item.video?.source === "cloudinary") return cloudVideoThumb(item.video.id, width);
  return null;
}

export const getFullImage = (item) => cloudImage(item.image, 1600);

export function getVideoSrc(video) {
  if (!video) return "";
  if (video.source === "cloudinary") return `${VID}/f_auto,q_auto/${video.id}`;
  if (video.source === "file") return video.src;
  return "";
}

/* ---------- Page content ---------- */

export const galleryHero = {
  eyebrow: "Creative Gallery",
  title: "Animation and creative work, *in motion*",
  description:
    "Browse a selection of 2D animation, motion graphics, video, and poster design produced by the CyberX Soft creative team.",
};

export const galleryIntro = {
  label: "Creative gallery",
  title: "Selected *animation, motion* and design work",
  description:
    "Filter by category and open any piece to watch it or view it full size. Where a piece belongs to a published project, the viewer links to its case study.",
};

export const galleryCta = {
  title: "Want creative work like *this* for your brand?",
  description:
    "Tell us what you want to explain, launch, or bring to life. We can help define the format, scope, and a practical starting point.",
  buttonLabel: "Book a Consultation",
  buttonPath: "/contact",
};

/* Sample videos (open-source animated shorts) are used only as placeholders. */
const SAMPLE = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

const allItems = [
  /* ---------- 2D Animation ---------- */
  {
    id: "zara-aur-mimo-series",
    title: "Zara aur Mimo · Animated Series",
    category: "2D Animation",
    type: "video",
    ratio: "wide",
    description:
      "Short animated stories addressing social attitudes around children's and girls' education in Punjab through relatable family storytelling.",
    video: { source: "youtube", id: "hiw80NYqRrE" },
    caseStudy: "zara-aur-mimo",
  },
  {
    id: "khwabon-wala-darwaza-teaser",
    title: "Khwabon Wala Darwaza · Series Teaser",
    category: "2D Animation",
    type: "video",
    ratio: "wide",
    description:
      "An original Pakistani children's fantasy following seven-year-old Reemoo as she discovers a magical door guarded by glowing fireflies.",
    video: { source: "youtube", id: "Dir2RflvVdY" },
    caseStudy: "khwabon-wala-darwaza",
  },
  {
    id: "sample-character-sheet",
    draft: true,
    title: "Sample · Character Design Sheet",
    category: "2D Animation",
    type: "image",
    ratio: "portrait",
    description: "Sample item. Replace with a real character or storyboard sheet.",
    image: "brand-hero",
  },

  /* ---------- Motion Graphics ---------- */
  {
    id: "sample-explainer",
    draft: true,
    title: "Sample · Explainer Animation",
    category: "Motion Graphics",
    type: "video",
    ratio: "wide",
    description: "Sample item. Replace with a real explainer or product animation.",
    thumb: "software-hero",
    video: { source: "file", src: `${SAMPLE}/Sintel.mp4` }, // SAMPLE VIDEO: replace
  },
  {
    id: "sample-logo-reveal",
    draft: true,
    title: "Sample · Brand Logo Reveal",
    category: "Motion Graphics",
    type: "video",
    ratio: "wide",
    description: "Sample item. Replace with a real logo or identity animation.",
    thumb: "data-hero",
    video: { source: "file", src: `${SAMPLE}/TearsOfSteel.mp4` }, // SAMPLE VIDEO: replace
  },
  {
    id: "sample-social-pack",
    draft: true,
    title: "Sample · Social Motion Pack",
    category: "Motion Graphics",
    type: "image",
    ratio: "square",
    description: "Sample item. Replace with real social-media motion frames.",
    image: "data-crystal",
  },

  /* ---------- Posters & Design ---------- */
  {
    id: "mod-it-poster-series",
    draft: true, // remove this line once the real poster image is on Cloudinary
    title: "MOD IT Department · Institutional Poster Series",
    category: "Posters & Design",
    type: "image",
    ratio: "portrait",
    description:
      "Visual communication systems that translate complex institutional directives into high-impact posters readable at a glance.",
    image: "brand-section", // SAMPLE IMAGE: replace with the real poster
    caseStudy: "mod-it-department",
  },
  {
    id: "sample-campaign-poster",
    draft: true,
    title: "Sample · Campaign Poster",
    category: "Posters & Design",
    type: "image",
    ratio: "portrait",
    description: "Sample item. Replace with a real campaign poster.",
    image: "talent-hero",
  },
  {
    id: "sample-event-poster",
    draft: true,
    title: "Sample · Event Poster",
    category: "Posters & Design",
    type: "image",
    ratio: "square",
    description: "Sample item. Replace with a real event or editorial poster.",
    image: "software-section",
  },

  /* ---------- Video ---------- */
  {
    id: "sample-product-video",
    draft: true,
    title: "Sample · Product Video",
    category: "Video",
    type: "video",
    ratio: "wide",
    description: "Sample item. Replace with a real product or promo video.",
    thumb: "data-section",
    video: { source: "file", src: `${SAMPLE}/ElephantsDream.mp4` }, // SAMPLE VIDEO: replace
  },
  {
    id: "sample-brand-film",
    draft: true,
    title: "Sample · Brand Film",
    category: "Video",
    type: "video",
    ratio: "wide",
    description: "Sample item. Replace with a real brand or corporate film.",
    thumb: "talent-section",
    video: { source: "file", src: `${SAMPLE}/Sintel.mp4` }, // SAMPLE VIDEO: replace
  },
];

/* Only published items reach the page. */
export const galleryItems = allItems.filter((item) => SHOW_DRAFTS || !item.draft);

/* ---------- Categories (built automatically from the visible items) ---------- */

const categoryOrder = ["2D Animation", "Motion Graphics", "Video", "Posters & Design"];
const present = [...new Set(galleryItems.map((item) => item.category))];

export const galleryCategories = [
  "All",
  ...categoryOrder.filter((c) => present.includes(c)),
  ...present.filter((c) => !categoryOrder.includes(c)),
];