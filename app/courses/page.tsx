import Link from 'next/link'

export default function CoursesPage() {
  // This is a placeholder for course data. In a real application, this would come from your backend.
  const courses = [
    { id: 1, title: "Introduction to Programming", category: "Programming" },
    { id: 2, title: "Digital Marketing Fundamentals", category: "Marketing" },
    { id: 3, title: "Graphic Design Basics", category: "Design" },
    // Add more courses as needed
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Explore Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id} className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition duration-300 hover:shadow-neon-purple">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-400">{course.category}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}