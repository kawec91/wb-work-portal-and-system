import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    //Get all Aplications data
    const res = await db.announcement.findMany();
    if(res.length === 0) return NextResponse.json({message: "There is 0 aplication's in database."})
    return NextResponse.json({message: "works"});
}