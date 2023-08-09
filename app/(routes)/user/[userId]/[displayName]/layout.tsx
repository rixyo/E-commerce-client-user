// Type: Layout Component check if user is authenticated or not and redirect to login page if not

"use client"

import useCurrentUser from "@/hooks/useCurrentUser"
import { redirect } from "next/navigation"


export default function Layout({ children }: { children: React.ReactNode }) {
    const { data,isLoading } = useCurrentUser()
    if(isLoading){
      <div className="flex justify-center items-center h-full">
        <p className="text-2xl font-semibold">Authentication Checking...</p>
      </div>
    }
    else if(!data && !isLoading){
        redirect('/')
    }
    return (
        <>
           {children}
        </>
    )
}