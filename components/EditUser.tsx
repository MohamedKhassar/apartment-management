"use client"
import { RoleEnum, UserPay } from "@/lib/types";
// import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "motion/react";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { copyPass, generatePass } from "@/lib/generatePassword";
import { IoCopy } from "react-icons/io5";
import { cn } from "@/lib/utils";
const EditUserForm = ({ userData, setEditUser }: { userData: UserPay, setEditUser: Dispatch<SetStateAction<boolean>> }) => {
    const [user, setUser] = useState<UserPay>({
        name: userData.name || "",
        homeNumber: userData.homeNumber || 0,
        role: userData.role,
        paymentDetails: userData.paymentDetails,
        password: userData.password
    })
    const handleData = (key: string, value: string | number) => {
        setUser((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    const [loading, setLoading] = useState(false);
    const auth = useAppSelector(state => state.auth.user)
    const showToast = (message: string, type: 'success' | 'error') => {
        toast[type](message, {
            style: {
                fontFamily: "changa",
            },
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Check if all required fields are provided
        if (!user.name || !user.homeNumber) {
            showToast('المرجو ملئ جميع المعلومات', 'error');
            return;
        }

        // Validate that the name is in Arabic
        const arabicRegex = /^[\u0600-\u06FF\s]+$/;
        if (!arabicRegex.test(user.name)) {
            showToast('الإسم يجب أن يكون عربي', 'error');
            return;
        }

        // If role is not USER and password is empty, prompt user to fill all information
        if (user.role !== RoleEnum.USER && !user.password) {
            showToast("المرجو ملئ جميع المعلومات", 'error');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.patch('/api/users', { _id: userData?._id, user });
            showToast(res.data.message, 'success');
            setTimeout(() => {
                setLoading(false);
                setEditUser(false);
            }, 1000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                showToast(error.response.data.message, 'error');
            }
        }
    };

    const generatePasswords = (e: FormEvent) => {
        e.preventDefault();
        const password = generatePass();
        setUser({ ...user, password });
    }

    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.delete(`/api/users/${userData?._id}`);
            toast.success(res.data.message, {
                style: {
                    fontFamily: "changa"
                }
            });
            setTimeout(() => {
                setEditUser(false)
                setLoading(false);
            }, 1000);
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message, {
                    style: {
                        fontFamily: "changa"
                    }
                });
            }

        }
    }
    return (
        <motion.form
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: .5 } }}
            exit={{ scale: 0, transition: { duration: .1 } }}
            className="p-6 bg-white shadow-lg rounded-lg sm:w-1/2 w-full mx-8 text-right"
        >
            <h2 className="text-2xl font-bold mb-6">تعديل  شخص</h2>

            {/* Name */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    إسم
                </label>
                <input
                    type="text"
                    id="name"
                    defaultValue={user?.name}
                    onChange={(e) =>
                        handleData("name", e.target.value)
                    } placeholder="ادخل الإسم"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Home Number */}
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="homeNumber"
                >
                    رقم المنزل
                </label>
                <input
                    type="number"
                    id="homeNumber"
                    defaultValue={user?.homeNumber}
                    onChange={(e) =>
                        handleData("homeNumber", Number(e.target.value))
                    }
                    placeholder="Enter home number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            {auth?.role == RoleEnum.SUPER_ADMIN &&
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="role"
                    >
                        دور الشخص
                    </label>                    <select
                        className="border border-darkBlue rounded-lg p-3 appearance-none w-full capitalize text-left font-semibold"
                        defaultValue={userData?.role}
                        onChange={(e) =>
                            handleData("role", e.target.value as RoleEnum)
                        }
                        name="" id="">
                        <option className="capitalize" value={RoleEnum.USER}>{RoleEnum.USER}</option>
                        <option className="capitalize" value={RoleEnum.ADMIN}>{RoleEnum.ADMIN}</option>
                        <option className="capitalize" value={RoleEnum.SUPER_ADMIN}>{RoleEnum.SUPER_ADMIN}</option>
                    </select>
                </div>
            }
            {
                (user.role != RoleEnum.USER && (auth?.role == RoleEnum.SUPER_ADMIN || auth?.name == userData.name)) &&
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="password"
                    >
                        كلمة المرور
                    </label>
                    <div className={cn("grid grid-cols-1 gap-3",
                        auth?.role !== RoleEnum.SUPER_ADMIN ? "grid-cols-1" : "lg:grid-cols-2"
                    )}>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                id="password"
                                value={user.password}
                                onChange={(e) =>
                                    handleData("password", e.target.value)
                                }
                                style={{
                                    direction: "ltr"
                                }}
                                placeholder="كلمة المرور"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-left"
                            />
                            {

                                user.password &&
                                <IoCopy onClick={() => copyPass(user.password)} className="fill-darkBlue cursor-pointer absolute right-3" />
                            }

                        </div>
                        {
                            auth?.role == RoleEnum.SUPER_ADMIN &&
                            <button onClick={generatePasswords} className="bg-green-800 rounded-md text-white capitalize w-full p-3">{user.password ? "regenerate" : "generate"} password</button>
                        }
                    </div>
                </div>
            }
            <div className="flex gap-x-4">

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:cursor-wait"
                >
                    تعديل  شخص
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 disabled:cursor-wait"
                >
                    حذف  شخص
                </button>
            </div>
        </motion.form>
    );
};

export default EditUserForm;
