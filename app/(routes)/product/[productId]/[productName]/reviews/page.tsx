"use client"

import ReviewForm from './components/ReviewForm';
import useCurrentUser from '@/hooks/useCurrentUser';





const Review = ({params}:{
    params:{
        productId:string;
    }
}) => {
    const {data:user,isLoading}=useCurrentUser()
    if(!user && !isLoading) return null
  
 
    
    return (
        <> 
        <ReviewForm productId={params.productId} />
     
        </>
    )
}
export default Review;