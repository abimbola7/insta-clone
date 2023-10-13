import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Feeds from '@/components/feeds'
import NextAuthSessionProvider from './provider/sessionProvider'
import RecoilContextProvider from './provider/recoilContextProvider'
import Modal from '@/components/modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Instagram Clone',
  description: 'An Instagram Clone built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50 min-h-screen overflow-y-scroll scrollbar-hide"}>
      {/* Header */}
      {/* Feeds */}
      
      {/* Modal */}
      <NextAuthSessionProvider>
        <RecoilContextProvider>
          <Header  />
          <Modal />
          {children}
        </RecoilContextProvider>
      </NextAuthSessionProvider>
      </body>
    </html>
  )
}
