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
    const {data:review,isFetching}=useGetProductReviews(id,page)
    const nextPage=()=>{
        setPage(page+1)
    }
    const prevPage=()=>{
        setPage(page-1)
    }
   
    return (
        <>
            <div className='w-full p-2'>
               {review?.reviews?.length!==0 && <h1 className='text-center text-xl font-medium border-b-2 border-gray-300'>Reviews</h1> } 

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