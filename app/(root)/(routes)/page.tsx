"use client"

import Billboard from "@/components/Billboard"
import Container from "@/components/ui/container"
import useGetAllBillboards from "@/hooks/useGetAllBillboards"

export default function Home() {
  const {data:billboard,isLoading}=useGetAllBillboards()
  if(!billboard &&isLoading){
    return <div>Loading...</div>
  }

 
  return (
    <>
   {billboard && <Billboard data={billboard}/> } 
  
  <Container>
     <div className="space-y-10 pb-10  justify-center">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        </div>
      </div>
  </Container>
    </>
  )
}
