export type NavigationItem = {
  label: string
  description?: string
} & (
  | { href: string }
  | {
      children: NavigationItem[]
      footer?: {
        label: string
        href: string
      }
      className?: string
    }
)
