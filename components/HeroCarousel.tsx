'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type CarouselItem = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

const carouselItems: CarouselItem[] = [
  // { type: 'image', src: '/hero-image-1.jpg', alt: 'Hero Image 1' },
  { type: 'video', src: '/hero-video-3.mp4' },
  // { type: 'video', src: '/hero-video-2.mp4' },
  // Add more items as needed
]

export default function HeroCarousel() {
  const [currentItem, setCurrentItem] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying) {
        setCurrentItem((prevItem) => (prevItem + 1) % carouselItems.length)
      }
    }, 5000) // Change item every 5 seconds

    return () => clearInterval(timer)
  }, [isPlaying])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentItem) {
          video.play().catch(error => console.error('Error playing video:', error))
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [currentItem])

  const goToItem = (index: number) => {
    setCurrentItem(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    const currentVideo = videoRefs.current[currentItem]
    if (currentVideo) {
      isPlaying ? currentVideo.pause() : currentVideo.play()
    }
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {carouselItems.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentItem ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {item.type === 'image' ? (
            <Image
              src={item.src}
              alt={item.alt || ''}
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            />
          ) : (
            <video
              ref={el => videoRefs.current[index] = el}
              src={item.src}
              className="absolute inset-0 w-full h-full object-cover brightness-50"
              muted
              loop
              playsInline
            />
          )}
        </div>
      ))}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
          Where Learning Gets Uncovered
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          AI tutors that reveal more as you master new subjects
        </p>
        <Link 
          href="/register" 
          className="bg-purple-900 hover:bg-purple-800 text-white font-bold py-3 px-8 text-lg transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Sign Up</span>
          <div className="absolute inset-0 h-full w-full bg-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToItem(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentItem ? 'bg-blue-500' : 'bg-gray-400'
            } hover:bg-blue-300 transition duration-300`}
          />
        ))}
      </div>
      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 text-white hover:text-blue-300 transition duration-300"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}