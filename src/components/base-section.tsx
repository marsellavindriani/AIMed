import React from "react"

import { cn, tw } from "@/lib/utils"

const headerAlignClassNames = {
  start: tw`text-left`,
  center: tw`text-center`,
  end: tw`text-right`,
}

interface Props {
  id?: string
  title?: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
  headerAlign?: keyof typeof headerAlignClassNames
}

export default function BaseSection({
  id,
  title,
  subtitle,
  children,
  className,
  headerAlign = "start",
}: Props) {
  return (
    <section id={id} className={cn("py-14 lg:py-24", className)}>
      <div className="container">
        <hgroup
          className={cn("font-heading", headerAlignClassNames[headerAlign])}
        >
          {title && (
            <h2 className="text-primary text-lg font-extrabold sm:text-2xl lg:text-3xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-3xl font-light sm:text-4xl lg:text-5xl">
              {subtitle}
            </p>
          )}
        </hgroup>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  )
}
