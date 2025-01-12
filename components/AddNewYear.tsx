import React, { FormEvent, useState } from 'react'
import { toast, } from 'react-toastify'
import { motion } from "motion/react"
import axios from 'axios'

const AddNewYear = ({ years, setAddNewYear }: { years: { year: number }[] | undefined, setAddNewYear: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [newYear, setNewYear] = useState(Number(new Date().getFullYear()))
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            if (years?.find(({ year }) => year === newYear)) {
                toast.error(`السنة موجودة مسبقا`, {
                    style: {
                        fontFamily: "changa"
                    }
                });
                return
            } else {

                const year = await axios.post("/api/year", { year: newYear })
                setTimeout(() => {
                    setAddNewYear(false)
                }, 1000);
                toast.success(year.data.message, {
                    style: {
                        fontFamily: "changa"
                    }
                });
            }
        } catch (error) {
            console.log(error)
            toast.error(`السنة موجودة مسبقا`, {
                style: {
                    fontFamily: "changa"
                }
            });
        }
    }
    return (
        <motion.form
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: .5 } }}
            exit={{ scale: 0, transition: { duration: .1 } }}
            className="p-6 bg-white shadow-lg rounded-lg lg:w-1/4 w-1/2 mx-8 text-right"
            onSubmit={handleSubmit}
        >

            <h2 className="text-2xl font-bold mb-6">إضافة سنة جديدة</h2>

            <div className="mb-4">
                <input
                    type="number"
                    id="homeNumber"
                    value={newYear}
                    onChange={(e) =>
                        setNewYear(Number(e.target.value) <= Number(new Date().getFullYear()) ? Number(new Date().getFullYear()) : Number(e.target.value))
                    }
                    min={Number(new Date().getFullYear())}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            <button
                type='submit'
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                إضافة سنة جديدة
            </button>
        </motion.form>
    )
}

export default AddNewYear