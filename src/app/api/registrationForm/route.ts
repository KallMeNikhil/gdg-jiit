import dbConnect from "@/src/lib/dbConnect";
import { FormModel, FormType } from "@/src/model/registrationFormSchema.model";
import { FormSchemaZod } from "@/src/validation/registrationForm.validation";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        await dbConnect();
        const body=await req.json();
        const parsed = FormSchemaZod.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json({ status: 400 });
        }
        const { name, email, mobileNo, year, batch, departmentInterested } = parsed.data;

        const existingEntry = await FormModel.findOne({ $or: [{ name }, { email }, { mobileNo }], })
        if (existingEntry) {
            return NextResponse.json(
                {
                    error: "Entry Already exists"
                },
                {
                    status: 409
                }
            )
        }
        else {
            const newEntry = await FormModel.create({
                name,
                email,
                mobileNo,
                year,
                batch,
                departmentInterested,
            });
            return NextResponse.json(
                { success: true, data: newEntry },
                { status: 201 }
            );
        }


    } catch (error) {
        console.error("API Error:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}