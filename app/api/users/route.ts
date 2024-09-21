import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    //Get all users data
    const res = await db.user.findMany();

    const resWithoutPassword = []
    //Prepare all user data without password
    for(let i = 0 ; i < res.length; i++) {
        const {password: userPass, ...rest} = res[i];
        resWithoutPassword.push(rest);
    }

    return NextResponse.json(resWithoutPassword);
}