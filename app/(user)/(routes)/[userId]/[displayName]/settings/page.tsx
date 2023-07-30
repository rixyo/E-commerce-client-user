"use client"
import useCurrentUser from '@/hooks/useCurrentUser';
import React, { useEffect, useState } from 'react';

import SettingsForm from './components/SettingsForm';

const SettingPage:React.FC = () => {
    const {data:user,isLoading}=useCurrentUser()
    const [mounted,setIsMounted]=useState<boolean>(false)
    useEffect(() => {
        setIsMounted(true);
      
    }, [mounted])
    if(!mounted){
        return null
    }
 
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 '>
         {user && <SettingsForm user={user}/> } 
            </div>
        </div>
    )
}
export default SettingPage;