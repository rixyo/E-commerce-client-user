"use client"
import Billboard from '@/components/ui/billboard';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Loader } from '@/components/ui/loader';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import useGetCategoryById from '@/hooks/useGetCategoryById';
import useGetProducts from '@/hooks/useGetProducts';
import { Product } from '@/type';
import React, { Suspense, useEffect, useState } from 'react';

type pageProps = {
    params:{
        categoryId:string
        categoryName:string
    },
};

const Category:React.FC<pageProps> = ({params}) => {
  const [mounted,setMounted]=useState<boolean>(false)
    const encodedString = params.categoryName;
    const [page,setPage]=useState<number>(1)
    // remove %20 from string
    const decodedString = decodeURIComponent(encodedString);
    // get products by category
    const {data,isFetching,isLoading:categoriesProductLoader}=useGetProducts({
        'category[name]': decodedString,
        page:page,
    })
    // get category by id
    const {data:category,isLoading}=useGetCategoryById(params.categoryId)
    // fixed bug when refresh page
    useEffect(() => {
        setMounted(true);
    }, [])
    if(!mounted) return null
    const nextPage=()=>{
        setPage(page+1)
    }
    const prevPage=()=>{
        setPage(page-1)
    }
    if(isLoading || categoriesProductLoader) {
      return(
        <Loader />
      )
    }

    return (
      <Suspense fallback={<div>loading......</div>}>
        <div className="bg-white">
        <Container>
       {category &&  <Billboard data={category.billboard} /> }
          <div className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
              <div className="hidden lg:block">
              
              </div>
               <div className="mt-6 lg:col-span-4 lg:mt-0">
                {data?.length === 0 && <NoResults />}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data?.map((item:Product) => (
                    <ProductCard key={item.id} data={item} />
                  ))}
                </div>
                <div className="flex items-center mb-5 mt-5 justify-center">
                {!isFetching && <Button onClick={prevPage} className="mr-5" disabled={page === 1}>Previous</Button>}
     {data&&data.length>0 &&!isFetching && <Button disabled={data.length!==12} onClick={nextPage}>
        Load More
    </Button> } 
        </div>
              </div>

            </div>
                  
          </div>
        </Container>
      </div>
        </ Suspense>
    )
}
export default Category;