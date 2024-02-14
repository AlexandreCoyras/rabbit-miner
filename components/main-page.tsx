"use client"

import { ConnectKitButton } from "connectkit"
import toast from "react-hot-toast"
import { formatUnits } from "viem"
import { useAccount, useBalance } from "wagmi"

import { weiToEth } from "@/lib/utils"
import useEthPrice from "@/hooks/useEthPrice"
import useUserContractBalance from "@/hooks/useUserContractBalance"
import useWithdraw from "@/hooks/useWithdraw"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AddToContract from "@/components/addToContract"

import { Skeleton } from "./ui/skeleton"

export default function MainPage() {
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

  const { ethPrice } = useEthPrice()

  return (
    <>
      {balance && (
        <p className={"font-retro"}>
          Balance:{" "}
          {
            // max 5 decimals
            weiToEth(balance.value, 5)
          }{" "}
          $ETH
          {ethPrice &&
            ` (${(weiToEth(balance.value) * ethPrice).toFixed(2)}
            $USD)`}
        </p>
      )}
      <AddToContract />
      <p className={"mt-10 font-retro"}>
        Rewards:
        {userContractBalance !== undefined && weiToEth(userContractBalance, 6)}
        {/*    : (*/}
        {/*  <Skeleton className={"h-full w-4"} />*/}
        {/*)}*/} $ETH
        {userContractBalance !== undefined &&
          ethPrice &&
          ` (${(weiToEth(userContractBalance, 6) * ethPrice).toFixed(2)}
            $USD)`}
      </p>
      <Button onClick={() => withdraw()} className={"mx-auto mt-4 w-52"}>
        Withdraw
      </Button>
    </>
  )
}
