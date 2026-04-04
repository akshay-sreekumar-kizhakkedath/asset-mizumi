import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: 'Mizumi Reserve | The Have-It-All Habitat',
  description: 'A vibrant township spread over 80 acres, nestled between two pristine lakes in the heart of Harlur Road, Sarjapur.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} bg-background text-foreground font-sans antialiased overflow-x-hidden min-h-full flex flex-col transition-colors duration-300`}>
        <ThemeProvider attribute="class" forcedTheme="dark">
          <Navbar />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
