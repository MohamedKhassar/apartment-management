"use client"
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import logo from "@/public/images/logo.png"
import { useRouter } from "next/navigation";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { RiLoader2Fill } from "react-icons/ri";
import { loginUser } from "@/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { IoEye, IoEyeOff } from "react-icons/io5";
const LoginPage: React.FC = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        name: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const { isLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch()
    const handelSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await dispatch(loginUser({ user }))
            unwrapResult(res);
            router.back();
        } catch (err) {
            toast.error(err as string, {
                style: {
                    fontFamily: "changa",
                },
            });
        }
    }
    return (
        <div className="flex flex-col items-center justify-start h-full  gap-y-16 my-3 w-full">
            {isLoading &&
                <div className="absolute top-0 left-0 w-full flex bg-black/30 backdrop-blur-md items-center h-full justify-center z-50">
                    <RiLoader2Fill className="animate-spin size-32 fill-darkBlue" />
                </div>
            }
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
            {/* Header */}
            <div className="text-center">
                <Image
                    src={logo} // Replace with your logo's path
                    alt="Logo"
                    className="w-56 mx-auto mb-4"
                />
                <h1 className='text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-darkBlue'>
                    إقامة أبواب بوسكورة GH 3
                </h1>
            </div>

            {/* Form Container */}
            <div className="bg-teal-700 text-white rounded-xl shadow-lg p-8 mt-6 lg:w-2/6 mx-4">
                <p className="text-center text-xl mb-6">
                    قم بالتسجيل للولوج إلى فضائك الخاص
                </p>

                {/* Form */}
                <form onSubmit={handelSubmit} className="space-y-8">
                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">
                            إسم المستخدم:
                            <b className="text-red-600"> * </b>
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 text-black"
                            placeholder="ادخل إسم المستخدم"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">
                            كلمة المرور:
                            <b className="text-red-600"> * </b>
                        </label>
                        <div className="relative flex flex-row-reverse items-center">

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 text-black"
                                placeholder="ادخل كلمة المرور"
                            />
                            <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute text-darkBlue left-3 z-0">
                                {showPassword ?
                                    <IoEyeOff className="size-6" />
                                    :
                                    <IoEye className="size-6" />
                                }
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 mt-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            دخول
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                        >
                            رجوع
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
