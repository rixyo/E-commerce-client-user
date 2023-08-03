"use client"
import {  useEffect, useState } from "react"
export const revalidate = 0;
import Billboards from "@/components/Billboards"
import ManCategories from "@/components/ManCategories";
import ProductList from "@/components/ProductList"
import WomanCategories from "@/components/WomanCategories";
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import useGetAllBillboards from "@/hooks/useGetAllBillboards"
import useGetAllCategories from "@/hooks/useGetAllCategories";
import useGetProducts from "@/hooks/useGetProducts"
import { Separator } from "@radix-ui/react-menubar";


export default function Home() {
  const {data:billboard}=useGetAllBillboards()
  const [page,setPage]=useState<number>(1)
  const {data:currentProducts,isFetching}=useGetProducts({
   isFeatured: true,
    page: page,
  })
  const {data:mancategories}=useGetAllCategories({
    gender:"Male"
  })
  const {data:womancategories}=useGetAllCategories({
    gender:"Female"
  })

 const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => setPage(prev => prev - 1)
  return (
    <>
   {billboard && <Billboards data={billboard} /> }
  <Container>
  {mancategories && <ManCategories data={mancategories} title="Men Categories" />   } 
    <Separator className="my-5"/>
   {womancategories && <WomanCategories data={womancategories} title="Women Categories" />}
        <div className="flex flex-col  px-4 sm:px-6 lg:px-8 mt-2">
         <ProductList title="Featured Products" items={currentProducts}  />     
        </div>
        <div className="flex items-center mb-2 justify-center">
    {!isFetching && <Button onClick={prevPage} className="mr-5" disabled={page === 1}>Previous</Button>}
     {currentProducts&&currentProducts.length>0 &&!isFetching && <Button disabled={currentProducts?.length!==10} onClick={nextPage}>
        Load More
    </Button> } 
        </div>
  </Container>
    </>
  )
}
