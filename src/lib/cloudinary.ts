'use server';
import { CLOUDINARY_STORAGE_FOLDER_NAME } from '@/shared/constants';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File;
  try {
    await new Promise(
      async (resolve, reject) =>
        cloudinary.uploader
          .upload_stream(
            {
              folder: CLOUDINARY_STORAGE_FOLDER_NAME,
            },
            (err, res) => {
              if (res) resolve(res);
              if (err) reject(err);
            },
          )
          .end(Buffer.from(await file.arrayBuffer())),
    );
  } catch (err) {
    throw new Error('Failed to upload file: ' + err);
  }
}

export { uploadFile };
