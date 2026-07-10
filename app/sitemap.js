export default function sitemap() {
  const baseUrl = "https://snapgrap.vercel.app"; // TODO: update to your real domain

  const routes = ["", "/instagram-downloader", "/facebook-downloader"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    })
  );

  return routes;
}
