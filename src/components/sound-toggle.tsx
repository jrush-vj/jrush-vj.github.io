"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { useAudio } from "./audio-provider"
import { motion } from "framer-motion"

export function SoundToggle() {
  const { theme } = useTheme()
  const { isMuted, toggleMute } = useAudio()

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={toggleMute}
        className={`${
          theme === "dark"
            ? "bg-gray-900/80 border-cyan-400/30 hover:bg-gray-800/80 hover:border-cyan-400"
            : "bg-white/80 border-pink-400/30 hover:bg-gray-50/80 hover:border-pink-400"
        } backdrop-blur-sm transition-all duration-300`}
      >
        <motion.div
          key={isMuted ? "muted" : "unmuted"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isMuted ? (
            <VolumeX className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
          ) : (
            <Volume2 className={`w-4 h-4 ${theme === "dark" ? "text-cyan-400" : "text-pink-400"}`} />
          )}
        </motion.div>
      </Button>
    </motion.div>
  )
}
