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
              <div className="space-x-4 flex items-center">
                {!session ? (
                  <>
                    <button onClick={toggleLogin} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Login
                      </span>
                    </button>
                    <Link href="/#pricing" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Sign Up
                      </span>
                    </Link>
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