'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <header className="bg-gray-800 text-white py-4">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Stripteach</Link>
          <div>
            {!session ? (
              <>
                <Link href="/login" className="mr-4">Login</Link>
                <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Sign Up</Link>
              </>
            ) : (
              <Link href="/logout">Logout</Link>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          © 2024 Stripteach, Inc. All rights reserved.
        </div>
      </footer>
    </>
  )
}