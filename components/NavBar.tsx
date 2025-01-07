"use client"
import Image from 'next/image'
import React, { MouseEvent } from 'react'
import logo from "@/public/images/logo.png"
import Link from 'next/link'
import { TbLogin2 } from "react-icons/tb";
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation'
export default function NavBar() {
    const pathname = usePathname()
    console.log(pathname)
    const showLine = (e: MouseEvent, isHover: boolean = false) => {
        e?.preventDefault()
        const element = e.currentTarget.lastElementChild?.classList
        if (isHover) {
            element?.replace("opacity-0", "opacity-100")
        } else {
            element?.replace("opacity-100", "opacity-0")
        }

    }
    return (
        <div className='p-4 shadow-xl flex items-center w-full justify-between'>
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
            <Link href={"/login"} className='rounded-md p-4 bg-[#E3F8FA] shadow-lg shadow-[#26C6DA] hover:text-white duration-300 hover:bg-[#76B9BF] hover:shadow-[#76B9BF] flex items-center gap-4 font-semibold' >تسجيل الدخول <TbLogin2 size={25} /></Link>
        </div>
    )
}
