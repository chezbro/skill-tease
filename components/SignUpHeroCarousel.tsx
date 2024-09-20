import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const carouselItems = [
  {
    title: 'Join Our Learning Community',
    description: 'Unlock a world of knowledge and connect with like-minded learners.',
  },
  {
    title: 'Personalized Learning Journey',
    description: 'Discover courses tailored to your interests and career goals.',
  },
  {
    title: 'Learn from the Best',
    description: 'Access high-quality content from industry experts and thought leaders.',
  },
]

export default function SignUpHeroCarousel() {
  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={5000}
      className="h-full"
    >
      {carouselItems.map((item, index) => (
        <div key={index} className="h-full flex flex-col justify-center items-center text-center px-8 bg-gradient-to-br from-purple-600 to-indigo-800">
          <h2 className="text-3xl font-bold text-white mb-4">{item.title}</h2>
          <p className="text-xl text-white">{item.description}</p>
        </div>
      ))}
    </Carousel>
  )
}