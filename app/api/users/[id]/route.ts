import userPaySchema from "@/models/userPaySchema";
import { NextRequest, NextResponse } from "next/server";

// Correct parameter typing and handling
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params; // Extract the id from the route params
        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        // Perform the delete operation
        const result = await userPaySchema.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'تم حذف الشخص بنجاح' }); // Success response
    } catch (error) {
        const errorMessage = (error as Error).message; // Typecasting error

        return NextResponse.json({ message: errorMessage }, { status: 500 }); // Error response
    }
};
