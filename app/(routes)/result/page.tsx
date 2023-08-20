// this component is for show search results
"use client"
import ProductList from '@/components/ProductList';
import Pagination from '@/components/ui/Pagination';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Loader } from '@/components/ui/loader';
import useGetResults from '@/hooks/useGetResults';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';


const SearchPage:React.FC = () => {
    const [page,setPage]=useState<number>(1)
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [mounted,setMounted]=useState<boolean>(false)
    const search=useSearchParams()
    const serachQuery=search?search.get("search_query"):null
    const encodedSearchQuery=encodeURI(serachQuery as string)
    const {data,isFetching,isLoading}=useGetResults(encodedSearchQuery,page)
    useEffect(() => {
        setMounted(true)
    }, [])
    if(!mounted) return null
    if(isLoading) return (
        <Loader />
    )
    const nextPage=()=>{
        setPage(page+1)
    }
    const prevPage=()=>{
        setPage(page-1)
    }


    return (
        <Container>
              <div className="flex flex-col  px-4 sm:px-6 lg:px-8 mt-2">
        {data &&  <ProductList title="Search Results"items={data} sectionRef={sectionRef}/>   }   
        </div>
       <Pagination  page={page} prev={prevPage} next={nextPage} productLength={data?.length} />
        </Container>
    )
}
export default SearchPage;