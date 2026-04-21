"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { MagnifyingGlassIcon, CheckIcon } from "@phosphor-icons/react";

const CommandContext = React.createContext<{
  listRef: React.RefObject<HTMLDivElement | null>;
}>({ listRef: { current: null } });

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  const listRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <CommandContext.Provider value={{ listRef }}>
      <CommandPrimitive
        data-slot="command"
        className={cn(
          "flex size-full flex-col overflow-hidden rounded-none bg-popover text-popover-foreground",
          className,
        )}
        {...props}
      />
    </CommandContext.Provider>
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-[15%] translate-y-0 overflow-hidden rounded-none p-0 sm:max-w-2xl",
          className,
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  onValueChange,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  const { listRef } = React.useContext(CommandContext);

  return (
    <div data-slot="command-input-wrapper" className="border-b pb-0">
      <InputGroup className="h-12 border-none border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-3!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-base outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          onValueChange={(value) => {
            onValueChange?.(value);
            setTimeout(() => {
              listRef.current?.scrollTo({ top: 0, behavior: "instant" });
            });
          }}
          {...props}
        />
        <InputGroupAddon>
          <MagnifyingGlassIcon className="size-5 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

function CommandList({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.List>, "ref">) {
  const { listRef } = React.useContext(CommandContext);

  return (
    <CommandPrimitive.List
      data-slot="command-list"
      ref={listRef}
      className={cn(
        "no-scrollbar max-h-[400px] scroll-py-0 overflow-x-hidden overflow-y-auto outline-none",
        className,
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-10 text-center text-sm", className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden text-foreground **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-sm **:[[cmdk-group-heading]]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default items-center gap-3 rounded-none px-4 py-3 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-none! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 data-selected:*:[svg]:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-sm tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
