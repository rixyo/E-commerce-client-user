// parent component of reviewform

"use client"
import useCheckEligibleForReview from '@/hooks/useCheckEligibleForReview';
import { useRouter } from 'next/navigation';

import ReviewForm from './components/ReviewForm';


const Review = ({params}:{
    params:{
        productId:string;
    }
}) => {
    // check if user is eligible to review the product
    const {data:isEligable}=useCheckEligibleForReview(params.productId);
    
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