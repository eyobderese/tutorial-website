"use client"

import type React from "react"
import { SearchTest } from "./search-test"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function DebugSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [debugInfo, setDebugInfo] = useState("")

  const handleDirectSearch = () => {
    if (searchQuery.trim()) {
      const url = `/search?q=${encodeURIComponent(searchQuery.trim())}&type=${searchType}`
      window.location.href = url
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const url = `/search?q=${encodeURIComponent(searchQuery.trim())}&type=${searchType}`
      setDebugInfo(`Form submitted. Redirecting to: ${url}`)
      window.location.href = url
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Debug Search</h1>
          <p className="text-muted-foreground">
            This page helps debug search functionality by providing detailed search results and diagnostics.
          </p>
        </div>

        <SearchTest />

        <Card>
          <CardHeader>
            <CardTitle>Direct Link Navigation</CardTitle>
            <CardDescription>Test search by directly navigating to the search URL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="sm:col-span-3">
                <Input
                  type="search"
                  placeholder="Enter search query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="tutorial">Tutorials</option>
                  <option value="algorithm">Algorithms</option>
                  <option value="formula">Formulas</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDirectSearch}>Search Directly</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Submission</CardTitle>
            <CardDescription>Test search using a traditional form submission</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="sm:col-span-3">
                  <Input
                    type="search"
                    placeholder="Enter search query..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    name="q"
                  />
                </div>
                <div>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    name="type"
                  >
                    <option value="all">All</option>
                    <option value="tutorial">Tutorials</option>
                    <option value="algorithm">Algorithms</option>
                    <option value="formula">Formulas</option>
                  </select>
                </div>
              </div>
              <Button type="submit">Submit Form</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traditional Form</CardTitle>
            <CardDescription>Test search using a traditional HTML form with action attribute</CardDescription>
          </CardHeader>
          <CardContent>
            <form action="/search" method="get" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="sm:col-span-3">
                  <Input type="search" placeholder="Enter search query..." name="q" />
                </div>
                <div>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2" name="type">
                    <option value="all">All</option>
                    <option value="tutorial">Tutorials</option>
                    <option value="algorithm">Algorithms</option>
                    <option value="formula">Formulas</option>
                  </select>
                </div>
              </div>
              <Button type="submit">Submit Traditional Form</Button>
            </form>
          </CardContent>
        </Card>

        {debugInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea readOnly value={debugInfo} className="min-h-[100px]" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
