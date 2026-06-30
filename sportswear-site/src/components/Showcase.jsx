import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { products } from '../data/products.js'

const ease = [0.22, 1, 0.36, 1]

export default function Showcase() {
  const [active, setActive] = useState(4) // CARBON Air camo by default
  const product = products[active]

  // drag-to-spin
  const rotateY = useMotionValue(-18)
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 })
  const shadow = useTransform(springY, [-60, 60], [40, -40])

  return (
    <section className="section showcase" id="showcase">
      <div className="wrap showcase-inner">
        <motion.div
          className="showcase-stage"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            className="showcase-disc"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <AnimatePresence mode="popLayout">
            <motion.img
              key={product.id}
              className="showcase-shoe"
              src={product.image}
              alt={product.name}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDrag={(e, info) => rotateY.set(Math.max(-60, Math.min(60, info.offset.x / 3)))}
              onDragEnd={() => rotateY.set(-18)}
              style={{ rotateY: springY, x: shadow, transformPerspective: 1000 }}
              initial={{ opacity: 0, scale: 0.7, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: -18 }}
              exit={{ opacity: 0, scale: 0.7, rotateY: 90 }}
              transition={{ duration: 0.6, ease }}
            />
          </AnimatePresence>
        </motion.div>

        <div>
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            Build Your Pair · Drag the shoe to spin
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease }}
            >
              <h2 style={{ color: '#fff' }}>{product.name}</h2>
              <div className="tag" style={{ color: product.accent, fontWeight: 700, letterSpacing: '0.1em' }}>
                {product.tagline.toUpperCase()}
              </div>
              <div className="price-lg">${product.price}</div>
              <div className="feature-row">
                {product.specs.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="dial">
            {products.map((p, i) => (
              <motion.button
                key={p.id}
                className={i === active ? 'active' : ''}
                onClick={() => setActive(i)}
                aria-label={p.name}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  border: `2px solid ${i === active ? p.accent : 'var(--line)'}`,
                  display: 'grid',
                  placeItems: 'center',
                  transform: i === active ? 'scale(1.15)' : 'none',
                }}
              >
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: p.accent }} />
              </motion.button>
            ))}
          </div>

          <motion.button
            className="btn btn-primary"
            style={{ marginTop: 30, background: product.accent, boxShadow: `0 12px 40px -10px ${product.glow}` }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Add {product.name} — ${product.price}
          </motion.button>
        </div>
      </div>
    </section>
  )
}
