# Drop your real product photos here

The site automatically shows these photos when present and falls back to the
SVG placeholders until then. Save your 5 photos with these **exact filenames**:

| Save as | Your photo | Original Amazon file |
| --- | --- | --- |
| `shoe-black.jpg`  | All-black ULTRA trail shoe        | `61ByVQkS2-L._AC_SY695_.jpg` |
| `shoe-red.jpg`    | Black → red gradient trail shoe   | `71Bh5zSwc+L._AC_UL1500_.jpg` |
| `shoe-orange.jpg` | Black → orange gradient trail shoe| `71tocn-wOZL._UY900_.jpg` |
| `shoe-blue.jpg`   | Light-blue running pair           | `511-syTD1KL.jpg` |
| `shoe-camo.jpg`   | Black/grey camo pair (orange logo)| `714D5z60gEL.jpg` |

## Easiest way to add them (GitHub web, ~2 min)

1. Open the repo on GitHub and switch to branch
   `claude/sportswear-framer-motion-site-n8l7fs`.
2. Navigate to `sportswear-site/public/shoes/photos/`.
3. **Add file → Upload files**, drag in your 5 images, and rename each to the
   filename in the table above.
4. Commit to the same branch. They go live automatically — no code changes.

If you prefer PNG/WebP, keep the same base name (e.g. `shoe-black.png`) and tell
me, or update the `photo:` paths in `src/data/products.js`.
