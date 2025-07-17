import { defineQuery } from "next-sanity"

export const aboutSectionQuery = defineQuery(`
  *[_type == "home"][0]{aboutSection}
`)

export const activitiesSectionQuery = defineQuery(`
  *[_type == "home"][0]{activitiesSection}
`)

export const datasetsSectionQuery = defineQuery(`
  *[_type == "home"][0]{datasetsSection{...,featuredDatasets[]->}}
`)

export const productsSectionQuery = defineQuery(`
  *[_type == "home"][0]{productsSection{...,featuredProducts[]->}}
`)

export const partnersSectionQuery = defineQuery(`
  *[_type == "home"][0]{partnersSection}
`)

export const featuredDatasetsQuery = defineQuery(`
  *[_type == "home"][0]{datasetsSection{featuredDatasets[]->{
    name,
    slug,
    images,
    shortDescription,
    description
  }}}
`)

export const featuredProductsQuery = defineQuery(`
  *[_type == "home"][0]{productsSection{featuredProducts[]->{
    name,
    slug,
    image,
    shortDescription,
    description,
    features
  }}}
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]
`)

export const allProductsQuery = defineQuery(`
  *[_type == "product" && defined(slug.current)]{
    _id,
    name,
    slug,
    image,
    shortDescription,
    description,
    features
  }
`)

export const productQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    ...,
    details[]{
        ...,
        "url": asset->url
      }
  }
`)

export const allDatasetsQuery = defineQuery(`
  *[_type == "dataset" && defined(slug.current)]
`)

export const datasetQuery = defineQuery(`
  *[_type == "dataset" && slug.current == $slug][0]
`)

export const allActivitiesQuery = defineQuery(`
  *[_type == "activity" && defined(slug.current)] | order(date desc, _updatedAt desc)
`)

export const activityQuery = defineQuery(`
  *[_type == "activity" && slug.current == $slug][0] {
    ...,
    body[]{
        ...,
        "url": asset->url
      }
  }
`)

export const latestActivitiesQuery = defineQuery(`
  *[_type == "activity" && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    date,
    image
  }
`)

export const moreActivitiesQuery = defineQuery(`
  *[_type == "activity" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    date
  }
`)

export const allInternationalJournalsQuery = defineQuery(`
  *[_type == "internationalJournal"] | order(publicationDate desc, _updatedAt desc)
`)

export const allInternationalConferencesQuery = defineQuery(`
  *[_type == "internationalConference"] | order(publicationDate desc, _updatedAt desc)
`)

export const allIntellectualPropertyRightsQuery = defineQuery(`
  *[_type == "intellectualPropertyRights"] | order(issuanceDate desc, _updatedAt desc)
`)

export const allBooksQuery = defineQuery(`
  *[_type == "book"] | order(year desc, _updatedAt desc)
`)

export const allPublicationCountQuery = defineQuery(`
  {
    "internationalJournalCount": count(*[_type == "internationalJournal"]),
    "internationalConferenceCount": count(*[_type == "internationalConference"]),
    "intellectualPropertyRightsCount": count(*[_type == "intellectualPropertyRights"]),
    "bookCount": count(*[_type == "book"])
  }
`)

export const allResearchersQuery = defineQuery(`
  *[_type == "researcher"]
`)

export const allInfrastructureQuery = defineQuery(`
  *[_type == "infrastructure"]
`)

export const allDocumentSlugs = defineQuery(`
  {
    "activitySlugs": *[_type == "activity"]{slug, _updatedAt},
    "datasetSlugs": *[_type == "dataset"]{slug, _updatedAt},
    "productSlugs": *[_type == "product"]{slug, _updatedAt},
  }
`)

export const allPartnerQuery = defineQuery(`
  *[_type == "partner"]
`)
