import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { zfd } from "zod-form-data";

// Define the form schema validation for application
const ApplicationSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().optional(),
  document: zfd
    .file()
    .refine((file) => file.size < 10000000, { // 10MB limit
      message: "Document can't be bigger than 10MB.",
    })
    .refine((file) => ["application/pdf", "image/jpeg", "image/png"].includes(file.type), {
      message: "Document format must be PDF, JPG, or PNG.",
    })
    .optional(),
  image: z.string().optional()
});

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();

    // Extract fields and files from FormData
    const email = formData.get("email") as string;
    const name = formData.get("name") as string | null;
    const document = formData.get("document") as File | null;
    const image = formData.get("image") as string | null;

    // Validate form data
    const parsedData = ApplicationSchema.parse({
      email, name, document, image,
    });

    let documentUrl = null;

    // Handle document upload if provided
    if (document) {
      const docBuffer = Buffer.from(await document.arrayBuffer());
      const docUploadDir = `/uploads/documents/${new Date().toISOString().slice(0, 10)}`;
      const docDir = join(process.cwd(), "public", docUploadDir);

      try {
        await stat(docDir);
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT") {
          await mkdir(docDir, { recursive: true });
        }
      }

      const docSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const docFilename = `${document.name.replace(/\.[^/.]+$/, "")}-${docSuffix}.${mime.getExtension(document.type)}`;
      await writeFile(`${docDir}/${docFilename}`, docBuffer);
      documentUrl = `${docUploadDir}/${docFilename}`;
    }


    // Save the application to the database
    const newApplication = await db.aplications.create({
      data: {
        email: parsedData.email,
        name: parsedData.name || null,
        document: documentUrl,
        image: parsedData.image || null,
      },
    });

    return NextResponse.json({ application: newApplication, message: 'Application created successfully' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
