import mongoose from "mongoose";
const MonthlyPaySchema = new mongoose.Schema({
    month: {
        type: String,
        enum: [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October',
            'November', 'December'
        ],
        required: true
    },
    isPaid: { type: Boolean, default: false }
});

// Define the PaymentDetailsSchema
const PaymentDetailsSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    monthlyPay: {
        type: [MonthlyPaySchema],
        default: () => [
            { month: 'January' }, { month: 'February' }, { month: 'March' },
            { month: 'April' }, { month: 'May' }, { month: 'June' },
            { month: 'July' }, { month: 'August' }, { month: 'September' },
            { month: 'October' }, { month: 'November' }, { month: 'December' }
        ]
    }
});

const UserPaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String },
    homeNumber: { type: Number, required: true, unique: true },
    role: { type: String, enum: ['admin', 'superAdmin', 'user'], default: "user" },
    paymentDetails: { type: [PaymentDetailsSchema] }
});
export default mongoose.models.users || mongoose.model("users", UserPaySchema);
