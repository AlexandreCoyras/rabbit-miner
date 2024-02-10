"use client"

import { ConnectKitButton } from "connectkit"
import toast from "react-hot-toast"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AddToContract from "@/components/addToContract"

export default function MainPage() {
  const { address } = useAccount()

  return (
    <>
      <div className={"ml-auto"}>
        <ConnectKitButton theme={"retro"} />
      </div>
      {address && <p className={"font-retro"}>Connected to {address}</p>}
      {!address && <p>Not connected</p>}
      <Button
        variant={"default"}
        onClick={() => toast.success("clicked")}
        className={"font-retro"}
      >
        Click me
      </Button>

      <Card
        title={"Enter The Rabbit Hole"}
        centered
        className={"flex flex-col mt-2"}
      >
        <AddToContract />
      </Card>
    </>
  )
}
