import userPaySchema from "@/models/userPaySchema";
import { NextRequest, NextResponse } from "next/server";
import "@/lib/connectDB"
import { Error } from "mongoose";
export const POST = async (req: NextRequest) => {
    try {
        const user = await req.json()
        await userPaySchema.create(user)
        return NextResponse.json({
            message: "تمت إضافة شخص بنجاح"
        });
    } catch (error) {
        const err = error as Error
        console.log(err)
        return NextResponse.json(err)
    }
}
export const GET = async () => {
    try {
        const data = await userPaySchema.find().sort({ homeNumber: 1 });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(error)
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        const { userId, year, monthlyPay } = await req.json(); // Array of update requests for each user

        await userPaySchema.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    // Update the monthlyPay for the specific month in the array
                    "paymentDetails.$[yearElem].monthlyPay.$[monthElem].isPaid": monthlyPay.isPaid,
                },
            },
            {
                arrayFilters: [
                    { "yearElem.year": year }, // Filter for the specific year
                    { "monthElem.month": monthlyPay.month } // Filter for the specific month
                ],
            }
        );

        return NextResponse.json({
            message: "Payment statuses updated successfully",
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating payment statuses:", error);
        const errorMessage = error as Error;
        return NextResponse.json({ message: "Server error", error: errorMessage }, { status: 500 });
    }
}
export const PATCH = async (req: NextRequest) => {
    try {
        const { _id, user } = await req.json();
        await userPaySchema.findByIdAndUpdate({ _id }, user);
        return NextResponse.json({ message: 'تم تحديث الشخص بنجاح' });
    } catch (error) {
        const errorMessage = error as {
            code: number;
            keyPattern: { homeNumber: number; phoneNumber: string };
            message: string;
        };
        console.log(errorMessage.keyPattern.homeNumber && true);
        if (errorMessage.code == 11000) {
            if (errorMessage.keyPattern.homeNumber) {
                return NextResponse.json({ message: "رقم المنزل مكرر" }, { status: 400 });
            }
            if (errorMessage.keyPattern.phoneNumber) {
                return NextResponse.json({ message: "رقم الهاتف مكرر" }, { status: 400 });
            }
        }
        return NextResponse.json({ message: errorMessage.message }, { status: 500 });
    }
}

