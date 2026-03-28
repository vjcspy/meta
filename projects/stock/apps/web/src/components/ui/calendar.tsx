"use client";

import "react-day-picker/dist/style.css";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/modules/shared/lib/utils";

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  className?: string;
};

function Calendar({ className, ...props }: CalendarProps) {
  return <DayPicker showOutsideDays className={cn("[--radius:0.75rem] p-2", className)} {...props} />;
}

export { Calendar };
