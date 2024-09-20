'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

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

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-4 animate-fade-in-up">Unlock Your Learning Potential</h1>
        <p className="text-xl text-center text-gray-300 mb-12 animate-fade-in-up animation-delay-200">
          Choose the plan that fits your learning journey
        </p>

        {/* Pricing toggle */}
        <div className="flex justify-center items-center mb-12 animate-fade-in-up animation-delay-400">
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
              className={`bg-gray-800 rounded-lg p-8 shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up ${
                tier.recommended ? 'ring-2 ring-purple-500' : ''
              }`}
              style={{ animationDelay: `${(index + 3) * 200}ms` }}
            >
              {tier.recommended && (
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Recommended
                </span>
              )}
              <h2 className="text-2xl font-bold mb-4">{tier.name}</h2>
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

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-gray-300">Yes, you can upgrade or downgrade your plan at any time. The change will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-300">We offer a 7-day free trial for all new users. You'll have access to all features of the Basic plan during your trial period.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-300">We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-gray-300">We offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}