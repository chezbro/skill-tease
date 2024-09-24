import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { writeFile } from 'fs/promises'

const prisma = new PrismaClient()
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    // Fetch course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single()

    if (courseError) throw courseError

    // Fetch lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', id)
      .order('order')

    if (lessonsError) throw lessonsError

    // Fetch quizzes
    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select('*')
      .in('lesson_id', lessons.map(lesson => lesson.id))

    if (quizzesError) throw quizzesError

    // Structure the data
    const formattedLessons = lessons.map(lesson => {
      const quiz = quizzes.find(q => q.lesson_id === lesson.id)
      return {
        id: lesson.id,
        title: lesson.title,
        content: lesson.content,
        videoUrl: lesson.video_url,
        quiz: quiz ? {
          question: quiz.question,
          options: quiz.options,
          correctAnswer: quiz.correct_answer
        } : null
      }
    })

    const formattedCourse = {
      id: course.id,
      title: course.title,
      description: course.description,
      heroImage: course.hero_image,
      videoUrl: course.video_url,
      lessons: formattedLessons
    }

    return NextResponse.json(formattedCourse)
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.formData()
  const course = JSON.parse(data.get('course') as string)

  const updatedCourse = await prisma.course.update({
    where: { id: params.id },
    data: {
      title: course.title,
      description: course.description,
      heroImage: course.heroImage,
      videoUrl: course.videoUrl,
      lessons: {
        upsert: await Promise.all(course.lessons.map(async (lesson: any) => {
          let videoUrl = lesson.videoUrl

          if (lesson.videoUrl) {
            const file = data.get(`video-${lesson.id}`) as File
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const filename = `${Date.now()}-${file.name}`
            const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
            await writeFile(filepath, buffer)
            videoUrl = `/uploads/${filename}`
          }

          return {
            where: { id: lesson.id || 'new' },
            update: {
              title: lesson.title,
              content: lesson.content,
              videoUrl,
              quiz: lesson.quiz
                ? {
                    upsert: {
                      create: lesson.quiz,
                      update: lesson.quiz,
                    },
                  }
                : undefined,
            },
            create: {
              title: lesson.title,
              content: lesson.content,
              videoUrl,
              quiz: lesson.quiz ? { create: lesson.quiz } : undefined,
            },
          }
        })),
      },
    },
    include: { lessons: { include: { quiz: true } } },
  })

  return NextResponse.json(updatedCourse)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.course.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Course deleted' })
}