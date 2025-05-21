import fs from "fs/promises"
import path from "path"
import { parseLatex } from "./latex-parser"

// Define the tutorial interface
export interface Tutorial {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  readTime: string
  content: any[]
  filePath: string
}

// Path to the tutorials directory
const tutorialsDirectory = path.join(process.cwd(), "tutorials")

// Get all tutorial slugs
export async function getAllTutorialSlugs(): Promise<string[]> {
  try {
    // Check if directory exists first
    try {
      await fs.access(tutorialsDirectory)
    } catch (e) {
      // Directory doesn't exist, create it
      await fs.mkdir(tutorialsDirectory, { recursive: true })
      return []
    }

    const files = await fs.readdir(tutorialsDirectory)
    return files.filter((file) => file.endsWith(".tex")).map((file) => file.replace(/\.tex$/, ""))
  } catch (error) {
    console.error("Error reading tutorial directory:", error)
    return []
  }
}

// Get tutorial data by slug
export async function getTutorialBySlug(slug: string): Promise<Tutorial | null> {
  try {
    const filePath = path.join(tutorialsDirectory, `${slug}.tex`)
    const fileContent = await fs.readFile(filePath, "utf8")

    // Parse the LaTeX content
    const parsedContent = parseLatex(fileContent)

    // For now, we'll use a placeholder implementation
    // In a real implementation, you would extract metadata from the LaTeX file
    return {
      slug,
      title: parsedContent.title || slug,
      description: parsedContent.description || "A tutorial on " + slug,
      category: parsedContent.category || "Uncategorized",
      tags: parsedContent.tags || [],
      date: parsedContent.date || new Date().toLocaleDateString(),
      readTime: parsedContent.readTime || "10 min read",
      content: parsedContent.content,
      filePath,
    }
  } catch (error) {
    console.error(`Error reading tutorial ${slug}:`, error)

    // If the file doesn't exist, return null
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null
    }

    // For development purposes, return a dummy tutorial
    return getDummyTutorial(slug)
  }
}

// Get all tutorials
export async function getAllTutorials(): Promise<Tutorial[]> {
  const slugs = await getAllTutorialSlugs()
  const tutorials = await Promise.all(
    slugs.map(async (slug) => {
      const tutorial = await getTutorialBySlug(slug)
      return tutorial
    }),
  )

  // Filter out null values and sort by date (newest first)
  return tutorials
    .filter((tutorial): tutorial is Tutorial => tutorial !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Dummy tutorial data for development
function getDummyTutorial(slug: string): Tutorial {
  // This is just for development when no actual LaTeX files exist
  const dummyTutorials: Record<string, Tutorial> = {
    "intro-graph-algorithms": {
      slug: "intro-graph-algorithms",
      title: "Introduction to Graph Algorithms",
      description: "Learn the fundamentals of graph theory and common algorithms.",
      category: "Algorithms",
      tags: ["Graphs", "BFS", "DFS"],
      date: "May 15, 2023",
      readTime: "15 min read",
      filePath: path.join(tutorialsDirectory, "intro-graph-algorithms.tex"),
      content: [
        {
          type: "heading",
          level: 1,
          content: "Introduction to Graph Algorithms",
        },
        {
          type: "paragraph",
          content:
            "Graphs are mathematical structures used to model pairwise relations between objects. A graph is made up of vertices (also called nodes) which are connected by edges.",
        },
        {
          type: "heading",
          level: 2,
          content: "Basic Definitions",
        },
        {
          type: "paragraph",
          content: "A graph G is an ordered pair G = (V, E) where:",
        },
        {
          type: "list",
          items: ["V is a set of vertices", "E is a set of edges, which are ordered or unordered pairs of vertices"],
        },
        {
          type: "heading",
          level: 3,
          content: "Types of Graphs",
        },
        {
          type: "list",
          items: [
            "**Undirected Graph**: Edges have no direction",
            "**Directed Graph**: Edges have direction",
            "**Weighted Graph**: Edges have weights/costs",
          ],
        },
        {
          type: "heading",
          level: 2,
          content: "Graph Representation",
        },
        {
          type: "paragraph",
          content: "There are several ways to represent a graph:",
        },
        {
          type: "heading",
          level: 3,
          content: "Adjacency Matrix",
        },
        {
          type: "paragraph",
          content:
            "An adjacency matrix is a square matrix used to represent a finite graph. The elements of the matrix indicate whether pairs of vertices are adjacent or not in the graph.",
        },
        {
          type: "math",
          content:
            "A[i][j] = \\begin{cases} 1 & \\text{if there is an edge from vertex i to vertex j} \\\\ 0 & \\text{otherwise} \\end{cases}",
        },
        {
          type: "heading",
          level: 3,
          content: "Adjacency List",
        },
        {
          type: "paragraph",
          content:
            "An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a vertex in the graph.",
        },
        {
          type: "code",
          language: "python",
          content: `# Example of an adjacency list representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}`,
        },
      ],
    },
    "intro-metta-programming": {
      slug: "intro-metta-programming",
      title: "Introduction to meTTa Programming",
      description: "Learn the basics of meTTa programming language and its applications.",
      category: "Programming",
      tags: ["meTTa", "Logic Programming"],
      date: "August 5, 2023",
      readTime: "12 min read",
      filePath: path.join(tutorialsDirectory, "intro-metta-programming.tex"),
      content: [
        {
          type: "heading",
          level: 1,
          content: "Introduction to meTTa Programming",
        },
        {
          type: "paragraph",
          content:
            "meTTa is a modern programming language designed for knowledge representation and reasoning. It combines elements of logic programming, functional programming, and pattern matching to create a powerful tool for AI and cognitive systems.",
        },
        {
          type: "heading",
          level: 2,
          content: "Basic Concepts",
        },
        {
          type: "paragraph",
          content: "meTTa is based on a few fundamental concepts:",
        },
        {
          type: "list",
          items: [
            "**Atoms**: Basic units of data",
            "**Expressions**: Combinations of atoms and other expressions",
            "**Pattern Matching**: The primary mechanism for computation",
            "**Spaces**: Containers for expressions",
          ],
        },
        {
          type: "heading",
          level: 2,
          content: "Syntax Basics",
        },
        {
          type: "paragraph",
          content: "Here's a simple example of meTTa code:",
        },
        {
          type: "code",
          language: "scheme",
          content: `! define a simple fact
(= (parent Alice Bob) True)
(= (parent Bob Charlie) True)

! define a rule for grandparent relationship
(= (grandparent $x $z)
   (and (parent $x $y)
        (parent $y $z)))

! query to find grandparents
(grandparent Alice $who)`,
        },
      ],
    },
  }

  return (
    dummyTutorials[slug] || {
      slug,
      title: `Tutorial: ${slug}`,
      description: `A tutorial about ${slug}`,
      category: "Uncategorized",
      tags: ["Tutorial"],
      date: new Date().toLocaleDateString(),
      readTime: "10 min read",
      filePath: path.join(tutorialsDirectory, `${slug}.tex`),
      content: [
        {
          type: "heading",
          level: 1,
          content: `Tutorial: ${slug}`,
        },
        {
          type: "paragraph",
          content: "This is a placeholder tutorial content.",
        },
      ],
    }
  )
}
