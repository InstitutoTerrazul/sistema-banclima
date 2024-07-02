'use client'
import SidebarMenu from '../SidebarMenu/page'

export default function SidebarContainer(props) {
  return (
    <div
      className={`hidden lg:block relative lg:w-[200px] xl:w-[250px] bg-white`}
    >
      <SidebarMenu />
    </div>
  )
}
