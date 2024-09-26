import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from 'zod';
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { zfd } from "zod-form-data";

const FormSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    salary: z.string().min(1, "Salary is required").max(100),
    location: z.string({
      required_error: "Please select location to display.",
    }),
    image: zfd
    .file()
    .refine((file) => file.size < 5000000, {
      message: "File can't be bigger than 5MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "File format must be either jpg, jpeg lub png.",
      }
    ),    
    description: z.string(),
  });

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();

//         //connect schema to body
//         const { title, salary, location, image, description } = FormSchema.parse(body);

//         //Image Prepare And Upload
//         const buffer = Buffer.from(await image.arrayBuffer());
//         const relativeUploadDir = `/uploads/annoucements/${new Date(Date.now())
//         .toLocaleDateString("id-ID", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//          })
//         .replace(/\//g, "-")}`;

//         const uploadDir = join(process.cwd(), "public", relativeUploadDir);

//         try {
//             await stat(uploadDir);
//         } catch (e) {
//             if ((e as NodeJS.ErrnoException).code === "ENOENT") {
//                 await mkdir(uploadDir, { recursive: true });
//             }
//             console.log((e as Error).message);
//         } 

//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//         const filename = `${image.name.replace(
//             /\.[^/.]+$/,
//             ""
//         )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
//         await writeFile(`${uploadDir}/${filename}`, buffer);
//         const fileUrl = `${relativeUploadDir}/${filename}`;
//         //END of uploading file and got a link

//         //Create new Announcement
//         const newAnnouncement = await db.announcement.create({
//             data: {
//                 title,
//                 salary,
//                 location, 
//                 image: fileUrl, 
//                 description
//             }
//         })

//         return NextResponse.json({ announcement: newAnnouncement, message: 'User created succesfully'}, {status: 201});
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ message: "Something went wrong."}, { status: 500 });
//     }
// }
export async function POST(req: Request) {
    try {
      // Parse form data instead of JSON
      const formData = await req.formData();
  
      // Extract fields and file from FormData
      const title = formData.get("title") as string;
      const salary = formData.get("salary") as string;
      const location = formData.get("location") as string;
      const description = formData.get("description") as string;
      const image = formData.get("image") as File;  // Extract the image file
  
      // Validate using zod schema
      const parsedData = FormSchema.parse({
        title, salary, location, description, image,
      });
  
      // Process the image
      const buffer = Buffer.from(await image.arrayBuffer());
      const relativeUploadDir = `/uploads/announcements/${new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).replace(/\//g, "-")}`;
  
      const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  
      try {
        await stat(uploadDir);
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT") {
          await mkdir(uploadDir, { recursive: true });
        }
      }
  
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;
  
      // Save to DB
      const newAnnouncement = await db.announcement.create({
        data: {
          title: parsedData.title,
          salary: parsedData.salary,
          location: parsedData.location,
          image: fileUrl,
          description: parsedData.description,
        },
      });
  
      return NextResponse.json({ announcement: newAnnouncement, message: 'Announcement created successfully' }, { status: 201 });
  
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
  }
  