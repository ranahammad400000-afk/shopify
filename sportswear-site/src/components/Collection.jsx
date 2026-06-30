import { motion } from 'framer-motion'
import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

const ease = [0.22, 1, 0.36, 1]

export default function Collection() {
  return (
    <section className="section" id="collection">
      <div className="wrap">
        <div className="section-head">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            The Lineup
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            Five silhouettes. One obsession with grip. Hover any pair to feel
            the depth — then make it yours.
          </motion.p>
        </div>

        <div className="grid">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
