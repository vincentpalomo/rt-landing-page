import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[800px] space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          The page you're looking for doesn't exist. Please check the URL or go back to the homepage.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
} 