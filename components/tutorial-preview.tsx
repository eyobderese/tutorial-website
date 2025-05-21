"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import "katex/dist/katex.min.css"

interface TutorialPreviewProps {
  content: any // In a real implementation, this would be a properly typed object
}

export function TutorialPreview({ content }: TutorialPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  // Initialize KaTeX for math rendering
  useEffect(() => {
    if (previewRef.current) {
      const mathElements = previewRef.current.querySelectorAll(".katex-formula")

      // Wait for KaTeX to be available globally
      const renderMath = () => {
        if (typeof window !== "undefined" && window.katex) {
          mathElements.forEach((element) => {
            try {
              const formula = element.textContent || ""
              window.katex.render(formula, element as HTMLElement, {
                throwOnError: false,
                displayMode: true,
              })
            } catch (error) {
              console.error("KaTeX rendering error:", error)
            }
          })
        } else {
          // If KaTeX is not available yet, try again in 100ms
          setTimeout(renderMath, 100)
        }
      }

      renderMath()
    }
  }, [content])

  // This is a placeholder for demonstration
  // In a real implementation, this would render the parsed LaTeX content
  const sampleContent = {
    title: "Introduction to Graph Algorithms",
    sections: [
      {
        title: "Basic Definitions",
        content: "A graph G is an ordered pair G = (V, E) where V is a set of vertices and E is a set of edges.",
        type: "text",
      },
      {
        title: "Mathematical Representation",
        content: "\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)",
        type: "math",
      },
      {
        title: "Adjacency Matrix",
        content: `A[i][j] = 
        \\begin{cases} 
        1 & \\text{if there is an edge from vertex i to vertex j} \\\\
        0 & \\text{otherwise}
        \\end{cases}`,
        type: "math",
      },
      {
        title: "Example Code",
        content: `
# Example of an adjacency list representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}`,
        type: "code",
        language: "python",
      },
      {
        title: "meTTa Example",
        content: `
! define a simple fact
(= (parent Alice Bob) True)
(= (parent Bob Charlie) True)

! define a rule for grandparent relationship
(= (grandparent $x $z)
   (and (parent $x $y)
        (parent $y $z)))`,
        type: "code",
        language: "scheme",
      },
    ],
  }

  // In a real implementation, this would use the actual parsed content
  const displayContent = content || sampleContent

  return (
    <div ref={previewRef} className="tutorial-preview">
      <h1 className="text-3xl font-bold mb-6">{displayContent.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="outline">Algorithms</Badge>
        <Badge variant="secondary">Graphs</Badge>
        <Badge variant="secondary">BFS</Badge>
        <Badge variant="secondary">DFS</Badge>
      </div>

      <Tabs defaultValue="preview" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-4 border rounded-md mt-2">
          <div className="prose prose-slate max-w-none dark:prose-invert">
            {displayContent.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
                {section.type === "text" && <p>{section.content}</p>}
                {section.type === "math" && (
                  <div className="my-4 py-2 flex justify-center">
                    <div className="text-lg font-serif katex-formula">{section.content}</div>
                  </div>
                )}
                {section.type === "code" && (
                  <div className="my-4">
                    <pre className="rounded-md bg-gray-900 p-4 overflow-x-auto">
                      <code className={`language-${section.language || "text"} text-white`}>{section.content}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="structure" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Document Structure</h2>
            <Card>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  <li className="font-medium">{displayContent.title}</li>
                  <ul className="pl-6 space-y-1">
                    {displayContent.sections.map((section, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span>{section.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {section.type}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
