import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function CTA() {
  return (
    <section className="cta">
      <div className="wrap">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Lace Up.<br />
          <span className="grad">Go Further.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          Free shipping, 60-day trial and a 2-year outsole guarantee. If they
          don't change your run, send them back.
        </motion.p>
        <motion.a
          href="#collection"
          className="btn btn-primary"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          Shop the Collection →
        </motion.a>
      </div>
    </section>
  )
}
