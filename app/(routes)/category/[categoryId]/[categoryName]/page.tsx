"use client"
import Billboard from '@/components/ui/billboard';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import useGetCategoryById from '@/hooks/useGetCategoryById';
import useGetProducts from '@/hooks/useGetProducts';
import React, { useState } from 'react';

type pageProps = {
    params:{
        categoryId:string
        categoryName:string
    }
};

const Category:React.FC<pageProps> = ({params}) => {
    const encodedString = params.categoryName;
    const [page,setPage]=useState<number>(1)
    const decodedString = decodeURIComponent(encodedString);
    const {data,isLoading,isFetching}=useGetProducts({
        'category[name]': decodedString,
        page:page,
    })
    const {data:category}=useGetCategoryById(params.categoryId)
    const nextPage=()=>{
        setPage(page+1)
    }
    
    
    
    return (
        <div className="bg-white">
        <Container>
       {category &&  <Billboard data={category?.billboard} /> }
          <div className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            
              <div className="hidden lg:block">
              </div>
              <div className="mt-6 lg:col-span-4 lg:mt-0">
                {data?.length === 0 && <NoResults />}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data?.map((item) => (
                    <ProductCard key={item.id} data={item} />
                  ))}
                </div>
                <div className="flex items-center mb-5 justify-center">
     {data&&data.length>0 &&!isFetching && <Button disabled={!data?.length} onClick={nextPage}>
        Load More
    </Button> } 
    {!isFetching && !data?.length && <p className="text-center">You have reached the end.Do a search to keep exploring!</p>}
        </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
}
export default Category;