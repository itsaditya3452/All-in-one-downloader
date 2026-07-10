"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * SEO-optimized FAQ accordion.
 * Pass `items` as an array of { question, answer } objects so each
 * page (home, /instagram-downloader, /facebook-downloader)
 * can supply its own keyword-relevant Q&A while reusing this component.
 * Renders visible <h3> questions (good for E-E-A-T / on-page SEO) and
 * emits matching FAQPage JSON-LD so Google can show rich results.
 */
export default function FAQ({
  items = defaultFAQItems,
  title = "Frequently Asked Questions",
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-3xl px-4 py-16">
      <h2
        id="faq-heading"
        className="font-display text-3xl font-bold text-center mb-10 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
      >
        {title}
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              <h3 className="m-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-slate-100 hover:text-violet-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-cyan-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${index}`}
                role="region"
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-400">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

export const defaultFAQItems = [
  {
    question: "Is this Instagram Reels and Facebook video downloader really free?",
    answer:
      "Yes. You can download Instagram Reels and Facebook videos for free, with no hidden charges, no sign-up, and no download limits.",
  },
  {
    question: "Do I need to install an app to download videos?",
    answer:
      "No app install is required. This is a fully web-based downloader that works directly in your mobile or desktop browser on any operating system.",
  },
  {
    question: "Will the downloaded video have a watermark?",
    answer:
      "No. Videos are downloaded in their original HD quality without any added watermark, so you get a clean file ready to save or repost.",
  },
  {
    question: "Is it legal to download videos from Instagram or Facebook?",
    answer:
      "Downloading is intended for personal, offline use or content you own the rights to. Please respect copyright and each platform's terms of service before redistributing any video.",
  },
  {
    question: "Why did my video download fail?",
    answer:
      "This usually happens with private accounts, deleted posts, or an incorrectly copied link. Double-check the URL is public and try pasting it again.",
  },
];
