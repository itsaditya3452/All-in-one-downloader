import express from "express";
import { execFile } from "child_process";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;
// Shared secret so random people on the internet can't hammer your free
// Render instance. Must match BACKEND_SECRET set in the Vercel project.
const API_SECRET = process.env.API_SECRET || "";

// Only Instagram and Facebook are supported — reject anything else
// (including YouTube) before it ever reaches yt-dlp.
const ALLOWED_HOSTS = [
  "instagram.com",
  "www.instagram.com",
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
  "fb.watch",
];

function isAllowedHost(url) {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_HOSTS.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

function runYtDlp(args) {
  return new Promise((resolve, reject) => {
    execFile(
      "yt-dlp",
      args,
      { maxBuffer: 1024 * 1024 * 20, timeout: 45000 },
      (err, stdout, stderr) => {
        if (err) return reject(new Error(stderr?.trim() || err.message));
        resolve(stdout);
      }
    );
  });
}

function formatDuration(totalSeconds) {
  const s = Math.round(Number(totalSeconds) || 0);
  const m = Math.floor(s / 60);
  const sec = String(s % 60).padStart(2, "0");
  return `${m}:${sec}`;
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/extract", async (req, res) => {
  if (API_SECRET) {
    const provided = req.headers["x-api-secret"];
    if (provided !== API_SECRET) {
      return res.status(401).json({ success: false, error: "Unauthorized." });
    }
  }

  const { url } = req.body || {};

  if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url)) {
    return res.status(400).json({ success: false, error: "A valid URL is required." });
  }

  if (!isAllowedHost(url)) {
    return res.status(400).json({
      success: false,
      error: "Only Instagram and Facebook links are supported.",
    });
  }

  try {
    // -f picks a single progressive (video+audio) format so we get one
    // direct playable URL back, rather than separate video/audio streams.
    // --no-playlist guards against a link that resolves to a playlist.
    const stdout = await runYtDlp([
      "-f",
      "best[ext=mp4]/best",
      "-j",
      "--no-playlist",
      "--no-warnings",
      url,
    ]);

    const info = JSON.parse(stdout.trim().split("\n")[0]);

    const downloadUrl =
      info.url ||
      info.requested_downloads?.[0]?.url ||
      info.formats?.[info.formats.length - 1]?.url;

    if (!downloadUrl) {
      return res.status(500).json({
        success: false,
        error: "Couldn't find a downloadable stream for this video.",
      });
    }

    return res.json({
      success: true,
      data: {
        title: info.title || "Video",
        thumbnail: info.thumbnail || "",
        downloadUrl,
        duration: info.duration ? formatDuration(info.duration) : "N/A",
      },
    });
  } catch (err) {
    console.error("[/extract] yt-dlp error:", err.message);
    return res.status(500).json({
      success: false,
      error:
        "Couldn't extract this video. It may be private, removed, or the link is invalid.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`yt-dlp backend listening on port ${PORT}`);
});
