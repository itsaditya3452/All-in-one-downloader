"use client";

import { useState } from "react";
import { Download, Clipboard, Loader2 } from "lucide-react";

export default function DownloaderTool({ platformHint = "" }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      setError("Couldn't read clipboard. Please paste the link manually.");
    }
  }

  async function handleDownload(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!url.trim()) {
      setError("Please paste a video link first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(json.data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleDownload}
        className="glow-border relative flex flex-col gap-3 rounded-2xl bg-white/5 p-2 backdrop-blur-sm sm:flex-row"
      >
        <label htmlFor="video-url" className="sr-only">
          Paste {platformHint} video link
        </label>
        <input
          id="video-url"
          type="text"
          inputMode="url"
          autoComplete="off"
          placeholder={`Paste ${platformHint} video link here…`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full flex-1 rounded-xl bg-transparent px-4 py-4 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none sm:text-base"
        />
        <div className="flex gap-2 px-1 pb-1 sm:px-0 sm:pb-0">
          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
          >
            <Clipboard className="h-4 w-4" aria-hidden="true" />
            Paste
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 sm:min-w-[140px]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Fetching…
              </>
            ) : (
              <>
                <Download className="h-4 w-4" aria-hidden="true" />
                Download
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <p role="alert" className="mt-6 text-center text-sm font-medium text-rose-400">
          {error}
        </p>
      )}

      {loading && (
        <div className="mx-auto mt-8 max-w-md animate-pulse rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex gap-4">
            <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-white/10" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/10" />
              <div className="h-8 w-24 rounded bg-white/10" />
            </div>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-cyan-400/20 bg-white/5 p-4 text-left backdrop-blur-sm">
          <div className="flex gap-4">
            <img
              src={result.thumbnail}
              alt={result.title}
              width={96}
              height={96}
              className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
            />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="line-clamp-2 text-sm font-medium text-slate-100">
                  {result.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Duration: {result.duration} · {result.platform}
                </p>
              </div>
                <a
                  href={`/api/proxy-download?url=${encodeURIComponent(
                    result.downloadUrl
                  )}&filename=${encodeURIComponent(result.title || "video")}`}
                  className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-2 text-xs font-semibold text-white"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Save Video
                </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
