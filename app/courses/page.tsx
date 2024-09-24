import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Define the Course type
type Course = {
  id: number
  title: string
  category: string
}

// Make the component async
export default async function CoursesPage() {
  try {
    // Fetch courses from Supabase
    const { data: courses, error } = await supabase
      .from('courses')
      .select('id, title, category')

    // Handle potential error
    if (error) {
      console.error('Error fetching courses:', error)
      throw new Error('Failed to fetch courses')
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Explore Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: Course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition duration-300 hover:shadow-neon-purple">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-400">{course.category}</p>
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in CoursesPage:', error)
    return <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Error</h1>
      <p>Unable to load courses. Please try again later.</p>
    </div>
  }
}