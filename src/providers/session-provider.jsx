'use client'

import { SessionProvider, useSession } from 'next-auth/react'

export const SessionProviders = ({ children }) => {
    const session = useSession()
  return <SessionProvider session={session}>{children}</SessionProvider>
}
