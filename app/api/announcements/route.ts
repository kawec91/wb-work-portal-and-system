import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        //Get all Announcements data
        const res = await db.announcement.findMany();
       
        return NextResponse.json(res);
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Something went wrong."})
    }
}