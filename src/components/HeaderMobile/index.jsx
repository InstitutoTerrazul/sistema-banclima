
'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const navigation = [
    { name: 'Dashboard', href: '#home' },
    { name: 'Consulta', href: '#mission' },
    { name: 'Cadastrar usuário', href: '#plans' },
    { name: 'Cadastrar cliente', href: '#projects' },
    { name: 'Editar cliente', href: '#projects' },
    { name: 'Inserir consumo', href: '#projects' },
    { name: 'Editar consumo', href: '#projects' },
    { name: 'Usuários cadastrados', href: '#projects' },
    
]

export default function HeaderMobile() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="relative inset-x-0 top-0 z-50 bg-transparent flex lg:hidden">
            <div className='flex flex-row items-center justify-center w-full shadow-lg shadow-black/5'>
                <nav className="lg:max-w-screen-xl 2xl:max-w-screen-2xl flex items-center justify-between p-6 lg:px-8 w-full z-50 relative" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-10 w-auto"
                                src="/logo.png"
                                alt=""
                            />
                        </a>
                        <span className='text-black font-bold text-lg'>Sistema de gestão - Bolsa de crédito de carbono comunitária</span>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-50"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6 text-black" aria-hidden="true" />
                        </button>
                    </div>
                    {/* <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className="text-base hover:text-accent font-semibold leading-6 text-black">
                                {item.name}
                            </a>
                        ))}
                    </div> */}
                </nav>
            </div>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="/logo.svg"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-primary hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
