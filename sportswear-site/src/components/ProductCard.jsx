import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ShoeImage from './ShoeImage.jsx'

const ease = [0.22, 1, 0.36, 1]

export default function ProductCard({ product, index }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 150, damping: 18 })

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      ref={ref}
      className="card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <div
        className="card-glow"
        style={{ boxShadow: `0 0 0 1px ${product.accent}, 0 30px 60px -20px ${product.glow}` }}
      />
      <span className="card-badge" style={{ color: product.accent }}>
        {product.badge}
      </span>

      <div className="card-media">
        <div className="halo" style={{ background: product.glow }} />
        <ShoeImage product={product} />
      </div>

      <div className="card-foot">
        <div>
          <h3>{product.name}</h3>
          <div className="tag">{product.tagline}</div>
        </div>
        <div className="price">${product.price}</div>
      </div>

      <ul className="card-specs">
        {product.specs.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <motion.button className="card-buy" whileTap={{ scale: 0.96 }}>
        Add to Bag
      </motion.button>
    </motion.article>
  )
}
