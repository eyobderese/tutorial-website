import fs from "fs/promises"
import path from "path"

// Define a type for search results
export type SearchResult = {
  type: "tutorial" | "algorithm" | "formula"
  title: string
  description: string
  category: string
  tags: string[]
  date?: string
  slug: string
  url: string
  relevance: number
  sectionId?: string
  sectionTitle?: string
  matchContext?: string
}

// Search through raw LaTeX files - this is the main search function
export async function searchRawLatexFiles(query: string): Promise<SearchResult[]> {
  if (!query || query.trim() === "") return []

  // Normalize the search query
  const normalizedQuery = query.toLowerCase().trim()

  // Path to the tutorials directory
  const tutorialsDirectory = path.join(process.cwd(), "tutorials")

  try {
    // Check if directory exists
    try {
      await fs.access(tutorialsDirectory)
    } catch (e) {
      console.error(`Tutorials directory does not exist or ${e}`)
      return []
    }

    // Get all .tex files
    const files = await fs.readdir(tutorialsDirectory)
    const texFiles = files.filter((file) => file.endsWith(".tex"))

    console.log(`Found ${texFiles.length} .tex files to search`)

    const results: SearchResult[] = []

    // Search through each file
    for (const file of texFiles) {
      try {
        const filePath = path.join(tutorialsDirectory, file)
        const content = await fs.readFile(filePath, "utf8")
        const slug = file.replace(/\.tex$/, "")

        console.log(`Searching in file: ${file}`)

        // If the query doesn't appear anywhere in the file, skip it
        if (!content.toLowerCase().includes(normalizedQuery)) {
          console.log(`Query "${normalizedQuery}" not found in ${file}`)
          continue
        }

        console.log(`Query "${normalizedQuery}" found in ${file}`)

        // Extract basic metadata
        let title = slug
        let description = ""
        let category = "Uncategorized"
        let tags: string[] = []
        let date = ""
        let relevance = 1 // Start with base relevance since we found a match
        let sectionId: string | undefined = undefined
        let sectionTitle: string | undefined = undefined
        let matchContext: string | undefined = undefined

        // Extract title
        const titleMatch = content.match(/\\title\{([^}]+)\}/)
        if (titleMatch) {
          title = titleMatch[1]

          // Check if query is in title (higher relevance)
          if (title.toLowerCase().includes(normalizedQuery)) {
            relevance += 10
          }
        }

        // Extract category
        const categoryMatch = content.match(/\\category\{([^}]+)\}/)
        if (categoryMatch) {
          category = categoryMatch[1]

          // Check if query is in category (higher relevance)
          if (category.toLowerCase().includes(normalizedQuery)) {
            relevance += 5
          }
        }

        // Extract tags/keywords
        const tagsMatch = content.match(/\\keywords\{([^}]+)\}/)
        if (tagsMatch) {
          tags = tagsMatch[1].split(",").map((tag) => tag.trim())

          // Check if query is in tags (higher relevance)
          if (tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))) {
            relevance += 8
          }
        }

        // Extract date
        const dateMatch = content.match(/\\date\{([^}]+)\}/)
        if (dateMatch) {
          date = dateMatch[1]
        }

        // Extract abstract/description
        const abstractMatch = content.match(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/)
        if (abstractMatch) {
          description = abstractMatch[1].trim()

          // Check if query is in description (higher relevance)
          if (description.toLowerCase().includes(normalizedQuery)) {
            relevance += 5
          }
        }

        // Find which section contains the query
        const sectionMatches = Array.from(
          content.matchAll(
            /\\(section|subsection|subsubsection)\{([^}]+)\}([\s\S]*?)(?=\\(?:section|subsection|subsubsection)\{|\\end\{document\}|$)/g,
          ),
        )

        // Find the section containing the query
        for (const match of sectionMatches) {
          const currentSectionTitle = match[2]
          const sectionContent = match[3]
          const currentSectionId = currentSectionTitle.toLowerCase().replace(/\s+/g, "-")

          // Check if section title contains query (highest relevance)
          if (currentSectionTitle.toLowerCase().includes(normalizedQuery)) {
            relevance += 15
            sectionId = currentSectionId
            sectionTitle = currentSectionTitle
            matchContext = `Section: ${currentSectionTitle}`
            break // Found in section title, no need to check further
          }

          // Check if section content contains query
          if (sectionContent.toLowerCase().includes(normalizedQuery)) {
            relevance += 2

            // Only set section info if we haven't found a better match yet
            if (!sectionId) {
              sectionId = currentSectionId
              sectionTitle = currentSectionTitle

              // Extract context around the match
              const lowerContent = sectionContent.toLowerCase()
              const matchIndex = lowerContent.indexOf(normalizedQuery)
              if (matchIndex >= 0) {
                const start = Math.max(0, matchIndex - 50)
                const end = Math.min(sectionContent.length, matchIndex + normalizedQuery.length + 50)
                let contextText = sectionContent.substring(start, end)

                // Clean up LaTeX commands for better readability
                contextText = contextText.replace(/\\[a-zA-Z]+(\{[^}]*\})?/g, " ")
                matchContext = "..." + contextText.trim() + "..."
              }
            }
          }
        }

        // If we didn't find a specific section but the query is in the file,
        // just point to the beginning of the document
        if (!sectionId && content.toLowerCase().includes(normalizedQuery)) {
          // Try to extract some context from the first occurrence
          const lowerContent = content.toLowerCase()
          const matchIndex = lowerContent.indexOf(normalizedQuery)
          if (matchIndex >= 0) {
            const start = Math.max(0, matchIndex - 50)
            const end = Math.min(content.length, matchIndex + normalizedQuery.length + 50)
            let contextText = content.substring(start, end)

            // Clean up LaTeX commands for better readability
            contextText = contextText.replace(/\\[a-zA-Z]+(\{[^}]*\})?/g, " ")
            matchContext = "..." + contextText.trim() + "..."
          }
        }

        // Add to results
        results.push({
          type: "tutorial",
          title,
          description,
          category,
          tags,
          date,
          slug,
          url: `/tutorials/${slug}${sectionId ? `#${sectionId}` : ""}`,
          relevance,
          sectionId,
          sectionTitle,
          matchContext,
        })

        console.log(`Added result for ${file} with relevance ${relevance}`)
      } catch (error) {
        console.error(`Error searching file ${file}:`, error)
      }
    }

    // Sort by relevance (highest first)
    return results.sort((a, b) => b.relevance - a.relevance)
  } catch (error) {
    console.error("Error searching LaTeX files:", error)
    return []
  }
}

// Legacy function for backward compatibility
export async function searchLatexFiles(query: string): Promise<SearchResult[]> {
  return searchRawLatexFiles(query)
}
