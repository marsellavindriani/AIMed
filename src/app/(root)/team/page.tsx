import { Metadata } from "next"
import { client } from "@/sanity/client"
import { allResearchersQuery } from "@/sanity/queries"
import { urlForImage } from "@/sanity/utils"

import { Researcher } from "@/types/sanity.types"
import { researcherRoles } from "@/lib/constants"
import BaseSection from "@/components/base-section"
import LecturerResearcherFigure from "@/components/lecturer-researcher-figure"

import ExternalCollaboratorsSection from "./components/external-collaborator-section"
import LecturerSection from "./components/lecturer-section"
import StudentsSection from "./components/students-section"

const options = { next: { revalidate: 30 } }

export const metadata: Metadata = {
  title: "Research Team",
  description:
    "Meet the dedicated members of our research team, led by Prof. Ir. Siti Nurmaini, M.T., Ph.D. as Head of the team, and organized to foster collaboration and innovation.",
}

export default async function Page() {
  const researchers = await client.fetch<Researcher[]>(
    allResearchersQuery,
    {},
    options
  )

  const head = researchers.filter((researcher) => researcher.role == "Head")[0]

  const secretary = researchers.filter(
    (researcher) => researcher.role == "Secretary"
  )[0]

  const researchAssistants = researchers.filter(
    (researcher) => researcher.role == "Research Assistant"
  )

  const members = researchers.filter(
    (researcher) => researcher.role == "Member"
  )

  const externalCollaborators = researchers.filter(
    (researcher) => researcher.role == "External Collaborator"
  )

  const students = researchers.filter(
    (researcher) => researcher.role == "Student"
  )

  const bachelorsStudents = students.filter(
    (researcher) => researcher.degree == "Bachelor"
  )

  const mastersStudents = students.filter(
    (researcher) => researcher.degree == "Master"
  )

  const doctoralStudents = students.filter(
    (researcher) => researcher.degree == "Doctoral"
  )

  return (
    <main>
      <header className="container flex flex-col items-center pt-16 text-center md:pt-32">
        <div className="font-heading">
          <p className="text-sm text-neutral-600 uppercase md:text-base">
            ISys Research Group
          </p>
          <h1 className="text-5xl font-medium md:text-7xl">Research Team</h1>
        </div>
        <p className="max-w-prose pt-4 text-lg md:pt-8 md:text-2xl">
          Meet the dedicated members of our research team, organized to foster
          collaboration and innovation.
        </p>
      </header>
      <BaseSection>
        <div className="flex w-full flex-col items-center divide-y">
          <div className="flex w-full flex-row justify-center gap-4 py-4 md:py-8">
            <LecturerResearcherFigure
              name={head.name || ""}
              image={{
                src: urlForImage(head.image)?.url() as string,
                alt: "",
              }}
              role={researcherRoles["Head"]}
            />
          </div>
          <div className="flex w-full flex-row justify-center gap-4 py-4 md:py-8">
            <LecturerResearcherFigure
              name={secretary.name || ""}
              image={{
                src: urlForImage(secretary.image)?.url() as string,
                alt: "",
              }}
              role={researcherRoles["Secretary"]}
            />
          </div>

          {/* <div className="flex w-full flex-col items-center py-4 md:py-8">
            <div>
              <h2 className="text-2xl font-medium">Members</h2>
            </div>
            <div className="flex w-full flex-row flex-wrap justify-center gap-4 py-4 md:py-8">
              {members.map((member) => (
                <LecturerResearcherFigure
                  key={member._id}
                  name={member.name || ""}
                  role={researcherRoles["Member"]}
                  image={{
                    src: urlForImage(member.image)?.url() as string,
                    alt: "",
                  }}
                  size="sm"
                />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col items-center py-4 md:py-8">
            <div>
              <h2 className="text-2xl font-medium">Research Assistants</h2>
            </div>
            <div className="flex w-full flex-row flex-wrap justify-center gap-4 py-4 md:py-8">
              {researchAssistants.map((assistant) => (
                <LecturerResearcherFigure
                  key={assistant._id}
                  name={assistant.name || ""}
                  role={researcherRoles["Research Assistant"]}
                  image={{
                    src: urlForImage(assistant.image)?.url() as string,
                    alt: "",
                  }}
                  size="sm"
                />
              ))}
            </div>
          </div> */}
          <LecturerSection title="Members" students={members} />
          <ExternalCollaboratorsSection
            title="External Collaborators"
            externalCollaborators={externalCollaborators}
          />
          <LecturerSection
            title="Research Assistants"
            students={researchAssistants}
          />
          <StudentsSection
            title="Undergraduate Students"
            students={bachelorsStudents}
          />
          <StudentsSection
            title="Graduate Students"
            students={mastersStudents}
          />
          <StudentsSection
            title="Postgraduate Students"
            students={doctoralStudents}
          />
        </div>
      </BaseSection>
    </main>
  )
}
