import Link from "next/link"

interface Props {
  title: string
  description?: string
  href: string
}

export default function PublicationListItem({
  title,
  description,
  href,
}: Props) {
  return (
    <li className="py-4">
      <Link href={href} className="hover:underline" target="_blank">
        <h2 className="max-w-prose text-lg font-semibold md:text-xl">
          {title}
        </h2>
      </Link>
      <div className="flex flex-row gap-2 text-sm text-muted-foreground md:text-base">
        {description}
      </div>
    </li>
  )
}
