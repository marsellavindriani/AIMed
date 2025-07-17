"use client"

import Image from "next/image"
import { urlForImage } from "@/sanity/utils"
import Autoplay from "embla-carousel-autoplay"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Dataset } from "@/types/sanity.types"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"

interface Props {
  dataset: Dataset
}

export default function DatasetPreview({ dataset }: Props) {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 3000 })]}
      opts={{ loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {dataset.images?.map((image) => (
          <CarouselItem key={image._key} className="md:basis-1/4">
            <Image
              src={urlForImage(image)?.url() as string}
              alt={dataset.name || ""}
              width={200}
              height={200}
              className="mx-auto aspect-square rounded object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselControl />
    </Carousel>
  )
}

function CarouselControl() {
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
