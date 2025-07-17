import { Metadata } from "next"
import { client } from "@/sanity/client"
import { allBooksQuery } from "@/sanity/queries"

import { Book } from "@/types/sanity.types"
import BasePage from "@/components/base-page"
import BaseSection from "@/components/base-section"
import PublicationList from "@/components/publication-list"
import PublicationListItem from "@/components/publication-list-item"

const options = { next: { revalidate: 30 } }

export const metadata: Metadata = {
  title: "Books",
  description:
    "Delve into our authored and co-authored books, covering diverse topics in intelligent systems, machine learning, and computational sciences, aimed at advancing academic and industry knowledge.",
}

export default async function Page() {
  const books = await client.fetch<Book[]>(allBooksQuery, {}, options)

  return (
    <BasePage title="Books" subtitle="Publication">
      <BaseSection>
        <h2 className="text-xl font-medium text-primary">List of Books</h2>
        <PublicationList>
          {books.map((book) => (
            <PublicationListItem
              key={book._id}
              title={book.title || ""}
              href={"#"}
              description={`Publisher: ${book.publisher} | ISBN: ${book.isbnNumber} | Year: ${new Date(book.year || 1998).getFullYear()}`}
            />
          ))}
        </PublicationList>
      </BaseSection>
    </BasePage>
  )
}
