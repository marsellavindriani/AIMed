import { urlForImage } from "@/sanity/utils"

import { Researcher } from "@/types/sanity.types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import CarouselControl from "@/components/carousel-control"
import StudentResearcherFigure from "@/components/student-researcher-figure"

interface Props {
  // batch: number
  title: string
  students: Researcher[]
}

export default function StudentsSection({ title, students }: Props) {
  if (students.length == 0) {
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
            {students.map((student) => (
              <CarouselItem key={student._id} className="md:basis-1/2">
                <StudentResearcherFigure
                  name={student.name || ""}
                  division={student.division || ""}
                  thesisTitle={student.thesisTitle || ""}
                  image={{
                    src: urlForImage(student.image)?.url() as string,
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
