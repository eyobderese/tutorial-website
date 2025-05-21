"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

interface ContentItem {
  type: string
  level?: number
  content: string
}

interface TableOfContentsProps {
  content: ContentItem[]
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState("")

  // This would track scroll position and update the active section
  useEffect(() => {
    const handleScroll = () => {
      // Logic to determine which section is currently in view
      // and update activeSection state
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      const scrollPosition = window.scrollY

      let currentSection = ""

      headings.forEach((heading) => {
        const top = heading.getBoundingClientRect().top + window.scrollY - 100

        if (scrollPosition >= top) {
          currentSection = heading.id
        }
      })

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once on mount to set initial active section

    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // Generate table of contents from content
  const tocItems = content
    .filter((item) => item.type === "heading" && item.level && item.level <= 3)
    .map((item) => ({
      id: item.content.toLowerCase().replace(/\s+/g, "-"),
      title: item.content,
      level: item.level as number,
    }))

  return (
    <nav className="toc text-sm">
      <ul className="space-y-1">
        {tocItems.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}>
            <a
              href={`#${item.id}`}
              className={`flex items-center py-1 hover:text-foreground transition-colors ${
                activeSection === item.id ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                  setActiveSection(item.id)
                }
              }}
            >
              {activeSection === item.id && <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" />}
              <span className={activeSection === item.id ? "" : "ml-4"}>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
