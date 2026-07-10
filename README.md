# SnapGrab — Instagram & Facebook Video Downloader

Two parts:
- **Frontend** (this root folder): Next.js 14 + Tailwind, deployed on **Vercel**.
- **Backend** (`/backend`): a small Express server that wraps `yt-dlp` (free, open-source, actively maintained) to extract Instagram Reels and Facebook videos. Deployed on **Render.com's free tier**, since it needs a persistent process, Python, and ffmpeg — things Vercel serverless functions don't give you.

## Step 1 — Deploy the backend (Render)

1. Push this whole project (including the `backend/` folder) to a GitHub repo.
2. Go to [render.com](https://render.com) → **New +** → **Web Service** → connect your repo.
3. Set **Root Directory** to `backend`.
4. Environment: **Docker** (Render will auto-detect the `Dockerfile`).
5. Instance type: **Free**.
6. Add an environment variable: `API_SECRET` = any random string you make up. Save it — you'll need it again in Step 2.
7. Deploy. Once live, copy the service URL, e.g. `https://snapgrab-backend.onrender.com`.
8. Test it directly: `curl https://snapgrab-backend.onrender.com/health` should return `{"ok":true}`.

**Free tier cold starts:** Render's free web services sleep after ~15 minutes of no traffic and take 30–50 seconds to wake up on the next request. The first download after a quiet period will be slow or may time out once — expected, not a bug.

## Step 2 — Deploy the frontend (Vercel)

```bash
npm install
npm run dev   # test locally first
```

1. Push to GitHub (if not already).
2. Import the repo on [vercel.com](https://vercel.com). Vercel auto-detects Next.js — leave Root Directory as the project root (not `backend`).
3. In **Project Settings → Environment Variables**, add:
   - `DOWNLOAD_BACKEND_URL` = the Render URL from Step 1 (no trailing slash)
   - `BACKEND_SECRET` = the exact same string you set as `API_SECRET` on Render
4. Deploy.

## Before Deploying (SEO)

1. `SITE_URL` in `app/layout.js`, `baseUrl` in `app/sitemap.js`, and the Sitemap line in `public/robots.txt` are set to `https://snapgrap.vercel.app`. Update all three if you get a custom domain.
2. Placeholder `favicon.ico`, `icon.png`, and `og-image.png` are in `public/` — swap for real branded versions later.
3. All pages export their own `metadata` for unique titles/descriptions.

## How it works

`app/api/download/route.js` on Vercel validates the URL and detects the platform (Instagram or Facebook only), then forwards the request to your Render backend's `/extract` endpoint, which runs `yt-dlp` and returns `{ title, thumbnail, downloadUrl, duration }`. The "Save Video" button routes through `app/api/proxy-download/route.js`, which streams the video back with a `Content-Disposition: attachment` header so it downloads directly instead of opening in a new tab.

## Known Limitations

- Works on **public content only** — private accounts/videos will never work, by design of the platforms.
- Occasional failures are possible (private/removed content, or a platform-side change yt-dlp hasn't patched yet). The Dockerfile installs the latest `yt-dlp` fresh on every build, so redeploying periodically keeps it current. If a fix doesn't seem to take effect after pushing, try Render's **Manual Deploy → Clear build cache & deploy** to force a completely fresh build.
- Instagram/Facebook are both scraped via public page data — no login is used or required, but this means very large accounts' rate limits or platform markup changes can occasionally cause temporary failures.
