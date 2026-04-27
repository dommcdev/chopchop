"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

export default function FilePickerUploader() {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        toast.success("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error(`Error: ${error.message}`);
      }}
    />
  );
}
