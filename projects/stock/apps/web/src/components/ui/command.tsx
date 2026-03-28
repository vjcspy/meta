"use client";

import { Command } from "cmdk";
import * as React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/modules/shared/lib/utils";

// Root
export function CommandDialog(props: React.ComponentProps<typeof Dialog>) {
  return <Dialog {...props} />;
}

// Command wrapped in DialogContent
CommandDialog.Content = function CommandDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return <DialogContent className={cn("p-0 overflow-hidden", className)} {...props} />;
};

// Command Root
export function CommandRoot({ className, ...props }: React.ComponentProps<typeof Command>) {
  return (
    <Command
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...props}
    />
  );
}

// Command Input
export function CommandInput({ className, ...props }: React.ComponentProps<typeof Command.Input>) {
  return (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
      <Command.Input
        className={cn(
          "placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-hidden",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({ className, ...props }: React.ComponentProps<typeof Command.List>) {
  return <Command.List className={cn("max-h-[400px] overflow-y-auto overflow-x-hidden p-1", className)} {...props} />;
}

export function CommandEmpty({ className, ...props }: React.ComponentProps<typeof Command.Empty>) {
  return <Command.Empty className={cn("py-6 text-center text-sm text-muted-foreground", className)} {...props} />;
}

export function CommandGroup({ className, ...props }: React.ComponentProps<typeof Command.Group>) {
  return (
    <Command.Group
      className={cn(
        "[&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function CommandSeparator({ className, ...props }: React.ComponentProps<typeof Command.Separator>) {
  return <Command.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />;
}

export function CommandItem({ className, ...props }: React.ComponentProps<typeof Command.Item>) {
  return (
    <Command.Item
      className={cn(
        "aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden",
        className,
      )}
      {...props}
    />
  );
}

export function CommandShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)} {...props} />;
}
