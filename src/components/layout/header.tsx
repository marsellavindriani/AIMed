import Image from "next/image"
import Link from "next/link"
import { NavigationItem } from "@/types"

import ISysLogo from "../isys-logo"
import DesktopNavigation from "./desktop-navigation"
import MobileNavigation from "./mobile-navigation"

export default function Header({
  navigationData,
  compact = false,
}: {
  navigationData: NavigationItem[]
  compact?: boolean
}) {
  return (
    <header className="z-40 border-y-2 border-white/10">
      <div className="container flex h-14 items-center justify-between lg:h-fit">
        <div className="flex items-center">
          {!compact && (
            <>
              <Link href="https://unsri.ac.id">
                <Image
                  src="/unsri.svg"
                  alt="Unsri"
                  width={44}
                  height={44}
                  className="size-9 object-contain sm:size-12"
                />
              </Link>

                <Image
                  src="/Screenshot_2024-11-28_160437-removebg-preview.svg"
                  alt="Rumah Kita"
                  width={44}
                  height={44}
                  className="ml-1 h-6 w-24 object-contain sm:h-12"
                />

                <Image
                  src="/Primary_Horizontal Logo.svg"
                  alt="Diktisaintek Berdampak"
                  width={44}
                  height={44}
                  className="ml-1 h-6 w-24 object-contain sm:h-12"
                />

              <div className="mx-3 h-14 w-[2.5px] flex-none bg-neutral-500/30 sm:mx-4"></div>
            </>
          )}
          <ISysLogo compact={compact} />
        </div>

        <DesktopNavigation navigation={navigationData} compact={compact} />
        <MobileNavigation navigation={navigationData} />
      </div>
    </header>
  )
}
