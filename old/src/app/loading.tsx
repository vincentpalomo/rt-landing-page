export default function Loading() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-[800px] space-y-6 text-center">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
} 