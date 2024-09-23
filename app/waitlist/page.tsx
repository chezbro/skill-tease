import React from 'react'
import Register from '@/components/Register'
import HeroCarousel from '@/components/HeroCarousel'
import WaitlistForm from '@/components/WaitlistForm'

export default function WaitlistPage() {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Join Our Waitlist
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Be the first to know when we launch!
            </p>
          </div>
          <WaitlistForm />
        </div>
      </div>
    )
  }