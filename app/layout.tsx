import type { Metadata } from "next"
import { Inter, Poppins, Press_Start_2P } from "next/font/google"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "nes.css/css/nes.min.css"
import "./globals.css"

import { ReactNode } from "react"

import { cn } from "@/lib/utils"
import InfoHeader from "@/components/info-header"
import ClientProviders from "@/app/client-providers"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start",
  weight: "400",
})

export const metadata: Metadata = {
  title: "Rabbit Miner",
  description: "Mine rabbit, earn money !",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          poppins.variable,
          pressStart2P.variable,
          "font-retro",
          "relative",
          "min-h-screen"
        )}
        // className={inter.className}
      >
        <ClientProviders>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition={"bottom-left"}
          />
          <InfoHeader />
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
