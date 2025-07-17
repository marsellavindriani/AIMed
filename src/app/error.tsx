"use client"

import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <main className="container flex h-full flex-col justify-center py-40">
        <h1 className="text-primary font-medium sm:text-lg">Error</h1>
        <p className="text-3xl sm:text-5xl">Something went wrong＞﹏＜</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button variant="secondary" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </main>
    </>
  )
}
