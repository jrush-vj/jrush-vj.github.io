"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "./theme-provider"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 300)
          return 100
        }
        return prev + Math.random() * 8 + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center ${theme === "dark" ? "bg-black" : "bg-white"}`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="text-8xl mb-8"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          💻
        </motion.div>

        <motion.h1
          className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Alex Chen
        </motion.h1>

        <motion.p
          className={`text-lg mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Loading portfolio experience...
        </motion.p>

        <div className="w-64 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
          <motion.div
            className={`h-full ${
              theme === "dark"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                : "bg-gradient-to-r from-pink-400 to-purple-500"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <motion.p
          className={`mt-4 font-mono text-sm ${theme === "dark" ? "text-cyan-400" : "text-pink-600"}`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>
    </motion.div>
  )
}
