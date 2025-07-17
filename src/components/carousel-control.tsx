"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "./ui/button"
import { useCarousel } from "./ui/carousel"

export default function CarouselControl() {
  const { scrollPrev, canScrollPrev, scrollNext, canScrollNext } = useCarousel()

  return (
    <div className="mt-4 flex justify-between">
      <Button
        size="sm"
        variant="ghost"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowLeft /> Prev
      </Button>
      <Button
        size="sm"
        variant="ghost"
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        Next <ArrowRight />
      </Button>
    </div>
  )
}
