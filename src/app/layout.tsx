import type { Metadata } from "next"

import "@/styles/globals.css"

import { client } from "@/sanity/client"
import * as demo from "@/sanity/demo"
import { settingsQuery } from "@/sanity/queries"
import { resolveOpenGraphImage } from "@/sanity/utils"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/react"

import { Settings } from "@/types/sanity.types"
import { openSans, poppins } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/layout/footer"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import Providers from "./providers"

const options = { next: { revalidate: 30 } }

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<Settings>(settingsQuery, {}, options)

  const title = settings?.title || demo.title
  const description =
    "Welcome to the AIMed Center of Excellence aims to develop AI-based technological solutions for the early screening (detection) of non-communicable diseases that are accurate, efficient, ethical, and usable by non-specialist healthcare workers in primary care settings, through a mobile platform integrated with telemedicine."

  const ogImage = resolveOpenGraphImage(settings?.ogImage)

  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: "PUI-PT AIMed - We learn, We Collaborate, We Discover",
    },
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          poppins.variable,
          openSans.variable,
          "font-text flex min-h-dvh flex-col antialiased"
        )}
      >
        <Providers>
          <div className="grow">{children}</div>
          <Footer />
        </Providers>

        <Toaster position="bottom-center" />
        <Analytics />
        <GoogleAnalytics gaId="G-YTFEEL0LRW" />
        <TailwindIndicator />
      </body>
    </html>
  )
}
