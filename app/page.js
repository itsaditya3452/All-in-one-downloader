import { Instagram, Facebook, Zap, ShieldCheck, Sparkles, Gauge } from "lucide-react";
import DownloaderTool from "./components/DownloaderTool";
import FAQ from "./components/FAQ";

export const metadata = {
  title: "Free All-in-One Video Downloader — Instagram Reels & Facebook",
  description:
    "Download Instagram Reels and Facebook videos free in HD. No app, no watermark, no sign-up — just paste a link and download.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <header className="border-b border-white/5">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5"
        >
          <a href="/" className="font-display text-xl font-bold tracking-tight">
            Snap<span className="text-violet-400">Grab</span>
          </a>
          <ul className="hidden gap-6 text-sm text-slate-400 sm:flex">
            <li>
              <a href="/instagram-downloader" className="hover:text-violet-300 transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="/facebook-downloader" className="hover:text-violet-300 transition-colors">
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="relative px-4 pb-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-medium text-violet-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              100% Free · No App Needed · HD Quality
            </span>

            <h1 className="font-display mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Download{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Instagram Reels
              </span>{" "}
              &amp; Facebook Videos
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
              Paste any video link below to download Instagram Reels and
              Facebook videos free, in HD, with no watermark.
            </p>

            <div className="mt-10">
              <DownloaderTool platformHint="Instagram or Facebook" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-5 text-slate-500">
              <Instagram className="h-5 w-5" aria-hidden="true" />
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="font-display text-center text-3xl font-bold">
            How to Download Videos in 3 Steps
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Copy the video link",
                desc: "Open Instagram or Facebook, tap Share, then Copy Link on the Reel or video you want.",
              },
              {
                step: "2",
                title: "Paste it above",
                desc: "Paste the link into the download box and hit the Download button to fetch the video.",
              },
              {
                step: "3",
                title: "Save in HD",
                desc: "Preview the video details and tap Save Video to download it to your device instantly, no watermark.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <span className="font-display text-3xl font-bold text-violet-400">
                  {s.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="font-display text-center text-3xl font-bold">
            Why Use Our Video Downloader
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "Blazing Fast",
                desc: "Fetch and download videos in seconds with our optimized backend.",
              },
              {
                icon: ShieldCheck,
                title: "Safe & Private",
                desc: "We don't store your videos or personal data. Every download is processed on the fly.",
              },
              {
                icon: Gauge,
                title: "HD Quality",
                desc: "Get the highest available resolution for Reels and Facebook videos.",
              },
              {
                icon: Sparkles,
                title: "No Watermark",
                desc: "Clean downloads with no logos or watermarks added to your saved video.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-violet-500/30"
              >
                <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQ />
      </main>

      <footer className="border-t border-white/5 py-10 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SnapGrab. For personal use only. Respect creators&apos; rights.</p>
      </footer>
    </>
  );
}
