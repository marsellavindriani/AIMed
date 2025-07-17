import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/sanity/client"
import { activityQuery, moreActivitiesQuery } from "@/sanity/queries"
import { resolveOpenGraphImage, urlForImage } from "@/sanity/utils"
import { CalendarIcon } from "lucide-react"
import { toPlainText } from "next-sanity"

import { Activity, MoreActivitiesQueryResult } from "@/types/sanity.types"
import { getActivityJsonLd } from "@/lib/json-ld"
import { formatDate, truncateString } from "@/lib/utils"
import PortableTextComponent from "@/app/components/portable-text-component"

import Menu from "./components/menu"

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
  const activity = await client.fetch<Activity>(
    activityQuery,
    await params,
    options
  )
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(activity.image)

  return {
    title: activity.title,
    description: toPlainText(activity.body || []).substring(0, 120),
    openGraph: {
      images: ogImage ? ogImage : previousImages,
    },
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const activity = await client.fetch<Activity>(activityQuery, params, options)

  const moreActivities = await client.fetch<MoreActivitiesQueryResult>(
    moreActivitiesQuery,
    { skip: activity._id, limit: 4 },
    options
  )

  if (!activity?._id) {
    return notFound()
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getActivityJsonLd(activity)),
        }}
      />
      <header className="sm:pt-10 md:pt-20">
        <div className="sm:px-4">
          <Image
            src={urlForImage(activity.image)?.url() as string}
            alt={activity.title || ""}
            width={1600}
            height={900}
            className="mx-auto aspect-video w-full max-w-6xl object-cover sm:aspect-20/9 sm:rounded"
          />
        </div>
        <div className="container flex flex-col border-b pb-4">
          <h1 className="font-heading mt-6 text-xl font-semibold md:mt-10 md:text-2xl lg:text-3xl xl:text-4xl">
            {activity.title}
          </h1>
          <div className="flex items-center gap-2 pt-2 md:pt-4">
            <div className="flex grow flex-col justify-between md:flex-row md:items-center">
              <div className="text-primary flex items-center gap-1 text-sm md:text-lg">
                <CalendarIcon className="size-[1.2em]" />
                <time dateTime={activity.date || ""} className="">
                  {formatDate(new Date(activity.date || 0))}
                </time>
              </div>
              <p className="text-muted-foreground text-xs italic md:text-sm">
                Posted {formatDate(new Date(activity._createdAt || 0))}
              </p>
            </div>
            <Menu />
          </div>
        </div>
      </header>
      <section className="container grid pt-6 md:gap-10 md:pt-10 lg:grid-cols-3">
        <div className="col-span-2">
          {activity.body && (
            <article className="prose md:prose-lg">
              <PortableTextComponent value={activity.body} />
            </article>
          )}
        </div>
        <aside>
          <p className="font-heading text-primary pt-8 text-xl font-medium md:text-2xl lg:pt-0">
            More Activities
          </p>

          <ul className="flex flex-col divide-y">
            {moreActivities.map((activity) => (
              <li key={activity._id} className="py-3 md:py-4">
                <Link href={`/activities/${activity.slug?.current}`}>
                  <p className="font-medium hover:underline">
                    {truncateString(activity.title || "", 120)}
                  </p>
                </Link>
                <div className="text-primary flex items-center gap-1 pt-1 text-sm">
                  <CalendarIcon className="size-[1.2em]" />
                  <time dateTime={activity.date || ""} className="">
                    {formatDate(new Date(activity.date || 0))}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  )
}
