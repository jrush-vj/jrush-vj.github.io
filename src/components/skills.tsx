"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "../theme-provider"

export function Skills() {
  const { theme } = useTheme()

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "Tailwind CSS", level: 95 },
      ],
    },
    {
      title: "Design",
      skills: [
        { name: "Figma", level: 85 },
        { name: "UI/UX", level: 80 },
        { name: "Framer Motion", level: 75 },
        { name: "Three.js", level: 70 },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", level: 85 },
        { name: "VS Code", level: 95 },
        { name: "Webpack", level: 70 },
        { name: "Docker", level: 65 },
      ],
    },
  ]

  return (
    <section id="skills" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Skills & Expertise
          </h2>
          <div className={`w-24 h-1 mx-auto mb-8 ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"}`} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} h-full`}
              >
                <CardContent className="p-6">
                  <h3
                    className={`text-2xl font-bold mb-6 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {skill.name}
                          </span>
                          <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                          <motion.div
                            className={`h-full rounded-full ${
                              theme === "dark"
                                ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                                : "bg-gradient-to-r from-pink-400 to-purple-500"
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
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
