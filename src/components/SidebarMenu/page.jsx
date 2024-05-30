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
  Pencil,
  NotePencil,
  Plus,
  MagnifyingGlass,
  ArrowsCounterClockwise,
} from '@phosphor-icons/react'

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AuthProvider, useAuth } from "@/contexts/AuthContext";


export default function SidebarMenu(props) {
  const pathname = usePathname()

  const roleName = props.roleName

  const { userData, isLoading, setIsLoading } = useAuth();

  const topNavigation = [
    {
      id: 1,
      name: 'Dashboard',
      href: '/dashboard',
      icon: <HouseSimple weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
    {
      id: 2,
      name: 'Consulta',
      href: '/consulta',
      icon: <MagnifyingGlass weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]

  const secondOption = [
    {
      id: 3,
      name: 'Inserir consumo',
      href: '/inserir-consumo',
      icon: <Plus weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
    {
      id: 4,
      name: 'Editar consumo',
      href: '/editar-consumo',
      icon: <NotePencil weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]
  const fiffthOption = [
    {
      id: 5,
      name: 'Usuários cadastrados',
      href: '/lista-usuarios',
      icon: <ListBullets weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]
  const thirdOption = [
    {
      id: 6,
      name: 'Criar projeto',
      href: '/criar-projeto',
      icon: <Plus weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]
  const fourthOption = [
    {
      id: 7,
      name: 'Alterar Fatores de Emissão',
      href:'/editar-calculo',
      icon: <ArrowsCounterClockwise weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]

  const firstLevel = [
    {
      id: 8,
      name: 'Cadastrar Usuário',
      href: '/cadastrar-usuario',
      icon: <UserList weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
    {
      id: 9,
      name: 'Cadastrar cliente',
      href: '/cadastrar-cliente',
      icon: <UserPlus weight="thin" size={24} />,
      isActive: pathname === '/renovar-revenda',
      userType: userData?.tipoUsuario,
    },
    {
      id: 10,
      name: 'Editar cliente',
      href: '/editar-cliente',
      icon: <NotePencil weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]

  const reportsOptions = [
    {
      id: 11,
      name: 'Listar Projetos',
      href: '/listar-projetos',
      icon: <FileText weight="thin" size={24} />,
      isActive: pathname === '/distribuidor/adicionar',
      userType: userData?.tipoUsuario,
    },
    {
      id: 12,
      name: 'Clientes cadastrados por projeto',
      href: '/clientes-cadastrados',
      icon: <FileText weight="thin" size={24} />,
      isActive: pathname === '/distribuidor',
      userType: userData?.tipoUsuario,
    },
    {
      id: 13,
      name: 'Clientes cadastrados por mês',
      href: '/clientes-por-projeto-e-mes',
      icon: <FileText weight="thin" size={24} />,
      isActive: pathname === '/distribuidor',
      userType: userData?.tipoUsuario,
    },
    {
      id: 14,
      name: 'Total de emissões evitadas',
      href: '/emissoes-evitadas',
      icon: <FileText weight="thin" size={24} />,
      isActive: pathname === '/distribuidor',
      userType: userData?.tipoUsuario,
    }
  ]

  return (
    <>
      <Sidebar
        className="relative flex flex-col justify-between h-screen w-full text-sm text-white bg-white hover:bg-white z-40"
        collapsed={props.collapsed}
      >

        <img
          src="/v2/assets/logo.png"
          width={150}
          height={59}
          alt="Logotipo Parceria Digital Moura"
          className="mx-6 my-6 scale-110"
        />

        <div className="flex flex-col justify-between lg:h-[85%]  overflow-hidden">
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
            {topNavigation.map((item) => (
              <MenuItem
                key={item.id}
                component={<Link href={item.href} />}
                className="hover:text-yellow bg-primary"
                icon={item.icon}
                onClick={() => setIsLoading(true)}
              >
                {item.name}
              </MenuItem>
            ))}
            {userData?.tipoUsuario === 'administradorgeral' || userData?.tipoUsuario === 'cadastrador' ? (
              <SubMenu
                label="Cadastro"
                className="bg-primary"
                defaultOpen={true}
                icon={<ListBullets weight="thin" size={24} />}
              >
                {firstLevel.map((item) => (
                  <MenuItem
                    key={item.id}
                    component={<Link href={item.href} />}
                    className={`hover:text-yellow bg-primary/80 ${item.isActive && 'text-yellow'
                      } `}
                    icon={item.icon}
                    onClick={() => setIsLoading(true)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : null}
            {userData?.tipoUsuario === 'administradorgeral' || userData?.tipoUsuario === 'cadastrador' ? (
              <SubMenu
                label="Consumo"
                className="bg-primary"
                defaultOpen={false}
                icon={<ListBullets weight="thin" size={24} />}
              >
                {secondOption.map((item) => (
                  <MenuItem
                    key={item.id}
                    component={<Link href={item.href} />}
                    className={`hover:text-yellow bg-primary/80 ${item.isActive && 'text-yellow'
                      } `}
                    icon={item.icon}
                    onClick={() => setIsLoading(true)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : null}
            {fiffthOption.map((item) => (
              <>
                {userData?.tipoUsuario === 'administradorgeral' ?
                  <MenuItem
                    key={item.id}
                    component={<Link href={item.href} />}
                    className="hover:text-yellow bg-primary"
                    icon={item.icon}
                    onClick={() => setIsLoading(true)}
                  >
                    {item.name}
                  </MenuItem>
                  : null}
              </>
            ))}
            {thirdOption.map((item) => (
              <>
                {userData?.tipoUsuario === 'administradorgeral' ?
                  <MenuItem
                    key={item.id}
                    component={<Link href={item.href} />}
                    className="hover:text-yellow bg-primary"
                    icon={item.icon}
                    onClick={() => setIsLoading(true)}
                  >
                    {item.name}
                  </MenuItem>
                  : null}
              </>
            ))}

            {fourthOption.map((item) => (
              <>
                {userData?.tipoUsuario === 'administradorgeral' ?
                  <MenuItem
                    key={item.id}
                    component={<Link href={item.href} />}
                    className="hover:text-yellow bg-primary"
                    icon={item.icon}
                    onClick={() => setIsLoading(true)}
                  >

                    {item.name}
                  </MenuItem>
                  : null
                }
              </>
            ))}
            <SubMenu
              label="Relatórios"
              className="bg-primary"
              icon={<FileText weight="thin" size={24} />}
            >

              {reportsOptions.map((item) => (
                <MenuItem
                  key={item.id}
                  component={<Link href={item.href} />}
                  className="hover:text-yellow bg-primary/80"
                  icon={item.icon}
                  onClick={() => setIsLoading(true)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </SubMenu>
          </Menu>
        </div>
      </Sidebar>
    </>
  )
}