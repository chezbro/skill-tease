'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { StyledButton } from './StyledButton'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({ email })

      if (error) throw error

      setSuccess(true)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setEmail('')
    setSuccess(false)
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {!success ? (
        <>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <StyledButton
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </StyledButton>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-green-500 text-lg font-medium mb-4">
            You've been added to the waitlist!
          </p>
          <p className="text-gray-400 mb-4">
            We'll notify you when we launch. Thank you for your interest!
          </p>
          <StyledButton
            onClick={handleReset}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </StyledButton>
        </div>
      )}
    </form>
  )
}