import { Zap, ShieldCheck, Sparkles } from "lucide-react";
import DownloaderTool from "../components/DownloaderTool";
import FAQ from "../components/FAQ";

export const metadata = {
  title: "Facebook Video Downloader HD — Free Facebook Video Downloader",
  description:
    "Download Facebook videos free in HD quality. No app, no login, no watermark. Paste your Facebook video link and download instantly.",
  alternates: {
    canonical: "/facebook-downloader",
  },
};

const faqItems = [
  {
    question: "How do I download a Facebook video in HD?",
    answer:
      "Open the Facebook video, tap the three-dot menu, copy the video link, then paste it into the box above and tap Download.",
  },
  {
    question: "Can I download private Facebook videos?",
    answer:
      "No, only publicly available Facebook videos can be downloaded. Private groups or profile-restricted videos are not supported.",
  },
  {
    question: "Is this Facebook video downloader free?",
    answer:
      "Yes, downloading Facebook videos through this tool is completely free with no watermark added.",
  },
  {
    question: "Does it work for Facebook Reels and Watch videos?",
    answer:
      "Yes, public Facebook Reels and Watch videos can both be downloaded using the same link-paste method.",
  },
];

export default function FacebookDownloaderPage() {
  return (
    <>
      <header className="border-b border-white/5">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <a href="/" className="font-display text-xl font-bold tracking-tight">
            Snap<span className="text-violet-400">Grab</span>
          </a>
          <ul className="hidden gap-6 text-sm text-slate-400 sm:flex">
            <li><a href="/instagram-downloader" className="hover:text-violet-300 transition-colors">Instagram</a></li>
            <li><a href="/facebook-downloader" className="text-violet-300">Facebook</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="px-4 pb-16 pt-16 sm:pt-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-medium text-violet-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Free Facebook Video Downloader
          </span>

          <h1 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Facebook Video Downloader
            </span>{" "}
            HD, Free
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
            Paste any public Facebook video link to download it in HD, free,
            with no watermark and no app install.
          </p>

          <div className="mt-10">
            <DownloaderTool platformHint="Facebook video" />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="font-display text-center text-3xl font-bold">
            How to Download a Facebook Video
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Copy the video link", desc: "Open the Facebook video, tap the three-dot menu, then Copy Link." },
              { step: "2", title: "Paste it above", desc: "Paste the Facebook link into the download box on this page." },
              { step: "3", title: "Download in HD", desc: "Tap Download, then Save Video to store it on your device." },
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
            Why Use Our Facebook Video Downloader
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Zap, title: "Quick Fetch", desc: "Facebook videos are fetched and ready to save within seconds." },
              { icon: ShieldCheck, title: "No Login Needed", desc: "We never ask for your Facebook account credentials." },
              { icon: Sparkles, title: "No Watermark", desc: "Downloaded Facebook videos stay clean, with no added branding." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQ items={faqItems} title="Facebook Video Downloader — FAQ" />
      </main>

      <footer className="border-t border-white/5 py-10 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SnapGrab. For personal use only. Respect creators&apos; rights.</p>
      </footer>
    </>
  );
}
