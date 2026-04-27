"use client";

import Image from "next/image";
import { TrashIcon } from "@phosphor-icons/react";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FilePickerUploaderProps {
  imageUrl?: string;
  imageAlt?: string;
  onImageReady?: (file: { imageUrl: string; imageKey: string }) => void;
  onImageClear?: () => void;
  onUploadingChange?: (isUploading: boolean) => void;
}

export default function FilePickerUploader({
  imageUrl,
  imageAlt = "Uploaded recipe image",
  onImageReady,
  onImageClear,
  onUploadingChange,
}: FilePickerUploaderProps) {
  if (imageUrl) {
    return (
      <div className="border-border bg-card relative mt-2 h-[244px] w-full overflow-hidden rounded-none border border-dashed">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-left"
        />

        <button
          type="button"
          aria-label="Remove uploaded image"
          className="text-foreground absolute right-3 top-3 z-10 cursor-pointer transition-colors hover:text-destructive"
          onClick={onImageClear}
        >
          <TrashIcon className="size-5" weight="bold" />
        </button>
      </div>
    );
  }

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

        if (uploadedFile) {
          onImageReady?.(uploadedFile);
        }
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
