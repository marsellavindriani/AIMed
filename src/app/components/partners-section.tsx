import { client } from "@/sanity/client"
import { allPartnerQuery, partnersSectionQuery } from "@/sanity/queries"

import { Partner, PartnersSectionQueryResult } from "@/types/sanity.types"
import BaseSection from "@/components/base-section"

import PartnersCarousel from "./partners-carousel"

const options = { next: { revalidate: 30 } }

export default async function PartnersSection() {
  const partnersSectionQueryResult =
    await client.fetch<PartnersSectionQueryResult>(
      partnersSectionQuery,
      {},
      options
    )

  const partnersSection = partnersSectionQueryResult?.partnersSection

  const partners = await client.fetch<Partner[]>(allPartnerQuery, {}, options)

  return (
    <BaseSection
      title={partnersSection?.title}
      subtitle={partnersSection?.subtitle}
      headerAlign="center"
      className="[&>div]:px-0 md:[&>div]:px-[1rem]"
    >
      <PartnersCarousel partners={partners} />
    </BaseSection>
  )
}
