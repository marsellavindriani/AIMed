import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/sanity/client"
import { productQuery } from "@/sanity/queries"
import { resolveOpenGraphImage, urlForImage } from "@/sanity/utils"
import { YouTubeEmbed } from "@next/third-parties/google"
import { CircleCheck, Download, File } from "lucide-react"
import { PortableText } from "next-sanity"

import { Product } from "@/types/sanity.types"
import { Button } from "@/components/ui/button"
import BaseSection from "@/components/base-section"

// import StatisticsSection from "./components/statistics-section"

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
  const product = await client.fetch<Product>(
    productQuery,
    await params,
    options
  )
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(product.image)

  return {
    title: product.name,
    description: (product.description || "").substring(0, 120),
    openGraph: {
      images: ogImage ? ogImage : previousImages,
    },
  } satisfies Metadata
}

export default async function Page({ params }: Props) {
  const product = await client.fetch<Product>(
    productQuery,
    await params,
    options
  )

  if (!product?._id) {
    return notFound()
  }

  const portableTextComponents = {
    types: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: ({ value }: { value: any }) => (
        <Image
          src={urlForImage(value)?.url() as string}
          alt=""
          width={1200}
          height={1200}
          className="w-full rounded object-cover"
        />
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      video: ({ value }: { value: any }) => (
        <video controls className="w-full rounded">
          <source src={value.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      file: ({ value }: { value: any }) => (
        <Link
          href={value.url}
          className="flex w-fit overflow-hidden rounded bg-primary/10 no-underline"
          target="_blank"
        >
          <div className="mr-2 flex items-center bg-primary/20 px-4">
            <File className="text-primary" />
          </div>
          <div className="flex items-center justify-between py-2 pl-2 pr-4">
            <span className="text-sm">{value.name}</span>

            <Download className="ml-4 flex-none text-primary" />
          </div>
        </Link>
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      youtube: ({ value }: { value: any }) => (
        <div className="my-4 w-full overflow-hidden rounded">
          <YouTubeEmbed videoid={value.videoId} />
        </div>
      ),
    },
  }

  return (
    <main>
      <header className="container flex flex-col items-center pt-16 text-center md:pt-32">
        <div className="font-heading">
          <p className="text-sm uppercase text-neutral-600 md:text-base">
            Product
          </p>
          <h1 className="text-5xl font-medium md:text-7xl">{product.name}</h1>
        </div>
        <p className="max-w-4xl pt-4 text-xl md:pt-8 md:text-3xl">
          {product.description1}
        </p>
        <p className="max-w-4xl pt-2 text-lg text-muted-foreground md:pt-4 md:text-xl">
          {product.description2}
        </p>

        {product.homePageUrl && (
          <Button size="lg" asChild className="mt-10">
            <Link href={product.homePageUrl}>Product Home Page</Link>
          </Button>
        )}
      </header>
      <BaseSection>
        {product.youtube ? (
          <iframe
            src={product.youtube}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-video w-full rounded-xl"
          ></iframe>
        ) : (
          <Image
            src={urlForImage(product.image)?.url() as string}
            alt={product.name || ""}
            width={900}
            height={900}
            className="mx-auto"
          />
        )}
      </BaseSection>
      <BaseSection
        title="Product Features"
        headerAlign="center"
        className="bg-linear-to-b from-neutral-950 to-neutral-900 text-white"
      >
        <ul className="grid gap-2 pt-4 sm:grid-cols-2 md:gap-4">
          {product.features?.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-1 rounded border border-neutral-700 p-4 text-base md:gap-4 md:p-6 md:text-xl"
            >
              <CircleCheck className="size-[1.3em] text-primary" /> {feature}
            </li>
          ))}
        </ul>
      </BaseSection>
      {/* <StatisticsSection /> */}
      <BaseSection title="Details">
        <div className="gap-8 md:pt-4">
          <article className="prose prose-base max-w-full">
            <PortableText
              value={product.details || []}
              components={portableTextComponents}
            />
          </article>
        </div>
      </BaseSection>
    </main>
  )
}
