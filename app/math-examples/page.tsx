import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MathFormula } from "@/components/math-formula"
import { FormulaDemo } from "./formula-demo"

export default function MathExamplesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Mathematical Formulas</h1>
          <p className="text-muted-foreground">Examples of mathematical formulas rendered with MathJax</p>
        </div>

        {/* Formula Demo Section */}
        <FormulaDemo />

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Properties of Limits</CardTitle>
              <CardDescription>For functions f and g and constants a and c</CardDescription>
            </CardHeader>
            <CardContent>
              <MathFormula
                formula={`\\begin{align}
\\lim_{x \\to a} [f(x) + g(x)] &= \\lim_{x \\to a} f(x) + \\lim_{x \\to a} g(x) \\\\
\\lim_{x \\to a} [f(x) \\cdot g(x)] &= \\lim_{x \\to a} f(x) \\cdot \\lim_{x \\to a} g(x) \\\\
\\lim_{x \\to a} \\frac{f(x)}{g(x)} &= \\frac{\\lim_{x \\to a} f(x)}{\\lim_{x \\to a} g(x)}, \\text{ if } \\lim_{x \\to a} g(x) \\neq 0 \\\\
\\lim_{x \\to a} c \\cdot f(x) &= c \\cdot \\lim_{x \\to a} f(x)
\\end{align}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Rules</CardTitle>
              <CardDescription>Common integration formulas</CardDescription>
            </CardHeader>
            <CardContent>
              <MathFormula
                formula={`\\begin{align}
\\int x^n \\, dx &= \\frac{x^{n+1}}{n+1} + C, \\text{ for } n \\neq -1 \\\\
\\int e^x \\, dx &= e^x + C \\\\
\\int \\frac{1}{x} \\, dx &= \\ln|x| + C \\\\
\\int \\sin x \\, dx &= -\\cos x + C \\\\
\\int \\cos x \\, dx &= \\sin x + C
\\end{align}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Definition of a Derivative</CardTitle>
              <CardDescription>The formal definition of a derivative</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The derivative of a function f(x) with respect to x is defined as:</p>
              <MathFormula formula={`f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}`} className="my-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chain Rule</CardTitle>
              <CardDescription>For differentiating composite functions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>If y = f(g(x)), then:</p>
              <MathFormula formula={`\\frac{dy}{dx} = \\frac{df}{dg} \\cdot \\frac{dg}{dx}`} className="my-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Matrix Operations</CardTitle>
              <CardDescription>Examples of matrix operations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Matrix multiplication:</p>
              <MathFormula
                formula={`\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae + bg & af + bh \\\\ ce + dg & cf + dh \\end{pmatrix}`}
              />
              <p className="my-4">Determinant:</p>
              <MathFormula formula={`\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculus Theorems</CardTitle>
              <CardDescription>Important theorems in calculus</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Mean Value Theorem:</p>
              <MathFormula
                formula={`\\text{If } f \\text{ is continuous on } [a,b] \\text{ and differentiable on } (a,b), \\text{ then there exists } c \\in (a,b) \\text{ such that } f'(c) = \\frac{f(b) - f(a)}{b - a}`}
              />
              <p className="my-4">Fundamental Theorem of Calculus:</p>
              <MathFormula
                formula={`\\text{If } f \\text{ is continuous on } [a,b] \\text{ and } F \\text{ is an antiderivative of } f \\text{ on } [a,b], \\text{ then } \\int_a^b f(x) \\, dx = F(b) - F(a)`}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
