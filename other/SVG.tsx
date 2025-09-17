import { useEffect, useRef } from "react"
import gsap from "gsap"

function App() {
  const rectRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    const rect = rectRef.current
    if (!rect) return

    // Get bounding box of the rect
    const bbox = rect.getBBox()

    // Viewport size
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Scale factors
    const scaleX = viewportWidth / bbox.width
    const scaleY = viewportHeight / bbox.height
    const scaleFactor = Math.max(scaleX, scaleY)

    // Animate with GSAP
    gsap.to(rect, {
      transform: `translate(-50%, -50%) scale(${scaleFactor})`,
      duration: 1,
      delay: 1,
      ease: "power2.out",
    })
  }, [])

  return (
    <div className="relative w-screen h-screen bg-white">
      {/* Masked gradient background */}
      <div
        className="w-full h-full"
        style={{
          background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
          WebkitMask: "url(#imgMask)",
          mask: "url(#imgMask)",
        }}
      />

      {/* SVG Mask */}
      <svg className="absolute inset-0 w-full h-full">
        <mask
          id="imgMask"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <rect
            ref={rectRef}
            id="mask-img"
            className="fill-white"
            width={200}
            height={100}
            rx={20}
            x="50%"
            y="50%"
            transform="translate(-50%, -50%)"
          />
        </mask>
      </svg>
    </div>
  )
}

export default App