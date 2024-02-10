"use client"

import { ConnectKitButton } from "connectkit"
import toast from "react-hot-toast"
import { formatUnits } from "viem"
import { useAccount, useBalance } from "wagmi"

import useEthPrice from "@/hooks/useEthPrice"
import useUserContractBalance from "@/hooks/useUserContractBalance"
import useWithdraw from "@/hooks/useWithdraw"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AddToContract from "@/components/addToContract"

export default function MainPage() {
  const { address } = useAccount()
  const userContractBalance = useUserContractBalance()
  const { withdraw } = useWithdraw()

  const { data: balance } = useBalance({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    query: {
      //   1 minute
      refetchInterval: 60000,
    },
  })

  const ethPrice = useEthPrice()

  return (
    <>
      <div className={"ml-auto"}>
        <ConnectKitButton theme={"retro"} />
      </div>

      <Card
        title={"Enter The Rabbit Hole"}
        centered
        className={"mt-24 flex flex-col"}
      >
        {balance && (
          <p className={"font-retro"}>
            Balance:{" "}
            {
              // max 5 decimals
              Math.round(parseFloat(formatUnits(balance.value, 18)) * 100000) /
                100000
            }{" "}
            $ETH{" "}
            {ethPrice &&
              `(${(
                (Math.round(
                  parseFloat(formatUnits(balance.value, 18)) * 100000
                ) /
                  100000) *
                ethPrice
              ).toFixed(2)}}
            $USD)`}
          </p>
        )}
        {userContractBalance !== undefined && (
          <p className={"font-retro"}>
            Rewards pending: {formatUnits(userContractBalance, 18)} $ETH
          </p>
        )}
        <Button onClick={() => withdraw()}>Withdraw</Button>
        <AddToContract />
      </Card>
    </>
  )
}
