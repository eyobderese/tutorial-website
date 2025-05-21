import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; type?: string }
}) {
  const query = searchParams.q || ""

  // This page is now only shown when no results are found
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">No Results Found</h1>
          <p className="text-muted-foreground">No results found for "{query}"</p>
        </div>

        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">Try searching with different keywords</h2>
          <p className="text-muted-foreground mb-6">Or browse our content categories below</p>
          <div className="flex justify-center gap-4">
            <Link href="/tutorials">
              <Badge variant="outline" className="text-base px-4 py-2">
                Browse tutorials
              </Badge>
            </Link>
            <Link href="/algorithms">
              <Badge variant="outline" className="text-base px-4 py-2">
                Browse algorithms
              </Badge>
            </Link>
            <Link href="/formula-examples">
              <Badge variant="outline" className="text-base px-4 py-2">
                Browse formulas
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
