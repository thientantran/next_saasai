import CrispProvider from "@/components/CrispProvider"
import ModalProvider from "@/components/ModalProvider"
import { ToasterProvider } from "@/components/ToasterProvider"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tan"s AI',
  description: 'AI Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider/>
        <body className={inter.className}>
          <ModalProvider/>
          <ToasterProvider/>
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}
