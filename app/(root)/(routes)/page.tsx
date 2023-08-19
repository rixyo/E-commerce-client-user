// home page 
"use client"
export const revalidate = 0;

import {  Suspense, useRef, useState } from "react"
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
import useMenCategoryStore from "@/hooks/store/mencategory";
import useWomenCategoryStore from "@/hooks/store/womencategory";


export default function Home() {
  // get all billboards
  const [page,setPage]=useState<number>(1)
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const setCategories = useMenCategoryStore((state:any) => state.setCategories);
  const setWomenCategories = useWomenCategoryStore((state:any) => state.setCategories);
  const {data:billboard,isLoading}=useGetAllBillboards()
  // get all featured products 
  const {data:currentProducts,isFetching,isLoading:ProductsLoading}=useGetProducts({
   isFeatured: true,
    page: page,
  })
  // get all categories for men
 const {data:mancategories,isLoading:mancategoriesLoadin}=useGetMenCategories()
 setCategories(mancategories)
  // get all categories for women
  const {data:womancategories,isLoading:femalecategoriesLoading}=useGetWomenCategories()
  setWomenCategories(womancategories)

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
    <div className="hidden md:block">
    {mancategories && <ManCategories data={mancategories} title="Men Categories" />   } 
    </div>
    <div className="hidden md:block">
    {womancategories && <WomanCategories data={womancategories} title="Women Categories" />}
    </div>
        <section id='section-1' className="flex flex-col  px-4 sm:px-6 lg:px-8 mt-2">
         {currentProducts &&<ProductList title="Featured Products" items={currentProducts}  /> } 
        </section>
        {/* pagination */}       
  </Container>
  <div className="bottom-0 flex items-center mb-2 mt-5 justify-center">
     <Button onClick={prevPage} className="mr-5" disabled={page === 1}>Previous</Button>
    {currentProducts?.length===12 &&!isFetching &&<Button disabled={currentProducts?.length!==12} onClick={handleNextButtonClick}>
        Load More
    </Button> 
}
        </div>
    </>
  )
}
