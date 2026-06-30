import { motion } from 'framer-motion'

const words = ['Grip Locked', 'Rock Plate', 'Energy Return', 'All-Terrain', 'Featherweight', 'Waterproof']

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((dup) => (
          <span key={dup}>
            {words.map((w) => (
              <span key={w + dup}>
                <span className="star">✺</span> {w}
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
