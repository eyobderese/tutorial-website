"use client"

import { useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

interface TutorialContentProps {
  content: string
}

export function TutorialContent({ content }: TutorialContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // This would be used to initialize any interactive elements
  useEffect(() => {
    // Initialize any interactive elements or scripts
    // For example, you might want to add event listeners to code blocks
    // or initialize visualization libraries
  }, [content])

  return (
    <div ref={contentRef} className="tutorial-content prose prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <pre className="rounded-md bg-gray-900 p-4 overflow-x-auto">
                <code className={`language-${match[1]} text-white`} {...props}>
                  {String(children).replace(/\n$/, "")}
                </code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          // You can customize other markdown components here
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
          p: ({ node, ...props }) => <p className="my-4" {...props} />,
          ul: ({ node, ...props }) => <ul className="my-4 list-disc pl-6" {...props} />,
          ol: ({ node, ...props }) => <ol className="my-4 list-decimal pl-6" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 my-4 italic" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
