'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { PlayCircle } from 'lucide-react'

// Mock data (in a real app, you'd fetch this from an API)
const mockCourseData = {
  id: '1',
  title: "Advanced Web Development",
  description: "Master the latest web technologies and frameworks in this comprehensive course. Suitable for intermediate to advanced developers looking to upgrade their skills.",
  instructor: "Jane Doe",
  duration: "12 weeks",
  level: "Advanced",
  rating: 4.8,
  enrolledStudents: 1234,
  heroImage: "/course-hero.jpg",
  videoUrl: "/course-preview.mp4",
  curriculum: [
    {
      title: "Module 1: Modern JavaScript",
      lessons: ["ES6+ Features", "Asynchronous JavaScript", "JavaScript Modules"]
    },
    {
      title: "Module 2: React Fundamentals",
      lessons: ["JSX and Components", "State and Props", "Hooks and Context API"]
    },
    {
      title: "Module 3: Backend Development with Node.js",
      lessons: ["Express.js Basics", "RESTful API Design", "Database Integration"]
    },
    {
      title: "Module 4: Advanced React Patterns",
      lessons: ["Higher-Order Components", "Render Props", "Custom Hooks"]
    }
  ]
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const [activeModule, setActiveModule] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // In a real app, you'd fetch the course data based on the id
  const course = mockCourseData

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsVideoPlaying(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Image/Video Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        {!isVideoPlaying ? (
          <>
            <Image
              src={'/hero-image-1.jpg'}
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
          />
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Info */}
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold mb-4 text-white">{course.title}</h1>
            <p className="text-gray-300 mb-6">{course.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="course-info-card">
                <h3 className="font-semibold text-white">Instructor</h3>
                <p className="text-gray-300">{course.instructor}</p>
              </div>
              <div className="course-info-card">
                <h3 className="font-semibold text-white">Duration</h3>
                <p className="text-gray-300">{course.duration}</p>
              </div>
              <div className="course-info-card">
                <h3 className="font-semibold text-white">Level</h3>
                <p className="text-gray-300">{course.level}</p>
              </div>
              <div className="course-info-card">
                <h3 className="font-semibold text-white">Rating</h3>
                <p className="text-gray-300">{course.rating} / 5</p>
              </div>
            </div>
            <button className="enroll-button hover:shadow-neon-blue">
              Enroll Now
            </button>
          </div>

          {/* Curriculum */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4 text-white">Course Curriculum</h2>
            <div className="space-y-4">
              {course.curriculum.map((module, index) => (
                <div key={index} className="course-curriculum-item">
                  <button
                    className="w-full text-left px-4 py-2 font-semibold text-white hover:bg-gray-700 transition duration-300"
                    onClick={() => setActiveModule(index)}
                  >
                    {module.title}
                  </button>
                  {activeModule === index && (
                    <ul className="bg-gray-700 px-4 py-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="text-gray-300 py-1">
                          {lesson}
                        </li>
                      ))}
                    </ul>
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