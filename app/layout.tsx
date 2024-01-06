import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import "./globals.css"

import { ReactNode } from "react"

import Wrapper from "@/app/wrapper"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Rabbit Miner",
  description: "Mine rabbit, earn money !",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}
