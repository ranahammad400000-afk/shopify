const cols = [
  { h: 'Shop', links: ['Trail', 'Road', 'Everyday', 'Sale'] },
  { h: 'Company', links: ['About', 'Sustainability', 'Careers', 'Press'] },
  { h: 'Support', links: ['Sizing', 'Shipping', 'Returns', 'Contact'] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="col" style={{ maxWidth: 260 }}>
            <div className="brand" style={{ marginBottom: 14 }}>
              <span className="dot" />
              STRIDE
            </div>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
              Performance joggers engineered for every terrain. Designed to be
              run hard and worn proud.
            </p>
          </div>
          {cols.map((c) => (
            <div className="col" key={c.h}>
              <h5>{c.h}</h5>
              {c.links.map((l) => (
                <a key={l} href="#top">{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} STRIDE Athletics. All rights reserved.</span>
          <span>Made for the trail · Built with Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}
