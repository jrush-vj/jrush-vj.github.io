"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hero } from "./hero"
import { About } from "./about"
import { Skills } from "./skills"
import { Projects } from "./projects"
import { Journey } from "./journey"
import { Interests } from "./interests"
import { Contact } from "./contact"
import { Navigation } from "./navigation"
import { ThemeToggle } from "./theme-toggle"
import { SoundToggle } from "./sound-toggle"
import { LoadingScreen } from "./loading-screen"
import { useTheme } from "./theme-provider"

export function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "journey", "interests", "contact"]
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-black" : "bg-white"} transition-colors duration-500`}>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}</AnimatePresence>

      {!isLoading && (
        <>
          <Navigation activeSection={activeSection} />
          <ThemeToggle />
          <SoundToggle />

          <main className="relative">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <Interests />
            <Contact />
          </main>

          {/* Animated background elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${theme === "dark" ? "bg-cyan-400/20" : "bg-pink-400/20"} rounded-full`}
                animate={{
                  x: [0, Math.random() * window.innerWidth],
                  y: [0, Math.random() * window.innerHeight],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
                style={{
                  left: Math.random() * window.innerWidth,
                  top: Math.random() * window.innerHeight,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
