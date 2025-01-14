import userPaySchema from "@/models/userPaySchema";
import yearSchema from "@/models/yearSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { year } = await req.json()
        await yearSchema.create({ year: Number(year) })
        await userPaySchema.updateMany({ role: { $in: ['user', "admin"] } }, {
            $push: {
                paymentDetails: {
                    year: Number(year),
                }
            }
        })
        return NextResponse.json({
            message: `تمت إضافة ${year} `
        });
    } catch (error) {
        const err = error as Error
        return NextResponse.json(err)
    }
}
export const GET = async () => {
    try {
        const data = await yearSchema.find()
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(error)
    }
}