import { Metadata } from "next"
import { client } from "@/sanity/client"
import { allIntellectualPropertyRightsQuery } from "@/sanity/queries"

import { IntellectualPropertyRights } from "@/types/sanity.types"
import BasePage from "@/components/base-page"
import BaseSection from "@/components/base-section"
import PublicationList from "@/components/publication-list"
import PublicationListItem from "@/components/publication-list-item"

const options = { next: { revalidate: 30 } }

export const metadata: Metadata = {
  title: "Intellectual Property Rights",
  description:
    "Browse our portfolio of registered intellectual properties, including patents, copyrights, and software innovations, demonstrating our commitment to impactful and applicable research outcomes.",
}

export default async function Page() {
  const intellectualPropertyRights = await client.fetch<
    IntellectualPropertyRights[]
  >(allIntellectualPropertyRightsQuery, {}, options)

  const copyrights = intellectualPropertyRights.filter(
    (researcher) => researcher.type == "Copyright"
  )

  const patents = intellectualPropertyRights.filter(
    (researcher) => researcher.type == "Patent"
  )

  return (
    <BasePage title="Intellectual Property Rights (IPR)" subtitle="Publication">
      <BaseSection>
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-xl font-medium text-primary">Copyrights</h2>
            <PublicationList>
              {copyrights.map((copyright) => (
                <PublicationListItem
                  key={copyright._id}
                  title={copyright.title || ""}
                  href={copyright.link || "#"}
                  description={`${copyright.type} - ${copyright.certificateNumber}`}
                />
              ))}
            </PublicationList>
          </div>
          <div>
            <h2 className="text-xl font-medium text-primary">Patents</h2>
            <PublicationList>
              {patents.map((patent) => (
                <PublicationListItem
                  key={patent._id}
                  title={patent.title || ""}
                  href={patent.link || "#"}
                  description={`${patent.type} - ${patent.certificateNumber}`}
                />
              ))}
            </PublicationList>
          </div>
        </div>
      </BaseSection>
    </BasePage>
  )
}
