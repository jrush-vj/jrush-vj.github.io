"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "./theme-provider"
import { GraduationCap, Code, Trophy, Briefcase } from "lucide-react"

export function Journey() {
  const { theme } = useTheme()

  const milestones = [
    {
      year: "2021",
      title: "Started CS Journey",
      description: "Began Computer Science degree, fell in love with programming",
      icon: GraduationCap,
      color: theme === "dark" ? "text-blue-400" : "text-blue-600",
    },
    {
      year: "2022",
      title: "First Web Project",
      description: "Built my first React application, discovered passion for frontend",
      icon: Code,
      color: theme === "dark" ? "text-green-400" : "text-green-600",
    },
    {
      year: "2023",
      title: "Hackathon Winner",
      description: "Won first place in university hackathon with innovative UI design",
      icon: Trophy,
      color: theme === "dark" ? "text-yellow-400" : "text-yellow-600",
    },
    {
      year: "2024",
      title: "Frontend Intern",
      description: "Landed internship at tech startup, working on production apps",
      icon: Briefcase,
      color: theme === "dark" ? "text-purple-400" : "text-purple-600",
    },
  ]

  return (
    <section id="journey" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>My Journey</h2>
          <div className={`w-24 h-1 mx-auto mb-8 ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"}`} />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
          />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className="flex-1">
                  <Card
                    className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} ${index % 2 === 0 ? "mr-8" : "ml-8"}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                          <milestone.icon className={`w-6 h-6 ${milestone.color}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {milestone.title}
                          </h3>
                          <p
                            className={`text-sm ${theme === "dark" ? "text-cyan-400" : "text-pink-600"} font-semibold`}
                          >
                            {milestone.year}
                          </p>
                        </div>
                      </div>
                      <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className={`w-4 h-4 rounded-full ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"} border-4 ${theme === "dark" ? "border-black" : "border-white"} z-10`}
                  whileInView={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                />

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
