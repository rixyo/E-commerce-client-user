// Main page for auth route
import AuthForm from '@/components/AuthForm';
import React from 'react';

const Auth:React.FC = () => {
    
    return(
        <div className="flex items-center p-4 justify-center w-full h-full bg-[url('/signin-bg.svg')]">
            <AuthForm/>
        </div>
    )
}
export default Auth;