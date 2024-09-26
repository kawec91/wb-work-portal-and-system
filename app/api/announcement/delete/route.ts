import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(req: Request) {
  try {
    // Extract the ID from the query parameter
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Fetch the announcement from the database by ID
    const announcement = await db.announcement.findUnique({
      where: { id: Number(id) },
    });

    if (!announcement) {
      return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
    }

    // Construct the absolute file path using the image URL stored in the database
    const filePath = join(process.cwd(), "public", announcement.image);

    // Delete the file from the server
    try {
      await unlink(filePath);
      console.log(`File deleted: ${filePath}`);
    } catch (error) {
      console.error("File deletion failed:", error);
      return NextResponse.json({ message: "Failed to delete file from the server." }, { status: 500 });
    }

    // Delete the record from the database
    await db.announcement.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Announcement deleted successfully." }, { status: 200 });

  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
