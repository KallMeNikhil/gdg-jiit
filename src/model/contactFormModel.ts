import mongoose, { Document, Schema } from "mongoose";

export interface ContactForm extends Document {
    name: string;
    email: string;
    message: string;
}

const ContactSchema = new Schema<ContactForm>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
    },
    {
        collection: "contact_us",
    }
);


export const ContactModel =
    mongoose.models.Contact || mongoose.model<ContactForm>("Contact", ContactSchema);
