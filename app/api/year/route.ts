import userPaySchema from "@/models/userPaySchema";
import yearSchema from "@/models/yearSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { year } = await req.json()
        await yearSchema.create({ year: Number(year) })
        await userPaySchema.updateMany({}, {
            $push: {
                paymentDetails: {
                    year: Number(year),
                    monthlyPay: [
                        { month: "January", isPaid: false },
                        { month: "February", isPaid: false },
                        { month: "March", isPaid: false },
                        { month: "April", isPaid: false },
                        { month: "May", isPaid: false },
                        { month: "June", isPaid: false },
                        { month: "July", isPaid: false },
                        { month: "August", isPaid: false },
                        { month: "September", isPaid: false },
                        { month: "October", isPaid: false },
                        { month: "November", isPaid: false },
                        { month: "December", isPaid: false }
                    ]
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