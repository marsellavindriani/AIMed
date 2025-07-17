import { getNavigationData } from "@/lib/utils"
import Header from "@/components/layout/header"

import "@/styles/globals.css"

import HomeHeader from "./header"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const navigationData = await getNavigationData()

  return (
    <>
      <div className="bg-neutral-900/90 text-white">
        <Header navigationData={navigationData} />
        <HomeHeader navigationData={navigationData} />
      </div>

      <div className="pt-[76px]">{children}</div>
    </>
  )
}
