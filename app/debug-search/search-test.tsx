"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface SearchResult {
  url: string
  title: string
  relevance: number
  sectionTitle?: string
  description: string
  matchContext?: string
  category: string
  tags: string[]
}

export function SearchTest() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError(null)
    setDebugInfo(`Searching for: "${searchQuery.trim()}"...`)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`)

      if (!response.ok) {
        throw new Error(`Search API returned ${response.status}: ${response.statusText}`)
      }

      const data: SearchResult[] = await response.json()
      
      setResults(data)
      setDebugInfo(
        `Search complete. Found ${data.length} results for "${searchQuery.trim()}"\n\n` +
          `The search looks for exact matches of your query in all LaTeX files.`,
      )
    } catch (error) {
      console.error("Search error:", error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      setError(errorMessage)
      setDebugInfo(`Error searching: ${errorMessage}`)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Test Tool</CardTitle>
          <CardDescription>Test the search functionality with detailed results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Enter search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>

          <Textarea
            readOnly
            value={debugInfo}
            className="min-h-[100px] font-mono text-sm"
            placeholder="Debug information will appear here..."
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {`Found ${results.length} results for "${searchQuery}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={result.url} className="text-lg font-medium hover:underline">
                      {result.title}
                    </Link>
                    <Badge variant="outline">Relevance: {result.relevance}</Badge>
                  </div>

                  {result.sectionTitle && (
                    <div className="mb-2">
                      <Badge variant="secondary">Section: {result.sectionTitle}</Badge>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mb-2">{result.description}</p>

                  {result.matchContext && (
                    <div className="bg-muted p-2 rounded text-sm font-mono mt-2 whitespace-pre-wrap">
                      <p className="text-xs text-muted-foreground mb-1">Match context:</p>
                      {result.matchContext}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {result.category}
                    </Badge>
                    {result.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-2 text-xs text-muted-foreground">
                    <p>URL: {result.url}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Click on a result title to navigate to that page</p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}