"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Clipboard, Play, Lock, Unlock, RefreshCw, Loader } from "lucide-react"
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

  readOnly: initialReadOnly = false,
  className = "",
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [readOnly, setReadOnly] = useState(initialReadOnly)
  const [output, setOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [hasRun, setHasRun] = useState(false)
  const codeTextareaRef = useRef<HTMLTextAreaElement>(null)
  const resultTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Reset code to initial value
  const handleReset = () => {
    setCode(initialCode)
    setOutput("")
    setError(null)
    setHasRun(false)
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
      setHasRun(true)
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

  // Get the button based on execution state
  const getExecutionButton = () => {
    if (isExecuting) {
      return (
        <Button variant="secondary" size="sm" disabled className="flex items-center gap-2">
          <Loader className="h-4 w-4 animate-spin" />
          Running...
        </Button>
      )
    } else if (hasRun) {
      return (
        <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
      )
    } else {
      return (
        <Button variant="outline" size="sm" onClick={executeCode} className="flex items-center gap-2">
          <Play className="h-6 w-6" />
          Run
        </Button>
      )
    }
  }

  return (
    <div className={`code-editor-container ${className}`}>
      {/* Code Editor */}
      <Card className="border rounded-md overflow-hidden mb-4">
        <div className="group flex items-center justify-between bg-muted p-1 border-b">
        
            <Badge variant="outline"> Code </Badge>
          
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
            } `}
            style={{
              lineHeight: "1.5",
              tabSize: 2,
            }}
          />

        </div>
      </Card>

      {/* Result Editor */}
      <Card className={` ${hasRun ? " overflow-hidden border rounded-md ": " border-none"} `}>
        <div className={`group flex items-center justify-between    ${hasRun ? "bg-muted border-b p-2" : ""}`}>
          <div className="flex items-center gap-2">
            {getExecutionButton()}
            {(output || error) && <Badge variant={error ? "destructive" : "secondary"}>{error ? "Error" : ""}</Badge>}
          </div>
          {(output || error) && (
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => {
                      navigator.clipboard.writeText(getResultContent());
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 2000);
                    }}>
                      {isCopied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy result</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>

        <div className="relative">
          {(!hasRun && !isExecuting) ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
 
            </div>
          ) : (
             <textarea
              ref={resultTextareaRef}
              value={getResultContent()}
              readOnly
              className={`w-full font-mono text-sm p-4 resize-none focus:outline-none cursor-default bg-background ${
                error ? "text-red-500 dark:text-red-400" : ""
              } ${isExecuting ? "text-gray-500 dark:text-gray-400" : ""}`}
              style={{
                lineHeight: "1.5",
                minHeight: "auto",
                height: "auto",
                overflow: "hidden",
                backgroundColor: error ? "rgba(254, 226, 226, 0.2)" : isExecuting ? "rgba(229, 231, 235, 0.2)" : "",
              }}
            />
          )}
          {isExecuting && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-background bg-opacity-70">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="text-sm font-medium">Executing code...</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )

  // Get the content to display in the result area
  function getResultContent() {
    if (isExecuting) {
      return "Executing code..."
    } else if (error) {
      return error
    } else if (output) {
      return output
    } else {
      return ""
    }
  }
}