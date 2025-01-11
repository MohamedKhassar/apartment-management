"use client"
import Image from 'next/image'
import React, { MouseEvent, useEffect, useState } from 'react'
import logo from "@/public/images/logo.png"
import Link from 'next/link'
import { TbLogin2 } from "react-icons/tb";
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation'
import { RiUser2Fill } from 'react-icons/ri'
import { IoLogOut } from 'react-icons/io5'
import { getUser, logout } from '@/slice/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
export default function NavBar() {
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.auth)

    const showLine = (e: MouseEvent, isHover: boolean = false) => {
        e?.preventDefault()
        const element = e.currentTarget.lastElementChild?.classList
        if (isHover) {
            element?.replace("opacity-0", "opacity-100")
        } else {
            element?.replace("opacity-100", "opacity-0")
        }

    }
    const [showLogout, setShowLogout] = useState(false);

    const toggleLogout = () => {
        setShowLogout((prev) => !prev);
    };
    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getUser())
        }
        fetchUser()
    }, [pathname, dispatch])
    return (
        <div className={cn('p-4 shadow-xl flex items-center w-full justify-between',
            pathname === '/login' && 'hidden'
        )}>
            <Link href={"/"} className='flex items-center gap-x-4'>
                <Image src={logo.src} alt='' width={900} height={900} className=' h-[53px] w-[70px]' />
                <h1 className='font-semibold text-xl text-[#1E1E6C]'>إقامات أبواب بوسكورة GH 3</h1>
            </Link>
            <ul className='flex justify-start gap-x-32 font-semibold'>
                <li
                    onMouseEnter={
                        (event: MouseEvent) => showLine(event, true)
                    }
                    onMouseLeave={
                        (event) => showLine(event, false)
                    }
                    className={cn('hover:text-[#1E1E6C] flex flex-col',
                        pathname === '/' && 'text-[#1E1E6C]'
                    )}>
                    <Link href={"/"}>
                        الرئيسية
                    </Link>
                    <span className={cn('w-full bg-[#1E1E6C] h-2 rounded duration-700',
                        pathname !== '/' ? 'opacity-0' : "bg-[#1E1E6C]"
                    )}></span>
                </li>
                <li
                    onMouseEnter={
                        (event: MouseEvent) => showLine(event, true)
                    }
                    onMouseLeave={
                        (event) => showLine(event, false)
                    }
                    className={cn('hover:text-[#1E1E6C] flex flex-col',
                        pathname === '/monthly-list' && 'text-[#1E1E6C]'
                    )}>
                    <Link href={'/monthly-list'}>
                        لائحة الأداء الشهري
                    </Link>
                    <span className={cn('w-full bg-[#1E1E6C] h-2 rounded-md duration-700',
                        pathname !== '/monthly-list' ? 'opacity-0' : "bg-[#1E1E6C]"
                    )}></span>
                </li>
                <li
                    onMouseEnter={
                        (event: MouseEvent) => showLine(event, true)
                    }
                    onMouseLeave={
                        (event) => showLine(event, false)
                    }
                    className={cn('hover:text-[#1E1E6C] flex flex-col',
                        pathname === '/announcement' && 'text-[#1E1E6C]'
                    )}>
                    <Link href={"/announcement"}>
                        الإعلان
                    </Link>
                    <span className={cn('w-full bg-[#1E1E6C] h-2 rounded-md duration-700',
                        pathname !== '/announcement' ? 'opacity-0' : "bg-[#1E1E6C]"
                    )}></span>
                </li >
            </ul>
            {(user?.name && user.role)
                ?
                <div
                    className="space-y-6 relative group"
                    onClick={toggleLogout} // Toggle on click
                >
                    {/* Parent div */}
                    <div className="rounded-md cursor-pointer p-4 bg-[#E3F8FA] shadow-lg shadow-[#26C6DA] hover:text-white duration-300 hover:bg-[#76B9BF] hover:shadow-[#76B9BF] flex items-center gap-4 font-semibold">
                        {user.name}
                        <RiUser2Fill size={25} />
                    </div>

                    {/* Logout button */}
                    <button type="button"
                        onClick={() => {
                            dispatch(logout())
                        }}
                        className={`cursor-pointer rounded-md p-4 bg-red-600 shadow-lg shadow-red-800 text-white duration-300 hover:bg-red-700 hover:shadow-red-950 items-center gap-2 font-semibold absolute left-0 text-nowrap text-sm w-full ${showLogout ? 'flex' : 'hidden'}`}
                    >
                        تسجيل الخروج
                        <IoLogOut size={25} />
                    </button>
                </div>

                :
                <Link href={"/login"} className='rounded-md p-4 bg-[#E3F8FA] shadow-lg shadow-[#26C6DA] hover:text-white duration-300 hover:bg-[#76B9BF] hover:shadow-[#76B9BF] flex items-center gap-4 font-semibold' >تسجيل الدخول <TbLogin2 size={25} /></Link>
            }
        </div>
    )
}
