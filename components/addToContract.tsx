import { FC, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
// import { waitForTransactionReceipt } from "@wagmi/core"
import toast from "react-hot-toast"
import { formatUnits, parseAbi } from "viem"
import {
  useAccount,
  useContractWrite,
  usePublicClient,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"
import { z } from "zod"

import useDeposit from "@/hooks/useDeposit"
import { Button } from "@/components/ui/button"

import { Input } from "./ui/input"

const AddToContractSchema = z
  .number({
    required_error: "You must provide a number",
  })
  .gt(0, "You must provide a positive number")

const AddToContract: FC = () => {
  const [error, setError] = useState<string>("")
  const [value, setValue] = useState<number>(0)
  const { isConnected, chainId } = useAccount()
  const publicClient = usePublicClient()
  const queryClient = useQueryClient()

  const { writeContractAsync } = useWriteContract()

  const { deposit } = useDeposit()

  const onSubmit = async (data: z.infer<typeof AddToContractSchema>) => {
    const parsedData = AddToContractSchema.safeParse(data)
    if (!parsedData.success) {
      setError(parsedData.error.errors[0].message)
      return
    }
    if (!isConnected) {
      toast.error("You must be connected to a wallet to add to the contract")
      return
    }
    if (!publicClient) {
      toast.error("Error")
      return
    }

    setError("")

    const ethers = BigInt(data * 10 ** 18)

    deposit(ethers)
  }

  return (
    <>
      <Input
        className={"mx-auto mt-3 w-52"}
        onChange={(v) => {
          setValue(parseFloat(v.target.value))
          setError("")
        }}
        type={"number"}
        placeholder={"$ETH Amount"}
      />
      <Button
        onClick={() => onSubmit(value)}
        className={"mx-auto mt-3 font-retro"}
      >
        Add to contract
      </Button>
      {error && <p className={"mt-2 text-xs text-destructive"}>{error}</p>}
    </>
  )
}

export default AddToContract
