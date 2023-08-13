export default function manifest() {
  return {
    name: "Supadraw",
    short_name: "Supadraw",
    description: "Supadraw",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
