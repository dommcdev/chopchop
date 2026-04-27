"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
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
      config={{ mode: "auto", cn }}
      className={cn(
        "border-border bg-card text-card-foreground w-full rounded-none transition-colors",
      )}
      appearance={{
        container: ({ isDragActive }) =>
          cn(
            "border-border bg-card text-card-foreground rounded-none",
            isDragActive && "border-primary bg-muted/50",
          ),
        uploadIcon: "text-muted-foreground",
        label:
          "cursor-pointer font-medium data-[state=readying]:text-primary data-[state=uploading]:text-primary data-[state=ready]:text-primary data-[state=ready]:hover:text-primary/70",
        allowedContent: "text-muted-foreground",
        button: ({ isUploading }) =>
          cn(
            "cursor-pointer rounded-none bg-primary text-primary-foreground after:bg-primary/80 focus-within:ring-1 focus-within:ring-ring/50 focus-within:ring-offset-0",
            "disabled:pointer-events-auto data-[state=disabled]:cursor-pointer data-[state=disabled]:bg-primary data-[state=disabled]:text-primary-foreground data-[state=disabled]:opacity-100",
            "data-[state=ready]:bg-primary data-[state=ready]:text-primary-foreground",
            "data-[state=readying]:bg-primary data-[state=uploading]:bg-primary",
            isUploading && "cursor-wait",
          ),
      }}
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
