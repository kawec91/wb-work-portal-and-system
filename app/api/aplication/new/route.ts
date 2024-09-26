// app/api/aplication/new/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/db';


// Setup multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), 'public/uploads/files', req.body.email);
    fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Middleware to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Using multer to handle the incoming request
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  upload.single('document')(req as any, res as any, async (err: any) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading file." });
    }

    const { email, name, image } = req.body;
    const documentPath = `/uploads/files/${email}/${req.file?.originalname}`;

    // Save the application data to the database
    try {
      await db.aplications.create({
        data: {
          email,
          name,
          image,
          document: documentPath,
        },
      });
      return res.status(200).json({ message: "File uploaded successfully." });
    } catch (error) {
      return res.status(500).json({ error: "Error saving to database." });
    }
  });
};

export default handler;
