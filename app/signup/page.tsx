'use client'

import React, { useState } from 'react'
import Register from '@/components/Register'
import HeroCarousel from '@/components/HeroCarousel'
import SignUpModal from '@/components/SignUpModal'

export default function SignUpPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-8">
        <Register />
      </div>
      <div className="w-full md:w-1/2">
        <HeroCarousel />
      </div>
      {isModalOpen && (
        <SignUpModal onClose={handleCloseModal} />
      )}
    </div>
  )
}