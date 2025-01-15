"use client"
import AddNewYear from '@/components/AddNewYear';
import AddUserForm from '@/components/AddUser';
import EditUserForm from '@/components/EditUser';
import { useAppSelector } from '@/lib/hooks';
import { RoleEnum, UserPay } from '@/lib/types';
import axios from 'axios';
import { AnimatePresence } from 'motion/react';
import React, { useEffect, useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { RiEdit2Fill, RiLoader5Fill } from "react-icons/ri";
import { TbPlus } from 'react-icons/tb';
import { Bounce, ToastContainer } from 'react-toastify';

const Page = () => {
    const { user } = useAppSelector(state => state.auth)
    const months = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "غشت",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر"
    ];
    const [addNewYear, setAddNewYear] = useState(false)
    const [addNewUser, setAddNewUser] = useState(false)
    const [editUser, setEditUser] = useState(false)
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
    }, [currYear, addNewYear, addNewUser, editUser])
    const [selectedUser, setSelectedUser] = useState<UserPay | null>(null);

    const handleEditUser = (user: UserPay) => {
        setSelectedUser(user);
        setEditUser(true);
    };

    const handlePaymentStatusChange = async (userId: string | undefined, month: string, isPaid: boolean) => {
        try {
            const payload = {
                userId,
                year: currYear,
                monthlyPay: { month, isPaid }
            };
            // Send the update to the backend API
            await axios.put('/api/users', payload);
            setUserPay((prevUserPay) =>
                prevUserPay?.map(user =>
                    user._id === userId
                        ? {
                            ...user,
                            paymentDetails: user.paymentDetails.map(detail =>
                                detail.year === currYear
                                    ? {
                                        ...detail,
                                        monthlyPay: detail.monthlyPay?.map(payment =>
                                            payment.month === month
                                                ? { ...payment, isPaid }
                                                : payment
                                        )
                                    }
                                    : detail
                            )
                        }
                        : user
                )
            );

        } catch (error) {
            console.error("Error updating payment status:", error);
        }
    };

    return (
        <div className='flex flex-col gap-y-20 mx-10'>
            <AnimatePresence>
                {
                    addNewYear ? (
                        <div className='absolute bg-black/30 backdrop-blur-md w-full h-screen left-0 top-0 flex justify-center items-center z-50'>
                            <IoCloseCircle size={40} className='cursor-pointer text-red-500 hover:text-red-700 duration-300 absolute right-3 top-5' onClick={() => setAddNewYear(false)} />
                            <AddNewYear years={years} setAddNewYear={setAddNewYear} />
                        </div>
                    ) : addNewUser ? (
                        <div className='absolute bg-black/30 backdrop-blur-md w-full h-screen left-0 top-0 flex justify-center items-center z-50'>
                            <IoCloseCircle size={40} className='cursor-pointer text-red-500 hover:text-red-700 duration-300 absolute right-3 top-5' onClick={() => setAddNewUser(false)} />
                            <AddUserForm year={currYear} users={userPay} setAddNewUser={setAddNewUser} />
                        </div>
                    ) : null
                }
            </AnimatePresence>
            <ToastContainer
                position="top-center"
                autoClose={1000}
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
            <h1 className='text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-darkBlue'>تعديل حالة الدفع لشهر <b>{months[new Date().getMonth()]}</b></h1>
            {
                userPay ? (
                    <div className='w-full space-y-4'>
                        <div className='flex flex-wrap md:flex-nowrap gap-x-4 gap-y-4 items-center'>
                            {years && years.length > 0 &&
                                <select
                                    onChange={(e) => setCurrYear(Number(e.target.value))}
                                    className="border border-darkBlue rounded-lg p-3 appearance-none w-full sm:w-1/2"
                                    id="select_year"
                                    value={currYear} // Bind the selected value to the state
                                >
                                    {years.map(({ year }, i) => (
                                        <option key={i} value={Number(year)}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            }
                            {user?.name && user.role && (
                                <>
                                    <button onClick={() => setAddNewYear(true)} className='p-3 bg-darkBlue text-white rounded-lg flex items-center justify-center w-full sm:w-fit'>
                                        <TbPlus className='mr-2' /> أضف سنة جديدة
                                    </button>
                                    {years && years.length > 0 && (
                                        <button onClick={() => setAddNewUser(true)} className='p-3 bg-green-800 text-white rounded-lg flex items-center justify-center w-full sm:w-fit'>
                                            <TbPlus className='mr-2' /> أضف شخص جديدة
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        {
                            ((userPay && userPay.length > 0) || (years && years.length > 0)) && (
                                <div className='lg:overflow-x-hidden overflow-x-scroll'>
                                    <p className='font-semibold text-darkBlue text-xl sm:text-2xl md:text-3xl'>سنة {currYear}</p>
                                    <table className='table border-collapse border border-slate-500 w-full'>
                                        <thead>
                                            <tr className='table-row'>
                                                <th className="table-cell border border-slate-600">#رقم الشقة</th>
                                                <th className='table-cell border border-slate-600 p-5'>الاسم</th>
                                                {months.map((month, i) =>
                                                    <th key={i} className='table-cell border border-slate-600 p-5'>{month}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userPay && userPay.length > 0 &&
                                                userPay.filter(user => user.role !== RoleEnum.SUPER_ADMIN).map((user, i) => (
                                                    <tr className='table-row' key={i}>
                                                        <td className='table-cell border border-slate-600 text-center'>
                                                            {user.homeNumber}
                                                        </td>
                                                        <td className='table-cell border border-slate-600 p-3 text-center'>
                                                            <RiEdit2Fill
                                                                onClick={() => handleEditUser(user)}
                                                                className='fill-darkBlue cursor-pointer'
                                                            />

                                                            {user.name}
                                                            <AnimatePresence>
                                                                {editUser && selectedUser && (
                                                                    <div className='absolute bg-black/30 backdrop-blur-md w-full h-screen left-0 top-0 flex justify-center items-center z-50'>
                                                                        <IoCloseCircle
                                                                            size={40}
                                                                            className='cursor-pointer text-red-500 hover:text-red-700 duration-300 absolute right-3 top-5'
                                                                            onClick={() => {
                                                                                setEditUser(false);
                                                                                setSelectedUser(null);
                                                                            }}
                                                                        />
                                                                        <EditUserForm userData={selectedUser} setEditUser={setEditUser} />
                                                                    </div>
                                                                )}
                                                            </AnimatePresence>
                                                        </td>

                                                        {user.paymentDetails.find(({ year }) => year == currYear)?.monthlyPay?.map(({ isPaid, month }, i) => (
                                                            <td className="table-cell border border-slate-600 p-3 justify-center" key={i}>
                                                                <input
                                                                    type="checkbox"
                                                                    className="checked:bg-darkBlue w-full"
                                                                    checked={isPaid}
                                                                    name={`payment-status-${i}`}
                                                                    id={`payment-status-${i}`}
                                                                    onChange={() => handlePaymentStatusChange(user._id, month, !isPaid)} // Toggle the isPaid status
                                                                />
                                                            </td>
                                                        ))}

                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
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
}

export default Page;
