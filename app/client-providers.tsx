"use client"

import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { Toaster } from "react-hot-toast"
import { sepolia } from "viem/chains"
import { createConfig, http, WagmiProvider } from "wagmi"

interface WrapperProps {
  children: ReactNode
}

const ckConfig = getDefaultConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    ),
  },

  // Required API Keys
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

  // Required App Info
  appName: "Rabbit Miner",

  // Optional App Info
  appDescription: "Your App Description",
  appUrl: "https://family.co", // your app's url
  appIcon: "/favicon.ico", // your app's icon, no bigger than 1024x1024px (max. 1MB)
})

const config = createConfig({
  ...ckConfig,
  connectors: typeof window !== "undefined" ? ckConfig.connectors : [],
})

const queryClient = new QueryClient()

const ClientProviders: FC<WrapperProps> = ({ children }) => {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <Toaster containerClassName={"font-poppins font-medium"} />
            {children}
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default ClientProviders
