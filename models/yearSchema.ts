import mongoose from "mongoose";

const YearsSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
        unique: true
    }
});

export default mongoose.models.years || mongoose.model("years", YearsSchema);
