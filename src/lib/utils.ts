import { client } from "@/sanity/client"
import { featuredDatasetsQuery, featuredProductsQuery } from "@/sanity/queries"
import { NavigationItem } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import {
  FeaturedDatasetsQueryResult,
  FeaturedProductsQueryResult,
} from "@/types/sanity.types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tw = (strings: TemplateStringsArray, ...values: any[]) =>
  String.raw({ raw: strings }, ...values)

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return date.toLocaleDateString(undefined, options)
}

export function truncateString(str: string, num: number = 60): string {
  return str.length <= num ? str : str.slice(0, num) + "..."
}

export const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export async function getNavigationData(): Promise<NavigationItem[]> {
  const options = { next: { revalidate: 30 } }

  const featuredProductsQueryResult =
    await client.fetch<FeaturedProductsQueryResult>(
      featuredProductsQuery,
      {},
      options
    )
  const featuredDatasetsQueryResult =
    await client.fetch<FeaturedDatasetsQueryResult>(
      featuredDatasetsQuery,
      {},
      options
    )

  const featuredProducts =
    featuredProductsQueryResult?.productsSection?.featuredProducts || []
  const featuredDatasets =
    featuredDatasetsQueryResult?.datasetsSection?.featuredDatasets || []

  const navigation: NavigationItem[] = [
    {
      label: "About Us",
      children: [
        {
          label: "Research Team",
          href: "/team",
        },
        {
          label: "Infrastructure",
          href: "/infrastructure",
        },
      ],
      className: tw`lg:w-[500px]`,
    },
    {
      label: "Products",
      children: featuredProducts?.map((product) => {
        return {
          label: product.name,
          href: `/products/${product.slug?.current}`,
          description: product.shortDescription,
        } as NavigationItem
      }),
      footer: {
        label: "View all",
        href: "/products",
      },
      className: tw`lg:[&>ul]:grid-cols-2`,
    },
    {
      label: "Datasets",
      children: featuredDatasets?.map((dataset) => {
        return {
          label: dataset.name,
          href: `/datasets/${dataset.slug?.current}`,
          description: dataset.shortDescription,
        } as NavigationItem
      }),
      footer: {
        label: "View all",
        href: "/datasets",
      },
      className: tw`lg:[&>ul]:grid-cols-2`,
    },
    {
      label: "Publication",
      href: "publication",
      children: [
        {
          label: "International Journals",
          href: "/journals",
        },
        {
          label: "International Conference (Proceedings)",
          href: "/proceedings",
        },
        {
          label: "Intelectual Property Rights (IPR)",
          href: "/ipr",
        },
        {
          label: "Books",
          href: "/books",
        },
      ],
      className: tw`lg:w-[600px]`,
    },
    { label: "Activities", href: "/activities" },
  ]

  return navigation
}
