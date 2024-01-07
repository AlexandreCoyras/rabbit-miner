import { NextResponse } from "next/server"

import { InfoResponseData } from "@/types/api"
import getContractInfo from "@/app/api/info/getContractInfo"

// export const runtime = "edge"

export async function GET(req: Request) {
  const data = await getContractInfo()
  return NextResponse.json<InfoResponseData>(
    {
      ...data,
    },
    {
      status: 200,
    }
  )
}
