import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function FeaturedTutorials() {
  // This would typically come from a database or API
  const tutorials = [
    {
      id: 1,
      title: "Introduction to Graph Algorithms",
      description: "Learn the fundamentals of graph theory and common algorithms.",
      category: "Algorithms",
      tags: ["Graphs", "BFS", "DFS"],
      date: "2023-05-15",
      slug: "intro-graph-algorithms",
    },
    {
      id: 2,
      title: "Linear Algebra Fundamentals",
      description: "Explore vectors, matrices, and linear transformations.",
      category: "Mathematics",
      tags: ["Vectors", "Matrices", "Linear Transformations"],
      date: "2023-06-22",
      slug: "linear-algebra-fundamentals",
    },
    {
      id: 3,
      title: "Dynamic Programming Techniques",
      description: "Master the art of solving complex problems with dynamic programming.",
      category: "Algorithms",
      tags: ["DP", "Optimization", "Memoization"],
      date: "2023-07-10",
      slug: "dynamic-programming-techniques",
    },
    {
      id: 4,
      title: "Introduction to meTTa Programming",
      description: "Learn the basics of meTTa programming language and its applications.",
      category: "Programming",
      tags: ["meTTa", "Logic Programming"],
      date: "2023-08-05",
      slug: "intro-metta-programming",
    },
  ]

  return (
    <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
      {tutorials.map((tutorial) => (
        <Link key={tutorial.id} href={`/tutorials/${tutorial.slug}`}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline">{tutorial.category}</Badge>
                <span className="text-xs text-muted-foreground">{tutorial.date}</span>
              </div>
              <CardTitle className="mt-2">{tutorial.title}</CardTitle>
              <CardDescription>{tutorial.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tutorial.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">Click to read tutorial</CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
