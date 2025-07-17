import React from "react"
import Link from "next/link"
import { NavigationItem } from "@/types"
import { ArrowRight, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

interface Props {
  navigation: NavigationItem[]
  compact?: boolean
}

export default function DesktopNavigation({
  navigation,
  compact = false,
}: Props) {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList className="divide-x-2 divide-white/10 border-x-2 border-white/10">
        {navigation.map((navigationItem) =>
          "children" in navigationItem ? (
            <NavigationMenuItem key={navigationItem.label}>
              <NavigationMenuTrigger
                className={cn(compact ? "py-4 text-sm [&_svg]:size-4" : "")}
              >
                {navigationItem.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className={cn(
                  "w-[400px] p-4 lg:w-[680px]",
                  navigationItem.className
                )}
              >
                <ul className="grid">
                  {navigationItem.children.map(
                    (navigationChild) =>
                      "href" in navigationChild && (
                        <ListItem
                          key={navigationChild.label}
                          title={navigationChild.label}
                          description={navigationChild.description}
                          href={navigationChild.href}
                        />
                      )
                  )}
                </ul>
                {navigationItem.footer && (
                  <div className="flex justify-start px-4 py-2">
                    <Link
                      href={navigationItem.footer.href}
                      className="group flex items-center gap-1 text-sm font-medium tracking-wide text-neutral-200"
                    >
                      {navigationItem.footer.label}
                      <ArrowRight className="text-primary size-[1em] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={navigationItem.label}>
              <Link href={navigationItem.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    compact ? "py-4 text-sm" : ""
                  )}
                >
                  {navigationItem.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  description,
  href,
}: {
  title: string
  description?: string
  href: string
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "group focus:bg-accent focus:text-accent-foreground block rounded px-4 py-5 leading-none tracking-wide no-underline outline-hidden transition-colors select-none hover:bg-white/5 hover:text-white"
          )}
          href={href}
        >
          <div className="flex h-full items-center justify-between gap-2 text-lg leading-none">
            <div>
              <p>{title}</p>
              {description && (
                <p className="mt-1 text-sm text-neutral-400">{description}</p>
              )}
            </div>
            <div>
              <ChevronRight className="text-primary size-[0.8em] group-hover:text-white" />
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
