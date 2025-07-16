"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "./theme-provider"
import { useAudio } from "./audio-provider"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function Contact() {
  const { theme } = useTheme()
  const { playSound } = useAudio()

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "alex.chen@example.com",
      href: "mailto:alex.chen@example.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      href: "#",
    },
  ]

  return (
    <section id="contact" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Let's Connect
          </h2>
          <div className={`w-24 h-1 mx-auto mb-8 ${theme === "dark" ? "bg-cyan-400" : "bg-pink-400"}`} />
          <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} hover:scale-105 transition-transform`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${theme === "dark" ? "bg-cyan-400/10" : "bg-pink-400/10"}`}>
                        <info.icon className={`w-6 h-6 ${theme === "dark" ? "text-cyan-400" : "text-pink-600"}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {info.title}
                        </h3>
                        <a
                          href={info.href}
                          className={`${theme === "dark" ? "text-gray-400 hover:text-cyan-400" : "text-gray-600 hover:text-pink-600"} transition-colors`}
                          onClick={() => playSound("click")}
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className={`${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"}`}>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                    />
                  </div>
                  <Input
                    placeholder="Subject"
                    className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                  />
                  <Textarea
                    placeholder="Your Message"
                    rows={6}
                    className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                  />
                  <Button
                    type="submit"
                    className={`w-full ${
                      theme === "dark"
                        ? "bg-cyan-400 hover:bg-cyan-500 text-black"
                        : "bg-pink-400 hover:bg-pink-500 text-white"
                    }`}
                    onClick={() => playSound("click")}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
