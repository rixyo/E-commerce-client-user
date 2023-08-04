"use client";


import AuthModal from "@/components/ui/auth-modal";
import { useEffect, useState } from "react";


const AuthModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
      <AuthModal />
    </>
   );
}
 
export default AuthModalProvider;