import Image from "next/image"
import Link from "next/link"

export default function ISysLogo({ compact = false }: { compact?: boolean }) {
  if (!compact) {
    return (
      <Link href="/" className="group flex items-center gap-0.5 sm:gap-1">
                <Image
                  src="/LogoAIMed-Fix-01.svg"
                  alt="AIMed"
                  width={54}
                  height={54}
                  className="h-6 w-24 object-contain sm:h-12"
                />
      </Link>
    )
  }

  return (
    <Link href="/" className="group flex items-center gap-0.5">

                <Image
                  src="/LogoAIMed-Fix-01.svg"
                  alt="AIMed"
                  width={54}
                  height={54}
                  className="h-6 w-24 object-contain sm:h-12"
                />
    </Link>
  )
}
