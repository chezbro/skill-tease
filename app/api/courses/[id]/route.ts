import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const { data: course, error } = await supabase
    .from('courses')
    .select(`
      *,
      lessons (
        *,
        quiz: quizzes (*)
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
  const { id } = params
  const data = await request.json()

  const { data: course, error } = await supabase
    .from('courses')
    .update(data)
    .eq('id', id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(course)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Course deleted' })
}