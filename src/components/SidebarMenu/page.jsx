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

  console.log('tipo usuario: ', userData.tipoUsuario);

  const topNavigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <HouseSimple weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
    {
      name: 'Consulta',
      href: '/consulta',
      icon: <MagnifyingGlass weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]

  const secondOption = [
    {
      name: 'Inserir consumo',
      href: '/inserir-consumo',
      icon: <Plus weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
    {
      name: 'Editar consumo',
      href: '/editar-consumo',
      icon: <NotePencil weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]
  const fiffthOption = [
    {
      name: 'Usuários cadastrados',
      href: '/lista-usuarios',
      icon: <ListBullets weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]
  const thirdOption = [
    {
      name: 'Criar projeto',
      href: '/criar-projeto',
      icon: <Plus weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]
  const fourthOption = [
    {
      name: 'Alterar Fatores de Emissão',
      href: '/editar-calculo',
      icon: <ArrowsCounterClockwise weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]

  const firstLevel = [
    {
      name: 'Cadastrar Usuário',
      href: '/cadastrar-usuario',
      icon: <UserList weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
    {
      name: 'Cadastrar cliente',
      href: '/cadastrar-cliente',
      icon: <UserPlus weight="thin" size={24} />,
      isActive: pathname === '/renovar-revenda',
      userType: userData?.tipoUsuario,
    },
    {
      name: 'Editar cliente',
      href: '/editar-cliente',
      icon: <NotePencil weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]
  const firstLevelOther = [
    {
      name: 'Cadastrar Usuário',
      href: '/cadastrar-usuario',
      icon: <UserList weight="thin" size={24} />,
      userType: userData?.tipoUsuario,
    },
  ]

  const reportsOptions = [
    {
      name: 'Listar Projetos',
      href: '/listar-projetos',
      icon: <FileText weight="thin" size={24} />,
      isActive: pathname === '/distribuidor/adicionar',
      userType: userData?.tipoUsuario,
    },
    {
      name: 'Clientes cadastrados por projeto',
      href: '/clientes-cadastrados',
      icon: <FileText weight="thin" size={24} />,
      isActive: pathname === '/distribuidor',
      userType: userData?.tipoUsuario,
    },
    {
      name: 'Clientes cadastrados por mês',
      href: '/clientes-por-projeto-e-mes',
      icon: <FileText weight="thin" size={24} />,
      isActive: pathname === '/distribuidor',
      userType: userData?.tipoUsuario,
    },
    // {
    //   name: '% de redução e beneficios recebidos',
    //   href: '/distribuidor',
    //   icon: <FileText weight="thin" size={24} />,
    //   isActive: pathname === '/distribuidor',
    //   userType: userData?.tipoUsuario,
    // },
    {
      name: 'Total de emissões evitadas',
      href: '/emissoes-evitadas',
      icon: <FileText weight="thin" size={24} />,
      isActive: pathname === '/distribuidor',
      userType: userData?.tipoUsuario,
    },
    // {
    //   name: 'Total de benefícios',
    //   href: '/distribuidor',
    //   icon: <FileText weight="thin" size={24} />,
    //   isActive: pathname === '/distribuidor',
    //   userType: userData?.tipoUsuario,
    // },
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
            {topNavigation.map((item, i) => (
              <MenuItem
                key={i}
                component={<Link href={item.href} />}
                className="hover:text-yellow bg-primary"
                icon={item.icon}
                onClick={() => setIsLoading(true)}
              >
                {item.name}
              </MenuItem>
            ))}
            {userData.tipoUsuario === 'administradorgeral' || userData.tipoUsuario === 'cadastrador' ? (
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
                    onClick={() => setIsLoading(true)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : null}
            {/* {userData.tipoUsuario === 'cadastrador' && (
              <SubMenu
                label="Cadastro"
                className="bg-primary"
                defaultOpen={true}
                icon={<ListBullets weight="thin" size={24} />}
              >
                {firstLevelOther.map((item, i) => (
                  <MenuItem
                    key={i}
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
            )} */}
            {userData.tipoUsuario === 'administradorgeral' || userData.tipoUsuario === 'cadastrador' ? (
              <SubMenu
                label="Consumo"
                className="bg-primary"
                defaultOpen={false}
                icon={<ListBullets weight="thin" size={24} />}
              >
                {secondOption.map((item, i) => (
                  <MenuItem
                    key={i}
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
            {/* {secondOption.map((item, i) => (
              <MenuItem
                key={i}
                component={<Link href={item.href} />}
                className="hover:text-yellow bg-primary"
                icon={item.icon}
              >
                {item.name}
              </MenuItem>
            ))} */}
            {fiffthOption.map((item, i) => (
              <>
                {userData.tipoUsuario === 'administradorgeral' ?
                  <MenuItem
                    key={i}
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
            {thirdOption.map((item, i) => (
              <>
                {userData.tipoUsuario === 'administradorgeral' ?
                  <MenuItem
                    key={i}
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

            {fourthOption.map((item, i) => (
              <>
                {userData.tipoUsuario === 'administradorgeral' ?

                  <MenuItem
                    key={i}
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

              {reportsOptions.map((item, i) => (
                <MenuItem
                  key={i}
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
