import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const PLATFORM_PATTERNS = {
  instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:reel|p|tv)\/[A-Za-z0-9_-]+/i,
  facebook:
    /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\/[A-Za-z0-9./?=&_-]+/i,
};

function detectPlatform(url) {
  if (PLATFORM_PATTERNS.instagram.test(url)) return "instagram";
  if (PLATFORM_PATTERNS.facebook.test(url)) return "facebook";
  return null;
}

function isValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Request body must be valid JSON." },
        { status: 400 }
      );
    }

    const { url } = body || {};

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing required field: url." },
        { status: 400 }
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { success: false, error: "The provided URL is not valid." },
        { status: 400 }
      );
    }

    const platform = detectPlatform(url);

    if (!platform) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unsupported URL. Please paste a valid Instagram or Facebook video link.",
        },
        { status: 400 }
      );
    }

    const backendUrl = process.env.DOWNLOAD_BACKEND_URL;
    if (!backendUrl) {
      console.error("[/api/download] DOWNLOAD_BACKEND_URL is not set.");
      return NextResponse.json(
        {
          success: false,
          error: "Downloader backend is not configured yet. Please try again later.",
        },
        { status: 500 }
      );
    }

    const backendRes = await fetch(`${backendUrl}/extract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": process.env.BACKEND_SECRET || "",
      },
      body: JSON.stringify({ url }),
      // Render free tier can cold-start after idling; give it real room.
      signal: AbortSignal.timeout(28000),
    });

    const backendJson = await backendRes.json();

    if (!backendRes.ok || !backendJson.success) {
      return NextResponse.json(
        { success: false, error: backendJson.error || "Could not fetch this video." },
        { status: backendRes.status || 502 }
      );
    }

    return NextResponse.json(
      { success: true, data: { platform, sourceUrl: url, ...backendJson.data } },
      { status: 200 }
    );
  } catch (err) {
    console.error("[/api/download] Error:", err);
    const isTimeout = err.name === "TimeoutError" || err.name === "AbortError";
    return NextResponse.json(
      {
        success: false,
        error: isTimeout
          ? "The backend took too long to respond (it may be waking up from sleep — try again in ~30 seconds)."
          : "Something went wrong. Please try again.",
      },
      { status: isTimeout ? 504 : 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
