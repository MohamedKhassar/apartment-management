import userPaySchema from "@/models/userPaySchema";
import { NextResponse } from "next/server";

export const DELETE = async (req: Response, { params }: { params: { id: string } }) => {
    try {
        const { id } = params
        await userPaySchema.findByIdAndDelete(id);
        return NextResponse.json({ message: 'تم حذف الشخص بنجاح' });
    } catch (error) {
        const errorMessage = error as {
            message: string;
        };

        return NextResponse.json({ message: errorMessage.message }, { status: 500 });
    }
}
