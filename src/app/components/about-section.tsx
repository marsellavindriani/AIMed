import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import { aboutSectionQuery } from "@/sanity/queries"
import { urlForImage } from "@/sanity/utils"
import { ArrowRight } from "lucide-react"

import { AboutSectionQueryResult } from "@/types/sanity.types"
import { Button } from "@/components/ui/button"
import BaseSection from "@/components/base-section"

const options = { next: { revalidate: 30 } }

export default async function AboutSection() {
  const aboutSectionQueryResult = await client.fetch<AboutSectionQueryResult>(
    aboutSectionQuery,
    {},
    options
  )

  const aboutSection = aboutSectionQueryResult?.aboutSection

  return (
    <BaseSection
      id="about"
      title={aboutSection?.title}
      subtitle={aboutSection?.subtitle}
      headerAlign="center"
    >
      <article className="mt-10 flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-20">
        <Image
          src={
            urlForImage(aboutSection?.image)
              ?.width(800)
              .height(800)
              .url() as string
          }
          alt="About us"
          width={800}
          height={800}
          className="aspect-video h-[200px] rounded-lg object-cover sm:size-[320px]"
        />
        <div className="flex flex-col gap-4">
          <div className="prose md:prose-xl font-medium">
            <p>
              The research primarily involves developing software, applications,
              and systems to support medical interpretation, with a focus on
              medical signal and image processing, medical pattern recognition,
              and medical record data mining techniques.
            </p>
          </div>
          <div className="prose prose-sm">
            The goal of AIMed is to create intelligent systems across various
            fields, including computer systems, biomedicine, natural language
            processing, and others.
          </div>
          <ul className="flex gap-8">
            <li>
              <Button variant="link" size="xl" className="p-0" asChild>
                <Link href="/team">
                  Research team <ArrowRight />
                </Link>
              </Button>
            </li>

            <li>
              <Button variant="link" size="xl" className="p-0" asChild>
                <Link href="/infrastructure">
                  Infrastructure <ArrowRight />
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </article>

      <div className="mt-20 flex flex-col-reverse gap-4 md:items-center lg:flex-row lg:gap-20">
        <div>
          <div className="prose md:prose-xl font-medium">
            <p>
              The AIMed supports SDG 3 (Good Health
              and Well-being) by developing AI-driven solutions for better
              disease detection and healthcare delivery.
            </p>
          </div>
          <article className="prose prose-sm text-muted-foreground">
            <p>
              It also contributes to SDG 9 (Industry, Innovation and Infrastructure) by fostering 
              technological innovation through research in intelligent systems, promoting sustainable healthcare infrastructure, 
              and collaborating with industry to accelerate the adoption of cutting-edge technologies.
            </p>
          </article>
        </div>
        <div className="flex max-w-dvw flex-none gap-2 md:gap-4">
          <Image
            src="/assets/images/E_WEB_03.png"
            alt=""
            width={200}
            height={200}
            className="size-24 rounded-lg md:size-auto"
          />
          <Image
            src="/assets/images/E_WEB_09.png"
            alt=""
            width={200}
            height={200}
            className="size-24 rounded-lg md:size-auto"
          />
        </div>
      </div>
    </BaseSection>
  )
}
