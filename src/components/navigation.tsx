"use client"

import { motion } from "framer-motion"
import { useTheme } from "./theme-provider"
import { useAudio } from "./audio-provider"

interface NavigationProps {
  activeSection: string
}

export function Navigation({ activeSection }: NavigationProps) {
  const { theme } = useTheme()
  const { playSound } = useAudio()

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "journey", label: "Journey" },
    { id: "interests", label: "Interests" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    playSound("click")
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === "dark" ? "bg-black/80" : "bg-white/80"
      } backdrop-blur-md border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            whileHover={{ scale: 1.05 }}
          >
            AC
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? theme === "dark"
                      ? "text-cyan-400"
                      : "text-pink-600"
                    : theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      theme === "dark" ? "bg-cyan-400" : "bg-pink-600"
                    }`}
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
