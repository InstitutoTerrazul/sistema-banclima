import React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import Loading from '@/components/Loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema Banclima Moeda social',
  description: '',
}

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-bgContent`}>
        <main className="flex flex-col xl:flex-row min-h-screen mx-auto">
          {children}
          <Loading />
        </main>
      </body>
    </html>
  )
}
