'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { PlayCircle, CheckCircle, XCircle } from 'lucide-react'

export default function CoursePage() {
  const { id } = useParams()
  const [course, setCourse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setCourse(data)
      } catch (e) {
        console.error("Failed to fetch course:", e)
        setError("Failed to load course. Please try again later.")
      }
    }

    fetchCourse()
  }, [id])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!course) {
    return <div>Loading...</div>
  }

  const currentLesson = course.lessons[currentLessonIndex]

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => {
        console.error("Error playing video:", e)
        setVideoError(e instanceof Error ? e.message : String(e))
      })
      setIsVideoPlaying(true)
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('error', (e) => {
        console.error("Video error:", e)
        setVideoError("Error loading video. Please try again later.")
      })
    }
  }, [])

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
  }

  const moveToNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      setQuizAnswer(null)
      setQuizSubmitted(false)
      setIsVideoPlaying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Image/Video Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {!isVideoPlaying ? (
          <>
            <Image
              src={course.heroImage}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={playVideo}
                className="text-white text-6xl hover:text-blue-500 transition duration-300"
              >
                <PlayCircle size={64} />
              </button>
            </div>
          </>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={course.videoUrl}
            controls
            playsInline
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
        )}
        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <p className="text-white text-xl">{videoError}</p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Info */}
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold mb-4 text-white">{course.title}</h1>
            <p className="text-gray-300 mb-6">{course.description}</p>
            
            {/* Lesson Content */}
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-bold mb-4 text-white">{currentLesson.title}</h2>
              <p className="text-gray-300 mb-6">{currentLesson.content}</p>
              
              {/* Lesson Video */}
              <div className="mb-6">
                <video
                  ref={videoRef}
                  className="w-full h-auto"
                  src={currentLesson.videoUrl}
                  controls
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Quiz Section */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-white">Quiz</h3>
                <p className="text-gray-300 mb-4">{currentLesson.quiz.question}</p>
                <div className="space-y-2">
                  {currentLesson.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-2 rounded ${
                        quizAnswer === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-gray-300'
                      } hover:bg-blue-500 transition duration-300`}
                      onClick={() => setQuizAnswer(index)}
                      disabled={quizSubmitted}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {!quizSubmitted ? (
                  <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    onClick={handleQuizSubmit}
                    disabled={quizAnswer === null}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="mt-4">
                    {quizAnswer === currentLesson.quiz.correctAnswer ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="mr-2" />
                        Correct! Well done!
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <XCircle className="mr-2" />
                        Incorrect. Try again!
                      </div>
                    )}
                    {quizAnswer === currentLesson.quiz.correctAnswer && (
                      <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        onClick={moveToNextLesson}
                      >
                        Next Lesson
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-white">Course Progress</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-lg ${
                    index === currentLessonIndex
                      ? 'bg-blue-600 text-white'
                      : index < currentLessonIndex
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  <h3 className="font-semibold">{lesson.title}</h3>
                  {index < currentLessonIndex && (
                    <CheckCircle className="inline-block ml-2" size={16} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}