"use client";

import { ChevronLeft, CommandIcon, MoreVertical, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
  CommandShortcut,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardCommands() {
  const [open, setOpen] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [page, setPage] = React.useState<"root" | "theme">("root");
  const { setTheme } = useTheme();

  // Keyboard shortcut: Ctrl/Cmd + Shift + P
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCtrlCmd = navigator.platform.toLowerCase().includes("mac") ? e.metaKey : e.ctrlKey;
      if (isCtrlCmd && e.shiftKey && (e.key === "P" || e.key === "p")) {
        e.preventDefault();
        setCmdOpen((v) => !v);
        setPage("root");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="shadow-xl" aria-label="CMD">
              <MoreVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="w-56">
            <DropdownMenuLabel>Commands</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette className="mr-2 size-4" /> Theme
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() => {
                setCmdOpen(true);
                setPage("root");
              }}
            >
              <CommandIcon className="mr-2 size-4" />
              Quick actions
              <CommandShortcut>Ctrl+Shift+P</CommandShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Command Palette */}
      <CommandDialog
        open={cmdOpen}
        onOpenChange={(v) => {
          setCmdOpen(v);
          if (!v) setPage("root");
        }}
      >
        <CommandDialog.Content>
          <CommandRoot label="Quick actions">
            <CommandInput
              placeholder={page === "root" ? "Type a command or search..." : "Theme…"}
              onKeyDown={(e: any) => {
                // Go back to root when input is empty and user presses Backspace
                const target = e.target as HTMLInputElement;
                if (e.key === "Backspace" && target.value === "" && page !== "root") {
                  setPage("root");
                  e.preventDefault();
                }
              }}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {page === "root" ? (
                <>
                  <CommandGroup heading="Dashboard">
                    <CommandItem
                      onSelect={() => {
                        window.dispatchEvent(new CustomEvent("dashboard:reset-zoom"));
                        setCmdOpen(false);
                      }}
                    >
                      Reset all chart zoom
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        window.location.href = "/dashboard";
                      }}
                    >
                      Go to Dashboard
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        window.location.href = "/configuration";
                      }}
                    >
                      Go to Configuration
                    </CommandItem>
                  </CommandGroup>

                  <CommandGroup heading="Preferences">
                    <CommandItem onSelect={() => setPage("theme")}>Theme</CommandItem>
                  </CommandGroup>
                </>
              ) : null}

              {page === "theme" ? (
                <>
                  <CommandGroup heading="Theme">
                    <CommandItem onSelect={() => setPage("root")}>
                      <ChevronLeft className="mr-2 size-4" /> Back
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setTheme("light");
                        setCmdOpen(false);
                      }}
                    >
                      Light
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setTheme("dark");
                        setCmdOpen(false);
                      }}
                    >
                      Dark
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        setTheme("system");
                        setCmdOpen(false);
                      }}
                    >
                      System
                    </CommandItem>
                  </CommandGroup>
                </>
              ) : null}
            </CommandList>
          </CommandRoot>
        </CommandDialog.Content>
      </CommandDialog>
    </>
  );
}
