"use client";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type DatePickerProps = {
  date?: Date;
  onChange?: (date?: Date) => void;
  label?: string;
};

export function DatePicker({ date, onChange, label }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      {label ? <span className="px-1 text-xs text-muted-foreground">{label}</span> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="no-drag h-8 min-w-36 justify-between font-normal">
            {date ? format(date, "yyyy-MM-dd") : "Select date"}
            <ChevronDownIcon className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              onChange?.(d ?? undefined);
              setOpen(false);
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
