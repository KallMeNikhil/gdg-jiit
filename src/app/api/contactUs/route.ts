import { EmailTemplate } from "@/src/components/contactUsEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactSchemaZod } from "@/src/validation/contactUsForm.validation";
import dbConnect from "@/src/lib/dbConnect";
import { ContactModel } from "@/src/model/contactFormModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();
    const parsed = ContactSchemaZod.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    const newContact = await ContactModel.create({
      name,
      email,
      message,
    });

    const { error } = await resend.emails.send({
      from: "GDG JIIT <onboarding@resend.dev>",
      to: ["shourya124sensei@gmail.com"],
      subject: "New Contact Form Submission",
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, data: newContact },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}