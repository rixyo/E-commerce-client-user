
// single product page
"use client"
import Info from '@/components/Info';
import ProductList from '@/components/ProductList';
import Gallery from '@/components/gallery';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import useGetProduct from '@/hooks/useGetProduct';
import useGetProducts from '@/hooks/useGetProducts';

import React, { Suspense, useState } from 'react';
import Reviews from './components/reviews';

type pageProps = {
    params:{
        productId:string,
    }
    
};

const Productpage:React.FC<pageProps> = ({params}) => {
  
    const [page,setPage]=useState<number>(1)
    // get product by id
    const {data}=useGetProduct(params.productId)
    // get suggested products base on current product category
    const category=data?.category?.name
    const {data:suggestedProducts,isFetching}=useGetProducts({
        page:page,
        'category[name]':category,
    })
 

    const nextPage=()=>{
        setPage(page+1)
    }
    const prevPage=()=>{
        setPage(page-1)
    }
    return (
        <Suspense fallback={<div>loading......</div>}>
        <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
           {data &&  <Gallery images={data.Images} /> }
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
             {data &&  <Info data={data} /> }
            </div>
          </div>
          {/** reviews */}
            <div className="mt-10">
             {data && <Reviews id={params.productId} /> }
            </div>
          <hr className="my-10" />
         {data && suggestedProducts && <ProductList title="Related Items" items={suggestedProducts} /> } 
          <div className="flex items-center mb-2 justify-center">
    {!isFetching && <Button onClick={prevPage} className="mr-5" disabled={page === 1}>Previous</Button>}
     {suggestedProducts &&!isFetching && <Button disabled={suggestedProducts.length!=10} onClick={nextPage}>
        Load More
    </Button> } 
        </div>
        </div>
      </Container>
    </div>  
        </Suspense>
    )
}
export default Productpage;