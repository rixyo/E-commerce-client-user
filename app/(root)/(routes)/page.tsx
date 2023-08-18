// home page 
"use client"
export const revalidate = 0;

import {  Suspense, useState } from "react"
import useGetAllBillboards from "@/hooks/useGetAllBillboards"

import useGetProducts from "@/hooks/useGetProducts"

import Billboards from "@/components/Billboards"
import ManCategories from "@/components/ManCategories";
import ProductList from "@/components/ProductList"
import WomanCategories from "@/components/WomanCategories";
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"


import { Loader } from "@/components/ui/loader";
import useGetMenCategories from "@/hooks/useGetMenCategories";
import useGetWomenCategories from "@/hooks/useGetWomenCategories ";


export default function Home() {
  // get all billboards
  const [page,setPage]=useState<number>(1)
  const {data:billboard,isLoading:billboardLoading}=useGetAllBillboards()
  // get all featured products 
  const {data:currentProducts,isFetching,isLoading}=useGetProducts({
   isFeatured: true,
    page: page,
  })
  // get all categories for men
 const {data:mancategories,isLoading:mancategoriesLoadin}=useGetMenCategories()
  // get all categories for women
  const {data:womancategories,isLoading:femalecategoriesLoading}=useGetWomenCategories()

  if(mancategoriesLoadin || femalecategoriesLoading || billboardLoading || isLoading) {
    return (
      <Loader />
    )
  }
// pagination
 const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => setPage(prev => prev - 1)
  return (
    <Suspense fallback={<Loader/>}>
   {billboard && <Billboards data={billboard} /> }
  <Container>
    {mancategories && <ManCategories data={mancategories} title="Men Categories" />   } 
    {womancategories && <WomanCategories data={womancategories} title="Women Categories" />}
        <div className="flex flex-col  px-4 sm:px-6 lg:px-8 mt-2">
         {currentProducts &&<ProductList title="Featured Products" items={currentProducts}  /> } 
        </div>
        {/* pagination */}
        <div className="flex items-center mb-2 mt-5 justify-center">
    {!isFetching && <Button onClick={prevPage} className="mr-5" disabled={page === 1}>Previous</Button>}
     {!isFetching && <Button disabled={currentProducts?.length!==12} onClick={nextPage}>
        Load More
    </Button> } 
        </div>
  </Container>
    </Suspense>
  )
}
