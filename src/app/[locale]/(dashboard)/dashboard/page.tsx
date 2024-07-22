'use client';

import { uploadFile } from "@/lib/cloudinary"

const Page = () => {

  return (
    <div>
      <form action={uploadFile}>
        <input type="file" name="file" />
        <button>Upload</button>
      </form>
    </div>
  );
};

export default Page;
