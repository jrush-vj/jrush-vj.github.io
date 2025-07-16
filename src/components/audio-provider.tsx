"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"

interface AudioContextType {
  playSound: (soundType: "click" | "hover" | "switch") => void
  isMuted: boolean
  toggleMute: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const createBeep = useCallback(
    (frequency: number, duration: number, volume = 0.1) => {
      if (!audioContextRef.current || isMuted) return

      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration)

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration)
    },
    [isMuted],
  )

  const playSound = useCallback(
    (soundType: "click" | "hover" | "switch") => {
      switch (soundType) {
        case "click":
          createBeep(800, 0.1, 0.05)
          break
        case "hover":
          createBeep(600, 0.05, 0.03)
          break
        case "switch":
          createBeep(1000, 0.1, 0.04)
          setTimeout(() => createBeep(800, 0.1, 0.04), 50)
          break
      }
    },
    [createBeep],
  )

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  return <AudioContext.Provider value={{ playSound, isMuted, toggleMute }}>{children}</AudioContext.Provider>
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) throw new Error("useAudio must be used within AudioProvider")
  return context
}
