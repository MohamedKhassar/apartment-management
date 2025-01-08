import mongoose from "mongoose";

const MonthlyPaySchema = new mongoose.Schema({
    month: { type: String, required: true },
    isPaid: { type: Boolean, default: false }
});

const PaymentDetailsSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    monthlyPay: { type: [MonthlyPaySchema], default: [] }
});

const UserPaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    homeNumber: { type: Number, required: true, unique: true },
    phoneNumber: { type: Number, unique: true, nullable: true },
    role: { type: String, enum: ['admin', 'superAdmin', 'user'], default: "user" },
    paymentDetails: { type: [PaymentDetailsSchema], default: [] }
});

export default mongoose.models.users || mongoose.model("users", UserPaySchema);
