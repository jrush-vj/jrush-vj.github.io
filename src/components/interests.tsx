"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../theme-provider"
import { Camera, Music, Gamepad2, Book, Plane, Coffee } from "lucide-react"

export function Interests() {
  const { theme } = useTheme()

  const interests = [
    {
      icon: Camera,
      title: "Photography",
      description: "Capturing moments and exploring visual storytelling",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Music,
      title: "Music Production",
      description: "Creating beats and experimenting with sound design",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Gamepad2,
      title: "Gaming",
      description: "Indie games and competitive esports enthusiast",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: Book,
      title: "Reading",
      description: "Sci-fi novels and tech blogs fuel my imagination",
      color: "from-orange-400 to-red-400",
    },
    {
      icon: Plane,
      title: "Travel",
      description: "Exploring new cultures and finding inspiration",
      color: "from-indigo-400 to-blue-400",
    },
    {
      icon: Coffee,
      title: "Coffee",
      description: "Third-wave coffee culture and brewing techniques",
      color: "from-amber-400 to-yellow-400",
    },
  ]

  return (
    <section id="interests" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Beyond Code
          </h2>
          <div className={`w-24 h-1 mx-auto mb-8 ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"}`} />
          <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            When I'm not coding, you'll find me exploring these passions that keep me creative and inspired.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} group hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                <CardContent className="p-6 relative">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${interest.color} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <interest.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3
                      className={`text-xl font-bold text-center mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {interest.title}
                    </h3>
                    <p className={`text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {interest.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
