"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, RoundedBox, Plane, Cylinder, Sphere } from "@react-three/drei"
import type { InteractionType } from "./room-explorer"
import type * as THREE from "three"

interface RoomProps {
  onInteraction: (type: InteractionType) => void
  onHover: (item: string | null) => void
  theme: "light" | "dark"
}

export function Room({ onInteraction, onHover, theme }: RoomProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Animated refs
  const computerRef = useRef<THREE.Group>(null)
  const owlRef = useRef<THREE.Mesh>(null)
  const coffeeRef = useRef<THREE.Group>(null)
  const plantRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Gentle floating animations
    if (owlRef.current && hoveredItem === "owl") {
      owlRef.current.position.y = 1.15 + Math.sin(time * 2) * 0.02
      owlRef.current.rotation.y = Math.sin(time) * 0.1
    }

    if (coffeeRef.current && hoveredItem === "coffee") {
      coffeeRef.current.position.y = 1.05 + Math.sin(time * 3) * 0.01
    }

    if (plantRef.current) {
      plantRef.current.rotation.y = Math.sin(time * 0.5) * 0.05
    }

    if (computerRef.current && hoveredItem === "computer") {
      computerRef.current.position.y = 1.02 + Math.sin(time * 1.5) * 0.01
    }
  })

  const createInteractionHandler = (item: string, type: InteractionType) => ({
    onPointerEnter: () => {
      setHoveredItem(item)
      onHover(item)
      document.body.style.cursor = "pointer"
    },
    onPointerLeave: () => {
      setHoveredItem(null)
      onHover(null)
      document.body.style.cursor = "default"
    },
    onClick: () => onInteraction(type),
  })

  const glowColor = theme === "dark" ? "#00ffff" : "#ff69b4"
  const roomColor = theme === "dark" ? "#1a1a1a" : "#f5f5f5"
  const woodColor = theme === "dark" ? "#8B4513" : "#DEB887"

  return (
    <group>
      {/* Room Structure */}
      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color={theme === "dark" ? "#2a2a2a" : "#e8e8e8"} />
      </Plane>

      {/* Walls */}
      <Plane args={[20, 8]} position={[0, 4, -10]} receiveShadow>
        <meshStandardMaterial color={roomColor} />
      </Plane>
      <Plane args={[20, 8]} position={[-10, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color={roomColor} />
      </Plane>
      <Plane args={[20, 8]} position={[10, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <meshStandardMaterial color={roomColor} />
      </Plane>

      {/* Ceiling */}
      <Plane args={[20, 20]} rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]}>
        <meshStandardMaterial color={theme === "dark" ? "#0a0a0a" : "#ffffff"} />
      </Plane>

      {/* Main Desk */}
      <RoundedBox args={[6, 0.1, 3]} position={[0, 1, -2]} radius={0.02} castShadow receiveShadow>
        <meshStandardMaterial color={woodColor} roughness={0.3} metalness={0.1} />
      </RoundedBox>

      {/* Desk Legs */}
      {[
        [-2.8, -2.8],
        [2.8, -2.8],
        [-2.8, -0.2],
        [2.8, -0.2],
      ].map(([x, z], i) => (
        <Cylinder key={i} args={[0.05, 0.05, 2]} position={[x, 0.5, z]} castShadow>
          <meshStandardMaterial color={woodColor} />
        </Cylinder>
      ))}

      {/* Computer Setup */}
      <group ref={computerRef} position={[0, 1.05, -2]} {...createInteractionHandler("computer", "computer")}>
        {/* Laptop Base */}
        <RoundedBox args={[2, 0.03, 1.4]} radius={0.02} castShadow>
          <meshStandardMaterial
            color="#2a2a2a"
            emissive={hoveredItem === "computer" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "computer" ? 0.2 : 0}
          />
        </RoundedBox>
        {/* Laptop Screen */}
        <RoundedBox
          args={[2, 1.2, 0.03]}
          position={[0, 0.6, -0.7]}
          rotation={[-Math.PI * 0.1, 0, 0]}
          radius={0.02}
          castShadow
        >
          <meshStandardMaterial
            color="#1a1a1a"
            emissive={hoveredItem === "computer" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "computer" ? 0.3 : 0}
          />
        </RoundedBox>
        {/* Screen Content */}
        <Plane args={[1.8, 1]} position={[0, 0.6, -0.68]} rotation={[-Math.PI * 0.1, 0, 0]}>
          <meshStandardMaterial
            color={theme === "dark" ? "#001122" : "#87CEEB"}
            emissive={hoveredItem === "computer" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "computer" ? 0.1 : 0}
          />
        </Plane>
      </group>

      {/* Cork Board */}
      <group position={[-4, 3, -9.8]} {...createInteractionHandler("corkboard", "corkboard")}>
        <RoundedBox args={[3, 2, 0.1]} radius={0.02} castShadow>
          <meshStandardMaterial
            color="#D2691E"
            emissive={hoveredItem === "corkboard" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "corkboard" ? 0.1 : 0}
          />
        </RoundedBox>
        {/* Notes on cork board */}
        {[
          { pos: [-0.8, 0.5, 0.06], color: "#ffff99", size: [0.4, 0.3] },
          { pos: [0.2, 0.3, 0.06], color: "#ff99ff", size: [0.5, 0.4] },
          { pos: [0.8, -0.2, 0.06], color: "#99ffff", size: [0.3, 0.4] },
          { pos: [-0.3, -0.4, 0.06], color: "#99ff99", size: [0.6, 0.3] },
        ].map((note, i) => (
          <RoundedBox key={i} args={[note.size[0], note.size[1], 0.01]} position={note.pos} radius={0.01}>
            <meshStandardMaterial color={note.color} />
          </RoundedBox>
        ))}
        {/* "My Projects" label */}
        <RoundedBox args={[1.2, 0.2, 0.02]} position={[0, 0.8, 0.06]} radius={0.01}>
          <meshStandardMaterial color="#8B4513" />
        </RoundedBox>
      </group>

      {/* Book Stack */}
      <group position={[-2.5, 1.05, -2]} {...createInteractionHandler("books", "books")}>
        {[
          { color: "#ff4444", height: 0.05, offset: 0 },
          { color: "#44ff44", height: 0.04, offset: 0.05 },
          { color: "#4444ff", height: 0.06, offset: 0.09 },
          { color: "#ffff44", height: 0.04, offset: 0.15 },
          { color: "#ff44ff", height: 0.05, offset: 0.19 },
        ].map((book, i) => (
          <RoundedBox key={i} args={[0.8, book.height, 1.2]} position={[0, book.offset, 0]} radius={0.01} castShadow>
            <meshStandardMaterial
              color={book.color}
              emissive={hoveredItem === "books" ? glowColor : "#000000"}
              emissiveIntensity={hoveredItem === "books" ? 0.1 : 0}
            />
          </RoundedBox>
        ))}
      </group>

      {/* Owl Figurine */}
      <group position={[-1, 1.1, -1.5]} {...createInteractionHandler("owl", "owl")}>
        <Sphere ref={owlRef} args={[0.15]} castShadow>
          <meshStandardMaterial
            color="#8B4513"
            emissive={hoveredItem === "owl" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "owl" ? 0.2 : 0}
          />
        </Sphere>
        {/* Owl eyes */}
        <Sphere args={[0.04]} position={[-0.06, 0.05, 0.12]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
        <Sphere args={[0.04]} position={[0.06, 0.05, 0.12]}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
        <Sphere args={[0.02]} position={[-0.06, 0.05, 0.14]}>
          <meshStandardMaterial color="#000000" />
        </Sphere>
        <Sphere args={[0.02]} position={[0.06, 0.05, 0.14]}>
          <meshStandardMaterial color="#000000" />
        </Sphere>
        {/* Beak */}
        <Box args={[0.02, 0.02, 0.04]} position={[0, 0.02, 0.14]}>
          <meshStandardMaterial color="#FFA500" />
        </Box>
      </group>

      {/* Coffee Mug */}
      <group ref={coffeeRef} position={[1, 1.05, -1.5]} {...createInteractionHandler("coffee", "coffee")}>
        <Cylinder args={[0.08, 0.08, 0.15]} castShadow>
          <meshStandardMaterial
            color="#4169E1"
            emissive={hoveredItem === "coffee" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "coffee" ? 0.2 : 0}
          />
        </Cylinder>
        {/* Handle */}
        <Cylinder args={[0.02, 0.02, 0.1]} position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#4169E1" />
        </Cylinder>
        {/* Coffee */}
        <Cylinder args={[0.07, 0.07, 0.02]} position={[0, 0.06, 0]}>
          <meshStandardMaterial color="#3e2723" />
        </Cylinder>
      </group>

      {/* Camera */}
      <group position={[2, 1.05, -1]} {...createInteractionHandler("camera", "camera")}>
        <RoundedBox args={[0.3, 0.2, 0.15]} radius={0.02} castShadow>
          <meshStandardMaterial
            color="#2a2a2a"
            emissive={hoveredItem === "camera" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "camera" ? 0.2 : 0}
          />
        </RoundedBox>
        {/* Lens */}
        <Cylinder args={[0.06, 0.06, 0.08]} position={[0, 0, 0.12]} castShadow>
          <meshStandardMaterial color="#1a1a1a" />
        </Cylinder>
        <Cylinder args={[0.04, 0.04, 0.02]} position={[0, 0, 0.17]}>
          <meshStandardMaterial color="#333333" />
        </Cylinder>
      </group>

      {/* Phone */}
      <group position={[2.5, 1.05, -2.5]} {...createInteractionHandler("phone", "phone")}>
        <RoundedBox args={[0.15, 0.3, 0.02]} radius={0.01} castShadow>
          <meshStandardMaterial
            color="#1a1a1a"
            emissive={hoveredItem === "phone" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "phone" ? 0.3 : 0}
          />
        </RoundedBox>
        {/* Screen */}
        <Plane args={[0.12, 0.25]} position={[0, 0, 0.011]}>
          <meshStandardMaterial
            color={theme === "dark" ? "#001122" : "#87CEEB"}
            emissive={hoveredItem === "phone" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "phone" ? 0.2 : 0}
          />
        </Plane>
      </group>

      {/* Guitar in corner */}
      <group position={[8, 1, 2]} rotation={[0, -Math.PI / 4, 0]} {...createInteractionHandler("guitar", "guitar")}>
        <RoundedBox args={[0.4, 0.05, 2]} radius={0.02} castShadow>
          <meshStandardMaterial
            color="#8B4513"
            emissive={hoveredItem === "guitar" ? glowColor : "#000000"}
            emissiveIntensity={hoveredItem === "guitar" ? 0.2 : 0}
          />
        </RoundedBox>
        {/* Neck */}
        <RoundedBox args={[0.08, 0.03, 1.2]} position={[0, 0, -1.6]} radius={0.01}>
          <meshStandardMaterial color="#654321" />
        </RoundedBox>
        {/* Headstock */}
        <RoundedBox args={[0.12, 0.04, 0.3]} position={[0, 0, -2.35]} radius={0.01}>
          <meshStandardMaterial color="#654321" />
        </RoundedBox>
      </group>

      {/* Plant */}
      <group ref={plantRef} position={[-8, 1, -2]} {...createInteractionHandler("plant", "plant")}>
        <Cylinder args={[0.2, 0.15, 0.3]} castShadow>
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>
        {/* Leaves */}
        {Array.from({ length: 8 }, (_, i) => (
          <Sphere
            key={i}
            args={[0.1]}
            position={[
              Math.cos((i * Math.PI) / 4) * 0.2,
              0.2 + Math.sin(i * 0.5) * 0.1,
              Math.sin((i * Math.PI) / 4) * 0.2,
            ]}
          >
            <meshStandardMaterial
              color="#228B22"
              emissive={hoveredItem === "plant" ? glowColor : "#000000"}
              emissiveIntensity={hoveredItem === "plant" ? 0.1 : 0}
            />
          </Sphere>
        ))}
      </group>

      {/* Awards shelf */}
      <group position={[4, 2, -9.5]} {...createInteractionHandler("awards", "awards")}>
        <RoundedBox args={[2, 0.1, 0.3]} radius={0.01} castShadow>
          <meshStandardMaterial color={woodColor} />
        </RoundedBox>
        {/* Trophies */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <group key={i} position={[x, 0.15, 0]}>
            <Cylinder args={[0.05, 0.05, 0.2]} castShadow>
              <meshStandardMaterial
                color="#FFD700"
                emissive={hoveredItem === "awards" ? glowColor : "#000000"}
                emissiveIntensity={hoveredItem === "awards" ? 0.2 : 0}
              />
            </Cylinder>
            <Sphere args={[0.08]} position={[0, 0.15, 0]}>
              <meshStandardMaterial color="#FFD700" />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Window with city view */}
      <group position={[9.9, 4, -5]}>
        <RoundedBox args={[0.1, 4, 6]} radius={0.02}>
          <meshStandardMaterial color="#8B4513" />
        </RoundedBox>
        <Plane args={[5.8, 3.8]} position={[-0.05, 0, 0]}>
          <meshStandardMaterial color={theme === "dark" ? "#001122" : "#87CEEB"} transparent opacity={0.8} />
        </Plane>
      </group>
    </group>
  )
}
