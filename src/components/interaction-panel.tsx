"use client"

import { motion } from "framer-motion"
import {
  X,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Play,
  Pause,
  Phone,
  Mail,
  MapPin,
  Award,
  Camera,
  Coffee,
  BookOpen,
  Music,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { InteractionType } from "./room-explorer"
import { useState } from "react"

interface InteractionPanelProps {
  type: InteractionType
  onClose: () => void
  theme: "light" | "dark"
}

export function InteractionPanel({ type, onClose, theme }: InteractionPanelProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const panelVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 50,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.6,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  }

  const glowClass =
    theme === "dark"
      ? "shadow-[0_0_30px_rgba(0,255,255,0.4)] border-cyan-400/40 bg-gray-900/95"
      : "shadow-[0_0_30px_rgba(255,105,180,0.4)] border-pink-400/40 bg-white/95"

  const getIcon = () => {
    switch (type) {
      case "computer":
        return <Github className="w-6 h-6" />
      case "phone":
        return <Phone className="w-6 h-6" />
      case "books":
        return <BookOpen className="w-6 h-6" />
      case "camera":
        return <Camera className="w-6 h-6" />
      case "coffee":
        return <Coffee className="w-6 h-6" />
      case "guitar":
        return <Music className="w-6 h-6" />
      case "plant":
        return <Leaf className="w-6 h-6" />
      case "awards":
        return <Award className="w-6 h-6" />
      default:
        return <ExternalLink className="w-6 h-6" />
    }
  }

  const renderContent = () => {
    switch (type) {
      case "computer":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Github className={`w-8 h-8 ${theme === "dark" ? "text-cyan-400" : "text-pink-400"}`} />
                <h3 className="text-3xl font-bold">Tech Projects</h3>
              </div>
              <p className="text-muted-foreground">My digital creations and contributions</p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: "AI-Powered Portfolio",
                  description: "Interactive 3D portfolio with React Three Fiber",
                  tech: ["React", "Three.js", "TypeScript", "Framer Motion"],
                  status: "Live",
                  link: "https://github.com",
                },
                {
                  title: "Smart Home Dashboard",
                  description: "IoT device management with real-time monitoring",
                  tech: ["Next.js", "WebSocket", "Arduino", "MQTT"],
                  status: "In Progress",
                  link: "https://github.com",
                },
                {
                  title: "ML Music Composer",
                  description: "AI that generates music based on mood analysis",
                  tech: ["Python", "TensorFlow", "Flask", "Web Audio API"],
                  status: "Beta",
                  link: "https://github.com",
                },
              ].map((project, index) => (
                <Card key={index} className="overflow-hidden hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{project.title}</h4>
                      <Badge variant={project.status === "Live" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent" asChild>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <Github className="w-6 h-6" />
                  <span className="text-xs">GitHub</span>
                </a>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <Linkedin className="w-6 h-6" />
                  <span className="text-xs">LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2 bg-transparent" asChild>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <Twitter className="w-6 h-6" />
                  <span className="text-xs">Twitter</span>
                </a>
              </Button>
            </div>
          </div>
        )

      case "phone":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Phone className={`w-8 h-8 ${theme === "dark" ? "text-cyan-400" : "text-pink-400"}`} />
                <h3 className="text-3xl font-bold">Get In Touch</h3>
              </div>
              <p className="text-muted-foreground">Let's connect and collaborate</p>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-xl">John Developer</h4>
                    <p className="text-muted-foreground">Full-Stack Developer & Creative Technologist</p>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4">
                <Button variant="outline" className="justify-start gap-3 h-14 bg-transparent" asChild>
                  <a href="mailto:hello@example.com">
                    <Mail className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">hello@example.com</div>
                    </div>
                  </a>
                </Button>

                <Button variant="outline" className="justify-start gap-3 h-14 bg-transparent" asChild>
                  <a href="tel:+1234567890">
                    <Phone className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">+1 (234) 567-890</div>
                    </div>
                  </a>
                </Button>

                <Button variant="outline" className="justify-start gap-3 h-14 bg-transparent">
                  <MapPin className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">San Francisco, CA</div>
                  </div>
                </Button>
              </div>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">Quick Message</h4>
                <textarea
                  className="w-full p-3 border rounded-lg resize-none bg-background"
                  rows={3}
                  placeholder="Send me a quick message..."
                />
                <Button className="w-full mt-3">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </Card>
            </div>
          </div>
        )

      case "books":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className={`w-8 h-8 ${theme === "dark" ? "text-cyan-400" : "text-pink-400"}`} />
                <h3 className="text-3xl font-bold">Knowledge Journey</h3>
              </div>
              <p className="text-muted-foreground">Books that shaped my thinking</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Clean Code",
                  author: "Robert C. Martin",
                  category: "Programming",
                  impact: "Transformed how I write and structure code",
                  color: "bg-red-500",
                },
                {
                  title: "The Pragmatic Programmer",
                  author: "David Thomas & Andrew Hunt",
                  category: "Software Development",
                  impact: "Shaped my approach to problem-solving",
                  color: "bg-green-500",
                },
                {
                  title: "Designing Data-Intensive Applications",
                  author: "Martin Kleppmann",
                  category: "System Design",
                  impact: "Deep understanding of distributed systems",
                  color: "bg-blue-500",
                },
                {
                  title: "The Design of Everyday Things",
                  author: "Don Norman",
                  category: "UX Design",
                  impact: "Influenced my user-centered design philosophy",
                  color: "bg-yellow-500",
                },
                {
                  title: "Atomic Habits",
                  author: "James Clear",
                  category: "Personal Development",
                  impact: "Revolutionized my daily routines and productivity",
                  color: "bg-purple-500",
                },
              ].map((book, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className={`w-12 h-16 ${book.color} rounded flex-shrink-0`} />
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{book.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                        <Badge variant="secondary" className="mb-2">
                          {book.category}
                        </Badge>
                        <p className="text-sm italic">"{book.impact}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "owl":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🦉</div>
              <h3 className="text-3xl font-bold">Meet Wisdom</h3>
              <p className="text-muted-foreground">My coding companion since 2019</p>
            </div>

            <Card className="p-6">
              <h4 className="font-bold text-xl mb-4">The Story Behind Wisdom</h4>
              <div className="space-y-4 text-sm">
                <p>
                  This little owl has been my desk companion through countless late-night coding sessions. I got Wisdom
                  during my first internship as a reminder that programming is about continuous learning and patient
                  problem-solving.
                </p>
                <p>
                  Fun fact: Wisdom has "witnessed" the creation of over 50 projects, survived 3 office moves, and has
                  been my rubber duck debugging partner more times than I can count!
                </p>
                <p>
                  The owl represents the wisdom gained through experience, the patience needed for debugging, and the
                  night-owl lifestyle that many developers know all too well.
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 text-center">
              <Card className="p-4">
                <div className="text-2xl font-bold text-cyan-400">50+</div>
                <div className="text-sm text-muted-foreground">Projects Witnessed</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-pink-400">4</div>
                <div className="text-sm text-muted-foreground">Years Together</div>
              </Card>
            </div>
          </div>
        )

      case "coffee":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-3xl font-bold">Fuel for Code</h3>
              <p className="text-muted-foreground">The essential developer beverage</p>
            </div>

            <Card className="p-6">
              <h4 className="font-bold text-xl mb-4">My Coffee Journey</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Daily Consumption</span>
                  <Badge>3-4 cups</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Favorite Brew</span>
                  <Badge variant="secondary">Ethiopian Single Origin</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Brewing Method</span>
                  <Badge variant="outline">Pour Over V60</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Best Coding Time</span>
                  <Badge>Early Morning</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-bold mb-4">Coffee & Code Stats</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-500">1,247</div>
                  <div className="text-sm text-muted-foreground">Cups This Year</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">89%</div>
                  <div className="text-sm text-muted-foreground">Code Quality Boost</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">156</div>
                  <div className="text-sm text-muted-foreground">Bugs Fixed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">23</div>
                  <div className="text-sm text-muted-foreground">All-nighters</div>
                </div>
              </div>
            </Card>
          </div>
        )

      case "guitar":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Music className={`w-8 h-8 ${theme === "dark" ? "text-cyan-400" : "text-pink-400"}`} />
                <h3 className="text-3xl font-bold">Musical Expression</h3>
              </div>
              <p className="text-muted-foreground">Where code meets melody</p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Fingerstyle Blues", duration: "4:23", style: "Blues" },
                { title: "Classical Etude No. 1", duration: "3:45", style: "Classical" },
                { title: "Jazz Improvisation", duration: "5:12", style: "Jazz" },
                { title: "Original Composition", duration: "3:58", style: "Original" },
              ].map((track, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 rounded-full"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <div>
                        <h4 className="font-semibold">{track.title}</h4>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          <span>{track.duration}</span>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">
                            {track.style}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6">
              <h4 className="font-bold mb-4">Musical Journey</h4>
              <div className="space-y-3 text-sm">
                <p>Started playing guitar at age 16, initially drawn to rock and blues.</p>
                <p>Expanded into classical and jazz during college years.</p>
                <p>
                  Now I find that music and coding share similar patterns - both require creativity, logic, and
                  patience.
                </p>
                <p>Music helps me think differently about problem-solving and brings balance to my technical work.</p>
              </div>
            </Card>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
            <p className="text-muted-foreground">This interaction is being developed...</p>
          </div>
        )
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <Card className={`relative w-full max-w-2xl max-h-[90vh] ${glowClass} backdrop-blur-md border-2`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-cyan-400/10" : "bg-pink-400/10"}`}>
              {getIcon()}
            </div>
            <div className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"} animate-pulse`} />
            <span className="text-sm font-medium">Interactive Portfolio</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
          {renderContent()}
        </CardContent>
      </Card>
    </motion.div>
  )
}
