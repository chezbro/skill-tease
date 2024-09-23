'use client'

import { useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideo(e.target.files[0])
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
      setVideo(new File([blob], 'recorded-video.webm', { type: 'video/webm' }))
      setRecordedChunks([])
    }
  }, [recordedChunks])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

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
        .from('teacher_applications')
        .insert([{ ...formData, video_url: videoUrl }])

      if (error) throw error
      alert('Application submitted successfully!')
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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white bg-opacity-10 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-extrabold text-center text-white mb-6">Apply to Teach</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" id="name" name="name" required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-white"
                value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" id="email" name="email" required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-white"
                value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-300">Area of Expertise</label>
              <input type="text" id="expertise" name="expertise" required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-white"
                value={formData.expertise} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-300">Years of Experience</label>
              <input type="number" id="experience" name="experience" required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-white"
                value={formData.experience} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-300">Why do you want to teach on Stripteach?</label>
              <textarea id="motivation" name="motivation" rows={4} required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-gray-700 text-white"
                value={formData.motivation} onChange={handleChange}></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload or Record a short introduction video (max 2 minutes)</label>
              <input type="file" id="video" name="video" accept="video/*"
                className="mt-1 block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-teal-50 file:text-teal-700
                hover:file:bg-teal-100"
                onChange={handleVideoChange} />
              <div className="mt-2">
                <button type="button" onClick={isRecording ? stopRecording : startRecording}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                {!isRecording && recordedChunks.length > 0 && (
                  <button type="button" onClick={handleRecordedVideo}
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                    Use Recorded Video
                  </button>
                )}
              </div>
              <video ref={videoRef} className="mt-2 w-full" autoPlay muted />
            </div>
            <div>
              <button type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-lime-500 hover:from-teal-600 hover:to-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                disabled={uploading}>
                {uploading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}