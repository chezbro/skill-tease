'use client'

import { useState } from 'react'
import Link from 'next/link'
import HeroCarousel from '@/components/HeroCarousel'
import { CheckCircle } from 'lucide-react'

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

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.name} 
                href={`/courses?category=${category.name.toLowerCase()}`}
                className="bg-gray-800 p-6 rounded-lg text-center transition duration-300 hover:bg-gray-700 hover:shadow-neon-purple animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((course) => (
              <div key={course} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-neon-blue">
                <img 
                  src={`/hero-image-1.jpg`} 
                  alt={`Course ${course}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Course Title {course}</h3>
                  <p className="text-gray-400 mb-4">Brief description of the course goes here.</p>
                  <Link 
                    href={`/courses/${course}`} 
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
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
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8">Join thousands of students already learning on our platform</p>
          <Link 
            href="/signup" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:shadow-neon-green"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  )
}