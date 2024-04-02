import { Resend } from "resend";
import {ConfirmationEmail} from "../../../emails/index";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const response = await req.json();

    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [response.data.Email],
            subject: 'Booking Confirmation',
            react: ConfirmationEmail({response}),
        });

        return NextResponse.json({data});
    } catch (error) {
        return NextResponse.json({error});
    }
}