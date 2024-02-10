import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { parseAbi } from "viem"
import { usePublicClient, useWriteContract } from "wagmi"

export default function useWithdraw() {
  const { writeContractAsync } = useWriteContract()
  const publicClient = usePublicClient()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: async () => {
      if (!publicClient) {
        toast.error("Error")
        return
      }
      const withdraw = async () => {
        const tx = await writeContractAsync({
          // @ts-ignore
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
          abi: parseAbi(["function withdraw() public"]),
          functionName: "withdraw",
        })

        await publicClient.waitForTransactionReceipt({
          hash: tx,
        })
      }

      await toast.promise(withdraw(), {
        loading: "Withdrawing...",
        success: "Withdrawn!",
        error: (e) =>
          "Error withdrawing" + (e.shortMessage ? `: ${e.shortMessage}` : ""),
      })

      await queryClient.invalidateQueries({ queryKey: ["balance"] })
    },
  })

  return {
    ...mutation,
    withdraw: mutation.mutate,
    withdrawAsync: mutation.mutateAsync,
  }
}
