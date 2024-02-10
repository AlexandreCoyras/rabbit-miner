import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

export default function useEthPrice() {
  const [ethPrice, setEthPrice] = useState<number | undefined>(undefined)

  async function fetchEthPrice() {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
    const data = await response.json()
    setEthPrice(data?.ethereum?.usd)
  }

  useEffect(() => {
    fetchEthPrice()
  }, [])

  return ethPrice
}
