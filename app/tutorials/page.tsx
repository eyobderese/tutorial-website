import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllTutorials } from "@/lib/tutorials"

export default async function TutorialsPage() {
  // Get all tutorials
  const tutorials = await getAllTutorials()

  // If no tutorials are found, provide some dummy data
  const tutorialsToDisplay =
    tutorials.length > 0
      ? tutorials
      : [
          {
            slug: "sample-tutorial",
            title: "Sample Tutorial",
            description: "This is a sample tutorial to get you started.",
            category: "Getting Started",
            tags: ["Sample", "Tutorial"],
            date: new Date().toLocaleDateString(),
            readTime: "5 min read",
            filePath: "",
            content: [],
          },
        ]

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(tutorialsToDisplay.map((tutorial) => tutorial.category)))]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Tutorials</h1>
          <p className="text-muted-foreground">
            Browse our collection of tutorials on algorithms, mathematics, and programming concepts.
          </p>
        </div>

        <Tabs defaultValue="All">
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="m-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tutorialsToDisplay
                  .filter((tutorial) => category === "All" || tutorial.category === category)
                  .map((tutorial) => (
                    <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`}>
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
