import mongoose, { Document, Schema } from "mongoose";

export interface FormType extends Document {
    name: string,
    email: string,
    mobileNo: number,
    year: number,
    batch: string,
    departmentInterested: "tech" | "ui/ux" | "management"
}

const FormSchema = new Schema<FormType>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    year: { type: Number, required: true },
    batch: { type: String, required: true },
    departmentInterested: {
        type: String,
        enum: ["tech", "ui/ux", "management"],
        required: true,
    },
});

export const FormModel =
    mongoose.models.FormModel ||
    mongoose.model<FormType>("Form", FormSchema);
