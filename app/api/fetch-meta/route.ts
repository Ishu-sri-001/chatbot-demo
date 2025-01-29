import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()

    // Simple regex to extract meta description
    const metaMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)
    const metaDescription = metaMatch ? metaMatch[1] : ""

    return NextResponse.json({ metaDescription })
  } catch (error) {
    console.error("Error fetching meta description:", error)
    return NextResponse.json({ error: "Failed to fetch meta description" }, { status: 500 })
  }
}

