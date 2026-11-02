import { Html, Line } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'

export interface CoreMotion {
  progress: number
  pointerX: number
  pointerY: number
}

const domains = [
  { label: 'Cloud', position: [2.35, .5, .25], color: '#67DDF5' },
  { label: 'Web3', position: [-1.8, 1.55, -.45], color: '#C4B5FD' },
  { label: 'Emerging Tech', position: [-2.15, -1.15, .45], color: '#8B5CF6' },
  { label: 'Community', position: [1.35, -1.75, -.3], color: '#FF9900' },
] as const

function CoreStructure({ motion, onReady }: { motion: RefObject<CoreMotion>; onReady: (invalidate: (() => void) | null) => void }) {
  const assembly = useRef<THREE.Group>(null)
  const firstRing = useRef<THREE.Mesh>(null)
  const secondRing = useRef<THREE.Mesh>(null)
  const nodes = useRef<Array<THREE.Group | null>>([])
  const [active, setActive] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const { invalidate } = useThree()
  useEffect(() => {
    onReady(invalidate)
    invalidate()
    return () => onReady(null)
  }, [invalidate, onReady])
  const particles = useMemo(() => {
    const points = new Float32Array(72 * 3)
    for (let i = 0; i < 72; i++) {
      const angle = i * 2.399963
      const radius = 2.7 + (i % 7) * .18
      points[i * 3] = Math.cos(angle) * radius
      points[i * 3 + 1] = Math.sin(angle) * radius
      points[i * 3 + 2] = ((i * 17) % 13) * .09 - .54
    }
    return points
  }, [])

  useFrame(() => {
    const group = assembly.current
    if (!group) return
    const progress = motion.current.progress
    if ((progress > .58) !== revealed) setRevealed(progress > .58)
    const targetY = progress * .9 + motion.current.pointerX * .13
    const targetX = -.12 + progress * .2 - motion.current.pointerY * .1
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, .09)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, .09)
    if (firstRing.current) firstRing.current.rotation.z = progress * 1.55
    if (secondRing.current) secondRing.current.rotation.z = -progress * 1.2
    nodes.current.forEach((node, i) => {
      const base = domains[i]?.position
      if (!node || !base) return
      const separation = Math.max(0, (progress - .48) / .52)
      const proximity = Math.max(0, 1 - Math.hypot(motion.current.pointerX - base[0] / 3, motion.current.pointerY - base[1] / 3) * 1.3)
      const lift = proximity * .12
      node.position.set(base[0] * (1 + separation * .38), base[1] * (1 + separation * .38) + lift, base[2])
      node.scale.setScalar(1 + proximity * .16)
    })
    if (Math.abs(group.rotation.y - targetY) > .001 || Math.abs(group.rotation.x - targetX) > .001) invalidate()
  })

  const enter = (index: number) => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setActive(index)
    document.body.style.cursor = 'pointer'
    invalidate()
  }
  const leave = () => {
    setActive(null)
    document.body.style.cursor = ''
    invalidate()
  }

  return (
    <group ref={assembly}>
      <ambientLight intensity={.8} />
      <pointLight position={[3, 4, 5]} color="#C4B5FD" intensity={35} distance={12} />
      <pointLight position={[-4, -2, 3]} color="#67DDF5" intensity={25} distance={12} />
      <mesh rotation={[.65, .4, .1]}>
        <octahedronGeometry args={[.86, 0]} />
        <meshStandardMaterial color="#202C46" emissive="#8B5CF6" emissiveIntensity={.13} metalness={.5} roughness={.32} side={THREE.DoubleSide} flatShading />
      </mesh>
      <mesh rotation={[.65, .4, .1]} scale={1.18}>
        <octahedronGeometry args={[.86, 0]} />
        <meshBasicMaterial color="#C4B5FD" wireframe transparent opacity={.55} />
      </mesh>
      <mesh ref={firstRing} rotation={[1.1, .25, -.45]}>
        <torusGeometry args={[1.75, .012, 8, 110]} />
        <meshStandardMaterial color="#C4B5FD" metalness={.7} roughness={.28} />
      </mesh>
      <mesh ref={secondRing} rotation={[.25, 1.15, .55]}>
        <torusGeometry args={[2.05, .009, 8, 110]} />
        <meshStandardMaterial color="#67DDF5" metalness={.55} roughness={.32} />
      </mesh>
      {domains.map((domain, index) => (
        <group key={domain.label}>
          <Line points={[[0, 0, 0], domain.position]} color={domain.color} transparent opacity={.3} lineWidth={1} />
          <group ref={node => { nodes.current[index] = node }} position={domain.position}>
            <mesh onPointerOver={enter(index)} onPointerOut={leave}>
              <icosahedronGeometry args={[.2, 0]} />
              <meshStandardMaterial color={domain.color} emissive={domain.color} emissiveIntensity={active === index ? .55 : .12} metalness={.65} roughness={.3} flatShading />
            </mesh>
            <mesh scale={1.55}><icosahedronGeometry args={[.2, 0]} /><meshBasicMaterial color={domain.color} wireframe transparent opacity={active === index ? .8 : .28} /></mesh>
            {(active === index || revealed) && <Html center distanceFactor={9} position={[0, .38, 0]}><span className="node-label">{domain.label}</span></Html>}
          </group>
        </group>
      ))}
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[particles, 3]} /></bufferGeometry>
        <pointsMaterial color="#8F9BB3" size={.025} sizeAttenuation transparent opacity={.45} />
      </points>
    </group>
  )
}

export default function BuilderCoreScene({ motion, onReady }: { motion: RefObject<CoreMotion>; onReady: (invalidate: (() => void) | null) => void }) {
  return <Canvas
    className="builder-canvas"
    camera={{ position: [0, 0, 7.4], fov: 44 }}
    dpr={[1, 1.7]}
    frameloop="demand"
    gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
  >
    <CoreStructure motion={motion} onReady={onReady} />
  </Canvas>
}
