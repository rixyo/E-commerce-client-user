
import './globals.css'

import { Metadata } from 'next';
import {  Urbanist  } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalProvider from '@/provider/ModalProvider';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactQueryProvider } from '@/provider/ReactQueryProvider';
const urbanist =  Urbanist ({ subsets: ['latin'] })
import AuthModalProvider from '@/provider/AuthModalProvider';

export const metadata:Metadata={
  title:"E-commerce",
  description:"E-commerce",
}
export default  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  
  return (
    <ReactQueryProvider>
    <html lang="en">
      <body className={urbanist.className}>
      <ModalProvider />
      <AuthModalProvider/>
        <ToastContainer
        position="top-center"
        theme="light"
       />
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>

    </ReactQueryProvider>
  )
}
