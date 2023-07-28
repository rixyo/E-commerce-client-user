"use client"
import Navbar from "@/components/Navbar"
import useCurrentUser from "@/hooks/useCurrentUser"
import { redirect } from "next/navigation"

export default  function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {data:user}=useCurrentUser()
  
  return (
   <>
   <Navbar user={undefined}/>
 {children}
   </>


  )
}