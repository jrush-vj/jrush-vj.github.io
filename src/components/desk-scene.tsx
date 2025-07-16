"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense, useState, useRef, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { DeskModel } from "./desk-model"
import { InfoPanel } from "./info-panel"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "./theme-provider"
import { useMobile } from "@/hooks/use-mobile"
import { MobileView } from "./mobile-view"

export type PanelType = "laptop" | "arduino" | "guitar" | "piano" | "chess" | null

export function DeskScene() {
  const [activePanel, setActivePanel] = useState<PanelType>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { theme } = useTheme()
  const isMobile = useMobile()
  const controlsRef = useRef<any>()

  useEffect(() => {
    if (controlsRef.current) {
      // Gentle idle camera movement
      const interval = setInterval(() => {
        if (!hoveredItem && controlsRef.current) {
          const controls = controlsRef.current
          const time = Date.now() * 0.0005
          controls.setAzimuthalAngle(Math.sin(time) * 0.1)
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [hoveredItem])

  if (isMobile) {
    return <MobileView activePanel={activePanel} setActivePanel={setActivePanel} />
  }

  return (
    <div className={`w-full h-screen relative ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <ThemeToggle />

      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 8]} />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            enableDamping
            dampingFactor={0.05}
          />

          <Environment preset="studio" />

          <ambientLight intensity={theme === "dark" ? 0.3 : 0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={theme === "dark" ? 0.5 : 1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />

          <DeskModel onItemClick={setActivePanel} onItemHover={setHoveredItem} theme={theme} />
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {activePanel && <InfoPanel type={activePanel} onClose={() => setActivePanel(null)} theme={theme} />}
      </AnimatePresence>
    </div>
  )
}
