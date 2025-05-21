"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TutorialPreview } from "@/components/tutorial-preview"
import { parseLatex } from "@/lib/latex-parser"

export default function UploadPage() {
  const [latexContent, setLatexContent] = useState("")
  const [parsedContent, setParsedContent] = useState<any>(null)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [previewMode, setPreviewMode] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setLatexContent(content)
      try {
        // In a real implementation, this would parse the LaTeX content
        const parsed = parseLatex(content)
        setParsedContent(parsed)
        setUploadStatus("success")
      } catch (error) {
        console.error("Error parsing LaTeX:", error)
        setUploadStatus("error")
      }
    }
    reader.readAsText(file)
  }

  const handlePasteContent = () => {
    try {
      // In a real implementation, this would parse the LaTeX content
      const parsed = parseLatex(latexContent)
      setParsedContent(parsed)
      setUploadStatus("success")
    } catch (error) {
      console.error("Error parsing LaTeX:", error)
      setUploadStatus("error")
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Upload LaTeX Tutorial</h1>
          <p className="text-muted-foreground">
            Upload your LaTeX files or paste LaTeX content to convert them into web-friendly tutorials.
          </p>
        </div>

        {uploadStatus === "success" && (
          <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your LaTeX content has been successfully parsed.</AlertDescription>
          </Alert>
        )}

        {uploadStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>There was an error parsing your LaTeX content. Please check the format.</AlertDescription>
          </Alert>
        )}

        {!previewMode ? (
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="paste">Paste Content</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload LaTeX File</CardTitle>
                  <CardDescription>
                    Upload your LaTeX (.tex) file to convert it to a web-friendly tutorial.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                    <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      Drag and drop your LaTeX file here, or click to browse
                    </p>
                    <input type="file" accept=".tex" className="hidden" id="file-upload" onChange={handleFileUpload} />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        <FileText className="mr-2 h-4 w-4" />
                        Browse Files
                      </Button>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-xs text-muted-foreground">Supported file type: .tex</p>
                  {uploadStatus === "success" && <Button onClick={() => setPreviewMode(true)}>Preview</Button>}
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="paste">
              <Card>
                <CardHeader>
                  <CardTitle>Paste LaTeX Content</CardTitle>
                  <CardDescription>Paste your LaTeX content directly into the text area below.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste your LaTeX content here..."
                    className="min-h-[300px] font-mono text-sm"
                    value={latexContent}
                    onChange={(e) => setLatexContent(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setLatexContent("")}>
                    Clear
                  </Button>
                  <Button onClick={handlePasteContent}>Parse Content</Button>
                  {uploadStatus === "success" && <Button onClick={() => setPreviewMode(true)}>Preview</Button>}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Preview</h2>
              <Button variant="outline" onClick={() => setPreviewMode(false)}>
                Back to Editor
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <TutorialPreview content={parsedContent} />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Edit</Button>
                <Button>Save Tutorial</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
