import { parseAbi } from "viem"
import { useAccount, useReadContract } from "wagmi"

export default function useGetMyRabbits() {
  const { address } = useAccount()
  const query = useReadContract({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    abi: parseAbi([
      "function getTotalDeposits(address _user) public view returns (uint256)",
    ]),
    functionName: "getTotalDeposits",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    //   2 minutes
    query: {
      staleTime: 2 * 60 * 1000,
      enabled: !!address,
    },
  })
  console.log(query.data, "query.data")
  return {
    ...query,
    myDeposit: query.data,
  }
}
