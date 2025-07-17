import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import { allProductsQuery } from "@/sanity/queries"
import { urlForImage } from "@/sanity/utils"
import { CircleCheck } from "lucide-react"

import { Product } from "@/types/sanity.types"
import { Button } from "@/components/ui/button"
import BasePage from "@/components/base-page"
import BaseSection from "@/components/base-section"

const options = { next: { revalidate: 30 } }

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our AI powered products for medical diagnostic confidence.",
}

export default async function Page() {
  const products = await client.fetch<Product[]>(allProductsQuery, {}, options)

  return (
    <BasePage title="Products">
      <BaseSection>
        <div className="divide-y">
          {products.map((product) => (
            <div key={product._id} className="py-10">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                {product.name}
              </h2>
              <div className="grid items-start gap-14 pt-6 lg:grid-cols-2">
                <Image
                  src={urlForImage(product.image)?.url() as string}
                  alt={product.name || ""}
                  height={720}
                  width={1280}
                />

                <div>
                  <article className="prose prose-xl tracking-tight md:prose-2xl">
                    <p>{product.description}</p>
                  </article>

                  <ul className="grid gap-4 pt-6 sm:grid-cols-2">
                    {product.features?.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-1 text-sm md:text-base"
                      >
                        <CircleCheck className="size-[1.3em] text-primary" />{" "}
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
              </div>
            </div>
          ))}
        </div>
      </BaseSection>
    </BasePage>
  )
}
