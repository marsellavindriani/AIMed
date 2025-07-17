"use client"

import { usePathname } from "next/navigation"
import { Share } from "lucide-react"
import { toast } from "sonner"

import { baseUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Menu() {
  const pathname = usePathname()

  function copyUrlToClipboard() {
    navigator.clipboard.writeText(`${baseUrl}${pathname}`)
    toast.success("Link copied to clipboard")
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Share /> Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={-4}>
          <DropdownMenuItem onClick={copyUrlToClipboard}>
            Copy link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
