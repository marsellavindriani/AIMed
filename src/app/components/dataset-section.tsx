import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import { datasetsSectionQuery } from "@/sanity/queries"
import { urlForImage } from "@/sanity/utils"
import { ArrowRight, Database } from "lucide-react"
import { PortableText } from "next-sanity"

import { DatasetsSectionQueryResult } from "@/types/sanity.types"
import { Button } from "@/components/ui/button"
import BaseSection from "@/components/base-section"
import HoverableCard from "@/components/hoverable-card"

const options = { next: { revalidate: 30 } }

export default async function DatasetSection() {
  const datasetsSectionQueryResult =
    await client.fetch<DatasetsSectionQueryResult>(
      datasetsSectionQuery,
      {},
      options
    )

  const datasetsSection = datasetsSectionQueryResult?.datasetsSection

  return (
    <BaseSection
      title={datasetsSection?.title}
      subtitle={datasetsSection?.subtitle}
    >
      {datasetsSection?.description && (
        <article className="prose prose-sm md:prose-base">
          <PortableText value={datasetsSection?.description} />
        </article>
      )}
      <ul className="mt-4 grid gap-2 lg:grid-cols-3">
        {datasetsSection?.featuredDatasets &&
          datasetsSection?.featuredDatasets.map((dataset) => (
            <li key={dataset._id}>
              <Link href={`datasets/${dataset.slug?.current}`}>
                <HoverableCard className="flex items-center gap-4">
                  {dataset.images ? (
                    <Image
                      src={urlForImage(dataset.images[0])?.url() as string}
                      alt={dataset.name || ""}
                      height={80}
                      width={80}
                      className="size-[68px] flex-none rounded object-cover lg:size-[80px]"
                    />
                  ) : (
                    <div className="bg-primary/10 text-primary flex size-[68px] flex-none items-center justify-center rounded lg:size-[80px]">
                      <Database className="size-[50%]" />
                    </div>
                  )}
                  <div>
                    <h3 className="group-hover:text-primary font-bold transition-colors sm:text-xl">
                      {dataset.name}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {dataset.shortDescription}
                    </p>
                  </div>
                </HoverableCard>
              </Link>
            </li>
          ))}
      </ul>

      <div className="flex justify-end pt-4 lg:pt-8">
        {/* <Button variant="outline" size="xl" asChild className="w-full sm:w-fit">
          <Link href="/datasets">Explore more</Link>
        </Button> */}

        <Button variant="link" size="xl" className="p-0" asChild>
          <Link href="/datasets">
            Explore more datasets <ArrowRight />
          </Link>
        </Button>
      </div>
    </BaseSection>
  )
}
