import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    //Get all users data
    const res = await db.user.findMany();

    const resWithoutPassword = []
    //Prepare all user data without password
    for(let i = 0 ; i < res.length; i++) {
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password: _, ...rest} = res[i];
        
        resWithoutPassword.push(rest);
    }

    return NextResponse.json(resWithoutPassword);
}