"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DirectMath } from "@/components/direct-math"
import { array } from "some-library" // Assuming this is the correct import for array

export default function DirectTestPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  // Initialize MathJax on the entire page
  useEffect(() => {
    if (pageRef.current && typeof window !== "undefined" && window.MathJax) {
      window.MathJax.typesetPromise([pageRef.current]).catch((err) => {
        console.error("MathJax typesetting failed:", err)
      })
    }
  }, [])

  return (
    <div ref={pageRef} className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Direct MathJax Test</h1>
          <p className="text-muted-foreground">Testing direct MathJax rendering</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Derivative Rules</CardTitle>
              <CardDescription>Using direct MathJax rendering</CardDescription>
            </CardHeader>
            <CardContent>
              <DirectMath 
                formula={`\\begin{align}
\\frac{d}{dx}(c) &= 0 \\text{ (constant rule)} \\\\
\\frac{d}{dx}(x^n) &= nx^{n-1} \\text{ (power rule)} \\\\
\\frac{d}{dx}(e^x) &= e^x \\text{ (exponential rule)} \\\\
\\frac{d}{dx}(\\ln x) &= \\frac{1}{x} \\text{ (logarithm rule)} \\\\
\\frac{d}{dx}(\\sin x) &= \\cos x \\text{ (sine rule)} \\\\
\\frac{d}{dx}(\\cos x) &= -\\sin x \\text{ (cosine rule)}
\\end{align}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Rule</CardTitle>
              <CardDescription>Using direct MathJax rendering</CardDescription>
            </CardHeader>
            <CardContent>
              <DirectMath formula={`\\frac{d}{dx}[f(x) \\cdot g(x)] = f'(x) \\cdot g(x) + f(x) \\cdot g'(x)`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Raw MathJax Test</CardTitle>
              <CardDescription>Using raw MathJax in the page</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                $$
                \\begin{array}{c} % Changed 'l' to 'c' for center alignment\
                \\frac{d}{dx}(x) = 0 \\quad \\text{(constant rule)} \\\\
                \\frac{d}{dx}(x^n) = nx^{n-1} \\quad \\text{(power rule)} \\\\
                \\frac{d}{dx}(e^x) = e^x \\quad \\text{(exponential rule)} \\\\
                \\frac{d}{dx}(\\ln x) = \\frac{1}{x} \\quad \\text{(logarithm rule)} \\\\
                \\frac{d}{dx}(\\sin x) = \\cos x \\quad \\text{(sine rule)} \\\\
                \\frac{d}{dx}(\\cos x) = -\\sin x \\quad \\text{(cosine rule)}
                \\end{array}
                $$
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
