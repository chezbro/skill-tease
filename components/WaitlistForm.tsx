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
    <form onSubmit={handleSubmit} className="space-y-8">
      {!success ? (
        <>
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-lg relative block w-full px-5 py-4 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-400 text-md text-center font-semibold">{error}</div>
          )}

          <div>
            <StyledButton
              type="submit"
              className="w-full flex justify-center py-4 px-6 border border-transparent text-xl font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </StyledButton>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-green-400 text-2xl font-bold mb-6">
            You've been added to the waitlist!
          </p>
          <p className="text-gray-300 text-xl mb-8">
            We'll notify you when we launch. Thank you for your interest!
          </p>
          <StyledButton
            onClick={handleReset}
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Close
          </StyledButton>
        </div>
      )}
    </form>
  )
}