'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  title: string;
  content: string;
  videoUrl: string;
  quiz: Quiz;
}

interface Course {
  title: string;
  description: string;
  heroImage: string;
  videoUrl: string;
  lessons: Lesson[];
}

export default function CourseBuilder() {
  const { id } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course>({
    title: '',
    description: '',
    heroImage: '',
    videoUrl: '',
    lessons: []
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (id !== 'new') {
      const fetchCourse = async () => {
        const response = await fetch(`/api/courses/${id}`)
        const data = await response.json()
        setCourse(data)
      }
      fetchCourse()
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = id === 'new' ? 'POST' : 'PUT'
    const url = id === 'new' ? '/api/courses' : `/api/courses/${id}`

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    })

    if (response.ok) {
      router.push('/admin/dashboard')
    }
  }

  const addLesson = () => {
    setCourse({
      ...course,
      lessons: [...course.lessons, { title: '', content: '', videoUrl: '', quiz: { question: '', options: ['', '', '', ''], correctAnswer: 0 } }]
    })
  }

  const updateLesson = (index: number, field: keyof Lesson, value: string) => {
    const updatedLessons = [...course.lessons]
    updatedLessons[index] = { ...updatedLessons[index], [field]: value }
    setCourse({ ...course, lessons: updatedLessons })
  }

  const handleVideoUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Here, you would typically upload the file to your server or a cloud storage service
      // and get back a URL. For now, we'll use a placeholder URL.
      const uploadedUrl = URL.createObjectURL(file) // This is temporary and won't work in production
      updateLesson(index, 'videoUrl', uploadedUrl)
    }
  }

  const updateQuiz = (lessonIndex: number, field: keyof Quiz, value: string | number | string[]) => {
    const updatedLessons = [...course.lessons]
    updatedLessons[lessonIndex].quiz = { ...updatedLessons[lessonIndex].quiz, [field]: value }
    setCourse({ ...course, lessons: updatedLessons })
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{id === 'new' ? 'Create New Course' : 'Edit Course'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label className="block mb-2 text-gray-800">Title</label>
          <input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="w-full p-2 border rounded text-gray-800 bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-800">Description</label>
          <textarea
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            className="w-full p-2 border rounded text-gray-800 bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-800">Hero Image URL</label>
          <input
            type="text"
            value={course.heroImage}
            onChange={(e) => setCourse({ ...course, heroImage: e.target.value })}
            className="w-full p-2 border rounded text-gray-800 bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-800">Course Video URL</label>
          <input
            type="text"
            value={course.videoUrl}
            onChange={(e) => setCourse({ ...course, videoUrl: e.target.value })}
            className="w-full p-2 border rounded text-gray-800 bg-white"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Lessons</h2>
        {course.lessons.map((lesson, index) => (
          <div key={index} className="mb-6 p-4 border rounded bg-white">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Lesson {index + 1}</h3>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Title</label>
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => updateLesson(index, 'title', e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Content</label>
              <textarea
                value={lesson.content}
                onChange={(e) => updateLesson(index, 'content', e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Video URL</label>
              <input
                type="text"
                value={lesson.videoUrl}
                onChange={(e) => updateLesson(index, 'videoUrl', e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-white"
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleVideoUpload(index, e)}
                className="mt-2 text-gray-800"
              />
              {lesson.videoUrl && (
                <video src={lesson.videoUrl} controls className="w-full mt-2" />
              )}
            </div>
            <h4 className="text-lg font-bold mb-2 text-gray-800">Quiz</h4>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Question</label>
              <input
                type="text"
                value={lesson.quiz.question}
                onChange={(e) => updateQuiz(index, 'question', e.target.value)}
                className="w-full p-2 border rounded text-gray-800 bg-white"
              />
            </div>
            {lesson.quiz.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-4">
                <label className="block mb-2 text-gray-800">Option {optionIndex + 1}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...lesson.quiz.options]
                    newOptions[optionIndex] = e.target.value
                    updateQuiz(index, 'options', newOptions)
                  }}
                  className="w-full p-2 border rounded text-gray-800 bg-white"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Correct Answer (0-3)</label>
              <input
                type="number"
                min="0"
                max="3"
                value={lesson.quiz.correctAnswer}
                onChange={(e) => updateQuiz(index, 'correctAnswer', parseInt(e.target.value))}
                className="w-full p-2 border rounded text-gray-800 bg-white"
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addLesson} className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
          Add Lesson
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Course
        </button>
      </form>
    </div>
  )
}