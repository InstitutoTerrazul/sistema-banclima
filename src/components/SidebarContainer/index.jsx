'use client'
import { useState } from 'react'
import SidebarMenu from '../SidebarMenu/page'
// import SidebarNew from '@/components/SidebarNew'

export default function SidebarContainer(props) {
  // const [collapsed, setCollapsed] = useState(!(window?.innerWidth > 1280))
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`hidden lg:block relative lg:w-[200px] xl:w-[250px] bg-white`}
    >
      <SidebarMenu />
    </div>
  )
}
