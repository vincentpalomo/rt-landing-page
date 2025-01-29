'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/config/site'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <button
        className="relative h-6 w-6"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={cn(
            'absolute block h-0.5 w-full bg-current transition-all duration-300',
            isOpen ? 'top-1/2 rotate-45' : 'top-1/4'
          )}
        />
        <span
          className={cn(
            'absolute top-1/2 block h-0.5 w-full bg-current transition-all duration-300',
            isOpen ? 'opacity-0' : 'opacity-100'
          )}
        />
        <span
          className={cn(
            'absolute block h-0.5 w-full bg-current transition-all duration-300',
            isOpen ? 'top-1/2 -rotate-45' : 'top-3/4'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full w-full bg-background border-b p-4">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-foreground/80',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-foreground/60',
                  item.disabled && 'cursor-not-allowed opacity-60'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
} 