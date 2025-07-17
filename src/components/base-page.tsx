interface Props {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export default function BasePage({ title, subtitle, children }: Props) {
  return (
    <main className="min-h-[calc(100dvh-10rem)]">
      <header className="font-heading border-primary/30 mb-1 border-b-2 pt-8 md:pt-14 md:pb-2">
        <div className="container">
          {subtitle && (
            <p className="text-muted-foreground uppercase">{subtitle}</p>
          )}
          <div className="max-w-prose">
            <h1 className="text-3xl font-medium text-neutral-700 md:text-4xl">
              {title}
            </h1>
          </div>
        </div>
      </header>

      {children}
    </main>
  )
}
