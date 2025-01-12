"use client"
import { RoleEnum, UserPay } from '@/lib/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { RiLoader5Fill } from "react-icons/ri";

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
    const [currYear, setCurrYear] = useState(Number(new Date().getFullYear()));
    const [userPay, setUserPay] = useState<UserPay[]>();
    const [years, setYears] = useState<{ year: number }[]>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userPay = (await axios.get("/api/users")).data;
                const years = (await axios.get("/api/year")).data;
                setUserPay(userPay);
                setYears(years);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [currYear]);


    return (
        <div className='flex flex-col lg:gap-y-32 gap-y-10 mx-8 justify-center items-center my-24' >
            <h1 className='text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-darkBlue'>لائحة الأداء الشهري</h1>
            {userPay ? (
                <div className='w-full space-y-4'>
                    <div className='grid lg:grid-cols-2 lg:w-1/2 gap-x-4 items-center'>
                        {years && years.length > 0 && (
                            <select
                                onChange={(e) => setCurrYear(Number(e.target.value))}
                                className="border border-darkBlue rounded-lg p-3 appearance-none w-full"
                                id="select_year"
                                value={currYear}
                            >
                                {years.map(({ year }, i) => (
                                    <option key={i} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    {((userPay && userPay.length > 0) || (years && years.length > 0)) && (
                        <div className='lg:overflow-x-hidden overflow-x-scroll'>
                            <p className='font-semibold text-darkBlue text-2xl'>سنة {currYear}</p>

                            <div className="print-content">
                                <table className='table border-collapse border border-slate-500 w-full'>
                                    <thead>
                                        <tr className='table-row'>
                                            <th className="table-cell border border-slate-600">#رقم الشقة</th>
                                            <th className='table-cell border border-slate-600 p-5'>الاسم</th>
                                            {months.map((month, i) => (
                                                <th key={i} className='table-cell border border-slate-600 p-5'>{month.arabic}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userPay &&
                                            userPay.filter((user) => user.role !== RoleEnum.SUPER_ADMIN).map((user, i) => (
                                                <tr className='table-row' key={i}>
                                                    <td className='table-cell border border-slate-600 text-center'>{user.homeNumber}</td>
                                                    <td className='table-cell border border-slate-600 p-3 text-center'>{user.name}</td>
                                                    {user.paymentDetails.find(({ year }) => year == currYear)?.monthlyPay.map(({ isPaid }, i) => (
                                                        <td className='table-cell border border-slate-600 p-3' key={i}>
                                                            {isPaid ? <IoCheckmarkCircle className='fill-green-600 size-7 w-full' /> : <IoCloseCircle className='fill-red-600 size-7 w-full' />}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex justify-center items-center h-3/4 z-0'>
                    <RiLoader5Fill className='size-32 animate-spin fill-darkBlue' />
                </div>
            )}
        </div>
    );
};

export default Page;
