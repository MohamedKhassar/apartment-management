import userPaySchema from "@/models/userPaySchema";
import { NextRequest, NextResponse } from "next/server";
import "@/lib/connectDB"
import { Error } from "mongoose";
export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        await userPaySchema.create(data)
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