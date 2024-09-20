'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Inter } from "next/font/google"
import { supabase } from '@/lib/supabase'
import Login from '@/components/Login'
import Register from '@/components/Register'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [session, setSession] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const toggleLogin = () => setShowLogin(!showLogin)
  const toggleRegister = () => setShowRegister(!showRegister)

  const closeModals = () => {
    setShowLogin(false)
    setShowRegister(false)
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className={showLogin || showRegister ? 'blur-sm' : ''}>
          <header className="border-b border-gray-800 py-4">
            <nav className="container mx-auto px-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold hover:text-blue-500 transition duration-300">Stripteach</Link>
              <div className="space-x-4">
                <Link href="/courses" className="hover:text-blue-500 transition duration-300">Courses</Link>
                {!session ? (
                  <>
                    <button onClick={toggleLogin} className="hover:text-green-500 transition duration-300">Login</button>
                    <Link href="/#pricing" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition duration-300 hover:shadow-neon-blue">Sign Up</Link>
                  </>
                ) : (
                  <button onClick={handleLogout} className="hover:text-red-500 transition duration-300">Logout</button>
                )}
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="border-t border-gray-800 py-4 mt-8">
            <div className="container mx-auto px-4 text-center text-gray-400">
              © 2024 Stripteach, inc. All rights reserved.
            </div>
          </footer>
        </div>
        {showLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50" onClick={closeModals}>
            <div className="bg-white p-8 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
              <Login onClose={toggleLogin} />
            </div>
          </div>
        )}
        {showRegister && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50" onClick={closeModals}>
            <div className="bg-white p-8 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
              <Register onClose={toggleRegister} />
            </div>
          </div>
        )}
      </body>
    </html>
  )
}