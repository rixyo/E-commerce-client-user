// this component is for show search results
"use client"
import ProductList from '@/components/ProductList';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import useGetResults from '@/hooks/useGetResults';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const SearchPage:React.FC = () => {
    const [page,setPage]=useState<number>(1)
    const [mounted,setMounted]=useState<boolean>(false)
    const search=useSearchParams()
    const serachQuery=search?search.get("search_query"):null
    const encodedSearchQuery=encodeURI(serachQuery as string)
    const {data,isFetching}=useGetResults(encodedSearchQuery,page)
    useEffect(() => {
        setMounted(true)
    }, [])
    if(!mounted) return null
    const nextPage=()=>{
        setPage(page+1)
    }
    const prevPage=()=>{
        setPage(page-1)
    }


    return (
        <Container>
              <div className="flex flex-col  px-4 sm:px-6 lg:px-8 mt-2">
        {data &&  <ProductList title="Search Results"items={data}     />   }   
        </div>
        <div className="flex items-center mb-5 justify-center">
        {!isFetching && <Button onClick={prevPage} className="mr-5" disabled={page === 1}>Previous</Button>}
     {data&&!isFetching && <Button disabled={data.length!==10} onClick={nextPage}>
        Load More
    </Button> } 
        </div>

        </Container>
    )
}
export default SearchPage;