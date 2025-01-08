import userPaySchema from "@/models/userPaySchema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const cookie = await cookies()
        const { name } = await req.json();
        const userRole = await userPaySchema.findOne({
            name,
            $or: [
                { role: "admin" },
                { role: "superAdmin" }
            ]
        });
        if (userRole) {
            const user = {
                name: userRole.name,
                role: userRole.role,
            }
            cookie.set("name", user.name);
            cookie.set("role", user.role);
            return NextResponse.json({
                message: "تم الدخول بنجاح"
            });
        } else {
            throw new Error("لم يتم الدخول بنجاح")
        }
    } catch (error) {
        return NextResponse.json({
            message: (error as Error).message,
        }, {
            status: 401,
        });
    }
}