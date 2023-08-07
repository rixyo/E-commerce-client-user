"use client"

import useCurrentUser from "@/hooks/useCurrentUser"
import { redirect } from "next/navigation"


export default function Layout({ children }: { children: React.ReactNode }) {
    const { data,isLoading } = useCurrentUser()
    if(isLoading){
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-semibold">Authentication Checking...</p>
      </div>
    }
    else if(!data){
        redirect('/')
    }
    return (
        <div>
            <div className=" min-h-screen py-2">
                    {children}
            </div>
        </div>
    )
}