"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TestFormulaPage() {
  const [latexInput, setLatexInput] = useState(`\\begin{align}
\\frac{d}{dx}(c) &= 0 \\text{ (constant rule)} \\\\
\\frac{d}{dx}(x^n) &= nx^{n-1} \\text{ (power rule)} \\\\
\\frac{d}{dx}(e^x) &= e^x \\text{ (exponential rule)} \\\\
\\frac{d}{dx}(\\ln x) &= \\frac{1}{x} \\text{ (logarithm rule)} \\\\
\\frac{d}{dx}(\\sin x) &= \\cos x \\text{ (sine rule)} \\\\
\\frac{d}{dx}(\\cos x) &= -\\sin x \\text{ (cosine rule)}
\\end{align}`)

  const [productRule, setProductRule] = useState(
    `\\frac{d}{dx}[f(x) \\cdot g(x)] = f'(x) \\cdot g(x) + f(x) \\cdot g'(x)`,
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Formula Test Page</h1>
          <p className="text-muted-foreground">Testing LaTeX formula rendering</p>
        </div>

        <Tabs defaultValue="direct">
          <TabsList>
            <TabsTrigger value="direct">Direct Rendering</TabsTrigger>
            <TabsTrigger value="editor">Formula Editor</TabsTrigger>
          </TabsList>

          <TabsContent value="direct" className="mt-4">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Derivative Rules</CardTitle>
                  <CardDescription>Using direct MathJax rendering</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="math-formula">
                    {`\\begin{align}
\\frac{d}{dx}(c) &= 0 \\text{ (constant rule)} \\\\
\\frac{d}{dx}(x^n) &= nx^{n-1} \\text{ (power rule)} \\\\
\\frac{d}{dx}(e^x) &= e^x \\text{ (exponential rule)} \\\\
\\frac{d}{dx}(\\ln x) &= \\frac{1}{x} \\text{ (logarithm rule)} \\\\
\\frac{d}{dx}(\\sin x) &= \\cos x \\text{ (sine rule)} \\\\
\\frac{d}{dx}(\\cos x) &= -\\sin x \\text{ (cosine rule)}
\\end{align}`}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Rule</CardTitle>
                  <CardDescription>Using direct MathJax rendering</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="math-formula">
                    {`\\frac{d}{dx}[f(x) \\cdot g(x)] = f'(x) \\cdot g(x) + f(x) \\cdot g'(x)`}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="editor" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>LaTeX Formula Editor</CardTitle>
                <CardDescription>Edit and preview LaTeX formulas</CardDescription>
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
                    <div className="math-formula">{latexInput}</div>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
