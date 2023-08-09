//  Purpose: Display reviews of a product

import { Review } from '@/type';
import React from 'react';
import useGetProductReviews from '@/hooks/useGetProductReviews';
import ReviewItem from './review-item';
import { Button } from '@/components/ui/button';


type reviewcardProps = {
   id:string
};

const Reviews:React.FC<reviewcardProps> = ({id}) => {
    const [page,setPage]=React.useState<number>(1)
    // get product reviews
    const {data:review,isFetching}=useGetProductReviews(id,page)
    const nextPage=()=>{
        setPage(page+1)
    }
    const prevPage=()=>{
        setPage(page-1)
    }
   
    return (
        <>
        <h1 className='text-2xl font-bold text-gray-500'>Reviews</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4'>
             {review?.reviews.map((data:Review,index:number)=>(
                <ReviewItem key={index} data={data}/>
             ))}
            </div>
            <div className="flex items-center mb-2 justify-center">
    {!isFetching && <Button onClick={prevPage} className="mr-5" disabled={page === 1}>Previous</Button>}
     {!isFetching && <Button disabled={review?.reviews?.length!==5} onClick={nextPage}>
        Next Page
    </Button> } 
        </div>
        </>

     
       
      
    )
}
export default Reviews;