import Image from 'next/image'
import React from 'react'
import logo from "@/public/images/logo.png"
import Link from 'next/link'
import { TbLogin2 } from "react-icons/tb";
export default function NavBar() {
    return (
        <div className='p-4 shadow-xl flex items-center w-full justify-between'>
            <div className='flex items-center gap-x-4'>
                <Image src={logo.src} alt='' width={900} height={900} className=' h-[53px] w-[70px]' />
                <h1 className='font-semibold text-xl text-[#1E1E6C]'>إقامة أبواب بوسكورة GH 3</h1>
            </div>
            <ul className='flex justify-center gap-x-32 font-semibold'>
                <li className='hover:text-[#1E1E6C] flex'>
                    <h5>
                        الرئيسية
                    </h5>
                    <span className='w-full bg-[#1E1E6C] h-2'></span>
                </li>
                <li className='hover:text-[#1E1E6C] flex flex-col gap-y-1'>
                    <h5>
                        لائحة الأداء الشهري
                    </h5>
                    <span className='w-full bg-[#1E1E6C] h-2 rounded-md'></span>
                </li>
                <li className='hover:text-[#1E1E6C] flex'>
                    <h5>
                        الإعلان
                    </h5>
                    <span className='w-full bg-[#1E1E6C] h-2'></span>
                </li >
            </ul>
            <Link href={""} className='rounded-md p-4 bg-[#E3F8FA] shadow-lg shadow-[#26C6DA] hover:text-white duration-300 hover:bg-[#76B9BF] hover:shadow-[#76B9BF] flex items-center gap-4 font-semibold' >تسجيل الدخول <TbLogin2 size={25} /></Link>
        </div>
    )
}
