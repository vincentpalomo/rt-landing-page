import { Analytics } from '@vercel/analytics/react'
import { Navbar } from './navbar'
import { Footer } from './footer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Analytics />
    </div>
  )
} 