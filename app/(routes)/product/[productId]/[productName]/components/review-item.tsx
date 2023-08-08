import Gallery from '@/components/gallery';
import Rating from '@/components/ui/rating';
import { Review } from '@/type';
import { format } from 'date-fns';
import React from 'react';

type reviewitemProps = {
    data:Review
    
};

const ReviewItem:React.FC<reviewitemProps> = ({data}) => {
    
    
    return(
      

        <div className='flex items-center justify-start gap-5 mb-2 p-2'>
          <div className='flex-col items-center justify-center'>
            <div>
                <Rating value={data.rating}/>
            </div>
            <div>
               <p className='text-sm font-bold text-gray-500'>by {data.user.displayName}</p>
            </div>
            <div>
                <p className='text-lg  text-neutral-700'>{data.comment}</p>
            </div>
            <div className='w-full'>
              <Gallery images={data.images}/>
            </div>
           
            <div className='mt-3'>
            <p className='text-lg text-gray-500'> {format(new Date(data.createdAt), 'MMMM do, yyyy').toString()}</p>
            </div>
          </div>

        </div>
      
    )
}
export default ReviewItem;