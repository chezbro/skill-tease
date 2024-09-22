'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeroCarousel from '@/components/HeroCarousel'
import { CheckCircle } from 'lucide-react'
import { GradientButton } from '@/components/GradientButton'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Book, Brain, Lightbulb, Zap } from 'lucide-react'

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
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    setIsVideoPlaying(true)
    videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    setIsVideoPlaying(false)
    videoRef.current?.pause()
  }

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* Course Categories Banner */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900">
        <div className="container mx-auto">
          <motion.h2 
            className="text-6xl font-bold mb-16 text-center text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore Our Tantalizing Courses
          </motion.h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-6 gap-8 max-w-6xl">
              {categories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-800 rounded-lg p-6 text-center transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-purple-500/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <motion.button 
                    className="mt-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-32 px-4 bg-gray-900">
        <div className="container mx-auto">
          <motion.h2 
            className="text-6xl font-bold mb-20 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How Stripteach Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Book, title: "Strip Away Ignorance", description: "Peel back the layers of complexity and reveal the naked truth of knowledge." },
              { icon: Brain, title: "Kiss Confusion Goodbye", description: "Our AI tutors will seduce your mind with clarity and understanding." },
              { icon: Lightbulb, title: "Ignite Your Passion", description: "Fan the flames of curiosity and watch your skills blaze to new heights." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center relative p-8 bg-gray-800 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-transparent opacity-10 rounded-lg" />
                <div className="relative z-10">
                  <item.icon className="w-20 h-20 mx-auto mb-6 text-purple-400" />
                  <h3 className="text-3xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-300 text-lg mb-6">{item.description}</p>
                  <motion.button 
                    className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-32 px-4 bg-gradient-to-b from-gray-900 to-purple-900">
        <div className="container mx-auto">
          <motion.h2 
            className="text-6xl font-bold mb-20 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Our Students Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Jane D.", quote: "Stripteach made learning so exciting, I couldn't keep my hands off my keyboard!", longQuote: "I never thought I'd be this passionate about coding. Stripteach's unique approach has transformed my learning experience. The AI tutor feels like a personal mentor, always there to guide me through complex concepts. Now, I'm building projects I never thought I could!" },
              { name: "John S.", quote: "The AI tutor whispered sweet algorithms in my ear. Now I'm a coding Casanova!", longQuote: "As someone who struggled with traditional learning methods, Stripteach was a game-changer. The AI tutor adapted to my learning style, making even the most complex algorithms feel intuitive. I've gone from a coding novice to leading projects at work in just a few months!" },
              { name: "Emily R.", quote: "Stripteach turned my brain on. Now I'm having intellectual affairs with new ideas daily!", longQuote: "Stripteach has ignited a passion for learning I never knew I had. The courses are engaging, challenging, and incredibly rewarding. I find myself exploring new topics every day, and the AI tutor is always there to support my curiosity. It's like having a brilliant study partner available 24/7!" }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className={`bg-gray-800 p-8 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${expandedReview === index ? 'col-span-3' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setExpandedReview(expandedReview === index ? null : index)}
              >
                <AnimatePresence>
                  {expandedReview === index ? (
                    <motion.p 
                      className="mb-6 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      "{testimonial.longQuote}"
                    </motion.p>
                  ) : (
                    <motion.p 
                      className="mb-6 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      "{testimonial.quote}"
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="flex items-center">
                  <Image 
                    src={`https://picsum.photos/seed/${index}/40/40`} 
                    alt={`Student ${index + 1}`} 
                    width={40} 
                    height={40} 
                    className="rounded-full mr-4"
                    unoptimized
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example lesson section */}
      <section className="py-24 px-4 bg-gray-900 min-h-screen flex items-center">
        <div className="container mx-auto">
          <motion.h2 
            className="text-5xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sneak a Peek at Our Lessons
          </motion.h2>
          <motion.div 
            className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="relative h-96"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image 
                src="/hero-image-1.jpg" 
                alt="Lesson Preview" 
                layout="fill" 
                objectFit="cover" 
                className={`brightness-75 transition-opacity duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
                unoptimized
              />
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
                src="/hero-video-3.mp4"
                muted
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button 
                  className={`bg-purple-600 text-white text-6xl rounded-full p-4 hover:bg-purple-700 transition-all duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Zap />
                </motion.button>
              </div>
            </div>
            {/* ... rest of the section content ... */}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 min-h-screen flex items-center bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="container mx-auto">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Pricing Plans
          </motion.h2>
          <p className="text-xl text-center text-gray-300 mb-16">
            Choose the plan that fits your learning journey
          </p>

          {/* Pricing toggle */}
          <div className="flex justify-center items-center mb-16">
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
          <div className="grid md:grid-cols-3 gap-12">
            {pricingTiers.map((tier, index) => (
              <motion.div 
                key={tier.name}
                className={`bg-gray-800 rounded-lg p-8 shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${
                  tier.recommended ? 'ring-2 ring-purple-500' : ''
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                <GradientButton href="/signup">
                  Get Started
                </GradientButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-gray-900 min-h-screen flex items-center">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Undress Your Mind?
          </motion.h2>
          <motion.p 
            className="text-2xl mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of students already experiencing intellectual ecstasy
          </motion.p>
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GradientButton href="/#pricing">
              Start Your Journey Now
            </GradientButton>
            <p className="mt-8 text-gray-400">Still not convinced? Check out our <Link href="/free-trial" className="text-purple-400 hover:text-purple-300 underline">free trial</Link> and experience the Stripteach difference!</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}