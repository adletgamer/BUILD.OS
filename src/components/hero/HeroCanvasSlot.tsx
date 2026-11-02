import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { CoreMotion } from './BuilderCoreScene'

const BuilderCoreScene = lazy(() => import('./BuilderCoreScene'))
gsap.registerPlugin(ScrollTrigger)

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function HeroCanvasSlot() {
  const reducedMotion = useReducedMotion()
  const [showScene, setShowScene] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const motion = useRef<CoreMotion>({ progress: 0, pointerX: 0, pointerY: 0 })
  const invalidate = useRef<(() => void) | null>(null)
  const onReady = useCallback((next: (() => void) | null) => { invalidate.current = next }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 761px)')
    const update = () => setShowScene(media.matches && !reducedMotion && supportsWebGL())
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [reducedMotion])

  useEffect(() => {
    if (!showScene) return
    const trigger = ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => {
        motion.current.progress = self.progress
        invalidate.current?.()
      },
    })
    return () => trigger.kill()
  }, [showScene])

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!showScene || !container.current) return
    const bounds = container.current.getBoundingClientRect()
    motion.current.pointerX = ((event.clientX - bounds.left) / bounds.width - .5) * 2
    motion.current.pointerY = ((event.clientY - bounds.top) / bounds.height - .5) * 2
    invalidate.current?.()
  }
  const onPointerLeave = () => {
    motion.current.pointerX = 0
    motion.current.pointerY = 0
    invalidate.current?.()
  }

  return <div ref={container} className="hero-canvas-slot" aria-label="Builder Core: four connected technology domains" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
    {showScene ? <Suspense fallback={<CoreFallback />}><BuilderCoreScene motion={motion} onReady={onReady} /></Suspense> : <CoreFallback />}
    <span className="canvas-caption">01 / BUILDER CORE</span>
  </div>
}

function CoreFallback() {
  return <div className="core-fallback" aria-hidden="true"><span className="core-fallback__ring core-fallback__ring--one" /><span className="core-fallback__ring core-fallback__ring--two" /><span className="core-fallback__center" /></div>
}
