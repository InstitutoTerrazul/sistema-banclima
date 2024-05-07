import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import '@/app/globals.css'
import SidebarContainer from '@/components/SidebarContainer'
import Header from '@/components/Header'
import HeaderMobile from '@/components/HeaderMobile'
import Loading from '@/components/Loading'
// import { SessionProviders } from '@/providers/session-provider'
// import Header from '@/components/Header'
// import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema Banclima Moeda social',
  description: '',
}

export default async function RootLayout({ children }) {
  //   const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      {/* <head >
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head> */}
      <body className={`${inter.className}`}>
        <main className="relative flex flex-col xl:flex-row bg-blue-300 min-h-screen mx-auto lg:max-w-[1920px]">
          <SidebarContainer />

          <div className="flex-1 transition duration-700 bg-bgContent pb-6 w-full lg:w-[1000px]">
            <Header />
            <HeaderMobile />
            <div className="flex flex-col gap-6 px-2 xl:px-6 pb-6 ml-0 lg:ml-24 xl:ml-0 z-10">
              {children}
            </div>
            <footer className="flex justify-end items-center gap-2 pr-6">

            </footer>
          </div>
          <Loading />
        </main>
      </body>
    </html>
  )
}
