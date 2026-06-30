import { useState } from 'react'

// Renders the real product photo when present, otherwise falls back to the
// stylised SVG placeholder. Drop real photos into /public/shoes/photos using
// the filename in product.photo (see public/shoes/photos/README.md) and they
// appear automatically — no code changes needed.
export default function ShoeImage({ product, className, style, draggable }) {
  const [src, setSrc] = useState(product.photo || product.image)
  return (
    <img
      className={className}
      style={style}
      src={src}
      alt={product.name}
      loading="lazy"
      draggable={draggable}
      onError={() => {
        if (src !== product.image) setSrc(product.image)
      }}
    />
  )
}
