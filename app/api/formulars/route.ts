import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    //Get all Aplications data
    const res = await db.formulars.findMany();
    if(res.length === 0) return NextResponse.json({message: "There is 0 formulars in database."})
    return NextResponse.json(res);
}