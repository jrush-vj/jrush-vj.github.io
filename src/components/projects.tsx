"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useTheme } from "../theme-provider"
import { useAudio } from "../audio-provider"

export function Projects() {
  const { theme } = useTheme()
  const { playSound } = useAudio()

  const projects = [
    {
      title: "E-Commerce Dashboard",
      description: "Modern admin dashboard with real-time analytics and beautiful data visualizations.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["React", "TypeScript", "Chart.js", "Tailwind"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "Task Management App",
      description: "Collaborative task manager with drag-and-drop functionality and team features.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["Next.js", "Framer Motion", "Supabase", "Tailwind"],
      github: "https://github.com",
      live: "https://example.com",
    },
    {
      title: "3D Portfolio Site",
      description: "Interactive 3D portfolio showcasing creative coding and Three.js expertise.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["Three.js", "React", "GLSL", "Blender"],
      github: "https://github.com",
      live: "https://example.com",
    },
  ]

  return (
    <section id="projects" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Featured Projects
          </h2>
          <div className={`w-24 h-1 mx-auto mb-8 ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"}`} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} overflow-hidden group hover:scale-105 transition-all duration-300`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className={`absolute inset-0 ${theme === "dark" ? "bg-cyan-400/20" : "bg-pink-400/20"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className={`text-xs ${
                          theme === "dark" ? "bg-cyan-400/10 text-cyan-400" : "bg-pink-400/10 text-pink-600"
                        }`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 ${
                        theme === "dark"
                          ? "border-cyan-400/30 hover:border-cyan-400"
                          : "border-pink-400/30 hover:border-pink-400"
                      }`}
                      onClick={() => playSound("click")}
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className={`flex-1 ${
                        theme === "dark"
                          ? "bg-cyan-400 hover:bg-cyan-500 text-black"
                          : "bg-pink-400 hover:bg-pink-500 text-white"
                      }`}
                      onClick={() => playSound("click")}
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    </Button>
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
