"use client"
import useAuthModal from '@/hooks/modal/useAuthModal';
import React, { useEffect, useState } from 'react';
import Modal from './modal';
import AuthForm from '../AuthForm';
import Container from './container';

const AuthModal:React.FC = () => {
    const authModal = useAuthModal();
    return (
        <Modal 
        open={authModal.isOpen}
        onClose={authModal.onClose}
        >
            {/* for desktop */}
             <div className='hidden md:block'>
            <div className='w-screen'>
                <AuthForm/>
            </div>

                </div>  
            {/* for mobile */}
            <div className='block md:hidden'>
                <AuthForm/>
                </div>   
        </Modal>
    )
}
export default AuthModal;