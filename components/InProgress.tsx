import Link from 'next/link'
import React from 'react'

const InProgress = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    🚧 الصفحة قيد التطوير 🚧
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    شكراً لزيارتك! نحن نعمل على هذه الصفحة حالياً.
                    <br />
                    يرجى العودة لاحقاً لمزيد من التحديثات.
                </p>
                <Link href={"/monthly-list"} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                    العودة إلى الصفحة الرئيسية
                </Link>
            </div>
        </div>)
}

export default InProgress