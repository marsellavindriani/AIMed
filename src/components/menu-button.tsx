"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

interface Props {
  onClick?: (isOpened: boolean) => void
  opened?: boolean
  className?: string
}

export default function MenuButton({ onClick, opened, className }: Props) {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  function handleButtonClick() {
    setIsOpened(!isOpened)
    if (onClick) onClick(!isOpened)
  }

  return (
    <div
      onClick={handleButtonClick}
      className={cn(
        "flex h-8 w-8 cursor-pointer items-center justify-center",
        className
      )}
    >
      <div className="space-y-2">
        <span
          className={cn(
            opened && "translate-y-1.5 rotate-45",
            "block h-[3px] w-8 origin-center rounded bg-white transition-transform ease-in-out"
          )}
        ></span>
        <span
          className={cn(
            opened ? "w-8 -translate-y-1.5 -rotate-45" : "w-6",
            "block h-[3px] origin-center rounded bg-white transition-all ease-in-out"
          )}
        ></span>
      </div>
    </div>
  )
}
