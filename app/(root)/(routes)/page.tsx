"use client"
import {  useState } from "react"
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
  const {data:billboard,isFetching:isbillboardFetching}=useGetAllBillboards()
  const [page,setPage]=useState<number>(1)
  const {data:currentProducts,isFetching}=useGetProducts({
   isFeatured: true,
    page: page,
  })
  const {data:mancategories,isFetching:mancategoryFaching}=useGetAllCategories({
    gender:"Male"
  })
  const {data:womancategories,isFetching:womencategoryFaching}=useGetAllCategories({
    gender:"Female"
  })

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
 
 
  
  return (
    <>
   <Billboards data={billboard}isbillboardFetching={isbillboardFetching} /> 
  <Container>
   <ManCategories data={mancategories} title="Men Categories" isFatching={mancategoryFaching} />  
    <Separator className="my-5"/>
   <WomanCategories data={womancategories} title="Women Categories" isFatching={womencategoryFaching}/>
        <div className="flex flex-col  px-4 sm:px-6 lg:px-8 mt-2">
         <ProductList title="Featured Products" items={currentProducts}  isFeatching={isFetching}   />     
        <div className="flex items-center mb-5 justify-center">
     {currentProducts&&currentProducts.length>0 &&!isFetching && <Button disabled={!currentProducts?.length} onClick={nextPage}>
        Load More
    </Button> } 
    {!isFetching && !currentProducts?.length && <p className="text-center">You have reached the end.Do a search to keep exploring!</p>}
        </div>
        </div>
  </Container>
    </>
  )
}
