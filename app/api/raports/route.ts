import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    //Get all raports data
    const res = await db.aplications.findMany();
    if(res.length === 0) return NextResponse.json({message: "There is 0 raport's in database."})
    return NextResponse.json(res);
}