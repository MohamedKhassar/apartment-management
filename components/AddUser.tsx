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
        paymentDetails: [{
            year: year,
        }]
    });
    const handleData = (key: string, value: string | number) => {
        setUser((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    const [loading, setLoading] = useState(false)
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;
    const toastStyle = { fontFamily: "changa" };

    const addUser = async (e: FormEvent) => {
        e.preventDefault();
        if (!user.name || !user.homeNumber) {
            toast.error("المرجو ملئ جميع المعلومات", { style: toastStyle });
            return;
        }
        if (!arabicRegex.test(user.name)) {
            toast.error("الإسم يجب أن يكون عربي", { style: toastStyle });
            return;
        }
        const isDuplicate = users?.some(item => item.homeNumber === user.homeNumber);
        if (isDuplicate) {
            toast.error("رقم المنزل مكرر", { style: toastStyle });
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post("/api/users", user);

            if (res.status === 200) {
                setUser({ ...user, name: "", homeNumber: 1 });
                setTimeout(() => {
                    setAddNewUser(false);
                    setLoading(false);
                }, 1000);

                toast.success(res.data.message, { style: toastStyle });
            }
        } catch (err) {
            console.error("Error adding user:", err);
            toast.error("حدث خطأ أثناء إضافة المستخدم", { style: toastStyle });
        } finally {
            setLoading(false);
        }
    };

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
                    إسم<b className="text-red-600">*</b>
                </label>
                <input
                    type="text"
                    id="name"
                    value={user.name}
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
                    رقم المنزل<b className="text-red-600">*</b>
                </label>
                <input
                    type="number"
                    id="homeNumber"
                    value={user.homeNumber}
                    min={1}
                    onChange={(e) =>
                        handleData("homeNumber", Number(e.target.value))
                    }
                    placeholder="Enter home number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
