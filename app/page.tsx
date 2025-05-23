import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 w-full bg-muted flex items-center justify-center py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                Learn with Interactive Tutorials
              </h1>
              <p className="max-w-[800px] mx-auto text-lg text-muted-foreground md:text-xl">
                Explore our hyperon pattern miner core concepts , algorithms and way of implementations .
              </p>
            </div>
            <div className="space-x-4 pt-6">
              <Link href="/tutorials">
                <Button size="lg" className="text-base">Pattern Miner Tutorial</Button>
              </Link>
              <Link href="https://metta-lang.dev/docs/learn/learn.html">
                <Button variant="outline" size="lg" className="text-base">Learn MeTTa</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}