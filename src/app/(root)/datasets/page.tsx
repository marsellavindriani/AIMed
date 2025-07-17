import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import { allDatasetsQuery } from "@/sanity/queries"
import { urlForImage } from "@/sanity/utils"
import { Database } from "lucide-react"

import { Dataset } from "@/types/sanity.types"
import BasePage from "@/components/base-page"
import BaseSection from "@/components/base-section"
import HoverableCard from "@/components/hoverable-card"

const options = { next: { revalidate: 30 } }

export const metadata: Metadata = {
  title: "Datasets",
  description:
    "Explore a curated collection of medical imaging and signal datasets designed to support research in medical interpretation and analysis.",
}

export default async function Page() {
  const datasets = await client.fetch<Dataset[]>(allDatasetsQuery, {}, options)

  return (
    <BasePage title="Datasets">
      <BaseSection>
        <h2 className="text-xl font-medium text-primary">List of Datsets</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {datasets.map((dataset) => (
            <li key={dataset._id}>
              <Link href={`datasets/${dataset.slug?.current}`}>
                <HoverableCard className="flex items-center gap-4">
                  {dataset.images ? (
                    <Image
                      src={urlForImage(dataset.images[0])?.url() as string}
                      alt={dataset.name || ""}
                      height={80}
                      width={80}
                      className="size-[68px] rounded object-cover lg:size-[80px]"
                    />
                  ) : (
                    <div className="flex size-[68px] flex-none items-center justify-center rounded bg-primary/10 text-primary lg:size-[80px]">
                      <Database className="size-[50%]" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold transition-colors group-hover:text-primary sm:text-xl">
                      {dataset.name}
                    </h3>
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {dataset.shortDescription}
                    </p>
                  </div>
                </HoverableCard>
              </Link>
            </li>
          ))}
        </ul>
      </BaseSection>
    </BasePage>
  )
}
