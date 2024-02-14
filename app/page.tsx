import { Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

import NoEtherHelp from "@/components/no-ether-help"
// import MainPage from "@/components/main-page"
import getContractInfo from "@/app/api/info/getContractInfo"

const MainPage = dynamic(() => import("@/components/main-page"), { ssr: false })
async function getData() {
  return await getContractInfo()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className=" flex h-full flex-col items-center p-2">
      {/*Rabbit Miner !{data.contract_value}*/}
      <Suspense fallback={null}>
        <MainPage />
      </Suspense>
      <Link
        target={"_blank"}
        className="nes-icon github is-medium cursor-pointer-hand fixed bottom-2 right-2"
        href={"https://github.com/AlexandreCoyras/RabbitMiner"}
      />
      <NoEtherHelp
        className={"absolute -left-2 bottom-10 sm:bottom-2 sm:left-2"}
      />
    </main>
  )
}
