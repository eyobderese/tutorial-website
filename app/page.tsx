import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FeaturedTutorials } from "@/components/featured-tutorials"

export default function HomePage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Learn with Interactive Tutorials</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore our comprehensive collection of tutorials on algorithms, mathematics, and programming concepts.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/tutorials">
                <Button>Browse Tutorials</Button>
              </Link>
              <Link href="/algorithms">
                <Button variant="outline">Explore Algorithms</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Featured Tutorials</h2>
          <p className="text-muted-foreground">Our most popular tutorials and recently added content.</p>
        </div>
        <FeaturedTutorials />
      </section>

      <section className="container px-4 py-12 md:px-6 bg-muted">
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Why Choose Our Platform?</h2>
              <p className="text-muted-foreground">
                Our platform offers a unique learning experience with interactive content and comprehensive
                explanations.
              </p>
            </div>
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">LaTeX to Web Conversion</h3>
                  <p className="text-muted-foreground">
                    LaTeX files are converted to beautiful web content automatically.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Mathematical Formulas</h3>
                  <p className="text-muted-foreground">Perfectly rendered mathematical formulas and equations.</p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Code & Algorithms</h3>
                  <p className="text-muted-foreground">
                    Syntax-highlighted code snippets and algorithm visualizations.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>LaTeX to Web Conversion</CardTitle>
                <CardDescription>LaTeX files are converted to beautiful web content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-white rounded-md shadow-sm dark:bg-gray-800">
                  <div className="text-center">
                    <div className="text-lg font-serif katex-formula">{"\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)"}</div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      LaTeX content is converted to beautiful web content
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/tutorials" className="w-full">
                  <Button className="w-full">Browse Tutorials</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
