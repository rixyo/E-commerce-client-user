"use client"
export const revalidate = 0;
import Billboard from "@/components/Billboard"
import ManCategories from "@/components/ManCategories";
import ProductList from "@/components/ProductList"
import WomanCategories from "@/components/WomanCategories";
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import useGetAllBillboards from "@/hooks/useGetAllBillboards"
import useGetAllCategories from "@/hooks/useGetAllCategories";
import useGetProducts from "@/hooks/useGetProducts"
import { Separator } from "@radix-ui/react-menubar";
import Head from "next/head";

import { useEffect, useState } from "react"
export default function Home() {
  const {data:billboard,isLoading}=useGetAllBillboards()
  const [page,setPage]=useState<number>(1)
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const {data:currentProducts,isLoading:isProductsLoading,isPreviousData}=useGetProducts({
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
  useEffect(() => {
    if (currentProducts) {
      setAllProducts((prevProducts) => [...prevProducts, ...currentProducts]);
    }
  }, [currentProducts]);
  
  return (
    <>
    <Head>
      <title>Home</title>

    </Head>
   {billboard && <Billboard data={billboard}/> } 
  
   {mancategories && <ManCategories data={mancategories} title="Men Categories"/> } 
    <Separator className="my-5"/>
   {womancategories && <WomanCategories data={womancategories} title="Women Categories"/>}

 
  <Container>
        <div className="flex flex-col  px-4 sm:px-6 lg:px-8 mt-2">
        {currentProducts && <ProductList title="Featured Products" items={allProducts} nextPage={nextPage}   />  }   
        <div className="flex items-center mb-5 justify-center">
     {currentProducts&&currentProducts.length>0 && <Button disabled={!currentProducts?.length} onClick={nextPage}>
        Load More
    </Button> } 
    {!isProductsLoading && currentProducts?.length === 0 && <p className="text-center">You have reached the end.Do a search to keep exploring!</p>}
        </div>
        </div>
  </Container>
    </>
  )
}
