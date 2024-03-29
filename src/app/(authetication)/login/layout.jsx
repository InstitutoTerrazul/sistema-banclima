import React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema Banclima Moeda social',
  description: '',
}

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <head >
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className={`${inter.className} bg-bgContent`}>
        <main className="flex flex-col xl:flex-row min-h-screen mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
