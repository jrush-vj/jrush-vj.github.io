"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Plane, RoundedBox } from "@react-three/drei"
import type { PanelType } from "./desk-scene"
import type * as THREE from "three"

interface DeskModelProps {
  onItemClick: (type: PanelType) => void
  onItemHover: (item: string | null) => void
  theme: "light" | "dark"
}

export function DeskModel({ onItemClick, onItemHover, theme }: DeskModelProps) {
  const laptopRef = useRef<THREE.Mesh>(null)
  const arduinoRef = useRef<THREE.Mesh>(null)
  const guitarRef = useRef<THREE.Mesh>(null)
  const pianoRef = useRef<THREE.Mesh>(null)
  const chessRef = useRef<THREE.Mesh>(null)

  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Gentle floating animation for hovered items
    if (laptopRef.current && hoveredItem === "laptop") {
      laptopRef.current.position.y = 1.05 + Math.sin(time * 2) * 0.05
    }
    if (arduinoRef.current && hoveredItem === "arduino") {
      arduinoRef.current.position.y = 1.05 + Math.sin(time * 2) * 0.05
    }
    if (guitarRef.current && hoveredItem === "guitar") {
      guitarRef.current.position.y = 1.05 + Math.sin(time * 2) * 0.05
    }
    if (pianoRef.current && hoveredItem === "piano") {
      pianoRef.current.position.y = 1.05 + Math.sin(time * 2) * 0.05
    }
    if (chessRef.current && hoveredItem === "chess") {
      chessRef.current.position.y = 1.05 + Math.sin(time * 2) * 0.05
    }
  })

  const handleItemInteraction = (item: string, type: PanelType) => {
    return {
      onPointerEnter: () => {
        setHoveredItem(item)
        onItemHover(item)
        document.body.style.cursor = "pointer"
      },
      onPointerLeave: () => {
        setHoveredItem(null)
        onItemHover(null)
        document.body.style.cursor = "default"
      },
      onClick: () => onItemClick(type),
    }
  }

  const neonColor = theme === "dark" ? "#00ffff" : "#ff69b4"
  const glowIntensity = hoveredItem ? 2 : 0.5

  return (
    <group>
      {/* Desk Surface */}
      <RoundedBox args={[8, 0.2, 4]} position={[0, 0.9, 0]} radius={0.1} smoothness={4} receiveShadow>
        <meshStandardMaterial color={theme === "dark" ? "#1a1a1a" : "#f0f0f0"} roughness={0.3} metalness={0.1} />
      </RoundedBox>

      {/* Desk Legs */}
      {[-3, 3].map((x, i) => (
        <Box key={i} args={[0.1, 1.8, 0.1]} position={[x, 0, -1.5]} castShadow>
          <meshStandardMaterial color={theme === "dark" ? "#333" : "#666"} />
        </Box>
      ))}

      {/* Laptop */}
      <group ref={laptopRef} position={[-2, 1, 0]} {...handleItemInteraction("laptop", "laptop")}>
        <RoundedBox args={[1.5, 0.05, 1]} radius={0.02}>
          <meshStandardMaterial
            color="#2a2a2a"
            emissive={hoveredItem === "laptop" ? neonColor : "#000000"}
            emissiveIntensity={hoveredItem === "laptop" ? 0.3 : 0}
          />
        </RoundedBox>
        <RoundedBox args={[1.5, 0.8, 0.05]} position={[0, 0.4, -0.5]} rotation={[-Math.PI * 0.1, 0, 0]} radius={0.02}>
          <meshStandardMaterial
            color="#1a1a1a"
            emissive={hoveredItem === "laptop" ? neonColor : "#000000"}
            emissiveIntensity={hoveredItem === "laptop" ? 0.2 : 0}
          />
        </RoundedBox>
      </group>

      {/* Arduino Board */}
      <RoundedBox
        ref={arduinoRef}
        args={[0.8, 0.02, 0.5]}
        position={[2, 1, -0.5]}
        radius={0.01}
        {...handleItemInteraction("arduino", "arduino")}
      >
        <meshStandardMaterial
          color="#006600"
          emissive={hoveredItem === "arduino" ? neonColor : "#000000"}
          emissiveIntensity={hoveredItem === "arduino" ? 0.3 : 0}
        />
      </RoundedBox>

      {/* Guitar (simplified) */}
      <group
        ref={guitarRef}
        position={[3, 1, 1]}
        rotation={[0, -Math.PI / 4, 0]}
        {...handleItemInteraction("guitar", "guitar")}
      >
        <RoundedBox args={[0.3, 0.05, 1.5]} radius={0.02}>
          <meshStandardMaterial
            color="#8B4513"
            emissive={hoveredItem === "guitar" ? neonColor : "#000000"}
            emissiveIntensity={hoveredItem === "guitar" ? 0.2 : 0}
          />
        </RoundedBox>
        <RoundedBox args={[0.05, 0.05, 0.8]} position={[0, 0, -0.8]} radius={0.01}>
          <meshStandardMaterial color="#654321" />
        </RoundedBox>
      </group>

      {/* Piano Keys */}
      <group ref={pianoRef} position={[-3, 1, 1]} {...handleItemInteraction("piano", "piano")}>
        {Array.from({ length: 7 }, (_, i) => (
          <RoundedBox key={i} args={[0.1, 0.02, 0.6]} position={[i * 0.12 - 0.36, 0, 0]} radius={0.005}>
            <meshStandardMaterial
              color="#ffffff"
              emissive={hoveredItem === "piano" ? neonColor : "#000000"}
              emissiveIntensity={hoveredItem === "piano" ? 0.2 : 0}
            />
          </RoundedBox>
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <RoundedBox
            key={i}
            args={[0.06, 0.02, 0.3]}
            position={[i * 0.12 - 0.24 + (i >= 2 ? 0.12 : 0), 0.01, -0.15]}
            radius={0.005}
          >
            <meshStandardMaterial
              color="#000000"
              emissive={hoveredItem === "piano" ? neonColor : "#000000"}
              emissiveIntensity={hoveredItem === "piano" ? 0.3 : 0}
            />
          </RoundedBox>
        ))}
      </group>

      {/* Chess Board */}
      <group ref={chessRef} position={[0, 1, 1.5]} {...handleItemInteraction("chess", "chess")}>
        <RoundedBox args={[1, 0.02, 1]} radius={0.01}>
          <meshStandardMaterial
            color="#8B4513"
            emissive={hoveredItem === "chess" ? neonColor : "#000000"}
            emissiveIntensity={hoveredItem === "chess" ? 0.2 : 0}
          />
        </RoundedBox>
        {/* Chess squares pattern */}
        {Array.from({ length: 64 }, (_, i) => {
          const row = Math.floor(i / 8)
          const col = i % 8
          const isBlack = (row + col) % 2 === 1
          return (
            <Plane
              key={i}
              args={[0.12, 0.12]}
              position={[col * 0.125 - 0.4375, 0.011, row * 0.125 - 0.4375]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <meshStandardMaterial color={isBlack ? "#333" : "#fff"} />
            </Plane>
          )
        })}
      </group>

      {/* Floor */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color={theme === "dark" ? "#0a0a0a" : "#e0e0e0"} />
      </Plane>
    </group>
  )
}
