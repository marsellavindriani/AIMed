import { urlForImage } from "@/sanity/utils"

import { Researcher } from "@/types/sanity.types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import CarouselControl from "@/components/carousel-control"
import ExternalCollaboratorResearcherFigure from "@/components/external-collaborator-researcher-figure"

interface Props {
  // batch: number
  title: string
  externalCollaborators: Researcher[]
}

export default function ExternalCollaboratorsSection({
  title,
  externalCollaborators,
}: Props) {
  if (externalCollaborators.length == 0) {
    return null
  }

  return (
    <div className="flex w-full flex-col items-center py-4 md:py-8">
      <div>
        {/* <h2 className="text-2xl font-medium">Batch {batch} Students</h2> */}
        <h2 className="text-2xl font-medium">{title}</h2>
      </div>
      <div className="mt-10 w-full">
        <Carousel>
          <CarouselContent>
            {externalCollaborators.map((externalCollaborator) => (
              <CarouselItem
                key={externalCollaborator._id}
                className="md:basis-1/2"
              >
                <ExternalCollaboratorResearcherFigure
                  name={externalCollaborator.name || ""}
                  href={externalCollaborator.link}
                  division="External Collaborator"
                  thesisTitle={externalCollaborator.title || ""}
                  image={{
                    src: urlForImage(
                      externalCollaborator.image
                    )?.url() as string,
                    alt: "",
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselControl />
        </Carousel>
      </div>
    </div>
  )
}
