"use client"
import useCurrentUser from "@/hooks/useCurrentUser"
import { redirect } from "next/navigation"

import Navbar from "@/components/Navbar"

export default  function ProfileLayout({
  children,
}: {
  children: React.ReactNode

}) {
  const {data:user,isLoading}=useCurrentUser()
   if(!user && !isLoading){
    redirect('/auth')
  }
  return (
   <>
    <Navbar user={user}/>
          {children}
      </>
  )
}