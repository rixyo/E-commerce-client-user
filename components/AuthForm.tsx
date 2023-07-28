"use client"
import React, { useState } from 'react';

import SignupForm from './SignupForm';
import SigninForm from './SigninForm';

type Vairant="signup" | "signin" | "forgot-password" ;

const AuthForm:React.FC = () => {
    const [variant, setVariant] = useState<Vairant>("signup")
    
    return (
        
    <div key={Math.random()/10} className="bg-white  p-10 rounded-lg sm:w-auto lg:w-1/3">
      {variant === "signup" && <SignupForm variant='signup' setVariant={()=>{
          setVariant("signin")
      }} />}
      {variant === "signin" &&(
      <SigninForm variant='signin' setVariant={()=>{
          setVariant("signup")
      }} />
      )}
       
      
    </div>

    )
}
export default AuthForm;