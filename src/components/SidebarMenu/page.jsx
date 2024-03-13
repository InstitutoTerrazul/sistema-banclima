'use client'
import Image from 'next/image'
import {
  ArrowsClockwise,
  HouseSimple,
  Info,
  Note,
  Pen,
  Question,
  UserList,
  UserPlus,
  UsersFour,
  Storefront,
  Graph,
  List,
  ListBullets,
  ListMagnifyingGlass,
  FileText,
} from '@phosphor-icons/react'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function SidebarMenu(props) {
  const pathname = usePathname()

  const roleName = props.roleName

  const topNavigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <HouseSimple weight="thin" size={24} />,
      isActive: pathname === '/',
      hasPermission: ['Distributor'],
    },
  ]
  const firstLevel = [
    {
      name: 'Cadastrar cadastrador',
      href: '/cadastrar-cadastrador',
      icon: <UserList weight="thin" size={24} />,
      isActive: pathname.includes('/cadastrar-revenda'),
      hasPermission: ['Distributor'],
    },
    {
      name: 'Cadastrar equipe',
      href: '/cadastrar-equipe',
      icon: <UsersFour weight="thin" size={24} />,
      isActive: pathname === '/alterar-revenda',
      hasPermission: ['Distributor'],
    },
    {
      name: 'Cadastrar cliente',
      href: '/cadastrar-cliente',
      icon: <UserPlus weight="thin" size={24} />,
      isActive: pathname === '/renovar-revenda',
      hasPermission: ['Distributor'],
    },
  ]

  const secondLevel = [
    // {
    //   name: 'Cadastrar distribuidor',
    //   href: '/distribuidor/adicionar',
    //   icon: <UserPlus weight="thin" size={24} />,
    //   isActive: pathname === '/distribuidor/adicionar',
    //   hasPermission: ['Administrator'],
    // },
    // {
    //   name: 'Ver todos os distribuidores',
    //   href: '/distribuidor',
    //   icon: <UsersFour weight="thin" size={24} />,
    //   isActive: pathname === '/distribuidor',
    //   hasPermission: ['Administrator'],
    // },
  ]

  let firstlevelFiltered = firstLevel
  let secondlevelFiltered = secondLevel
  if (props.roleName !== 'Administrator') {
    firstlevelFiltered = firstLevel.filter((item) =>
      item.hasPermission.includes(props.roleName),
    )
    secondlevelFiltered = secondLevel.filter((item) =>
      item.hasPermission.includes(props.roleName),
    )
  }

  // console.log('colapsed: ', collapsed);

  return (
    <>
      <Sidebar
        className="relative flex flex-col justify-between h-screen w-full text-sm text-white bg-white hover:bg-white z-40"
        collapsed={props.collapsed}
      >

        <Image
          src="/assets/logo.png"
          width={150}
          height={59}
          alt="Logotipo Parceria Digital Moura"
          className="mx-6 my-6 scale-110"
        />

        <div className="flex flex-col justify-between lg:h-[70%] 2xl:h-3/4 overflow-hidden">
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    backgroundColor: '#FFF',
                    color: '#019BD6',
                    '&:hover': {
                      backgroundColor: '#019BD6',
                      color: '#FFF',
                    },
                  }
                if (level === 1)
                  return {
                    backgroundColor: '#FFF',
                    color: '#019BD6',
                    '&:hover': {
                      backgroundColor: '#019BD6',
                      color: '#FFF',
                    },
                  }
              },
            }}
          >
            {topNavigation.map((item, i) => (
              <MenuItem
                key={i}
                component={<Link href={item.href} />}
                className="hover:text-yellow bg-primary"
                icon={item.icon}
              >
                {item.name}
              </MenuItem>
            ))}
            <SubMenu
              label="Cadastro"
              className="bg-primary"
              defaultOpen={true}
              icon={<ListBullets weight="thin" size={24} />}
            >
              {firstLevel.map((item, i) => (
                <MenuItem
                  key={i}
                  component={<Link href={item.href} />}
                  className={`hover:text-yellow bg-primary/80 ${item.isActive && 'text-yellow'
                    } `}
                  icon={item.icon}
                >
                  {item.name}
                </MenuItem>
              ))}
            </SubMenu>
              <SubMenu
                label="Consulta"
                className="bg-primary"
                icon={<ListMagnifyingGlass weight="thin" size={24} />}
              >
                {secondLevel.map((item, i) => (
                  <MenuItem
                    key={i}
                    component={<Link href={item.href} />}
                    className="hover:text-yellow bg-primary/80"
                    icon={item.icon}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </SubMenu>
              <SubMenu
                label="Relatórios"
                className="bg-primary"
                icon={<FileText weight="thin" size={24} />}
              >
                {secondLevel.map((item, i) => (
                  <MenuItem
                    key={i}
                    component={<Link href={item.href} />}
                    className="hover:text-yellow bg-primary/80"
                    icon={item.icon}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </SubMenu>
          </Menu>
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#FBB900',
                    },
                  }
                if (level === 1)
                  return {
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#FBB900',
                    },
                  }
              },
            }}
          >
          </Menu>
        </div>
      </Sidebar>
    </>
  )
}
