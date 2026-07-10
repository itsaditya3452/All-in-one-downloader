import { Zap, ShieldCheck, Sparkles } from "lucide-react";
import DownloaderTool from "../components/DownloaderTool";
import FAQ from "../components/FAQ";

export const metadata = {
  title: "Download Instagram Reels Free — HD Instagram Video Downloader",
  description:
    "Download Instagram Reels and videos free in HD, no watermark, no app, no login. Paste your Instagram Reel link and save it instantly.",
  alternates: {
    canonical: "/instagram-downloader",
  },
};

const faqItems = [
  {
    question: "How do I download an Instagram Reel for free?",
    answer:
      "Open the Reel in the Instagram app, tap Share, then Copy Link. Paste that link into the box above and tap Download to save the Reel in HD.",
  },
  {
    question: "Can I download private Instagram Reels?",
    answer:
      "No. This Instagram Reels downloader only works on public posts and Reels. Private account content cannot be downloaded.",
  },
  {
    question: "Will the Instagram video have a watermark?",
    answer:
      "No, Reels downloaded here come without any added watermark or logo, in the original quality Instagram serves the video.",
  },
  {
    question: "Does this work for Instagram photos too?",
    answer:
      "This tool is built for downloading Instagram Reels and videos. Photo-only posts are not supported.",
  },
];

export default function InstagramDownloaderPage() {
  return (
    <>
      <header className="border-b border-white/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <a href="/" className="font-display text-xl font-bold tracking-tight">
            Snap<span className="text-violet-400">Grab</span>
          </a>
          <ul className="hidden gap-6 text-sm text-slate-400 sm:flex">
            <li><a href="/instagram-downloader" className="text-violet-300">Instagram</a></li>
            <li><a href="/facebook-downloader" className="hover:text-violet-300 transition-colors">Facebook</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="px-4 pb-16 pt-16 sm:pt-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-medium text-violet-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Free Instagram Reels Downloader
          </span>

          <h1 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Download{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Instagram Reels
            </span>{" "}
            Free in HD
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
            Paste any public Instagram Reel or video link to download it in HD,
            free, with no watermark and no app install.
          </p>

          <div className="mt-10">
            <DownloaderTool platformHint="Instagram Reel" />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="font-display text-center text-3xl font-bold">
            How to Save an Instagram Reel
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Copy the Reel link", desc: "Open the Instagram Reel, tap the Share icon, then tap Copy Link." },
              { step: "2", title: "Paste it above", desc: "Paste the copied Instagram link into the download box on this page." },
              { step: "3", title: "Download in HD", desc: "Tap Download, then Save Video to store the Reel on your device." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="font-display text-3xl font-bold text-violet-400">{s.step}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="font-display text-center text-3xl font-bold">
            Why Use Our Instagram Reels Downloader
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Zap, title: "Instant Download", desc: "Fetch Instagram Reels in seconds, no waiting or app install required." },
              { icon: ShieldCheck, title: "No Login Needed", desc: "We never ask for your Instagram credentials or account access." },
              { icon: Sparkles, title: "No Watermark", desc: "Every downloaded Reel is clean, with no branding added on top." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQ items={faqItems} title="Instagram Reels Downloader — FAQ" />
      </main>

      <footer className="border-t border-white/5 py-10 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SnapGrab. For personal use only. Respect creators&apos; rights.</p>
      </footer>
    </>
  );
}
