"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavigationItem } from "@/types"
import { ArrowRight, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import MenuButton from "../menu-button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

interface Props {
  navigation: NavigationItem[]
}

export default function MobileNavigation({ navigation }: Props) {
  const [mobileNavigation, setMobileNavigation] = useState({ opened: false })

  const pathname = usePathname()

  function handleToggleMobileNavigation() {
    setMobileNavigation((prev) => {
      return {
        ...prev,
        opened: !mobileNavigation.opened,
      }
    })
  }

  function handleCloseMobileNavigation() {
    setMobileNavigation((prev) => {
      return {
        ...prev,
        opened: false,
      }
    })
  }

  useEffect(() => {
    handleCloseMobileNavigation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <MenuButton
        onClick={handleToggleMobileNavigation}
        opened={mobileNavigation.opened}
        className="lg:hidden"
      />

      {mobileNavigation.opened && (
        <div
          className={cn(
            "no-doc-scroll fixed inset-x-0 top-[58px] z-50 flex h-[calc(100dvh-58px)] w-full flex-col bg-neutral-900/95 backdrop-blur-2xl lg:hidden"
          )}
        >
          {/* <header className="border-y-2 border-white/10">
            <div className="container flex h-14 items-center justify-between sm:h-fit">
              <div className="flex items-center gap-6">
                <ISysLogo />
              </div>

              <MenuButton
                onClick={handleToggleMobileNavigation}
                opened={mobileNavigation.opened}
                className="lg:hidden"
              />
            </div>
          </header> */}

          <div className="no-scrollbar container flex flex-col gap-y-8 overflow-y-auto pt-6 pb-10 text-xl text-white">
            {navigation.map((navigationItem) => (
              <div key={navigationItem.label} className="w-full">
                {"children" in navigationItem ? (
                  <Collapsible key={navigationItem.label}>
                    <CollapsibleTrigger asChild>
                      <button className="flex w-full flex-row items-center justify-between text-gray-100 [&[data-state=open]>svg]:-rotate-180">
                        <span>{navigationItem.label}</span>
                        <ChevronDown
                          size="1em"
                          className="transition-transform duration-200"
                        />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-primary/40 mt-6 ml-1 flex flex-col gap-y-6 border-l-2 pl-4">
                        {navigationItem.children.map(
                          (navigationChild) =>
                            "href" in navigationChild && (
                              <div key={navigationChild.label}>
                                <Link
                                  onClick={handleCloseMobileNavigation}
                                  href={navigationChild.href}
                                  className="block focus:underline"
                                >
                                  <p>{navigationChild.label}</p>
                                  <p className="text-muted-foreground text-xs">
                                    {navigationChild.description}
                                  </p>
                                </Link>
                              </div>
                            )
                        )}

                        {navigationItem.footer && (
                          <div className="flex justify-start">
                            <Link
                              href={navigationItem.footer.href}
                              className="group flex items-center gap-1 text-neutral-200"
                            >
                              {navigationItem.footer.label}
                              <ArrowRight className="text-primary size-[1em] transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={navigationItem.label}
                    onClick={handleCloseMobileNavigation}
                    href={navigationItem.href}
                    className="block focus:underline"
                  >
                    {navigationItem.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
