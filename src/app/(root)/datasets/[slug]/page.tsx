import { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/sanity/client"
import { datasetQuery } from "@/sanity/queries"
import { resolveOpenGraphImage } from "@/sanity/utils"
import { SquareArrowOutUpRight } from "lucide-react"

import { Dataset } from "@/types/sanity.types"
import BasePage from "@/components/base-page"
import BaseSection from "@/components/base-section"

import DatasetPreview from "./DatasetPreview"

const options = { next: { revalidate: 30 } }

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params
  const dataset = await client.fetch<Dataset>(
    datasetQuery,
    await params,
    options
  )
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(
    dataset.images ? dataset.images[0] : null
  )

  return {
    title: dataset.name,
    description: (dataset.description || "").substring(0, 120),
    openGraph: {
      images: ogImage ? ogImage : previousImages,
    },
  } satisfies Metadata
}

export default async function Page({ params }: Props) {
  const dataset = await client.fetch<Dataset>(
    datasetQuery,
    await params,
    options
  )

  if (!dataset?._id) {
    return notFound()
  }

  return (
    <BasePage title={dataset.name || ""} subtitle="Dataset">
      <BaseSection>
        <div className="flex flex-row flex-wrap gap-4 border-b pb-10">
          <DatasetPreview dataset={dataset} />
        </div>
        <ul className="grid gap-4 border-b py-10 md:grid-cols-2">
          <li>
            <h2 className="text-xl font-medium text-primary">Description</h2>
            <article className="prose">
              <p>{dataset.description || dataset.shortDescription}</p>
            </article>
          </li>
          <li>
            <h2 className="text-xl font-medium text-primary">Type</h2>
            <article className="prose">
              <p>{dataset.type || "-"}</p>
            </article>
          </li>
          <li>
            <h2 className="text-xl font-medium text-primary">Origin</h2>
            <article className="prose">
              <p>{dataset.origin || "-"}</p>
            </article>
          </li>
          <li>
            <h2 className="text-xl font-medium text-primary">
              Number of records
            </h2>
            <article className="prose">
              <p>{dataset.numberOfRecords || "-"}</p>
            </article>
          </li>
          <li>
            <h2 className="text-xl font-medium text-primary">License</h2>
            <article className="prose">
              <p>{dataset.license || "-"}</p>
            </article>
          </li>
        </ul>

        <div className="mt-4">
          <Link
            href={dataset.link || "#"}
            target="_blank"
            className="flex items-center gap-1 text-lg hover:underline"
          >
            Preview <SquareArrowOutUpRight className="size-[1em]" />
          </Link>
        </div>
      </BaseSection>
    </BasePage>
  )
}
