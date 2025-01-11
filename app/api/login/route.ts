import userPaySchema from "@/models/userPaySchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { name } = await req.json();
        if (name) {

            const userRole = await userPaySchema.findOne({
                name,
                $or: [
                    { role: "admin" },
                    { role: "superAdmin" }
                ]
            });
            if (userRole) {
                return NextResponse.json({
                    message: "تم الدخول بنجاح",
                    user: { name: userRole.name, role: userRole.role }
                });
            } else {
                throw new Error("لم يتم الدخول بنجاح")
            }
        } else {
            throw new Error("يرجى إدخال إسم المستخدم")
        }
    } catch (error) {
        return NextResponse.json({
            message: (error as Error).message,
        }, {
            status: 401,
        });
    }
}