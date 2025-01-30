'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PasswordProtectionProps {
  onSuccess: () => void
}

export function PasswordProtection({ onSuccess }: PasswordProtectionProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  
  // In a real app, this should be handled securely through an API
  const CORRECT_PASSWORD = 'demo123'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 inline-block w-full text-transparent bg-clip-text">
            Enter Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-foreground/10
                          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                          text-foreground/80 placeholder-foreground/50"
                placeholder="Enter password"
                autoFocus
              />
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  Incorrect password. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white
                         rounded-lg font-medium hover:opacity-90 transition-opacity
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              View Projects
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
} 