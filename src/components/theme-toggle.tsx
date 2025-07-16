"use client"

import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { useAudio } from "./audio-provider"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { playSound } = useAudio()

  const handleToggle = () => {
    playSound("switch")
    toggleTheme()
  }

  return (
    <motion.div
      className="fixed top-4 right-20 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        className={`${
          theme === "dark"
            ? "bg-gray-900/80 border-cyan-400/30 hover:bg-gray-800/80 hover:border-cyan-400"
            : "bg-white/80 border-pink-400/30 hover:bg-gray-50/80 hover:border-pink-400"
        } backdrop-blur-sm transition-all duration-300`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4 text-pink-400" />}
        </motion.div>
      </Button>
    </motion.div>
  )
}
