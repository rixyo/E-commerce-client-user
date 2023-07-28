"use client";
import React, { useEffect, useState } from 'react';



const Footer:React.FC = () => {
  const [mounted,setIsMounted]=useState<boolean>(false)
  useEffect(() => {
      setIsMounted(true);
  }, []);
  if(!mounted){
      return null
  }
    
    return (
        <footer className="bg-white border-t">
        <div className="mx-auto py-10">
          <p className="text-center text-xs text-black">
            &copy; 2023 Store, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    )
}
export default Footer;