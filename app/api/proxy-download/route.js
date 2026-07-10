import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get("url");
  const rawName = searchParams.get("filename") || "video";

  if (!videoUrl || !isValidHttpUrl(videoUrl)) {
    return NextResponse.json({ error: "Missing or invalid url." }, { status: 400 });
  }

  // Strip anything that isn't safe in a filename.
  const safeName = rawName.replace(/[^a-zA-Z0-9._ -]/g, "").trim() || "video";

  try {
    const upstream = await fetch(videoUrl);

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Could not fetch the video from its source." },
        { status: 502 }
      );
    }

    const headers = new Headers();
    headers.set("Content-Type", upstream.headers.get("content-type") || "video/mp4");
    headers.set("Content-Disposition", `attachment; filename="${safeName}.mp4"`);
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) headers.set("Content-Length", contentLength);

    return new Response(upstream.body, { status: 200, headers });
  } catch (err) {
    console.error("[/api/proxy-download] Error:", err);
    return NextResponse.json({ error: "Download failed. Please try again." }, { status: 500 });
  }
}
