import React from 'react'
import WaitlistForm from '@/components/WaitlistForm'
import Link from 'next/link'

// You can adjust this value as needed
const WAITLIST_COUNT = 1501

export default function WaitlistPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-video-3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Blur overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"></div>

      {/* Waitlist content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 sm:p-12 shadow-2xl">
          <h2 className="text-center text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Join Our Waitlist
          </h2>
          <p className="text-center text-xl text-gray-200 mb-8 font-light leading-relaxed">
            Be the first to experience our revolutionary AI platform!
          </p>
          
          {/* Waitlist Counter */}
          <div className="text-center mb-10">
            <p className="text-gray-300 text-sm uppercase tracking-wider mb-2">Current Waitlist</p>
            <div className="inline-flex items-center justify-center">
              {WAITLIST_COUNT.toString().split('').map((digit, index) => (
                <span key={index} className="bg-white bg-opacity-20 text-white text-2xl font-medium w-8 h-12 flex items-center justify-center rounded">
                  {digit}
                </span>
              ))}
            </div>
            
          </div>
          
          <WaitlistForm />
          
          {/* Priority Access Link */}
          <div className="mt-8 text-center">
            <Link href="/priority-access" className="inline-block group">
              <span className="text-lg text-yellow-300 group-hover:text-yellow-100 transition-colors duration-300 border-b-2 border-yellow-300 group-hover:border-yellow-100 pb-1">
                Get Priority Access for $20
              </span>
              <span className="ml-2 text-yellow-300 group-hover:text-yellow-100 transition-colors duration-300">⚡</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}