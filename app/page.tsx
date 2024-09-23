'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeroCarousel from '@/components/HeroCarousel'
import { ArrowRight, Book, Brain, Lightbulb, Zap, PlayCircle, CheckCircle, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { StyledButton } from '@/components/StyledButton'

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
            <div className="flex gap-8 overflow-x-auto pb-8 max-w-full">
              {categories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl flex-shrink-0 w-80"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-48">
                    <Image 
                      src={`/hero-image.jpg`} 
                      alt={category.name} 
                      layout="fill" 
                      objectFit="cover" 
                      className="brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl">{category.icon}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">{category.name}</h3>
                    <p className="text-gray-300 mb-6">Discover the secrets of {category.name.toLowerCase()} with our expert-led courses.</p>
                    <motion.button 
                      className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Courses
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Course Details Preview Section */}
      <section className="py-32 px-4 bg-gray-900">
        <div className="container mx-auto">
          <motion.h2 
            className="text-6xl font-bold mb-20 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Featured Course
          </motion.h2>
          <motion.div 
            className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Course Video Preview */}
              <div 
                className="relative h-96 lg:h-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image 
                  src="/hero-image-1.jpg" 
                  alt="Advanced Web Development" 
                  layout="fill" 
                  objectFit="cover" 
                  className={`brightness-75 transition-opacity duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
                />
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
                  src="/hero-video-3.mp4"
                  muted
                  playsInline
                  loop
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button 
                    className={`bg-purple-600 text-white text-6xl rounded-full p-4 hover:bg-purple-700 transition-all duration-300 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <PlayCircle />
                  </motion.button>
                </div>
              </div>

              {/* Course Details */}
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 text-white">Advanced Web Development</h3>
                <p className="text-gray-300 mb-6">Master the latest web technologies and frameworks in this comprehensive course. Suitable for intermediate to advanced developers looking to upgrade their skills.</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Book className="mr-2 text-purple-400" />
                    <span className="text-gray-300">12 weeks</span>
                  </div>
                  <div className="flex items-center">
                    <Brain className="mr-2 text-purple-400" />
                    <span className="text-gray-300">Advanced</span>
                  </div>
                  <div className="flex items-center">
                    <Lightbulb className="mr-2 text-purple-400" />
                    <span className="text-gray-300">4.8 / 5 rating</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="mr-2 text-purple-400" />
                    <span className="text-gray-300">1234 students</span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-4 text-white">Course Curriculum</h4>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 text-green-400" />
                    Modern JavaScript
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 text-green-400" />
                    React Fundamentals
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 text-green-400" />
                    Backend Development with Node.js
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="mr-2 text-green-400" />
                    Advanced React Patterns
                  </li>
                </ul>
                <StyledButton href="/courses/1" className="w-full flex items-center justify-center">
                  View Full Course Details
                  <ArrowRight className="ml-2" />
                </StyledButton>
              </div>
            </div>
          </motion.div>
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
            className="text-6xl font-bold mb-20 text-center text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What Our Students Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Jane D.", role: "Web Developer", quote: "Stripteach made learning so exciting, I couldn't keep my hands off my keyboard!", longQuote: "I never thought I'd be this passionate about coding. Stripteach's unique approach has transformed my learning experience. The AI tutor feels like a personal mentor, always there to guide me through complex concepts. Now, I'm building projects I never thought I could!" },
              { name: "John S.", role: "Data Scientist", quote: "The AI tutor whispered sweet algorithms in my ear. Now I'm a coding Casanova!", longQuote: "As someone who struggled with traditional learning methods, Stripteach was a game-changer. The AI tutor adapted to my learning style, making even the most complex algorithms feel intuitive. I've gone from a coding novice to leading projects at work in just a few months!" },
              { name: "Emily R.", role: "UX Designer", quote: "Stripteach turned my brain on. Now I'm having intellectual affairs with new ideas daily!", longQuote: "Stripteach has ignited a passion for learning I never knew I had. The courses are engaging, challenging, and incredibly rewarding. I find myself exploring new topics every day, and the AI tutor is always there to support my curiosity. It's like having a brilliant study partner available 24/7!" }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className={`bg-gray-800 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
                  expandedReview === index ? 'col-span-3' : ''
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48">
                  <Image 
                    src={`/hero-image.jpg`} 
                    alt="Testimonial background" 
                    layout="fill" 
                    objectFit="cover" 
                    className="brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image 
                      src={`https://picsum.photos/seed/${index}/120/120`} 
                      alt={`${testimonial.name}`} 
                      width={120} 
                      height={120} 
                      className="rounded-full border-4 border-purple-500"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-center mb-6">
                    <p className="font-semibold text-2xl text-white">{testimonial.name}</p>
                    <p className="text-purple-400">{testimonial.role}</p>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedReview === index ? (
                      <motion.p 
                        className="text-gray-300 text-lg leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        "{testimonial.longQuote}"
                      </motion.p>
                    ) : (
                      <motion.p 
                        className="text-gray-300 text-lg leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        "{testimonial.quote}"
                      </motion.p>
                    )}
                  </AnimatePresence>
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
                loop
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



      {/* Waitlist Pricing Section */}
      <section id="pricing" className="py-24 px-4 min-h-screen flex items-center bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="container mx-auto">
          <motion.h2 
            className="text-5xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join Our Exclusive Waitlist
          </motion.h2>
          <p className="text-xl text-center text-gray-300 mb-16">
            Be among the first to experience Stripteach and enjoy special early adopter benefits
          </p>

          {/* Waitlist offer */}
          <motion.div 
            className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-center">Early Adopter Offer</h3>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center">
                <CheckCircle className="mr-3 h-6 w-6 text-purple-500" />
                <span>50% off your first 3 months of any plan</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 h-6 w-6 text-purple-500" />
                <span>Exclusive access to beta features</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 h-6 w-6 text-purple-500" />
                <span>Priority onboarding and support</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-3 h-6 w-6 text-purple-500" />
                <span>Chance to win a lifetime premium membership</span>
              </li>
            </ul>
            <p className="text-center text-lg mb-8">
              Join now and be notified as soon as we launch!
            </p>
            <StyledButton href="/waitlist" className="w-full text-xl py-4">
              Join the Waitlist
            </StyledButton>
            <p className="mt-6 text-center text-gray-400 text-sm">
              No credit card required. Cancel anytime.
            </p>
          </motion.div>

          {/* Testimonial */}
          <div className="mt-16 text-center">
            <p className="text-xl italic mb-4">
              "I joined the waitlist and got early access. The discounted rate was amazing, but the learning experience was priceless!"
            </p>
            <p className="text-purple-400 font-semibold">- Sarah K., Early Adopter</p>
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
            <StyledButton href="/waitlist" className="text-xl px-12 py-6">
              Start Your Journey Now
            </StyledButton>
            <p className="mt-8 text-gray-400">Still not convinced? Check out our <Link href="/waitlist" className="text-purple-400 hover:text-purple-300 underline">free trial</Link> and experience the Stripteach difference!</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Teachers Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900">
        <div className="container mx-auto">
          <motion.h2 
            className="text-6xl font-bold mb-20 text-center text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Meet Our Star Teachers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Prof. Allura Spark", image: "/hero-image.jpg", specialty: "AI & Machine Learning", rating: 4.9 },
              { name: "Dr. Zephyr Blaze", image: "/hero-image-2.jpg", specialty: "Quantum Computing", rating: 4.8 },
              { name: "Mx. Nova Frost", image: "/hero-image-3.jpg", specialty: "Cybersecurity", rating: 4.9 }
            ].map((teacher, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-80">
                  <Image 
                    src={teacher.image}
                    alt={teacher.name}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-3xl font-bold text-white mb-2">{teacher.name}</h3>
                    <p className="text-purple-300 text-lg">{teacher.specialty}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(teacher.rating) ? 'text-yellow-400' : 'text-gray-400'}`} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-white">{teacher.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Embark on a mind-bending journey through {teacher.specialty} with {teacher.name.split(' ')[1]}. 
                    Prepare to have your neurons tickled and your paradigms shifted!
                  </p>
                  <StyledButton href={`/teachers/${index + 1}`} className="w-full">
                    View Profile
                  </StyledButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}