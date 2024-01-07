import getContractInfo from "@/app/api/info/getContractInfo"

async function getData() {
  return await getContractInfo()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Rabbit Miner !{data.contract_value}
    </main>
  )
}
