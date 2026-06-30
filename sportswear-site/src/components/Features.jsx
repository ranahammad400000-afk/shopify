import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const features = [
  { ic: '🪨', title: 'Rock Plate', text: 'A flexible nylon shield between foam and outsole deflects sharp trail debris.' },
  { ic: '⚡', title: 'Energy Foam', text: 'Supercritical midsole returns up to 78% of the energy you put in.' },
  { ic: '🧲', title: 'Grip Lock', text: '5mm multidirectional lugs bite into mud, gravel, wet rock and loose dirt.' },
  { ic: '💧', title: 'Storm Shield', text: 'Water-repellent engineered mesh keeps feet dry without trapping heat.' },
]

export default function Features() {
  return (
    <section className="section" id="tech">
      <div className="wrap">
        <div className="section-head">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            Built Different
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            Every layer is engineered for one thing: keeping you upright and
            moving fast when the ground gets ugly.
          </motion.p>
        </div>

        <div className="feat-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="feat"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.25)' }}
            >
              <div className="ic">{f.ic}</div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
