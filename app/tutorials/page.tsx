import { redirect } from "next/navigation"
import { getAllTutorials } from "@/lib/tutorials"

export default async function TutorialsPage() {
  // Get all tutorials
  const tutorials = await getAllTutorials()
        console.log(`length of tutorial ${tutorials.length}`)
  // If no tutorials, fallback to dummy data
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

  // Redirect to the first tutorial
  redirect(`/tutorials/${tutorialsToDisplay[0].slug}`)
}
