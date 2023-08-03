"use client"
import './globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

import {  Urbanist  } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalProvider from '@/provider/ModalProvider';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
const urbanist =  Urbanist ({ subsets: ['latin'] })


export default  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="E-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>E-commerce</title>
      </Head>
      <body className={urbanist.className}>
      <QueryClientProvider client={queryClient}>
      <ModalProvider />
        <ToastContainer
        position="top-center"
        theme="light"
       />
        <Navbar/>
        {children}
        <Footer/>
        </QueryClientProvider>
        </body>
    </html>
  )
}
