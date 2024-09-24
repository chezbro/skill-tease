import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const courses = await prisma.course.findMany()
  return NextResponse.json(courses)
}

export async function POST(request: Request) {
  const data = await request.json()
  const course = await prisma.course.create({
    data: {
      ...data,
      lessons: {
        create: data.lessons.map((lesson: any) => ({
          ...lesson,
          quiz: lesson.quiz ? { create: lesson.quiz } : undefined
        }))
      }
    },
    include: { lessons: { include: { quiz: true } } }
  })
  return NextResponse.json(course)
}