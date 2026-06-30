import { useScroll, useSpring, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Collection from './components/Collection.jsx'
import Showcase from './components/Showcase.jsx'
import Features from './components/Features.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <>
      <div className="bg-fx" />
      <div className="bg-grid" />
      <motion.div className="progress" style={{ scaleX }} />

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Collection />
        <Showcase />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
