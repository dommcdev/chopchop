"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface FilePickerUploaderProps {
  onImageReady?: (file: { imageUrl: string; imageKey: string }) => void;
  onUploadingChange?: (isUploading: boolean) => void;
}

export default function FilePickerUploader({
  onImageReady,
  onUploadingChange,
}: FilePickerUploaderProps) {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      config={{ mode: "auto" }}
      onUploadBegin={() => {
        onUploadingChange?.(true);
      }}
      onClientUploadComplete={(res) => {
        const uploadedFile = res[0]?.serverData;

        onUploadingChange?.(false);
        onImageReady?.(uploadedFile);
      }}
      onUploadError={(error: Error) => {
        onUploadingChange?.(false);
        toast.error(`Error: ${error.message}`);
      }}
      onUploadAborted={() => {
        onUploadingChange?.(false);
      }}
    />
  );
}
