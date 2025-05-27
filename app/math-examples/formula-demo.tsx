"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MathFormula } from "@/components/math-formula"

export function FormulaDemo() {
  const [latexInput, setLatexInput] = useState(`\\begin{align}
\\frac{d}{dx}(c) &= 0 \\text{ (constant rule)} \\\\
\\frac{d}{dx}(x^n) &= nx^{n-1} \\text{ (power rule)} \\\\
\\frac{d}{dx}(e^x) &= e^x \\text{ (exponential rule)} \\\\
\\frac{d}{dx}(\\ln x) &= \\frac{1}{x} \\text{ (logarithm rule)} \\\\
\\frac{d}{dx}(\\sin x) &= \\cos x \\text{ (sine rule)} \\\\
\\frac{d}{dx}(\\cos x) &= -\\sin x \\text{ (cosine rule)}
\\end{align}`)

  const [productRule] = useState(
    `\\frac{d}{dx}[f(x) \\cdot g(x)] = f'(x) \\cdot g(x) + f(x) \\cdot g'(x)`,
  )

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Common Derivative Rules</CardTitle>
          <CardDescription>Basic differentiation formulas</CardDescription>
        </CardHeader>
        <CardContent>
          <MathFormula formula={latexInput} className="my-4" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Rule</CardTitle>
          <CardDescription>For differentiating products of functions</CardDescription>
        </CardHeader>
        <CardContent>
          <MathFormula formula={productRule} className="my-4" />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>LaTeX Formula Editor</CardTitle>
          <CardDescription>Try editing the LaTeX code to see the rendered formula</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Textarea
                value={latexInput}
                onChange={(e) => setLatexInput(e.target.value)}
                className="h-[200px] font-mono text-sm"
                placeholder="Enter LaTeX formula here..."
              />
            </div>
            <div className="border rounded-md p-4 flex items-center justify-center bg-white dark:bg-gray-950">
              <MathFormula formula={latexInput} className="my-4" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              setLatexInput(`\\begin{align}
\\frac{d}{dx}(c) &= 0 \\text{ (constant rule)} \\\\
\\frac{d}{dx}(x^n) &= nx^{n-1} \\text{ (power rule)} \\\\
\\frac{d}{dx}(e^x) &= e^x \\text{ (exponential rule)} \\\\
\\frac{d}{dx}(\\ln x) &= \\frac{1}{x} \\text{ (logarithm rule)} \\\\
\\frac{d}{dx}(\\sin x) &= \\cos x \\text{ (sine rule)} \\\\
\\frac{d}{dx}(\\cos x) &= -\\sin x \\text{ (cosine rule)}
\\end{align}`)
            }}
          >
            Reset Formula
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
