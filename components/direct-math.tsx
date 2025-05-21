"use client"

import { useEffect, useRef } from "react"

interface DirectMathProps {
  formula: string
  className?: string
}

export function DirectMath({ formula, className = "" }: DirectMathProps) {
  const mathRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mathRef.current && typeof window !== "undefined" && window.MathJax) {
      mathRef.current.textContent = formula

      window.MathJax.typesetPromise([mathRef.current]).catch((err) => {
        console.error("MathJax typesetting failed:", err)
      })
    }
  }, [formula])

  return <div ref={mathRef} className={`math-formula ${className}`} />
}
