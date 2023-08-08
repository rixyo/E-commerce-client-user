"use client"

import { useCheckEligableForReview } from '@/hooks/useCheckEligableForReview';
import ReviewForm from './components/ReviewForm';

import { useRouter } from 'next/navigation';

const Review = ({params}:{
    params:{
        productId:string;
    }
}) => {
    const {data:isEligable}=useCheckEligableForReview(params.productId);
    
    const router=useRouter();
 
    if(isEligable===false){
        router.push('/');

    }
  
    return (
        <> 
       {isEligable!==false && isEligable!==undefined && <ReviewForm productId={params.productId} /> } 
     
        </>
    )
}
export default Review;