"use client"
import Navbar from "@/components/Navbar"

import useCurrentUser from "@/hooks/useCurrentUser"
import LocalStorageManager from "@/lib/LocalStorageManager"
import { redirect } from "next/navigation"
export default  function ProfileLayout({
  children,
}: {
  children: React.ReactNode

}) {

  const {data:user,isLoading}=useCurrentUser()
  const token = LocalStorageManager.getItemWithExpiration('token');
  if(!user&&!token){
    redirect('/auth')
  }
  return (
   <>
   <head>
      <title>{user?.displayName}</title>
   </head>
   <>
    {user && <Navbar user={user}/>}
   {children}
   </>
    </>
  )
}