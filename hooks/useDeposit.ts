import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { formatUnits, parseAbi } from "viem"
import { usePublicClient, useWriteContract } from "wagmi"

export default function useDeposit() {
  const { writeContractAsync } = useWriteContract()
  const publicClient = usePublicClient()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["deposit"],
    mutationFn: async (ethers: bigint) => {
      if (!publicClient) {
        toast.error("Error")
        return
      }
      const deposit = async () => {
        const tx = await writeContractAsync({
          value: BigInt(ethers),
          // @ts-ignore
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
          abi: parseAbi(["function deposit(address ref) public payable"]),
          functionName: "deposit",
          args: ["0x0000000000000000000000000000000000000000"],
        })

        await publicClient.waitForTransactionReceipt({
          hash: tx,
        })
      }

      await toast.promise(deposit(), {
        loading: `Adding ${formatUnits(ethers, 18)} $ETH to the contract...`,
        success: `Added ${formatUnits(ethers, 18)} $ETH to the contract!`,
        error: (e) =>
          `Failed to add ${formatUnits(ethers, 18)} $ETH to the contract` +
          (e.shortMessage ? `: ${e.shortMessage}` : ""),
      })

      await queryClient.invalidateQueries({
        queryKey: ["balance"],
      })

      await queryClient.invalidateQueries({
        queryKey: ["readContract"],
      })
    },
  })

  return {
    ...mutation,
    deposit: mutation.mutate,
    depositAsync: mutation.mutateAsync,
  }
}
