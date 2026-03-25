"use client";

import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandRoot,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { withStocks } from "@/modules/shared/hoc/withStocks";

const MAX_RESULTS = 20;
const MIN_CHARS = 3;

type SymbolAutocompleteOwnProps = {
  value: string;
  onCommit: (symbol: string) => void;
};

type InjectedProps = CombinedProps<[typeof withStocks]>;

function SymbolAutocompleteRender({
  value,
  onCommit,
  state,
}: SymbolAutocompleteOwnProps & InjectedProps) {
  const { stocks, stocksLoading } = state;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filteredStocks = useMemo(() => {
    if (!stocks.length || inputValue.length < MIN_CHARS) return [];
    const search = inputValue.toUpperCase();
    return stocks
      .filter((s) => s.code.toUpperCase().startsWith(search))
      .slice(0, MAX_RESULTS);
  }, [stocks, inputValue]);

  const emptyMessage = useMemo(() => {
    if (stocksLoading) return "Loading stocks…";
    if (!stocks.length && !stocksLoading) return "Failed to load stocks";
    if (inputValue.length < MIN_CHARS) return "Type 3+ characters to search";
    return "No symbols found";
  }, [stocksLoading, stocks.length, inputValue.length]);

  const handleSelect = useCallback(
    (code: string) => {
      setInputValue(code);
      onCommit(code);
      setOpen(false);
    },
    [onCommit],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && inputValue.length > 0) {
        const match = stocks.find(
          (s) => s.code.toUpperCase() === inputValue.toUpperCase(),
        );
        if (match) {
          handleSelect(match.code);
          e.preventDefault();
        } else if (!stocks.length) {
          onCommit(inputValue.toUpperCase());
          setOpen(false);
          e.preventDefault();
        }
      }
    },
    [inputValue, stocks, handleSelect, onCommit],
  );

  const handleBlur = useCallback(() => {
    if (inputValue.length === 0) {
      setInputValue(value);
      return;
    }
    const match = stocks.find(
      (s) => s.code.toUpperCase() === inputValue.toUpperCase(),
    );
    if (match) {
      handleSelect(match.code);
    } else {
      setInputValue(value);
    }
  }, [inputValue, stocks, value, handleSelect]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="no-drag h-8 w-32 justify-between px-2 text-sm font-normal"
        >
          <span className="truncate">{value || "Symbol…"}</span>
          <ChevronsUpDown className="ml-1 size-3.5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <CommandRoot shouldFilter={false}>
          <CommandInput
            placeholder="Search symbol…"
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
          <CommandList className="max-h-[240px]">
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {filteredStocks.length > 0 && (
              <CommandGroup>
                {filteredStocks.map((stock) => (
                  <CommandItem
                    key={stock.id}
                    value={stock.code}
                    onSelect={() => handleSelect(stock.code)}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-3.5",
                        stock.code === value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="font-mono text-sm">{stock.code}</span>
                    <span className="ml-2 truncate text-xs text-muted-foreground">
                      {stock.name}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </CommandRoot>
      </PopoverContent>
    </Popover>
  );
}

export default combineHOC(withStocks)<SymbolAutocompleteOwnProps>(
  SymbolAutocompleteRender,
);
