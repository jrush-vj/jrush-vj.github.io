"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Laptop, Cpu, Guitar, Piano, Crown } from "lucide-react"
import type { PanelType } from "./desk-scene"
import { InfoPanel } from "./info-panel"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "./theme-provider"
import { AnimatePresence } from "framer-motion"

interface MobileViewProps {
  activePanel: PanelType
  setActivePanel: (panel: PanelType) => void
}

export function MobileView({ activePanel, setActivePanel }: MobileViewProps) {
  const { theme } = useTheme()

  const items = [
    { id: "laptop", icon: Laptop, title: "Connect", description: "Social links & contact" },
    { id: "arduino", icon: Cpu, title: "IoT Projects", description: "Hardware & embedded systems" },
    { id: "guitar", icon: Guitar, title: "Guitar", description: "Musical performances" },
    { id: "piano", icon: Piano, title: "Piano", description: "Classical & jazz recordings" },
    { id: "chess", icon: Crown, title: "Chess", description: "Puzzles & strategy" },
  ]

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
      <ThemeToggle />

      <div className="pt-16 pb-8 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Explore my interests & projects</p>
        </motion.div>

        <div className="space-y-4 max-w-md mx-auto">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:border-cyan-400/30"
                      : "hover:shadow-[0_0_20px_rgba(255,105,180,0.2)] hover:border-pink-400/30"
                  }`}
                  onClick={() => setActivePanel(item.id as PanelType)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-cyan-400/10" : "bg-pink-400/10"}`}>
                        <Icon className={`w-6 h-6 ${theme === "dark" ? "text-cyan-400" : "text-pink-400"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {activePanel && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePanel(null)}
          />
        )}
        {activePanel && <InfoPanel type={activePanel} onClose={() => setActivePanel(null)} theme={theme} />}
      </AnimatePresence>
    </div>
  )
}
