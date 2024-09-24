import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { writeFile } from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: { lessons: { include: { quiz: true } } }
  })
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