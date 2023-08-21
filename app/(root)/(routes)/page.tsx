// home page 
"use client"
// revalidate every 10 seconds and if there is a new data
export const revalidate = 0;

import {useEffect,  useState } from "react"
import useGetAllBillboards from "@/hooks/useGetAllBillboards"
import useTestInfinite from "@/hooks/useGetProductsInfiniteQuery";


import Billboards from "@/components/Billboards"
import ManCategories from "@/components/ManCategories";
import ProductList from "@/components/ProductList"
import WomanCategories from "@/components/WomanCategories";
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"

import { Loader } from "@/components/ui/loader";
import useGetMenCategories from "@/hooks/useGetMenCategories";
import useGetWomenCategories from "@/hooks/useGetWomenCategories ";
import React from "react";
import { Product } from "@/type";



export default function Home() {
  const [page,setPage]=useState<number>(1)
  const [products,setProducts]=useState<Product[]>([])
  const {data:billboard,isLoading}=useGetAllBillboards()
  // get all categories for men
  const {data:mancategories,isLoading:mancategoriesLoadin}=useGetMenCategories()
  // get all categories for women
  const {data:womancategories,isLoading:femalecategoriesLoading}=useGetWomenCategories()
  // get all featured products 
  const { data, hasNextPage,isFetchingNextPage,fetchNextPage,isFetching} = useTestInfinite({
    page: page,
    isFeatured: true,
  })
  useEffect(() => {
    if (data) {
      data.pages.forEach((group:any) => {
        setProducts((prev) => [...prev, ...group.products]);
      });
    }
  }, [data]);
  if(mancategoriesLoadin || femalecategoriesLoading ||isLoading  ) {
    return (
      <Loader />
    )
  }
  // set page
  const nextPage = () => {
    setPage((prev) => prev + 1);
  
   };
   // load more products
const handleClick=async()=>{
  nextPage()
  await fetchNextPage()
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

  return (
    <>
   {billboard && <Billboards data={billboard} /> }
  <Container>
  
          <>
            {mancategories && <ManCategories data={mancategories} title="Men Categories" />}
            {womancategories && <WomanCategories data={womancategories} title="Women Categories" />}
          </>
        {/* featured products */}
        <ProductList items={products} title="Feature Procusts" 
          />
      {/* pagination */}      
   {hasNextPage && <div className="flex justify-center items-center">
        <Button
          onClick={handleClick}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {
            hasNextPage
            && !isFetchingNextPage
            && "Load More"
           }
        </Button>
      </div> } 
      <div>{isFetching && !isFetchingNextPage ? <Loader/>: null}</div>
      { !hasNextPage && <p className="text-center text-gray-500 text-lg font-thin">Nothing to Show</p>}
        
  </Container>
    </>
  )
}
