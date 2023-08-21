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
import Container from "@/components/ui/container"

import { Loader } from "@/components/ui/loader";
import useGetMenCategories from "@/hooks/useGetMenCategories";
import useGetWomenCategories from "@/hooks/useGetWomenCategories ";
import React from "react";
import { Product } from "@/type";



export default function Home() {
  const [page,setPage]=useState<number>(1)
  const [products,setProducts]=useState<Product[]>([])
  const [paginationData,setPaginationData]=useState<any>({})
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const {data:billboard,isLoading}=useGetAllBillboards()
  // get all categories for men
  const {data:mancategories,isLoading:mancategoriesLoadin}=useGetMenCategories()
  // get all categories for women
  const {data:womancategories,isLoading:femalecategoriesLoading}=useGetWomenCategories()
  // get all featured products 
  const { data,fetchNextPage, isFetching} = useTestInfinite({
    page: page,
    isFeatured: true,
  })
  useEffect(() => {
    if (data) {
      data.pages.forEach((group:any) => {
        setProducts((prev) => [...prev, ...group.products]);
        setPaginationData(group.pagination)
      });
    }
  }, [data]);

// infinite scroll
  const handleScroll=async()=> { 
    const isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight; 
    if (isAtBottom) { 
      // Load next posts 
      nextPage()
      // fetch next page
     fetchNextPage()
      
    } 
    
  } 
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })

  // set page
  const nextPage = () => {
    setPage((prev) => prev + 1);
  
   };
  if(mancategoriesLoadin || femalecategoriesLoading ||isLoading)   {
    return (
      <Loader />
    )
  }


  return (
    <>
   {billboard && <Billboards data={billboard} /> }
  <Container>
  
          <>
            {mancategories && <ManCategories data={mancategories} title="Men Categories" />}
            {womancategories && <WomanCategories data={womancategories} title="Women Categories" />}
          </>
        <ProductList items={products} title="Feature Procusts"  />  
        {products?.length === paginationData?.total && <p className="text-center text-lg font-thing text-gray-400">Nothing to Show</p>} 
  </Container>
    </>
  )
}
