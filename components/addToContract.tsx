import { FC, useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import { Input } from "./ui/input"

const AddToContractSchema = z
  .number({
    required_error: "You must provide a number",
  })
  .min(0, "You must provide a positive number")

const AddToContract: FC = () => {
  const [error, setError] = useState<string>("")
  const [value, setValue] = useState<number>(0)

  const onSubmit = async (data: z.infer<typeof AddToContractSchema>) => {
    const parsedData = AddToContractSchema.safeParse(data)
    if (!parsedData.success) {
      setError(parsedData.error.errors[0].message)
      return
    }

    setError("")

    toast.success("added!")

    // Do something with the data
  }

  return (
    <>
      <Input
        className={"w-52 mt-10 mx-auto"}
        onChange={(v) => setValue(parseInt(v.target.value))}
        type={"number"}
      ></Input>
      <Button
        onClick={() => onSubmit(value)}
        className={"font-retro mt-5 mx-auto"}
      >
        Add to contract
      </Button>
    </>
  )
}

export default AddToContract
