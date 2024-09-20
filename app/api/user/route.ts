import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import * as z from 'zod';

//Define input validation schema
const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters"),
  });

export async function POST(req: Request) {
    try {
        const body = await req.json();

        //connect schema to body
        const { email, username, password } = userSchema.parse(body);

        // Check if email already exist
        const existingEmail = await db.user.findUnique({
            where: {
                email: email
            }
        })

        //If email exist
        if (existingEmail) {
            return NextResponse.json({user: null, message: 'Email already taken.'}, { status: 409 });
        }
        
        // Check if username already exist
        const existingUsername = await db.user.findUnique({
            where: {
                username: username,
            }
        })

        //If username exist
        if (existingUsername) {
            return NextResponse.json({user: null, message: 'Username already taken.'}, {status: 409});
        }

        //Prepare Password
        const hashedPassword = await hash(password, 10);

        //Create New User
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        //Catch password and rest for output without password
        const { password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({ user: rest, message: 'User created succesfully'}, {status: 201});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong."}, { status: 500 });
    }
}