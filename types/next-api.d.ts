// @types/next-api.d.ts
import { NextApiRequest } from 'next';
import { MulterFile } from 'multer';

declare module 'next' {
  interface NextApiRequest {
    file?: MulterFile; // This adds the file property
  }
}
