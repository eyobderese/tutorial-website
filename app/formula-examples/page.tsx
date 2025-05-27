"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


// Define formula data
const formulas = [
  {
    id: "volume-revolution",
    title: "Volume of Revolution",
    description: "Volume of a solid of revolution",
    category: "Calculus",
    formula: "V = \\pi \\int_a^b [f(x)]^2 \\, dx",
    tags: ["Volume", "Integration", "Revolution"],
  },
  {
    id: "area-between-curves",
    title: "Area Between Curves",
    description: "Area between two functions",
    category: "Calculus",
    formula: "\\text{Area} = \\int_a^b |f(x) - g(x)| \\, dx",
    tags: ["Area", "Integration", "Curves"],
  },
  {
    id: "derivative-rules",
    title: "Derivative Rules",
    description: "Common differentiation formulas",
    category: "Calculus",
    formula: `\\begin{array}{l}\\
      \\frac{d}{dx}(c) = 0 \\quad \\text{(constant rule)} \\\\
      \\frac{d}{dx}(x^n) = nx^{n-1} \\quad \\text{(power rule)} \\\\
      \\frac{d}{dx}(e^x) = e^x \\quad \\text{(exponential rule)} \\\\
      \\frac{d}{dx}(\\ln x) = \\frac{1}{x} \\quad \\text{(logarithm rule)} \\\\
      \\frac{d}{dx}(\\sin x) = \\cos x \\quad \\text{(sine rule)} \\\\
      \\frac{d}{dx}(\\cos x) = -\\sin x \\quad \\text{(cosine rule)}
      \\end{array}`,
    tags: ["Derivatives", "Calculus", "Rules"],
  },
  {
    id: "integration-rules",
    title: "Integration Rules",
    description: "Common integration formulas",
    category: "Calculus",
    formula: `\\begin{array}{l}\\
      \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C, \\quad \\text{for } n \\neq -1 \\\\
      \\int e^x \\, dx = e^x + C \\\\
      \\int \\frac{1}{x} \\, dx = \\ln|x| + C \\\\
      \\int \\sin x \\, dx = -\\cos x + C \\\\
      \\int \\cos x \\, dx = \\sin x + C
      \\end{array}`,
    tags: ["Integration", "Calculus", "Rules"],
  },
  {
    id: "product-rule",
    title: "Product Rule",
    description: "For differentiating products of functions",
    category: "Calculus",
    formula: "\\frac{d}{dx}[f(x) \\cdot g(x)] = f'(x) \\cdot g(x) + f(x) \\cdot g'(x)",
    tags: ["Derivatives", "Calculus", "Product Rule"],
  },
  {
    id: "chain-rule",
    title: "Chain Rule",
    description: "For differentiating composite functions",
    category: "Calculus",
    formula: "\\frac{dy}{dx} = \\frac{df}{dg} \\cdot \\frac{dg}{dx}",
    tags: ["Derivatives", "Calculus", "Chain Rule"],
  },
  {
    id: "pythagorean-theorem",
    title: "Pythagorean Theorem",
    description: "Relationship between the sides of a right triangle",
    category: "Geometry",
    formula: "a^2 + b^2 = c^2",
    tags: ["Geometry", "Triangle", "Theorem"],
  },
  {
    id: "quadratic-formula",
    title: "Quadratic Formula",
    description: "Formula for finding the roots of a quadratic equation",
    category: "Algebra",
    formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    tags: ["Algebra", "Quadratic", "Roots"],
  },
]

export default function FormulaExamplesPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Mathematical Formulas</h1>
          <p className="text-muted-foreground">Examples of correctly rendered mathematical formulas</p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {formulas.map((formula) => (
            <Card key={formula.id} id={formula.id}>
              <CardHeader>
                <CardTitle>{formula.title}</CardTitle>
                <CardDescription>{formula.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>$${formula.formula}$$</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
