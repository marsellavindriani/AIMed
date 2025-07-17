import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import { activitiesSectionQuery, latestActivitiesQuery } from "@/sanity/queries"
import { urlForImage } from "@/sanity/utils"
import { ArrowRight, CalendarIcon } from "lucide-react"
import { PortableText } from "next-sanity"

import {
  ActivitiesSectionQueryResult,
  LatestActivitiesQueryResult,
} from "@/types/sanity.types"
import { formatDate, truncateString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import BaseSection from "@/components/base-section"
import HoverableCard from "@/components/hoverable-card"

const options = { next: { revalidate: 30 } }

export default async function ActivitySection() {
  const activitiesSectionQueryResult =
    await client.fetch<ActivitiesSectionQueryResult>(
      activitiesSectionQuery,
      {},
      options
    )

  const latestActivities = await client.fetch<LatestActivitiesQueryResult>(
    latestActivitiesQuery,
    { limit: 4 },
    options
  )

  const activitiesSection = activitiesSectionQueryResult?.activitiesSection

  return (
    <BaseSection
      title={activitiesSection?.title}
      subtitle={activitiesSection?.subtitle}
      headerAlign="center"
      className="bg-linear-to-b from-neutral-950 to-neutral-900 text-white"
    >
      {activitiesSection?.description && (
        <div className="flex justify-center">
          <article className="prose prose-sm prose-invert md:prose-base max-w-2xl text-center">
            <PortableText value={activitiesSection?.description} />
          </article>
        </div>
      )}
      <div className="grid gap-2 divide-y-2 divide-neutral-400/20 md:grid-cols-5 md:divide-y-0">
        <Link
          href={`/activities/${latestActivities[0].slug?.current}`}
          className="md:col-span-3"
        >
          <HoverableCard className="border-0">
            <figure>
              <Image
                src={urlForImage(latestActivities[0].image)?.url() as string}
                alt={latestActivities[0].title || ""}
                width={800}
                height={800}
                className="aspect-video w-full rounded object-cover"
              />
              <figcaption className="mt-4">
                <div className="text-primary flex items-center gap-1 text-sm">
                  <CalendarIcon className="size-[1.2em]" />
                  <time dateTime={latestActivities[0].date || ""} className="">
                    {formatDate(new Date(latestActivities[0].date || 0))}
                  </time>
                </div>
                <h3 className="text-sm font-medium md:text-base/relaxed">
                  {latestActivities[0].title || ""}
                </h3>
                <p></p>
              </figcaption>
            </figure>
          </HoverableCard>
        </Link>

        <div className="flex flex-col items-end divide-y-2 divide-neutral-400/20 md:col-span-2">
          {latestActivities &&
            latestActivities.slice(1).map((activity) => (
              <Link
                key={activity._id}
                href={`/activities/${activity.slug?.current}`}
              >
                <HoverableCard className="border-0">
                  <figure className="flex items-center gap-2">
                    <Image
                      src={urlForImage(activity.image)?.url() as string}
                      alt={activity.title || ""}
                      width={100}
                      height={100}
                      className="aspect-square size-16 rounded object-cover md:size-24"
                    />
                    <figcaption>
                      <div className="text-primary flex items-center gap-1 text-sm">
                        <CalendarIcon className="size-[1.2em]" />
                        <time dateTime={activity.date || ""} className="">
                          {formatDate(new Date(activity.date || 0))}
                        </time>
                      </div>
                      <h3 className="text-sm font-medium md:text-base/relaxed">
                        {truncateString(activity.title || "")}
                      </h3>
                    </figcaption>
                  </figure>
                </HoverableCard>
              </Link>
            ))}

          <Button variant="link" size="xl" className="p-0" asChild>
            <Link href="/activities">
              View more activities <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      {/* <Carousel className="pt-6 lg:pt-14">
        <CarouselContent>
          {latestActivities &&
            latestActivities.map((activity) => (
              <CarouselItem
                key={activity._id}
                className="sm:basis-2/4 lg:basis-1/4"
              >
                <Link href={`/activities/${activity.slug?.current}`}>
                  <HoverableCard>
                    <figure>
                      <Image
                        src={urlForImage(activity.image)?.url() as string}
                        alt={activity.title || ""}
                        width={800}
                        height={800}
                        className="aspect-square w-full rounded object-cover"
                      />
                      <figcaption className="mt-4">
                        <time
                          dateTime={activity.date || ""}
                          className="text-primary text-sm"
                        >
                          {formatDate(new Date(activity.date || 0))}
                        </time>
                        <h3 className="font-medium">
                          {truncateString(activity.title || "")}
                        </h3>
                      </figcaption>
                    </figure>
                  </HoverableCard>
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="lg:hidden">
          <CarouselControl />
        </div>
      </Carousel> */}
      {/* <div className="flex justify-center pt-6 lg:pt-14">
        <Button
          variant="secondary"
          size="xl"
          asChild
          className="w-full sm:w-fit"
        >
          <Link href="/activities">View more activities</Link>
        </Button>
      </div> */}
    </BaseSection>
  )
}
