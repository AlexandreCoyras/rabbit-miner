import { useEffect, useState } from "react"
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
    queryKeyHashFn: (queryKey) => {
      try {
        return JSON.stringify(queryKey, (key, value) => {
          if (typeof value === "bigint") {
            return value.toString()
          }
          return value
        })
      } catch (e) {
        return String(queryKey)
      }
    },
    staleTime: 1 * 60 * 60 * 1000,
  })

  return {
    ...query,
    ethPrice: query.data,
  }
}
