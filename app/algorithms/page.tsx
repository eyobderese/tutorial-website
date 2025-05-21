import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AlgorithmsPage() {
  // This would typically come from a database or API
  const algorithms = [
    {
      id: 1,
      title: "Breadth-First Search (BFS)",
      description:
        "A graph traversal algorithm that explores all neighbors at the present depth before moving to nodes at the next depth level.",
      category: "Graph Algorithms",
      complexity: "O(V+E)",
      slug: "breadth-first-search",
    },
    {
      id: 2,
      title: "Depth-First Search (DFS)",
      description:
        "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
      category: "Graph Algorithms",
      complexity: "O(V+E)",
      slug: "depth-first-search",
    },
    {
      id: 3,
      title: "Dijkstra's Algorithm",
      description: "An algorithm for finding the shortest paths between nodes in a graph.",
      category: "Graph Algorithms",
      complexity: "O(V²) or O(E log V)",
      slug: "dijkstra-algorithm",
    },
    {
      id: 4,
      title: "Merge Sort",
      description: "An efficient, stable, comparison-based, divide and conquer sorting algorithm.",
      category: "Sorting",
      complexity: "O(n log n)",
      slug: "merge-sort",
    },
    {
      id: 5,
      title: "Dynamic Programming - Knapsack Problem",
      description: "A classic optimization problem solved using dynamic programming techniques.",
      category: "Dynamic Programming",
      complexity: "O(nW)",
      slug: "knapsack-problem",
    },
    {
      id: 6,
      title: "Binary Search",
      description: "A search algorithm that finds the position of a target value within a sorted array.",
      category: "Searching",
      complexity: "O(log n)",
      slug: "binary-search",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Algorithms</h1>
          <p className="text-muted-foreground">
            Explore our collection of algorithm tutorials with step-by-step explanations and visualizations.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {algorithms.map((algorithm) => (
            <Link key={algorithm.id} href={`/algorithms/${algorithm.slug}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline">{algorithm.category}</Badge>
                    <Badge variant="secondary">Complexity: {algorithm.complexity}</Badge>
                  </div>
                  <CardTitle className="mt-2">{algorithm.title}</CardTitle>
                  <CardDescription>{algorithm.description}</CardDescription>
                </CardHeader>
                <CardFooter className="text-sm text-muted-foreground">Click to view algorithm</CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
