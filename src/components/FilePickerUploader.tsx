"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface FilePickerUploaderProps {
  onImageReady?: (file: { imageUrl: string; imageKey: string }) => void;
}

export default function FilePickerUploader({
  onImageReady,
}: FilePickerUploaderProps) {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        const uploadedFile = res[0]?.serverData;

        onImageReady?.(uploadedFile);
      }}
      onUploadError={(error: Error) => {
        toast.error(`Error: ${error.message}`);
      }}
    />
  );
}
