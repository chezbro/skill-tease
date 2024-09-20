'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  '/hero-image-1.jpg',
  '/hero-image-2.jpg',
  '/hero-image-3.jpg',
  // Add more image paths as needed
]

export default function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const goToImage = (index: number) => {
    setCurrentImage(index)
  }

  const goToPrevious = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length)
  }

  return (
    <div className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          <Image
            src={src}
            alt={`Hero Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center 70%"
            className="brightness-50"
          />
        </div>
      ))}
      <div className="relative z-10 text-center" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <h1 className="text-5xl font-bold mb-4">Where Learning Gets Uncovered</h1>
        <p className="text-xl text-gray-300 mb-8">AI tutors that reveal more as you master new subjects</p>
        <Link href="/courses" className="bg-transparent border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300 hover:shadow-neon-blue">
          Explore Courses
        </Link>
      </div>
      <button onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 carousel-nav-button">
        &#8249;
      </button>
      <button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 carousel-nav-button">
        &#8250;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`carousel-indicator ${
              index === currentImage ? 'carousel-indicator-active' : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}