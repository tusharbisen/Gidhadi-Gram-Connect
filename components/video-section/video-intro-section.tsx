"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VideoIntroSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const handlePlayPause = () => {
    const video = document.getElementById("intro-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    const video = document.getElementById("intro-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">"गिधाडी ग्राम कनेक्ट म्हणजे काय?"</h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-sky-700 mb-6">What is Gidhadi Gram?</h3>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our village community connects, grows, and thrives together through digital innovation and
            traditional values.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Element */}
            <video
              id="intro-video"
              className="w-full h-auto aspect-video"
              poster="/placeholder.svg?height=600&width=1200"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/videos/gidhadi-gram-intro.mp4" type="video/mp4" />
              <source src="/videos/gidhadi-gram-intro.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Video Controls Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center group">
              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={handlePlayPause}
                  size="lg"
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-4"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>
                <Button
                  onClick={handleMuteToggle}
                  size="lg"
                  variant="outline"
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-black rounded-full p-4"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Play Button for Initial State */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <Button
                  onClick={handlePlayPause}
                  size="lg"
                  className="bg-sky-600 hover:bg-sky-700 text-white rounded-full p-6 shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="h-8 w-8 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Video Description */}
          <div className="mt-8 text-center">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold text-sky-700 mb-3">🏘️ Community Connection</h4>
                <p className="text-gray-600">
                  Connecting villagers, sharing resources, and building stronger community bonds
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold text-sky-600 mb-3">💼 Local Services</h4>
                <p className="text-gray-600">
                  Access to local businesses, government services, and essential information
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold text-sky-800 mb-3">📱 Digital Innovation</h4>
                <p className="text-gray-600">Modern technology meeting traditional village life for better living</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Join Gidhadi Gram Community
          </Button>
        </div>
      </div>
    </section>
  )
}
