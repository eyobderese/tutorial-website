"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim()) {
      try {
        setIsSearching(true)
        console.log("Searching for:", query.trim())

        // Fetch search results
        const response = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)

        if (!response.ok) {
          throw new Error(`Search API returned ${response.status}: ${response.statusText}`)
        }

        const results = await response.json()

        console.log("Search results:", results)

        // If there are results, navigate to the first one
        if (results && results.length > 0) {
          // The URL already includes the section ID as a hash
          router.push(results[0].url)
        } else {
          // If no results, show a message or navigate to a "no results" page
          router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
      } catch (error) {
        console.error("Search error:", error)
        // Fallback to search page if API fails
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      } finally {
        setIsSearching(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        type="search"
        placeholder="Search tutorials..."
        className="w-full pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
        disabled={isSearching}
      />
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3"
        disabled={isSearching}
      >
        {isSearching ? "Searching..." : "Search"}
      </Button>
    </form>
  )
}
