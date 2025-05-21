"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CodeEditor } from "@/components/code-editor"

// Sample code snippets for different languages
const sampleCode = {
  metta: `! Define a simple fact
(= (parent Alice Bob) True)
(= (parent Bob Charlie) True)

! Define a rule for grandparent relationship
(= (grandparent $x $z)
   (and (parent $x $y)
        (parent $y $z)))

! Query to find grandparents
(grandparent Alice $who)`,

  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate and print the first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`Fibonacci(\${i}) = \${fibonacci(i)}\`);
}`,

  python: `# Python Example (execution via MeTTa API)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Calculate and print the first 10 Fibonacci numbers
for i in range(10):
    print(f"Fibonacci({i}) = {fibonacci(i)}")`,
}

export default function CodePlaygroundPage() {
  const [language, setLanguage] = useState<keyof typeof sampleCode>("metta")
  const [code, setCode] = useState(sampleCode[language])

  // Update code when language changes
  const handleLanguageChange = (value: string) => {
    const newLanguage = value as keyof typeof sampleCode
    setLanguage(newLanguage)
    setCode(sampleCode[newLanguage])
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Code Playground</h1>
          <p className="text-muted-foreground">
            Experiment with MeTTa code snippets and see the results in real-time. Code is executed via the MeTTa API.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-48">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metta">MeTTa</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <CodeEditor code={code} language={language} readOnly={false} showLineNumbers={true} className="min-h-[400px]" />

        <Card>
          <CardHeader>
            <CardTitle>About the MeTTa Code Playground</CardTitle>
            <CardDescription>Features and information about the code editor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Features:</h3>
                <ul className="list-disc pl-6 mt-2">
                  <li>Edit MeTTa code directly in the browser</li>
                  <li>Execute code via the MeTTa API</li>
                  <li>Toggle between editable and read-only modes</li>
                  <li>Copy code to clipboard with one click</li>
                  <li>View execution results below the code editor</li>
                  <li>Reset code to its initial state</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium">About MeTTa:</h3>
                <p className="mt-2">
                  MeTTa is a modern programming language designed for knowledge representation and reasoning. It
                  combines elements of logic programming, functional programming, and pattern matching to create a
                  powerful tool for AI and cognitive systems.
                </p>
                <p className="mt-2">
                  The code you write here is sent to the MeTTa interpreter API at{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">https://inter.metta-lang.dev/api/v1/codes</code> for
                  execution.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Example MeTTa Code:</h3>
                <pre className="bg-muted p-3 rounded-md mt-2 text-sm overflow-x-auto">
                  {`! Define a simple fact
(= (parent Alice Bob) True)
(= (parent Bob Charlie) True)

! Define a rule for grandparent relationship
(= (grandparent $x $z)
   (and (parent $x $y)
        (parent $y $z)))

! Query to find grandparents
(grandparent Alice $who)`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
