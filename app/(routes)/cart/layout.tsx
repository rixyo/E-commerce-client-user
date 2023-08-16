"use client"
import useCurrentUser from "@/hooks/useCurrentUser"
import { redirect } from "next/navigation"

export default function CartLayout({children}:{
    children:React.ReactNode
}) {
    const{data:user,isLoading}=useCurrentUser()
    if(isLoading) return(
        <div className='flex items-center justify-center h-screen'>
            <h1 className='text-2xl font-semibold'>Authentication Checking..</h1>
        </div>
    )
    else if(!user && !isLoading){
        redirect('/auth')
    }
    return (
            <>
                {children}
            </>
      
    )
}