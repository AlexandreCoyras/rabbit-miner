"use client"

import { FC, ReactNode } from "react"

interface WrapperProps {
  children: ReactNode
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <>{children}</>
}

export default Wrapper
