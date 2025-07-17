import Image from "next/image"
import { User } from "lucide-react"

import { cn } from "@/lib/utils"

interface Props {
  name: string
  role?: string
  image: {
    src: string
    alt: string
  }
  size?: "sm" | "lg"
}

export default function LecturerResearcherFigure({
  name,
  role,
  image,
  size = "lg",
}: Props) {
  return (
    <figure
      className={cn(
        size === "lg"
          ? "max-w-xl flex-col items-center gap-4 p-2 md:flex-row"
          : "flex-col items-center gap-2 px-4 py-2 sm:max-w-xs md:items-start",
        "flex w-full grow overflow-hidden rounded border bg-neutral-50"
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={120}
          height={120}
          className={cn(
            size === "lg"
              ? "size-[100px] rounded md:size-[120px]"
              : "size-[84px] rounded-full md:size-[96px]",
            "aspect-square border bg-neutral-100 object-cover object-top"
          )}
        />
      ) : (
        <div className="flex size-[90px] flex-none items-center justify-center rounded bg-primary/10 text-primary md:size-[120px]">
          <User className="size-[50%]" />
        </div>
      )}

      <figcaption className="flex flex-col text-center md:text-left">
        <h2
          className={cn(
            size === "lg" ? "text-base md:text-xl" : "text-base",
            "font-bold text-primary"
          )}
        >
          {name}
        </h2>
        <p
          className={cn(
            size === "lg" ? "text-xs md:text-base" : "text-xs md:text-sm",
            "-mt-1 font-medium text-neutral-700"
          )}
        >
          {role}
        </p>
      </figcaption>
    </figure>
  )
}
