import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Collection', href: '#collection' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Tech', href: '#tech' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="brand">
        <span className="dot" />
        STRIDE
      </a>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <motion.a
        href="#collection"
        className="nav-cta"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        Shop Now
      </motion.a>
    </motion.nav>
  )
}
