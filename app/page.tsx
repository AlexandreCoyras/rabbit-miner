import { Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ConnectKitButton } from "connectkit"

import { Card } from "@/components/ui/card"
import NoEtherHelp from "@/components/no-ether-help"
import Web3Button from "@/components/Web3Button"
// import MainPage from "@/components/main-page"
import getContractInfo from "@/app/api/info/getContractInfo"

const MainPage = dynamic(() => import("@/components/main-page"), { ssr: false })
async function getData() {
  return await getContractInfo()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="flex h-full flex-col items-center p-2">
      {/*Rabbit Miner !{data.contract_value}*/}
      <div className={"ml-auto h-12"}>
        <Web3Button />
      </div>

      <Card
        title={"Enter The Rabbit Hole"}
        centered
        className={"mt-24 flex min-h-[18rem] min-w-[18rem] flex-col"}
      >
        <Suspense fallback={null}>
          <MainPage />
        </Suspense>
      </Card>
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
