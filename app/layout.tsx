import Link from "next/link"
import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tutorial - Hyperon Pattern miner tutorial ",
  description: "Learn the hyperon pattern miner core concepts and algorithms ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* MathJax CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
                <div className="px-5" >
                 <SiteHeader />
               </div>
           
            <main className="flex-1 px-5 ">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © {new Date().getFullYear()} Pattern miner tutorial. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>

   {/* MathJax Configuration */}
        <Script id="mathjax-config" strategy="beforeInteractive">
          {`
            window.MathJax = {
              tex: {
                inlineMath: [['\\\$$', '\\\$$']],
                displayMath: [['\\\\[', '\\\\]'], ['$$', '$$']],
                processEscapes: true,
                processEnvironments: true,
                autoload: {
                  color: [],
                  colorv2: ['color']
                },
                packages: {'[+]': ['noerrors', 'ams', 'color']}
              },
              options: {
                skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
                ignoreHtmlClass: 'no-mathjax',
                processHtmlClass: 'mathjax'
              },
              startup: {
                pageReady() {
                  return MathJax.startup.defaultPageReady().then(() => {
                    console.log('MathJax initialization complete');
                  });
                }
              }
            };
          `}
        </Script>

        {/* MathJax Script */}
        <Script
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="afterInteractive"
          id="mathjax-script"
        />
      </body>
    </html>
  )
}
