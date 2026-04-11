"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

interface MarqueeProps {
  text: string
  speed?: "slow" | "normal" | "fast"
  className?: string
  icon?: boolean
  urgent?: boolean
}

export function Marquee({ text, speed = "normal", className, icon = true, urgent = false }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [animationDuration, setAnimationDuration] = useState("30s")

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const textWidth = textRef.current.offsetWidth

    // Only animate if text is longer than container
    if (textWidth > containerWidth) {
      // Calculate animation duration based on text length and speed
      const speedFactor = speed === "slow" ? 40 : speed === "fast" ? 20 : 30
      const calculatedDuration = (textWidth / containerWidth) * speedFactor
      setAnimationDuration(`${calculatedDuration}s`)
    }
  }, [text, speed])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden whitespace-nowrap py-2.5 px-4",
        urgent ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground",
        className,
      )}
      role="marquee"
      aria-live="polite"
    >
      <div
        ref={textRef}
        className="inline-block animate-marquee"
        style={{
          animationDuration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {icon && (
          <AlertCircle
            className="mr-2 inline-block h-4.5 w-4.5 opacity-90"
            aria-hidden="true"
          />
        )}
        <span className="font-medium tracking-wide text-[15px]">{text}</span>
        <span className="mx-8 opacity-50">•</span>
        {icon && (
          <AlertCircle
            className="mr-2 inline-block h-4.5 w-4.5 opacity-90"
            aria-hidden="true"
          />
        )}
        <span className="font-medium tracking-wide text-[15px]">{text}</span>
        <span className="mx-8 opacity-50">•</span>
      </div>
    </div>
  )
}
