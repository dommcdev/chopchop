"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PencilSimpleLineIcon,
  PlusIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRecipeUpload } from "@/hooks/useRecipeUpload";
import { cn } from "@/lib/utils";

const optionClassName =
  "flex w-full items-start gap-4 border border-border bg-background p-4 text-left transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50";

function OptionBody({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <>
      <span
        className="mt-0.5 shrink-0 text-primary [&_svg]:size-6"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
    </>
  );
}

export function NewRecipeDialog() {
  const [open, setOpen] = useState(false);
  const { openFilePicker, isAnalyzing, fileInputProps } = useRecipeUpload({
    onFileAccepted: () => setOpen(false),
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              variant="outline"
              className="w-fit items-center gap-2 px-3 shadow-sm sm:px-4"
              disabled={isAnalyzing}
              aria-label="New recipe"
            />
          }
        >
          <PlusIcon className="size-4 shrink-0" weight="bold" />
          <span className="hidden text-sm font-medium md:inline-block">
            New recipe
          </span>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>New recipe</DialogTitle>
            <DialogDescription>
              Upload a photo or PDF and ChopChop fills in the fields, or start
              blank.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className={optionClassName}
              onClick={openFilePicker}
              disabled={isAnalyzing}
            >
              <OptionBody
                icon={<UploadSimpleIcon weight="duotone" />}
                title="Upload a photo or PDF"
                description="A cookbook page, a printout, or a handwritten card."
              />
            </button>
            <Link
              href="/dashboard/r/new"
              className={cn(optionClassName)}
              onClick={() => setOpen(false)}
            >
              <OptionBody
                icon={<PencilSimpleLineIcon weight="duotone" />}
                title="Start from scratch"
                description="Type it in yourself."
              />
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <input {...fileInputProps} />
    </>
  );
}
