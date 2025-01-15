"use client";

import { useRouter } from "next/navigation";
import { TbNetworkOff } from "react-icons/tb";

// import Image from "next/image";

export default function NetworkIsOff() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
            {/* Icon */}
            <div className="mb-6 flex w-fit h-fit items-center justify-center rounded-full bg-red-100">
                <TbNetworkOff className="size-20 m-5 stroke-darkBlue" />
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-right">
                أنت غير متصل بالإنترنت
            </h1>

            {/* Message */}
            <p className="text-lg text-gray-600 text-center max-w-md">
                يبدو أن اتصالك بالإنترنت غير متاح حاليًا. من فضلك تحقق من إعدادات الشبكة وحاول إعادة الاتصال.
            </p>

            {/* Retry Button */}
            <button
                onClick={() => router.refresh()}
                className="mt-6 px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition duration-300"
            >
                إعادة محاولة الاتصال
            </button>
        </div>
    );
}
