import { urlForImage } from "@/sanity/utils"
import { toPlainText } from "next-sanity"
import { NewsArticle, Organization, WebSite, WithContext } from "schema-dts"

import { Activity } from "@/types/sanity.types"

import { truncateString } from "./utils"

const BASE_URL = "https://aimed.com"

export const webSiteJsonLd: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PUI-PT AIMed",
  url: BASE_URL,
}

export const organizationJsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: BASE_URL,
  logo: `${BASE_URL}/logo-aimed-01-01.png`,
  name: "Intelligent Systems Research Group",
  description: "The AIMed Center of Excellence aims to develop AI-based technological solutions for the early screening (detection) of non-communicable diseases that are accurate, efficient, ethical, and usable by non-specialist healthcare workers in primary care settings, through a mobile platform integrated with telemedicine.",
  email: "isysrg@unsri.ac.id",
  telephone: "(+62) 81224147003",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Srijaya Negara, Bukit Besar, Kec. Ilir Barat I",
    addressLocality: "Palembang",
    addressCountry: "ID",
  },
}

export function getActivityJsonLd(
  activity: Activity
): WithContext<NewsArticle> {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: activity.title,
    name: activity.title,
    description: truncateString(toPlainText(activity.body || []), 240),
    dateCreated: activity._createdAt,
    dateModified: activity._updatedAt,
    datePublished: activity._createdAt,
    author: organizationJsonLd,
    publisher: organizationJsonLd,
    image: [
      urlForImage(activity.image)
        ?.width(675)
        .height(675)
        .fit("crop")
        .url() as string,
      urlForImage(activity.image)
        ?.width(900)
        .height(675)
        .fit("crop")
        .url() as string,
      urlForImage(activity.image)
        ?.width(1200)
        .height(675)
        .fit("crop")
        .url() as string,
    ],
    url: `${BASE_URL}/activities/${activity.slug?.current}`,
    mainEntityOfPage: `${BASE_URL}/activities/${activity.slug?.current}`,
    wordCount: toPlainText(activity.body || []).length,
  }
}
