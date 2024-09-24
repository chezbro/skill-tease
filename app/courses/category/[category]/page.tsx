'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, Users } from 'lucide-react'

// Mock data for courses (you can replace this with actual API calls later)
const mockCourses = {
  programming: [
    { id: 1, title: "Introduction to Python", instructor: "Dr. Code", rating: 4.8, students: 1500, duration: "8 weeks", image: "/hero-image.jpg" },
    { id: 2, title: "Web Development with React", instructor: "Jane Developer", rating: 4.9, students: 2000, duration: "10 weeks", image: "/hero-image.jpg" },
    // ... other programming courses ...
  ],
  design: [
    { id: 4, title: "UI/UX Fundamentals", instructor: "Alice Designer", rating: 4.9, students: 1800, duration: "6 weeks", image: "/course-uiux.jpg" },
    // ... other design courses ...
  ],
  // ... other categories ...
}

export default function CategoryCourses() {
  const params = useParams()
  const category = params.category as string
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setCourses(mockCourses[category as keyof typeof mockCourses] || [])
  }, [category])

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white capitalize">{category} Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-white">{course.title}</h2>
                <p className="text-gray-400 mb-4">Instructor: {course.instructor}</p>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 mr-2">{course.rating}</span>
                  <Users className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-gray-400">{course.students} students</span>
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-gray-400">{course.duration}</span>
                </div>
                <Link href={`/courses/${course.id}`}>
                  <motion.button
                    className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Course
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}