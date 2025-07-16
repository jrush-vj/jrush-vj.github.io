"use client"

import { Canvas } from "@react-three/fiber"
import { PointerLockControls, Environment, Sky } from "@react-three/drei"
import { Suspense, useState, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { Room } from "./room"
import { InteractionPanel } from "./interaction-panel"
import { LoadingScreen } from "./loading-screen"
import { CrosshairUI } from "./crosshair-ui"
import { useTheme } from "./theme-provider"
import { useMobile } from "@/hooks/use-mobile"
import { MobileView } from "./mobile-view"

export type InteractionType =
  | "computer"
  | "phone"
  | "books"
  | "camera"
  | "owl"
  | "coffee"
  | "corkboard"
  | "guitar"
  | "plant"
  | "awards"
  | null

export function RoomExplorer() {
  const [activeInteraction, setActiveInteraction] = useState<InteractionType>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { theme } = useTheme()
  const isMobile = useMobile()
  const controlsRef = useRef<any>()

  if (isMobile) {
    return <MobileView activePanel={activeInteraction} setActivePanel={setActiveInteraction} />
  }

  return (
    <div className="w-full h-screen relative">
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}</AnimatePresence>

      {!isLoading && (
        <>
          <CrosshairUI hoveredItem={hoveredItem} />

          <Canvas shadows camera={{ fov: 75, position: [0, 1.6, 3] }}>
            <Suspense fallback={null}>
              <PointerLockControls ref={controlsRef} />

              <Environment preset={theme === "dark" ? "night" : "apartment"} />
              <Sky
                distance={450000}
                sunPosition={theme === "dark" ? [0, -1, 0] : [100, 20, 100]}
                inclination={0}
                azimuth={0.25}
              />

              <ambientLight intensity={theme === "dark" ? 0.4 : 0.8} />
              <directionalLight
                position={[5, 10, 5]}
                intensity={theme === "dark" ? 0.6 : 1.2}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />

              <Room onInteraction={setActiveInteraction} onHover={setHoveredItem} theme={theme} />
            </Suspense>
          </Canvas>

          <AnimatePresence>
            {activeInteraction && (
              <InteractionPanel type={activeInteraction} onClose={() => setActiveInteraction(null)} theme={theme} />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
