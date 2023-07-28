"use client"
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function SetupLayout({
    children,
}:{
    children:React.ReactNode
}){
    const {data:user}=useCurrentUser()
     return(
            <>
          {user && <Navbar user={user}/>}
          {!user &&  <Navbar user={undefined}/> } 
            {children}
            </>
     )
}