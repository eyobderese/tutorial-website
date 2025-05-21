"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Clipboard, Play, Lock, Unlock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CodeEditorProps {
  code: string
  language: string
  readOnly?: boolean
  showLineNumbers?: boolean
  className?: string
}

export function CodeEditor({
  code: initialCode,
  language,
  readOnly: initialReadOnly = false,
  showLineNumbers = true,
  className = "",
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [readOnly, setReadOnly] = useState(initialReadOnly)
  const [output, setOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const codeTextareaRef = useRef<HTMLTextAreaElement>(null)
  const resultTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Reset code to initial value
  const handleReset = () => {
    setCode(initialCode)
    setOutput("")
    setError(null)
  }

  // Toggle read-only mode
  const toggleReadOnly = () => {
    setReadOnly(!readOnly)
  }

  // Copy code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Execute code by sending to MeTTa API
  const executeCode = async () => {
    setIsExecuting(true)
    setOutput("")
    setError(null)

    try {
      // Prepare the request to the MeTTa API
      const response = await fetch("https://inter.metta-lang.dev/api/v1/codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          language: "metta",
        }),
      })

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Format and display the response
      if (data.output) {
        setOutput(data.output)
      } else if (data.result) {
        setOutput(typeof data.result === "string" ? data.result : JSON.stringify(data.result, null, 2))
      } else {
        setOutput(JSON.stringify(data, null, 2))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      console.error("Execution error:", err)
    } finally {
      setIsExecuting(false)
    }
  }

  // Auto-resize textarea based on content
  useEffect(() => {
    if (codeTextareaRef.current) {
      codeTextareaRef.current.style.height = "auto"
      codeTextareaRef.current.style.height = `${codeTextareaRef.current.scrollHeight}px`
    }
  }, [code])

  // Auto-resize result textarea based on content
  useEffect(() => {
    if (resultTextareaRef.current) {
      resultTextareaRef.current.style.height = "auto"
      resultTextareaRef.current.style.height = `${resultTextareaRef.current.scrollHeight}px`
    }
  }, [output, error])

  // Get the content to display in the result area
  const getResultContent = () => {
    if (isExecuting) {
      return "Executing code..."
    } else if (error) {
      return error
    } else if (output) {
      return output
    } else {
      return "Click the Run button to execute the code and see the results here."
    }
  }

  return (
    <div className={`code-editor-container ${className}`}>
      {/* Code Editor */}
      <Card className="border rounded-md overflow-hidden mb-4">
        <div className="group flex items-center justify-between bg-muted p-2 border-b">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{language || "metta"}</Badge>
            <Badge variant="secondary">Editor</Badge>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleReadOnly}>
                    {readOnly ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{readOnly ? "Unlock editor" : "Lock editor"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                    {isCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCopied ? "Copied!" : "Copy code"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleReset}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="relative">
          <textarea
            ref={codeTextareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            readOnly={readOnly}
            className={`w-full font-mono text-sm p-4 min-h-[200px] resize-none bg-background focus:outline-none ${
              readOnly ? "cursor-default" : ""
            } ${showLineNumbers ? "pl-12" : ""}`}
            style={{
              lineHeight: "1.5",
              tabSize: 2,
            }}
          />
          {showLineNumbers && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-muted text-muted-foreground font-mono text-xs p-4 text-right select-none">
              {code.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Result Editor */}
<div className="space-y-2">
  {/* Always visible control bar */}
  <div className="flex items-center gap-2">
    <Button
      variant="secondary"
      size="sm"
      onClick={executeCode}
      disabled={isExecuting}
      className="gap-2 min-w-[80px] justify-center"
    >
      {isExecuting ? (
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500"></div>
      ) : (
        "Run"
      )}
    </Button>
  </div>

  {/* Result display - appears only when there's content */}
  {resultTextareaRef.current?.value && (
    <Card className="border rounded-md overflow-hidden">
      <div className="relative">
        <textarea
          ref={resultTextareaRef}
          value={getResultContent()}
          readOnly
          className={`w-full font-mono text-sm p-4 min-h-[150px] resize-none focus:outline-none cursor-default ${
            error ? "text-red-500 dark:text-red-400" : ""
          }`}
          style={{
            lineHeight: "1.5",
            backgroundColor: error ? "rgba(254, 226, 226, 0.2)" : "",
          }}
        />
      </div>
    </Card>
  )}
</div>
    </div>
  )
}
