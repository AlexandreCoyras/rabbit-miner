import { Suspense } from "react"
import dynamic from "next/dynamic"

import getContractInfo from "@/app/api/info/getContractInfo"

const MainPage = dynamic(() => import("@/components/main-page"), { ssr: false })
async function getData() {
  return await getContractInfo()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      {/*Rabbit Miner !{data.contract_value}*/}
      <Suspense fallback={null}>
        <MainPage />
      </Suspense>
    </main>
  )
}
