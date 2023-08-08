"use client"

import Container from '@/components/ui/container';
import React from 'react';
import { useGetUserReviews } from '@/hooks/useGetUserReviews';
import ReviewCard from './components/ReviewCard';


const ReviewsPage:React.FC= () => {
  
    const {data:reviews}=useGetUserReviews()
  return (
    <Container>
      <div className="">
       <h1 className='text-center text-xl font-medium  mt-20 md:mt-0'>Reviews</h1>
        <div className='flex sm:justify-start md:justify-center gap-5 border-b-2 border-gray-300 mb-2 p-2 cursor-pointer mt-12 md:mt-0'>
          <div className='flex-col items-center' >
          {reviews?.map((data,index)=>(
              <ReviewCard key={index} data={data}/>
            ))}
            </div>
        </div>
      </div>
    </Container>
  );
};
export default ReviewsPage;