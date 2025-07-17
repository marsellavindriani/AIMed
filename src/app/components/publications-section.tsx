import Link from "next/link"
import { client } from "@/sanity/client"
import { allPublicationCountQuery } from "@/sanity/queries"
import { ChevronRight } from "lucide-react"

import { AllPublicationCountQueryResult } from "@/types/sanity.types"
import BaseSection from "@/components/base-section"

const options = { next: { revalidate: 3600 } }

export default async function PublicationsSection() {
  const allPublicationCountQueryResult =
    await client.fetch<AllPublicationCountQueryResult>(
      allPublicationCountQuery,
      {},
      options
    )

  const publications = [
    {
      label: "International Journals",
      count: allPublicationCountQueryResult.internationalJournalCount,
      href: "/journals",
    },
    {
      label: "International Conferences (Proceedings)",
      count: allPublicationCountQueryResult.internationalConferenceCount,
      href: "/proceedings",
    },
    {
      label: "Intellectual Property Rights (IPR)",
      count: allPublicationCountQueryResult.intellectualPropertyRightsCount,
      href: "/ipr",
    },
    {
      label: "Books",
      count: allPublicationCountQueryResult.bookCount,
      href: "/books",
    },
  ]

  return (
    <BaseSection title="Publications" className="bg-neutral-100">
      <article className="prose prose-sm md:prose-base">
        <p>
          Explore our latest research contributions and publications on
          intelligent systems.
        </p>
      </article>

      <ul className="mt-4 flex flex-col divide-y">
        {publications.map((publication) => (
          <li
            key={publication.label}
            className="flex flex-row items-center justify-between gap-4 py-4 md:py-6"
          >
            <div>
              <p className="text-3xl text-primary md:text-4xl">
                {publication.count}
              </p>
              <h3 className="text-sm md:text-base">{publication.label}</h3>
            </div>
            <Link
              href={publication.href}
              className="group flex flex-row items-center md:text-lg"
            >
              Explore
              <ChevronRight className="size-[1em]" />
            </Link>
          </li>
        ))}
      </ul>
    </BaseSection>
  )
}
