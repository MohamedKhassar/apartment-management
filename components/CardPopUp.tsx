import { UserPay } from "@/lib/types";
import React from "react";
import { motion } from "motion/react";
interface CardPopupProps {
    user: UserPay;
    onClose: () => void;
}

const CardPopup: React.FC<CardPopupProps> = ({ user: { name, homeNumber, phoneNumber }, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { duration: .5 } }}
                exit={{ scale: 0, transition: { duration: .1 } }}
                className="p-6 bg-white shadow-lg rounded-lg sm:w-1/2 w-full mx-8 text-right" >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-darkBlue">تفاصيل الشخص</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                    >
                        ✖
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <div>
                        <span className="block text-sm text-gray-500">الاسم:</span>
                        <span className="block text-lg font-semibold text-gray-800">{name}</span>
                    </div>
                    <div>
                        <span className="block text-sm text-gray-500">رقم المنزل:</span>
                        <span className="block text-lg font-semibold text-gray-800">{homeNumber}</span>
                    </div>
                    {phoneNumber &&
                        <div>
                            <span className="block text-sm text-gray-500">رقم الهاتف:</span>
                            <span className="block text-lg font-semibold text-gray-800">{phoneNumber}</span>
                        </div>
                    }
                </div>
            </motion.div>
        </div>
    );
};

export default CardPopup;
