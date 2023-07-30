"use client"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

interface BillboardProps {
    data: Billboard[];
  }
  
  const Billboard: React.FC<BillboardProps> = ({
    data
  }) => {
    if (data.length === 0) {
      return <div>No images to display.</div>;
    }
    
    
    const divStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      height: '344px', 
    }
    return ( 
      <>
      <div className="slide-container p-2 ">
        <Slide canSwipe  duration={10000}>
         {data.map((data, index)=> (
            <div key={index}>
              <div  style={{ ...divStyle, 'backgroundImage': `url(${data.imageUrl})` }}>
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data.label}
          </div>
        </div>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
      </>
     );
  };
  
  export default Billboard;