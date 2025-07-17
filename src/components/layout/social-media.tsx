import Link from "next/link"
import {
  Facebook,
  Instagram,
  Linkedin,
  LucideIcon,
  Youtube,
} from "lucide-react"

import { Settings } from "@/types/sanity.types"

interface Props {
  socialMedia: Pick<Settings, "socialMedia">["socialMedia"]
}

export default function SocialMedia({ socialMedia }: Props) {
  return (
    <ul className="flex gap-2">
      {socialMedia?.instagram && (
        <SocialMediaLink icon={Instagram} href={socialMedia.instagram} />
      )}

      {socialMedia?.facebook && (
        <SocialMediaLink icon={Facebook} href={socialMedia.facebook} />
      )}

      {socialMedia?.linkedIn && (
        <SocialMediaLink icon={Linkedin} href={socialMedia.linkedIn} />
      )}

      {socialMedia?.youTube && (
        <SocialMediaLink icon={Youtube} href={socialMedia.youTube} />
      )}
    </ul>
  )
}

function SocialMediaLink({
  href,
  icon: Icon,
}: {
  href: string
  icon: LucideIcon
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-full p-1.5 text-sm text-primary hover:bg-primary/30"
      >
        <Icon />
      </Link>
    </li>
  )
}
