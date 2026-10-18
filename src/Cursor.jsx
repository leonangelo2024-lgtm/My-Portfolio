import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const canvasRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const mouse = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const trail = useRef([])
  const rafId = useRef(null)
  const hoveredRef = useRef(false)

  // Keep hoveredRef in sync without needing to re-attach listeners
  useEffect(() => {
    hoveredRef.current = hovered
  }, [hovered])

  useEffect(() => {
    // Only activate on devices with a mouse / trackpad
    const media = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!media.matches) return
    setEnabled(true)

    const canvas = canvasRef.current
    const ctx = canvas ? canvas.getContext('2d') : null

    const resizeCanvas = () => {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const onPointerMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      setVisible(true)

      // Direct tracking for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Add fading trail particle
      if (!reducedMotion.matches) {
        trail.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: hoveredRef.current ? 9 : 6,
          alpha: 0.65,
          decay: 0.022,
        })
        if (trail.current.length > 25) {
          trail.current.shift()
        }
      }
    }

    const onPointerDown = () => setPressed(true)
    const onPointerUp = () => setPressed(false)

    const onPointerOver = (e) => {
      const target = e.target
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('.card') ||
          target.closest('.btn') ||
          target.closest('.chips li') ||
          target.closest('.nav-logo') ||
          target.closest('.nav-social-btn') ||
          target.closest('.nav-mobile-social-pill'))
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    const onMouseLeave = () => {
      setVisible(false)
    }

    const onMouseEnter = () => {
      setVisible(true)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Animation loop for fluid spring ring and fading canvas trail
    const loop = () => {
      // Fluid spring interpolation for the glowing outer ring
      const ease = 0.18
      ring.current.x += (mouse.current.x - ring.current.x) * ease
      ring.current.y += (mouse.current.y - ring.current.y) * ease

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }

      // Render the fading orange trail
      if (ctx && canvas) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

        for (let i = trail.current.length - 1; i >= 0; i--) {
          const p = trail.current[i]
          p.alpha -= p.decay
          p.radius *= 0.965

          if (p.alpha <= 0.01 || p.radius <= 0.5) {
            trail.current.splice(i, 1)
            continue
          }

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2)
          grad.addColorStop(0, `rgba(255, 138, 31, ${p.alpha})`)
          grad.addColorStop(0.45, `rgba(255, 110, 15, ${p.alpha * 0.6})`)
          grad.addColorStop(1, 'rgba(255, 80, 0, 0)')

          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafId.current = requestAnimationFrame(loop)
    }

    rafId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      className={`custom-cursor-root ${visible ? 'is-visible' : ''} ${hovered ? 'is-hovered' : ''} ${pressed ? 'is-pressed' : ''}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="cursor-canvas" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
