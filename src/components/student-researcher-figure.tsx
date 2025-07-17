import Image from "next/image"
import { User } from "lucide-react"

interface Props {
  name: string
  division: string
  thesisTitle: string
  image: {
    src: string
    alt: string
  }
}

export default function StudentResearcherFigure({
  name,
  division,
  thesisTitle,
  image,
}: Props) {
  return (
    <figure className="flex h-full grow items-center gap-3 overflow-hidden rounded border bg-neutral-50 px-4 py-2 md:gap-6">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={86}
          height={86}
          className="aspect-square size-[70px] rounded-full border object-cover object-top md:size-[86px]"
        />
      ) : (
        <div className="flex size-[90px] flex-none items-center justify-center rounded bg-primary/10 text-primary md:size-[120px]">
          <User className="size-[50%]" />
        </div>
      )}

      <figcaption className="flex flex-col self-start text-left">
        <h2 className="font-bold text-primary">{name}</h2>
        <p className="-mt-1 text-xs font-medium text-neutral-700 md:text-sm">
          {division}
        </p>
        <p className="mt-1 text-xs italic text-muted-foreground md:text-sm">
          {thesisTitle}
        </p>
      </figcaption>
    </figure>
  )
}
