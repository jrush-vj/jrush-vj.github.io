"use client"

import { motion, AnimatePresence } from "framer-motion"

interface CrosshairUIProps {
  hoveredItem: string | null
}

export function CrosshairUI({ hoveredItem }: CrosshairUIProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-6 h-6 border-2 border-white/60 rounded-full"
          animate={{
            scale: hoveredItem ? 1.5 : 1,
            borderColor: hoveredItem ? "#00ffff" : "rgba(255,255,255,0.6)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/80 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </div>

      {/* Interaction hint */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-medium backdrop-blur-sm">
              Click to interact with {hoveredItem}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/60 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span>WASD - Move</span>
            <span>Mouse - Look</span>
            <span>Click - Interact</span>
          </div>
        </div>
      </div>
    </div>
  )
}
