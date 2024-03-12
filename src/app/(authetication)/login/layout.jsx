import React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Parceria Digital Moura',
  description: 'Desenvolvido por Jogga Digital',
}

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-bgContent`}>
        <main className="flex flex-col xl:flex-row min-h-screen mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
