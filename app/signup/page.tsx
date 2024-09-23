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

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-8">
        <Register onClose={handleCloseModal} />
        <button 
          onClick={handleOpenModal}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Open Sign Up Modal
        </button>
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