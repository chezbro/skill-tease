import React from 'react'
import Register from '@/components/Register'
import HeroCarousel from '@/components/HeroCarousel'

export default function SignUpPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-8">
        <Register />
      </div>
      <div className="w-full md:w-1/2">
        <HeroCarousel />
      </div>
    </div>
  )
}