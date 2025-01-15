"use client"
import Image from 'next/image'
import React, { MouseEvent, useEffect, useState } from 'react'
import logo from "@/public/images/logo.png"
import Link from 'next/link'
import { TbLogin2 } from "react-icons/tb";
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation'
import { RiUser2Fill } from 'react-icons/ri'
import { IoClose, IoLogOut, IoMenu } from 'react-icons/io5'
import { getUser, logout } from '@/slice/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
export default function NavBar() {
    const router = useRouter()
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
    const [isMenu, setIsMenu] = useState(false);

    const toggleLogout = () => {
        setShowLogout((prev) => !prev);
    };
    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getUser())
            setIsMenu(false)
        }
        fetchUser()
    }, [pathname, dispatch])
    return (
        <div className={cn('p-4 shadow-xl flex items-center w-full justify-between sticky left-0 top-0 z-50 bg-white',
            pathname === '/login' && 'hidden'
        )}>
            <Link href={"/monthly-list"} className='flex items-center gap-x-4 w-fit'>
                <Image src={logo.src} alt='' width={900} height={900} className=' h-[53px] w-[70px]' />
                <h1 className='font-semibold lg:text-xl text-[#1E1E6C] md:text-lg text-sm'>إقامات أبواب بوسكورة GH 3</h1>
            </Link>
            <ul className='xl:flex hidden justify-start gap-x-32 font-semibold'>
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
                {
                    user?.name &&
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
                        <Link href={"/dashboard"}>
                            فضائك الخاص
                        </Link>
                        <span className={cn('w-full bg-[#1E1E6C] h-2 rounded-md duration-700',
                            pathname !== '/dashboard' ? 'opacity-0' : "bg-[#1E1E6C]"
                        )}></span>
                    </li >
                }
            </ul>
            {(user?.name && user.role)
                ?
                <div
                    className="space-y-6 relative group lg:block hidden"
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
                            router.refresh()
                        }}
                        className={`cursor-pointer rounded-md p-4 bg-red-600 shadow-lg shadow-red-800 text-white duration-300 hover:bg-red-700 hover:shadow-red-950 items-center gap-2 font-semibold absolute left-0 text-nowrap text-sm w-fit ${showLogout ? 'md:flex' : 'hidden'}`}
                    >
                        تسجيل الخروج
                        <IoLogOut className='size-5' />
                    </button>
                </div>

                :
                <Link href={"/login"} className='lg:flex hidden rounded-md p-4 bg-[#E3F8FA] shadow-lg shadow-[#26C6DA] hover:text-white duration-300 hover:bg-[#76B9BF] hover:shadow-[#76B9BF]  items-center gap-4 font-semibold' >تسجيل الدخول <TbLogin2 size={25} /></Link>
            }
            {
                !isMenu ?
                    <IoMenu className='size-8 text-darkBlue lg:hidden' onClick={() => setIsMenu(true)} />
                    :
                    <IoClose className='size-8 text-darkBlue lg:hidden' onClick={() => setIsMenu(false)} />
            }


            <AnimatePresence>
                {isMenu && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute left-0 top-[5.4rem] w-full h-screen bg-darkBlue/60 backdrop-blur-md lg:hidden"
                    >
                        <ul className="flex xl:hidden flex-col w-full gap-y-10 h-full justify-center items-center font-semibold">
                            <li
                                onMouseEnter={(event: MouseEvent) => showLine(event, true)}
                                onMouseLeave={(event) => showLine(event, false)}
                                className={cn(
                                    "hover:text-[#1E1E6C] flex flex-col",
                                    pathname === "/" && "text-[#1E1E6C]"
                                )}
                            >
                                <Link href={"/"}>الرئيسية</Link>
                                <span
                                    className={cn(
                                        "w-full bg-[#1E1E6C] h-2 rounded duration-700",
                                        pathname !== "/" ? "opacity-0" : "opacity-100"
                                    )}
                                ></span>
                            </li>
                            <li
                                onMouseEnter={(event: MouseEvent) => showLine(event, true)}
                                onMouseLeave={(event) => showLine(event, false)}
                                className={cn(
                                    "hover:text-[#1E1E6C] flex flex-col",
                                    pathname === "/monthly-list" && "text-[#1E1E6C]"
                                )}
                            >
                                <Link href={"/monthly-list"}>لائحة الأداء الشهري</Link>
                                <span
                                    className={cn(
                                        "w-full bg-[#1E1E6C] h-2 rounded-md duration-700",
                                        pathname !== "/monthly-list" ? "opacity-0" : "opacity-100"
                                    )}
                                ></span>
                            </li>
                            <li
                                onMouseEnter={(event: MouseEvent) => showLine(event, true)}
                                onMouseLeave={(event) => showLine(event, false)}
                                className={cn(
                                    "hover:text-[#1E1E6C] flex flex-col",
                                    pathname === "/announcement" && "text-[#1E1E6C]"
                                )}
                            >
                                <Link href={"/announcement"}>الإعلان</Link>
                                <span
                                    className={cn(
                                        "w-full bg-[#1E1E6C] h-2 rounded-md duration-700",
                                        pathname !== "/announcement" ? "opacity-0" : "opacity-100"
                                    )}
                                ></span>
                            </li>
                            {user?.name &&
                                <li
                                    onMouseEnter={(event: MouseEvent) => showLine(event, true)}
                                    onMouseLeave={(event) => showLine(event, false)}
                                    className={cn(
                                        "hover:text-[#1E1E6C] flex flex-col",
                                        pathname === "/dashboard" && "text-[#1E1E6C]"
                                    )}
                                >
                                    <Link href={"/dashboard"}>فضائك الخاص</Link>
                                    <span
                                        className={cn(
                                            "w-full bg-[#1E1E6C] h-2 rounded-md duration-700",
                                            pathname !== "/dashboard" ? "opacity-0" : "opacity-100"
                                        )}
                                    ></span>
                                </li>

                            }
                            <li>
                                {(user?.name && user.role)
                                    ?
                                    <div
                                        className="space-y-6 relative group block lg:hidden"
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
                                                router.refresh()
                                            }}
                                            className={`cursor-pointer rounded-md p-4 bg-red-600 shadow-lg shadow-red-800 text-white duration-300 hover:bg-red-700 hover:shadow-red-950 items-center text-center font-semibold text-nowrap text-sm w-full ${showLogout ? 'flex' : 'hidden'}`}
                                        >
                                            تسجيل الخروج
                                        </button>
                                    </div>

                                    :
                                    <Link href={"/login"} className='flex  rounded-md p-4 bg-[#E3F8FA] shadow-lg shadow-[#26C6DA] hover:text-white duration-300 hover:bg-[#76B9BF] hover:shadow-[#76B9BF]  items-center gap-4 font-semibold' >تسجيل الدخول <TbLogin2 size={25} /></Link>
                                }
                            </li>

                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
