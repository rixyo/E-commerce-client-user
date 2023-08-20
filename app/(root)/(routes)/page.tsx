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
import Pagination from "@/components/ui/Pagination";


export default function Home() {
  const [page,setPage]=useState<number>(1)
  const [showCategories, setShowCategories] = useState<boolean>(true);
  const [renderPagination,setRenderPagination]=useState<boolean>(false)
  const [showButton,setShowButton]=useState<boolean>(false)
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const {data:billboard,isLoading}=useGetAllBillboards()
  // get all categories for men
  const {data:mancategories,isLoading:mancategoriesLoadin}=useGetMenCategories()
  // get all categories for women
  const {data:womancategories,isLoading:femalecategoriesLoading}=useGetWomenCategories()
  // get all featured products 
  const {data:currentProducts,isFetching,isLoading:dataLoading}=useGetProducts({
   isFeatured: true,
    page: page,
  })

  useEffect(() => {
    setTimeout(() => {
      setRenderPagination(true)
    },2000);
  }, []);
  if(mancategoriesLoadin || femalecategoriesLoading ||isLoading || dataLoading  ) {
    return (
      <Loader />
    )
  }
  // scroll to section
  const handleScroll = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      setShowCategories(prev => !prev);
    }

  };
 
  // pagination
  const nextPage = () => {
    setPage((prev) => prev + 1);
    setShowCategories(false);
    setShowButton(true)
   };
const prevPage = () => {
  setPage(prev => prev - 1);
  setShowCategories(false);
  setShowButton(true)
}

  return (
    <>
   {billboard && <Billboards data={billboard} /> }
  <Container>
  {showCategories && (
          <>
            {mancategories && <ManCategories data={mancategories} title="Men Categories" />}
            {womancategories && <WomanCategories data={womancategories} title="Women Categories" />}
          </>
        )}
        {/* show button  */}
      {showButton &&  <Button onClick={handleScroll} className="hidden md:block mt-5 mx-auto">
       {showCategories ? "Hide Categories" : "Show Categories"}
        </Button> } 
        {/* featured products */}
          {currentProducts && <ProductList  title="Featured Products" items={currentProducts} sectionRef={sectionRef} />}
        {/* pagination */}      
        
        {renderPagination &&!isFetching && <Pagination prev={prevPage} next={nextPage} page={page} productLength={currentProducts?.length}   />}
  </Container>
    </>
  )
}
