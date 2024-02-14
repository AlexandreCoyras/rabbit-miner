"use client"

import { FC, useState } from "react"
import Link from "next/link"

const InfoHeader: FC = () => {
  const [dismissed, setDismissed] = useState(false)

  return (
    <>
      {!dismissed && (
        <div
          className={
            "hidden min-h-[2rem] w-full border-b-[1px] border-black font-sans sm:flex"
          }
        >
          <div
            className={
              "z-50 w-full bg-background p-2 text-center text-xs font-semibold text-primary"
            }
          >
            This is a demo Web3 app made using Next.js. You can find the source
            code at{" "}
            <Link
              href={"https://github.com/AlexandreCoyras/rabbit-miner"}
              className={"underline"}
              target={"_blank"}
            >
              GitHub/AlexandreCoyras/rabbit-miner
            </Link>{" "}
            !
            <button
              className={"float-right underline"}
              onClick={() => setDismissed(true)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default InfoHeader
