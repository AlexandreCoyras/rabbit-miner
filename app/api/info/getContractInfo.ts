import cacheData from "memory-cache"

import { InfoResponseData } from "@/types/api"

export default async function getContractInfo(): Promise<InfoResponseData> {
  const value = cacheData.get("contractInfo") as InfoResponseData
  if (value) {
    return value
  } else {
    const data = {
      contract_value: new Date().getTime(),
    }
    cacheData.put("contractInfo", data, 1000 * 20)
    return data
  }
}
