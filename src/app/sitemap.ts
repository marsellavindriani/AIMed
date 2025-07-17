import type { MetadataRoute } from "next"
import { client } from "@/sanity/client"
import { allDocumentSlugs } from "@/sanity/queries"

import { AllDocumentSlugsResult } from "@/types/sanity.types"
import { baseUrl } from "@/lib/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const documentSlugs = await client.fetch<AllDocumentSlugsResult>(
    allDocumentSlugs,
    {}
  )

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/infrastructure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/journals`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/proceedings`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ipr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/activities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/datasets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Activities
    ...(documentSlugs.activitySlugs.map((activitySlug) => ({
      url: `${baseUrl}/activities/${activitySlug.slug?.current}`,
      lastModified: new Date(activitySlug._updatedAt),
      changeFrequency: "daily",
      priority: 0.6,
    })) satisfies MetadataRoute.Sitemap),

    // Datasets
    ...(documentSlugs.datasetSlugs.map((datasetSlug) => ({
      url: `${baseUrl}/datasets/${datasetSlug.slug?.current}`,
      lastModified: new Date(datasetSlug._updatedAt),
      changeFrequency: "daily",
      priority: 0.6,
    })) satisfies MetadataRoute.Sitemap),

    // Products
    ...(documentSlugs.productSlugs.map((productSlug) => ({
      url: `${baseUrl}/products/${productSlug.slug?.current}`,
      lastModified: new Date(productSlug._updatedAt),
      changeFrequency: "daily",
      priority: 0.6,
    })) satisfies MetadataRoute.Sitemap),
  ]
}
