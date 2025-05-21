import { searchRawLatexFiles } from "@/lib/search"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  console.log("Search API called with query:", query)

  try {
    // Search through LaTeX files
    const results = await searchRawLatexFiles(query)

    console.log(`Found ${results.length} results for query "${query}"`)

    // Return the results as JSON
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error in search API:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
