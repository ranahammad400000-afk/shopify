import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { products } from '../data/products.js'

const ease = [0.22, 1, 0.36, 1]
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const shoeY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const shoeRot = useTransform(scrollYProgress, [0, 1], [0, -18])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])

  const hero = products[0]

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="wrap hero-grid">
        <motion.div variants={container} initial="hidden" animate="show" style={{ y: textY }}>
          <motion.div variants={item} className="eyebrow">
            Trail · Road · Everyday
          </motion.div>
          <motion.h1 variants={item}>
            Run the
            <br />
            <span className="stroke">Unrun</span> Path
          </motion.h1>
          <motion.p variants={item} className="lead">
            Engineered joggers with aggressive grip, rock-plate protection and
            energy-return foam. Built to chew up any terrain you throw at them.
          </motion.p>
          <motion.div variants={item} className="hero-actions">
            <motion.a
              href="#collection"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore Collection →
            </motion.a>
            <motion.a
              href="#showcase"
              className="btn btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Build Your Pair
            </motion.a>
          </motion.div>

          <motion.div variants={item} className="hero-stats">
            {[
              ['4.8★', '12k Reviews'],
              ['38mm', 'Stack Height'],
              ['260g', 'Per Shoe'],
            ].map(([num, lbl]) => (
              <div key={lbl}>
                <div className="num">{num}</div>
                <div className="lbl">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-stage">
          <motion.div
            className="hero-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="hero-blob"
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="spin-word"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 240 240">
              <defs>
                <path
                  id="circlePath"
                  d="M 120,120 m -96,0 a 96,96 0 1,1 192,0 a 96,96 0 1,1 -192,0"
                />
              </defs>
              <text>
                <textPath href="#circlePath">
                  STRIDE · PERFORMANCE · STRIDE · PERFORMANCE ·
                </textPath>
              </text>
            </svg>
          </motion.div>

          <motion.img
            className="hero-shoe"
            src={hero.photo || hero.image}
            alt={hero.name}
            onError={(e) => {
              if (!e.currentTarget.dataset.fb) {
                e.currentTarget.dataset.fb = '1'
                e.currentTarget.src = hero.image
              }
            }}
            style={{ y: shoeY, rotate: shoeRot }}
            initial={{ opacity: 0, scale: 0.6, x: 60 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: [0, -16, 0],
            }}
            transition={{
              opacity: { duration: 0.9, ease },
              scale: { duration: 0.9, ease },
              x: { duration: 0.9, ease },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </div>
      </div>
    </section>
  )
}
