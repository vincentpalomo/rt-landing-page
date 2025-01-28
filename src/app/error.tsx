'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[800px] space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          An error occurred while processing your request. Please try again later.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
} 