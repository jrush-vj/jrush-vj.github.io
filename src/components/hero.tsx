"use client"

import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "../theme-provider"
import { useAudio } from "../audio-provider"

export function Hero() {
  const { theme } = useTheme()
  const { playSound } = useAudio()

  const scrollToNext = () => {
    playSound("click")
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-black via-gray-900 to-cyan-900/20"
            : "bg-gradient-to-br from-white via-pink-50 to-pink-100/50"
        }`}
      />

      {/* Floating geometric shapes */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={i}
          className={`absolute w-20 h-20 ${
            theme === "dark" ? "border-cyan-400/10" : "border-pink-400/10"
          } border rounded-full`}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className={`text-6xl md:text-8xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            style={{
              backgroundImage:
                theme === "dark"
                  ? "linear-gradient(45deg, #ffffff, #00ffff, #ffffff)"
                  : "linear-gradient(45deg, #000000, #ff69b4, #000000)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Alex Chen
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className={`text-2xl md:text-3xl mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Frontend Developer & UI Designer
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-4 justify-center mb-12"
        >
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:alex@example.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <Button
              key={label}
              variant="outline"
              size="lg"
              className={`group ${
                theme === "dark"
                  ? "border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-400/10"
                  : "border-pink-400/30 hover:border-pink-400 hover:bg-pink-400/10"
              } transition-all duration-300`}
              onClick={() => playSound("hover")}
              asChild
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {label}
              </a>
            </Button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToNext}
            className={`group ${
              theme === "dark" ? "text-cyan-400 hover:text-cyan-300" : "text-pink-400 hover:text-pink-500"
            }`}
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
