import './globals.css'
import type { Metadata } from 'next'
import {  Urbanist  } from 'next/font/google'

const urbanist =  Urbanist ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-commerce',
  description: 'E-commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>{children}</body>
    </html>
  )
}
