'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Register({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      alert('Check your email for the confirmation link!')
      onClose()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded text-black"
      />
      <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">

      Register
      </button>
      <button type="button" onClick={onClose} className="w-full p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
        Cancel
      </button>
    </form>
  )
}