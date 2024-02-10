import { parseAbi } from "viem"
import { useAccount, useReadContract } from "wagmi"

export default function useUserContractBalance() {
  const { address } = useAccount()
  const { data: myFlakes } = useReadContract({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    abi: parseAbi(["function getMyFlakes() public view returns (uint256)"]),
    functionName: "getMyFlakes",
    account: address,
  })
  const { data: userBalance } = useReadContract({
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    abi: parseAbi([
      "function calculateFlakeSell(uint256 flakes) public view returns (uint256)",
    ]),
    functionName: "calculateFlakeSell",
    args: [myFlakes ?? BigInt(0)],
  })
  return userBalance
}
