"use client"
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import logo from "@/public/images/logo.png"
import { useRouter } from "next/navigation";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
const LoginPage: React.FC = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const handelSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            if (!name) {
                toast.error("يرجى إدخال إسم المستخدم", {
                    style: {
                        fontFamily: "changa"
                    }
                });

            } else {
                await axios.post('/api/login', { name })
                toast.success("تم تسجيل الدخول بنجاح", {
                    style: {
                        fontFamily: "changa"
                    }
                });
                setName("")  // Clear the input field after successful login
                setTimeout(() => {

                    router.push('/')
                }, 1000);
            }

        } catch (error) {
            toast.error(error, {
                style: {
                    fontFamily: "changa"
                }
            });
        }
    }
    return (
        <div className="flex flex-col items-center justify-start h-screen  gap-y-16 my-3 w-full">
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
            {/* Header */}
            <div className="text-center">
                <Image
                    src={logo} // Replace with your logo's path
                    alt="Logo"
                    className="w-56 mx-auto mb-4"
                />
                <h1 className="text-4xl font-bold text-darkBlue">
                    إقامة أبواب بوسكورة GH 3
                </h1>
            </div>

            {/* Form Container */}
            <div className="bg-teal-700 text-white rounded-xl shadow-lg p-8 mt-6 w-2/6">
                <p className="text-center text-xl mb-6">
                    قم بالتسجيل للولوج إلى فضائك الخاص
                </p>

                {/* Form */}
                <form onSubmit={handelSubmit}>
                    {/* Username Input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">
                            إسم المستخدم:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 text-black"
                            placeholder="إدخل إسم المستخدم"
                        />
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
