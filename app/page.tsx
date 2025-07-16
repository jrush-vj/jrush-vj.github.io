"use client"

import { Portfolio } from "@/components/portfolio"
import { ThemeProvider } from "@/components/theme-provider"
import { AudioProvider } from "@/components/audio-provider"

export default function Home() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Portfolio />
      </AudioProvider>
    </ThemeProvider>
  )
}
