"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "../theme-provider"
import { Code, Palette, Zap } from "lucide-react"

export function About() {
  const { theme } = useTheme()

  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable frontend solutions",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive user experiences",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing for speed and user satisfaction",
    },
  ]

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>About Me</h2>
          <div className={`w-24 h-1 mx-auto mb-8 ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"}`} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className={`w-80 h-80 mx-auto rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-cyan-400/20 to-blue-600/20"
                    : "bg-gradient-to-br from-pink-400/20 to-purple-600/20"
                }`}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              I'm a passionate Computer Science undergraduate with a love for creating beautiful, functional web
              experiences. My journey in tech started with curiosity and has evolved into a dedication to crafting
              pixel-perfect interfaces.
            </p>

            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"].map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className={`${
                    theme === "dark" ? "bg-cyan-400/10 text-cyan-400" : "bg-pink-400/10 text-pink-600"
                  } hover:scale-105 transition-transform cursor-default`}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="grid gap-4 mt-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} hover:scale-105 transition-transform`}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-cyan-400/10" : "bg-pink-400/10"}`}>
                        <item.icon className={`w-6 h-6 ${theme === "dark" ? "text-cyan-400" : "text-pink-600"}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
