import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function PasswordForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/works/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        throw new Error('Invalid password')
      }

      router.refresh()
    } catch (error) {
      setError('Invalid password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Protected Content</h1>
          <p className="text-muted-foreground">
            Please enter the password to view this content.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              disabled={isLoading}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
} 