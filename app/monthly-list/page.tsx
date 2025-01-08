"use client"
import AddNewYear from '@/components/AddNewYear';
import AddUserForm from '@/components/AddUser';
import { RoleEnum, UserPay } from '@/lib/types';
import axios from 'axios';
import { AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react'
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { RiLoader5Fill } from "react-icons/ri";
import { TbPlus } from 'react-icons/tb';
import { Bounce, ToastContainer } from 'react-toastify';

const Page = () => {
    const months = [
        { english: "January", arabic: "يناير" },
        { english: "February", arabic: "فبراير" },
        { english: "March", arabic: "مارس" },
        { english: "April", arabic: "أبريل" },
        { english: "May", arabic: "مايو" },
        { english: "June", arabic: "يونيو" },
        { english: "July", arabic: "يوليو" },
        { english: "August", arabic: "غشت" },
        { english: "September", arabic: "سبتمبر" },
        { english: "October", arabic: "أكتوبر" },
        { english: "November", arabic: "نوفمبر" },
        { english: "December", arabic: "ديسمبر" }
    ];
    const [addNewYear, setAddNewYear] = useState(false)
    const [addNewUser, setAddNewUser] = useState(false)
    const [currYear, setCurrYear] = useState(Number(new Date().getFullYear()))
    const [userPay, setUserPay] = useState<UserPay[]>()
    const [years, setYears] = useState<{ year: number }[]>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userPay = (await axios.get("/api/users")).data
                const years = (await axios.get("/api/year")).data
                setUserPay(userPay)
                setYears(years)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currYear, addNewYear, addNewUser])
    return (
        <div className='flex flex-col gap-y-32 mx-8 justify-center'>
            <AnimatePresence>
                {
                    addNewYear ?

                        <div
                            className='absolute bg-black/30 backdrop-blur-md w-full h-screen left-0 top-0 flex justify-center items-center z-50'>
                            <IoCloseCircle size={40} className='cursor-pointer text-red-500 hover:text-red-700 duration-300 absolute right-3 top-5' onClick={() => setAddNewYear(false)} />
                            <AddNewYear years={years} setAddNewYear={setAddNewYear} />
                        </div>
                        :
                        addNewUser ?
                            <div
                                className='absolute bg-black/30 backdrop-blur-md w-full h-screen left-0 top-0 flex justify-center items-center z-50'>
                                <IoCloseCircle size={40} className='cursor-pointer text-red-500 hover:text-red-700 duration-300 absolute right-3 top-5' onClick={() => setAddNewUser(false)} />

                                <AddUserForm users={userPay} setAddNewUser={setAddNewUser} />
                            </div>
                            :
                            null
                }
            </AnimatePresence>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                closeButton={false}
                transition={Bounce}
            />
            <h1 className='text-center font-semibold text-5xl text-darkBlue'>لائحة الأداء الشهري</h1>
            {
                userPay ?
                    <div className='w-full space-y-4'>
                        <div className='flex w-6/12 gap-x-4 items-center'>
                            {years && years?.length > 0 &&
                                <select
                                    onChange={(e) => setCurrYear(Number(e.target.value))}
                                    className="border border-darkBlue rounded-lg p-3 appearance-none w-1/2"
                                    id="select_year"
                                    value={currYear} // Bind the selected value to the state
                                >
                                    {years?.map(({ year }, i) => (
                                        <option key={i} value={Number(year)}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            }
                            <button onClick={() => setAddNewYear(true)} className='p-3 bg-darkBlue text-white rounded-lg w-fit flex items-center flex-row-reverse justify-between'><TbPlus className='size-7' /> أضف سنة جديدة</button>
                            <button onClick={() => setAddNewUser(true)} className='p-3 bg-green-800 text-white rounded-lg w-fit flex items-center flex-row-reverse justify-between'><TbPlus className='size-7' /> أضف شخص جديدة</button>
                        </div>
                        <p className='font-semibold text-darkBlue text-2xl'>سنة {currYear}</p>
                        <table className='table border-collapse border border-slate-500 w-full'>
                            <thead>
                                <tr className='table-row'>
                                    <th className="table-cell border border-slate-600">#رقم الشقة</th>
                                    <th className='table-cell border border-slate-600 p-5'>الاسم</th>
                                    {months.map((month, i) =>
                                        <th key={i} className='table-cell border border-slate-600 p-5'>{month.arabic}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {userPay && userPay?.length > 0 &&
                                    userPay?.filter(user => user.role !== RoleEnum.SUPER_ADMIN).map((user, i) =>
                                        <tr className='table-row' key={i}>
                                            <td className='table-cell border border-slate-600 text-center'>
                                                {user.homeNumber}
                                            </td>
                                            <td className='table-cell border border-slate-600 p-3 text-center'>
                                                {user.name}
                                            </td>
                                            {user.paymentDetails.find(({ year }) => year == currYear)?.monthlyPay.map(({ isPaid }, i) =>
                                                <td className='table-cell border border-slate-600 p-3' key={i}>
                                                    {isPaid ? <IoCheckmarkCircle className='fill-green-600 size-7 w-full' /> : <IoCloseCircle className='fill-red-600 size-7 w-full' />}
                                                </td>
                                            )
                                            }
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='flex justify-center items-center h-3/4 z-0'>

                        <RiLoader5Fill className='size-32 animate-spin fill-darkBlue' />
                    </div>
            }
        </div >
    )
}

export default Page