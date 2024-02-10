import { useQuery } from "@tanstack/react-query"

export default function useEthPrice() {
  const query = useQuery({
    queryKey: ["ethPrice"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
      const data = await response.json()
      return Number(data?.ethereum?.usd)
    },
  })

  return {
    ...query,
    ethPrice: query.data,
  }
}
