import Link from 'next/link'

interface GradientButtonProps {
  href: string
  children: React.ReactNode
}

export function GradientButton({ href, children }: GradientButtonProps) {
  return (
    <Link 
      href={href} 
      className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:shadow-lg hover:from-purple-700 hover:to-indigo-700"
    >
      {children}
    </Link>
  )
}