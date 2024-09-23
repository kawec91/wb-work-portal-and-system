import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';

const FormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    salary: z.string().min(1, "Salary is required").max(100),
    location: z.string({
      required_error: "Please select location to display.",
    }),
    image: z.string().min(1, "Password confirmation is required"),
    description: z.string(),
  });

export async function POST(req: Request) {
    try {
        const body = await req.json();

        //connect schema to body
        const { title, salary, location, image, description } = FormSchema.parse(body);

        //Create new Announcement
        const newAnnouncement = await db.announcement.create({
            data: {
                title,
                salary,
                location, 
                image, 
                description
            }
        })

        return NextResponse.json({ announcement: newAnnouncement, message: 'User created succesfully'}, {status: 201});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong."}, { status: 500 });
    }
}
