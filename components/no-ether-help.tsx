import { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import Rabbit from "@/public/rabbit-pixel.webp"

import { cn } from "@/lib/utils"

const NoEtherHelp = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex max-w-lg flex-shrink-0", className)}>
      <Image
        src={Rabbit}
        alt={"Rabbit"}
        className={"rota mt-auto flex h-28 w-28 flex-shrink-0 -scale-x-100"}
      />
      <div className={"nes-balloon from-left text-xs"}>
        pssst, you need some ether on Sepolia to use this app, you can get some
        from the faucet{" "}
        <Link
          href={"https://sepoliafaucet.com/"}
          target={"_blank"}
          className={
            "text-primary underline underline-offset-4 hover:underline"
          }
        >
          sepoliafaucet.com
        </Link>
      </div>
    </div>
  )
}

export default NoEtherHelp
