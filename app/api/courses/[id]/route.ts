import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  // Fetch course data from Supabase
  const { data: course, error } = await supabase
    .from('courses')
    .select(`
      *,
      lessons:lessons(
        *,
        quiz:quizzes(*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }

  return NextResponse.json(course)
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