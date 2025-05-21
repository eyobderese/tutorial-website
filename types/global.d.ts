// Add KaTeX and MathJax to the global window object
interface Window {
  katex: {
    render: (
      tex: string,
      element: HTMLElement,
      options?: {
        displayMode?: boolean
        throwOnError?: boolean
        [key: string]: any
      },
    ) => void
    renderToString: (
      tex: string,
      options?: {
        displayMode?: boolean
        throwOnError?: boolean
        [key: string]: any
      },
    ) => string
  }
  MathJax: {
    typesetPromise: (elements: Array<HTMLElement>) => Promise<any>
    typeset: (elements: Array<HTMLElement>) => void
    tex2chtml: (tex: string, options?: any) => HTMLElement
    startup: {
      defaultPageReady: () => Promise<any>
    }
    [key: string]: any
  }
  renderMathInElement: (
    element: HTMLElement,
    options?: {
      delimiters?: Array<{
        left: string
        right: string
        display: boolean
      }>
      throwOnError?: boolean
      [key: string]: any
    },
  ) => void
}
