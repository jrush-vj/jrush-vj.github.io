"use client"

import { motion } from "framer-motion"
import { X, Github, Linkedin, Twitter, ExternalLink, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PanelType } from "./desk-scene"
import { useState } from "react"

interface InfoPanelProps {
  type: PanelType
  onClose: () => void
  theme: "light" | "dark"
}

export function InfoPanel({ type, onClose, theme }: InfoPanelProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const panelVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.6,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  }

  const glowClass =
    theme === "dark"
      ? "shadow-[0_0_20px_rgba(0,255,255,0.3)] border-cyan-400/30"
      : "shadow-[0_0_20px_rgba(255,105,180,0.3)] border-pink-400/30"

  const renderContent = () => {
    switch (type) {
      case "laptop":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Connect With Me</h3>
              <p className="text-muted-foreground">Find me across the web</p>
            </div>

            <div className="grid gap-4">
              <Button variant="outline" className="justify-start gap-3 h-12 bg-transparent" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  <span>GitHub - View my code</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              </Button>

              <Button variant="outline" className="justify-start gap-3 h-12 bg-transparent" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn - Professional profile</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              </Button>

              <Button variant="outline" className="justify-start gap-3 h-12 bg-transparent" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5" />
                  <span>Twitter - Latest thoughts</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              </Button>
            </div>
          </div>
        )

      case "arduino":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">IoT Projects</h3>
              <p className="text-muted-foreground">Hardware meets software</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Smart Home Controller",
                  description: "ESP32-based home automation system",
                  tags: ["ESP32", "WiFi", "MQTT"],
                  image: "/placeholder.svg?height=120&width=200",
                },
                {
                  title: "Weather Station",
                  description: "Real-time environmental monitoring",
                  tags: ["Arduino", "Sensors", "LCD"],
                  image: "/placeholder.svg?height=120&width=200",
                },
                {
                  title: "LED Matrix Display",
                  description: "Programmable LED art installation",
                  tags: ["Raspberry Pi", "Python", "LEDs"],
                  image: "/placeholder.svg?height=120&width=200",
                },
              ].map((project, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-20 h-20 object-cover"
                    />
                    <CardContent className="flex-1 p-4">
                      <h4 className="font-semibold mb-1">{project.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="flex gap-1 flex-wrap">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "guitar":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Guitar Performances</h3>
              <p className="text-muted-foreground">Musical expressions</p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Classical Piece #1", duration: "3:24" },
                { title: "Fingerstyle Blues", duration: "4:12" },
                { title: "Original Composition", duration: "2:58" },
              ].map((track, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.duration}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "piano":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Piano Recordings</h3>
              <p className="text-muted-foreground">Keys to the soul</p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Chopin Nocturne", duration: "5:32" },
                { title: "Jazz Improvisation", duration: "3:45" },
                { title: "Modern Minimalist", duration: "4:18" },
              ].map((track, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.duration}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "chess":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Chess Corner</h3>
              <p className="text-muted-foreground">Strategic thinking</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daily Puzzle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-8 gap-1 w-48 h-48 mx-auto">
                      {Array.from({ length: 64 }, (_, i) => {
                        const row = Math.floor(i / 8)
                        const col = i % 8
                        const isBlack = (row + col) % 2 === 1
                        return <div key={i} className={`aspect-square ${isBlack ? "bg-gray-600" : "bg-gray-200"}`} />
                      })}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">White to move and mate in 2</p>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="https://chess.com" target="_blank" rel="noopener noreferrer">
                  <span>View Chess.com Profile</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      className="fixed inset-y-0 right-0 w-96 z-50"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card
        className={`h-full rounded-none border-l-2 ${glowClass} ${
          theme === "dark" ? "bg-gray-900/95" : "bg-white/95"
        } backdrop-blur-sm`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"} animate-pulse`} />
            <span className="text-sm font-medium">Portfolio</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto">{renderContent()}</CardContent>
      </Card>
    </motion.div>
  )
}
