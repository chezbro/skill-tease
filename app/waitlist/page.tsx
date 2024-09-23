import React from 'react'
import WaitlistForm from '@/components/WaitlistForm'

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
          <h2 className="text-center text-5xl font-extrabold text-white mb-4">
            Join Our Waitlist
          </h2>
          <p className="text-center text-xl text-gray-300 mb-10">
            Be the first to know when we launch our revolutionary AI platform!
          </p>
          <WaitlistForm />
        </div>
      </div>
    </div>
  )
}