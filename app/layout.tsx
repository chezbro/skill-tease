'use client'

import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { Inter } from "next/font/google"
import { supabase } from '@/lib/supabase'
import Login from '@/components/Login'
import Register from '@/components/Register'
import "./globals.css"
import BackToTop from '@/components/BackToTop'
import { Anton } from "next/font/google"  // Add this import
import Confetti from 'react-confetti'  // Add this import
import { WalletContextProvider } from '../components/WalletContextProvider'
import { WalletConnection } from '@/components/WalletConnection'

const anton = Anton({
  weight: '400',
  preload: false,
})  // Add this line

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const [session, setSession] = useState<Session | null>(null)  // Update this line
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)  // Add this line

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

  const handleLogoClick = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)  // Hide confetti after 3 seconds
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <WalletContextProvider>
          {showConfetti && <Confetti />}
          <div className={showLogin || showRegister ? 'blur-sm' : ''}>
            <header className="border-b border-gray-800 py-2 sm:py-4">
              <nav className="container mx-auto px-2 sm:px-4 flex flex-col sm:flex-row justify-between items-center">
                <Link href="/" className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0" onClick={handleLogoClick}>
                  <span className="relative group">
                    {['S', 'T', 'R', 'I', 'P', 'T', 'E', 'A', 'C', 'H'].map((letter, index) => (
                      <span key={index} className={`${anton.className} text-3xl transition duration-300 text-white group-hover:text-purple-500`} style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5), 4px 4px 0 rgba(0, 0, 0, 0.3)' }}>
                        {letter}
                      </span>
                    ))}
                  </span>
                </Link>
                <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-4">
                  <WalletConnection />
                  {!session ? (
                    <>
                      <Link href="/waitlist" className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span className="relative px-3 sm:px-5 py-1.5 sm:py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Join Waitlist
                        </span>
                      </Link>
                      <Link href="/apply-to-teach" className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                        <span className="relative px-3 sm:px-5 py-1.5 sm:py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Apply To Teach
                        </span>
                      </Link>
                    </>
                  ) : (
                    <button onClick={handleLogout} className="text-sm sm:text-base hover:text-red-500 transition duration-300">Logout</button>
                  )}
                </div>
              </nav>
            </header>
            <main>{children}</main>
            <footer className="border-t border-gray-800 py-4 mt-8">
              <div className="container mx-auto px-4 text-center text-gray-400">
                © 2024 StripTeach, inc. All rights reserved.
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
          <BackToTop />
        </WalletContextProvider>
      </body>
    </html>
  )
}