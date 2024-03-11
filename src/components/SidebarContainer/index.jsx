'use client'
import { useState } from 'react'
// import SidebarNew from '@/components/SidebarNew'

export default function SidebarContainer(props) {
  // const [collapsed, setCollapsed] = useState(!(window?.innerWidth > 1280))
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={`hidden lg:block relative lg:w-[200px] xl:w-[280px] bg-blue-800`}
    >
      {/* <SidebarNew
        roleName={props.roleName}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        className="z-40"
      /> */}
    </div>
  )
}
