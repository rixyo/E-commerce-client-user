"use client"
import Info from '@/components/Info';
import ProductList from '@/components/ProductList';
import Gallery from '@/components/gallery';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import useGetProduct from '@/hooks/useGetProduct';
import useGetProducts from '@/hooks/useGetProducts';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

type pageProps = {
    params:{
        productId:string,
    }
    
};

const Productpage:React.FC<pageProps> = ({params}) => {
    const [mounted,setMounted]=useState<boolean>(false)
    const [page,setPage]=useState<number>(1)
    const {data}=useGetProduct(params.productId)
    const {data:suggestedProducts,isFetching}=useGetProducts({
        page:page,
        'category[name]':data?.category.name
    })
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
    return (
        <>
        <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
           {data &&  <Gallery images={data.Images} /> }
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
             {data &&  <Info data={data} /> }
            </div>
          </div>
          <hr className="my-10" />
         {suggestedProducts && <ProductList title="Related Items" items={suggestedProducts} /> } 
          <div className="flex items-center mb-2 justify-center">
    {!isFetching && <Button onClick={prevPage} className="mr-5" disabled={page === 1}>Previous</Button>}
     {suggestedProducts &&!isFetching && <Button disabled={!suggestedProducts?.length} onClick={nextPage}>
        Load More
    </Button> } 
        </div>
        </div>
      </Container>
    </div>  
        </>
    )
}
export default Productpage;