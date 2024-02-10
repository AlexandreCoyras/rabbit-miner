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

  const {
    data: hash,
    isSuccess,
    writeContractAsync,
    isPending,
  } = useWriteContract()

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

    const PromiseForTansaction = new Promise(async function (resolve, reject) {
      try {
        const tx = await writeContractAsync({
          value: BigInt(ethers),
          // @ts-ignore
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
          abi: parseAbi(["function deposit(address ref) public payable"]),
          functionName: "deposit",
          args: ["0x0000000000000000000000000000000000000000"],
        })

        resolve(
          await publicClient.waitForTransactionReceipt({
            hash: tx,
            // retryDelay: 2000,
            // retryCount: 40,
          })
        )
      } catch (e) {
        reject(e)
      }
    })

    await toast.promise(PromiseForTansaction, {
      loading: `Adding ${formatUnits(ethers, 18)} $ETH to the contract...`,
      success: `Added ${formatUnits(ethers, 18)} $ETH to the contract!`,
      error: `Failed to add ${formatUnits(ethers, 18)} $ETH to the contract!`,
    })
  }

  return (
    <>
      <Input
        className={"w-52 mt-10 mx-auto"}
        onChange={(v) => setValue(parseFloat(v.target.value))}
        type={"number"}
      ></Input>
      <Button
        onClick={() => onSubmit(value)}
        className={"font-retro mt-5 mx-auto"}
      >
        Add to contract
      </Button>
      {error && <p className={"text-destructive text-xs mt-2"}>{error}</p>}
    </>
  )
}

export default AddToContract
