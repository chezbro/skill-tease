'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

export default function ApplyToTeach() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    motivation: ''
  })
  const [video, setVideo] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window
    setWindowDimensions({ width, height })

    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl)
      }
    }
  }, [videoPreviewUrl])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setVideo(file)
      setVideoPreviewUrl(URL.createObjectURL(file))
    }
  }

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(stream)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data])
        }
      }
      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  const handleRecordedVideo = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' })
      const file = new File([blob], 'recorded-video.webm', { type: 'video/webm' })
      setVideo(file)
      setVideoPreviewUrl(URL.createObjectURL(file))
      setRecordedChunks([])
    }
  }, [recordedChunks])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    // Check if required fields are filled
    if (!formData.name || !formData.email || !video) {
      alert('Please fill in your name, email, and upload or record a video.')
      setUploading(false)
      return
    }

    try {
      let videoUrl = ''

      if (video) {
        const fileExt = video.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { data, error } = await supabase.storage
          .from('teacher-videos')
          .upload(fileName, video)

        if (error) throw error

        const { data: { publicUrl } } = supabase.storage
          .from('teacher-videos')
          .getPublicUrl(fileName)

        videoUrl = publicUrl
      }

      const { data, error } = await supabase
        .from('teacherWaitlist')
        .insert([{ 
          name: formData.name,
          email: formData.email,
          expertise: formData.expertise,
          experience: formData.experience,
          motivation: formData.motivation,
          video_url: videoUrl 
        }])

      if (error) throw error
      setShowConfetti(true)
      setFormData({ name: '', email: '', expertise: '', experience: '', motivation: '' })
      setVideo(null)
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {showConfetti && (
        <div className="fixed inset-0 z-50">
          <ReactConfetti
            width={windowDimensions.width}
            height={windowDimensions.height}
            recycle={false}
            numberOfPieces={200}
            onConfettiComplete={() => {
              setShowConfetti(false)
            }}
          />
        </div>
      )}
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 transition-opacity duration-300">
          <div className="bg-gray-800 p-8 rounded-lg text-center shadow-2xl transform transition-all duration-300 ease-in-out max-w-md w-full mx-4">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Application Submitted!</h2>
            <p className="mb-6 text-gray-300">Thank you for applying to teach with us. We'll review your application and get back to you soon.</p>
            <button 
              onClick={() => setShowConfetti(false)} 
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        {/* Uncomment the next line to use video instead of image */}
        {/* <video src="/hero-video-3.mp4" className="w-full h-full object-cover" autoPlay loop muted /> */}
        <Image
          src="/hero-image-1.jpg"
          alt="Teach on StripTeach"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Become a StripTeacher
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Share your expertise, inspire students, and build a rewarding career
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Teach on StripTeach?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Global Reach', description: 'Connect with students worldwide' },
              { title: 'Flexible Schedule', description: 'Teach on your own terms' },
              { title: 'Earn More', description: 'Unlock your earning potential' },
              { title: 'Cutting-edge Tools', description: 'Access the latest teaching resources' },
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-teal-400 mb-4">
                  {/* Add appropriate icon here */}
                  <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Apply to Teach</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name input field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-white py-3 px-4 text-lg"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email input field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-white py-3 px-4 text-lg"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>

              {/* ... other form fields ... */}

              {/* Video upload/record section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload or Record a short introduction video (max 2 minutes) *
                </label>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <input
                    type="file"
                    id="video"
                    name="video"
                    accept="video/*"
                    className="hidden"
                    onChange={handleVideoChange}
                  />
                  <label
                    htmlFor="video"
                    className="flex-1 cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded text-center transition duration-300"
                  >
                    Choose Video File
                  </label>
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300"
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                  {!isRecording && recordedChunks.length > 0 && (
                    <button
                      type="button"
                      onClick={handleRecordedVideo}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300"
                    >
                      Use Recorded Video
                    </button>
                  )}
                </div>
                <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden">
                  {videoPreviewUrl ? (
                    <video 
                      src={videoPreviewUrl} 
                      className="w-full h-full object-cover" 
                      controls
                    />
                  ) : isRecording ? (
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src="/hero-image-1.jpg"
                        alt="Upload or record a video"
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <p className="text-white text-lg font-medium">Upload or record your video here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300"
                  disabled={uploading}
                >
                  {uploading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
