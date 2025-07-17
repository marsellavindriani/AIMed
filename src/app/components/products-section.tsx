import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import { productsSectionQuery } from "@/sanity/queries"
import { urlForImage } from "@/sanity/utils"
import { CircleCheck } from "lucide-react"
import { PortableText } from "next-sanity"

import { ProductsSectionQueryResult } from "@/types/sanity.types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BaseSection from "@/components/base-section"

const options = { next: { revalidate: 30 } }

export default async function ProductsSection() {
  const productsSectionQueryResult =
    await client.fetch<ProductsSectionQueryResult>(
      productsSectionQuery,
      {},
      options
    )

  const productsSection = productsSectionQueryResult?.productsSection

  return (
    <BaseSection
      id="products"
      title={productsSection?.title}
      subtitle={productsSection?.subtitle}
      headerAlign="center"
      className="bg-linear-to-b from-neutral-900/5 to-transparent to-20%"
    >
      {productsSection?.description && (
        <div className="flex justify-center">
          <article className="prose prose-sm prose-invert max-w-2xl text-center md:prose-base">
            <PortableText value={productsSection?.description} />
          </article>
        </div>
      )}
      {productsSection?.featuredProducts && (
        <Tabs
          defaultValue={productsSection?.featuredProducts[0]._id}
          className="mt-4 flex flex-col items-center lg:mt-10"
        >
          <TabsList>
            {productsSection.featuredProducts.map((product) => (
              <TabsTrigger key={product._id} value={product._id}>
                <h3>{product.name}</h3>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-10">
            {productsSection.featuredProducts.map((product) => (
              <TabsContent
                key={product._id}
                value={product._id}
                className="grid items-start gap-14 lg:grid-cols-2"
              >
                <Image
                  src={urlForImage(product.image)?.url() as string}
                  alt={product.name || ""}
                  height={720}
                  width={1280}
                />

                <div>
                  <article className="prose prose-xl tracking-tight">
                    <p>{product.description}</p>
                  </article>

                  <ul className="grid gap-4 pt-6 sm:grid-cols-2">
                    {product.features?.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm md:text-base"
                      >
                        <CircleCheck className="size-[1.3em] flex-none text-primary" />{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-8">
                    <Button
                      variant="outline"
                      size="xl"
                      asChild
                      className="w-full sm:w-fit"
                    >
                      <Link href={`/products/${product.slug?.current}`}>
                        More details
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      )}
    </BaseSection>
  )
}
