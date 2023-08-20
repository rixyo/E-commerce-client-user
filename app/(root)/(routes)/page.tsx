// home page 
"use client"
export const revalidate = 0;

import {useEffect, useRef, useState } from "react"
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
import Pagignation from "@/components/ui/Pagignation";



export default function Home() {
  // get all billboards
  const [page,setPage]=useState<number>(1)
  const [renderPagination,setRenderPagination]=useState<boolean>(false)
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const {data:billboard,isLoading}=useGetAllBillboards()
  // get all categories for men
  const {data:mancategories,isLoading:mancategoriesLoadin}=useGetMenCategories()
  // get all categories for women
  const {data:womancategories,isLoading:femalecategoriesLoading}=useGetWomenCategories()
  // get all featured products 
  const {data:currentProducts,isFetching,isLoading:ProductsLoading}=useGetProducts({
   isFeatured: true,
    page: page,
  })
  useEffect(() => {
    setTimeout(() => {
      setRenderPagination(true)
    },6000);

  }, []);
  if(mancategoriesLoadin || femalecategoriesLoading || isLoading || ProductsLoading ) {
    return (
      <Loader />
    )
  }
// pagination
 const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => setPage(prev => prev - 1)
  const handleNextButtonClick = () => {
    if(sectionRef.current){
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  nextPage()
  };
  return (
    <>
   {billboard && <Billboards data={billboard} /> }
  <Container>
    {mancategories && <ManCategories data={mancategories} title="Men Categories" />   } 

    {womancategories && <WomanCategories data={womancategories} title="Women Categories" />}
 
        <section id='section-1' className="flex flex-col  px-4 sm:px-6 lg:px-8 mt-2">
         {currentProducts &&<ProductList title="Featured Products" items={currentProducts}  /> } 
        </section>
        {/* pagination */}      
        {renderPagination && <Pagignation page={page} prev={prevPage} next={handleNextButtonClick} productLength={currentProducts?.length} /> }
  </Container>
    </>
  )
}
