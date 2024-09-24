'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      const response = await fetch('/api/courses')
      const data = await response.json()
      setCourses(data)
    }
    fetchCourses()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Link href="/admin/courses/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Create New Course
      </Link>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Existing Courses</h2>
        <ul className="space-y-2">
          {courses.map((course: any) => (
            <li key={course.id} className="flex items-center justify-between bg-gray-100 p-4 rounded">
              <span>{course.title}</span>
              <Link href={`/admin/courses/${course.id}`} className="text-blue-500 hover:underline">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}