'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeroCarousel from '@/components/HeroCarousel'
import { CheckCircle } from 'lucide-react'

const StarIcon = () => (
  <svg className="h-4 w-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const categories = [
  { name: 'Programming', icon: '💻' },
  { name: 'Design', icon: '🎨' },
  { name: 'Marketing', icon: '📈' },
  { name: 'Music', icon: '🎵' },
  { name: 'Language', icon: '🗣️' },
  { name: 'Fitness', icon: '💪' },
]

const pricingTiers = [
  {
    name: "Basic",
    price: 19,
    features: [
      "Access to 50+ courses",
      "Basic AI tutor assistance",
      "Mobile app access",
      "Course completion certificates",
    ],
    color: "blue",
  },
  {
    name: "Pro",
    price: 39,
    features: [
      "Access to 200+ courses",
      "Advanced AI tutor with personalized learning paths",
      "Priority support",
      "Offline course downloads",
      "Exclusive webinars and workshops",
    ],
    color: "purple",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: 99,
    features: [
      "Unlimited access to all courses",
      "Premium AI tutor with real-time adaptive learning",
      "Dedicated account manager",
      "Custom course creation",
      "Team collaboration tools",
      "Advanced analytics and reporting",
    ],
    color: "green",
  },
]

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* How it works section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">How Stripteach Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎭</div>
              <h3 className="text-2xl font-semibold mb-2">Strip Away Ignorance</h3>
              <p className="text-gray-300">Peel back the layers of complexity and reveal the naked truth of knowledge.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💋</div>
              <h3 className="text-2xl font-semibold mb-2">Kiss Confusion Goodbye</h3>
              <p className="text-gray-300">Our AI tutors will seduce your mind with clarity and understanding.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-2xl font-semibold mb-2">Ignite Your Passion</h3>
              <p className="text-gray-300">Fan the flames of curiosity and watch your skills blaze to new heights.</p>
            </div>
          </div>
        </div>
      </section>

            {/* Testimonials section */}
            <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Jane D.", quote: "Stripteach made learning so exciting, I couldn't keep my hands off my keyboard!" },
              { name: "John S.", quote: "The AI tutor whispered sweet algorithms in my ear. Now I'm a coding Casanova!" },
              { name: "Emily R.", quote: "Stripteach turned my brain on. Now I'm having intellectual affairs with new ideas daily!" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <p className="mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Image 
                    src={`https://picsum.photos/seed/${index}/40/40`} 
                    alt={`Student ${index + 1}`} 
                    width={40} 
                    height={40} 
                    className="rounded-full mr-3"
                    unoptimized // This is important for random images
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example lesson section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Sneak a Peek at Our Lessons</h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64 md:h-96">
              <Image 
                src="https://picsum.photos/seed/lesson/800/600" 
                alt="Lesson Preview" 
                layout="fill" 
                objectFit="cover" 
                className="brightness-75"
                unoptimized // This is important for random images
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="text-white text-6xl hover:text-blue-500 transition duration-300">
                  ▶️
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">The Art of Seductive Coding</h3>
              <p className="text-gray-300 mb-4">Uncover the secrets of writing code that's impossible to resist. Learn how to create functions so smooth, they'll make other developers blush.</p>
              <Link href="/courses/seductive-coding" className="text-blue-400 hover:text-blue-300 font-semibold">
                Unveil the Full Lesson →
              </Link>
            </div>
          </div>
        </div>
      </section>

    
     {/* Pricing Section */}
     <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Pricing Plans</h2>
          <p className="text-xl text-center text-gray-300 mb-12">
            Choose the plan that fits your learning journey
          </p>

          {/* Pricing toggle */}
          <div className="flex justify-center items-center mb-12">
            <span className={`mr-3 ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <label className="switch">
              <input type="checkbox" checked={isAnnual} onChange={() => setIsAnnual(!isAnnual)} />
              <span className="slider round"></span>
            </label>
            <span className={`ml-3 ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual <span className="text-green-500 font-semibold">(Save 20%)</span>
            </span>
          </div>

          {/* Pricing tiers */}
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={tier.name}
                className={`bg-gray-800 rounded-lg p-8 shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${
                  tier.recommended ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {tier.recommended && (
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                <p className="text-4xl font-bold mb-6">
                  ${isAnnual ? tier.price * 10 : tier.price}
                  <span className="text-gray-400 text-lg font-normal">/{isAnnual ? 'year' : 'month'}</span>
                </p>
                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className={`mr-2 h-5 w-5 text-${tier.color}-500`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/signup" 
                  className={`block w-full text-center bg-${tier.color}-600 hover:bg-${tier.color}-700 text-white font-bold py-3 px-4 rounded transition duration-300 hover:shadow-neon-${tier.color}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Undress Your Mind?</h2>
          <p className="text-xl mb-8">Join thousands of students already experiencing intellectual ecstasy</p>
          <Link 
            href="/#pricing" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:shadow-neon-green"
          >
            Start Your Journey Now
          </Link>
        </div>
      </section>
    </div>
  )
}