"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/utils"
import { YouTubeEmbed } from "@next/third-parties/google"
import { Download, File } from "lucide-react"
import { PortableText } from "next-sanity"

const portableTextComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => (
      <Image
        src={urlForImage(value)?.url() as string}
        alt=""
        width={400}
        height={400}
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
        className="flex overflow-hidden rounded bg-primary/10 no-underline"
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
      <div className="w-full overflow-hidden rounded">
        <YouTubeEmbed videoid={value.videoId} />
      </div>
    ),
  },
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
}

export default function PortableTextComponent({ value }: Props) {
  return <PortableText value={value} components={portableTextComponents} />
}
