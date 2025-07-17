"use client"

import { useEffect, useState } from "react"
import { NavigationItem } from "@/types"

import { cn } from "@/lib/utils"
import Header from "@/components/layout/header"

export default function HomeHeader({
  navigationData,
}: {
  navigationData: NavigationItem[]
}) {
  const [showHeader, setShowHeader] = useState(false)
  const scrollThreshold = 800 // Adjust this value as needed (in pixels)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) // Re-run effect if scrollThreshold changes

  return (
    <div
      className={cn(
        showHeader
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0",
        "fixed top-0 z-40 w-full bg-neutral-900/80 text-white backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.45,0,0.55,1)]"
      )}
    >
      <Header navigationData={navigationData} compact />
    </div>
  )
}
