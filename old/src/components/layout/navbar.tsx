import Link from 'next/link'
import { navItems } from '@/config/site'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { MobileNav } from '@/components/layout/mobile-nav'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex md:hidden">
          <MobileNav />
        </div>
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Portfolio & Blog
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <div className="flex-1 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">Portfolio & Blog</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
} 