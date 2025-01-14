"use client"
import { UserPay } from "@/lib/types";
import axios from "axios";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "motion/react";
const AddUserForm = ({ year, users, setAddNewUser }: { year: number, users: UserPay[] | undefined, setAddNewUser: Dispatch<SetStateAction<boolean>> }) => {
    const [user, setUser] = useState<UserPay>({
        name: "",
        homeNumber: 1,
        phoneNumber: "",
        paymentDetails: [{
            year: year,
        }]
    });
    const [loading, setLoading] = useState(false)

    const addUser = async (e: FormEvent) => {
        try {
            e.preventDefault();
            if (user.name && user.homeNumber) {
                const arabicRegex = /^[\u0600-\u06FF\s]+$/;
                if (arabicRegex.test(user.name)) {
                    if ((users && users.length == 0) || !users?.find(item => item.homeNumber == user.homeNumber)) {
                        setLoading(true)
                        const res = await axios.post("/api/users", user);
                        if (res.statusText === "OK") {

                            setUser({
                                ...user, name: "", homeNumber: 1

                            });
                            setTimeout(() => {
                                setAddNewUser(false)
                                setLoading(false)
                            }, 1000);
                            toast.success(res.data.message, {
                                style: {
                                    fontFamily: "changa"
                                }
                            });
                        }
                    } else {
                        toast.error("رقم المنزل مكرر", {
                            style: {
                                fontFamily: "changa"
                            }
                        });
                    }
                } else {
                    toast.error("الإسم يجب أن يكون عربي", {
                        style: {
                            fontFamily: "changa"
                        }
                    });
                }
            } else {
                toast.error('المرجو ملئ جميع المعلومات', {
                    style: {
                        fontFamily: "changa"
                    }
                });
            }
        } catch (err) {
            console.log(err)

        }
    }
    return (
        <motion.form
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: .5 } }}
            exit={{ scale: 0, transition: { duration: .1 } }}
            className="p-6 bg-white shadow-lg rounded-lg lg:w-1/4 w-3/4 mx-8 text-right"
        >
            <h2 className="text-2xl font-bold mb-6">إضافة شخص</h2>

            {/* Name */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    إسم
                </label>
                <input
                    type="text"
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="ادخل الإسم"
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
                    value={user.homeNumber}
                    min={1}
                    onChange={(e) =>
                        setUser({ ...user, homeNumber: Number(e.target.value) })
                    }
                    placeholder="Enter home number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="PhoneNumber"
                >
                    رقم الهاتف
                </label>
                <input
                    type="tel"
                    id="PhoneNumber"
                    value={user.phoneNumber}
                    onChange={(e) =>
                        setUser({ ...user, phoneNumber: e.target.value })
                    }
                    placeholder="ادخل رقم الهاتف"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-right"
                />
            </div>

            <button
                onClick={addUser}
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:cursor-wait"
            >
                إضافة شخص
            </button>
        </motion.form>
    );
};

export default AddUserForm;
