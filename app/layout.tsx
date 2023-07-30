"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './globals.css'
import {  Urbanist  } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer";
import Header from "@/components/ui/Header";
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
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="E-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>E-commerce</title>
      </head>
      <body className={urbanist.className}>
      <QueryClientProvider client={queryClient}>

        <ToastContainer
        position="top-center"/>
        <Navbar/>
        {children}
        <Footer/>
        </QueryClientProvider>
        </body>
    </html>
  )
}
