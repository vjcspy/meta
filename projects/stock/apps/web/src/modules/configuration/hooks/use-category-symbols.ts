import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import { useMarketCategories } from "@/modules/shared/hooks/use-market-categories";
import { type MarketSymbolCategory, saveMarketCategories } from "@/modules/shared/lib/jmeta/market-category-api";

// --- Types ---

type UseCategorySymbolsReturn = {
  localSymbols: Set<string>;
  toggleSymbol: (code: string) => void;
  isSymbolTicked: (code: string) => boolean;
  isSaving: boolean;
  saveError: string | null;
  dismissError: () => void;
};

const CATEGORIES_KEY = ["market-categories"] as const;
const DEBOUNCE_MS = 500;

// --- Hook ---

export function useCategorySymbols(categoryKey: string | null): UseCategorySymbolsReturn {
  const queryClient = useQueryClient();
  const { data: categories } = useMarketCategories();

  const [localSymbols, setLocalSymbols] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Refs for lifecycle management
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSavingRef = useRef(false);
  const pendingFlushRef = useRef(false);
  const prevCategoryKeyRef = useRef<string | null>(null);
  const localSymbolsRef = useRef<Set<string>>(new Set());
  const initializedKeyRef = useRef<string | null>(null);

  // Keep ref in sync with state
  localSymbolsRef.current = localSymbols;

  // --- Helpers ---

  /** Read server symbols from reactive data (not cache-only) */
  const getServerSymbols = useCallback(
    (key: string | null): Set<string> => {
      if (!key) return new Set();
      const cats = categories ?? queryClient.getQueryData<MarketSymbolCategory[]>(CATEGORIES_KEY) ?? [];
      const cat = cats.find((c) => c.key === key);
      return new Set(cat?.symbols ?? []);
    },
    [categories, queryClient],
  );

  const doSave = useCallback(
    async (key: string, symbols: Set<string>) => {
      if (isSavingRef.current) {
        pendingFlushRef.current = true;
        return;
      }

      const categories = queryClient.getQueryData<MarketSymbolCategory[]>(CATEGORIES_KEY) ?? [];
      const updated = categories.map((c) => (c.key === key ? { ...c, symbols: Array.from(symbols) } : c));

      isSavingRef.current = true;
      setIsSaving(true);

      try {
        await saveMarketCategories(updated);
        await queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
        setSaveError(null);
      } catch {
        setSaveError("Failed to save category changes");
        // Revert to server state
        const serverSymbols = getServerSymbols(key);
        setLocalSymbols(serverSymbols);
      } finally {
        isSavingRef.current = false;
        setIsSaving(false);

        // Process queued flush
        if (pendingFlushRef.current) {
          pendingFlushRef.current = false;
          const latestSymbols = localSymbolsRef.current;
          const serverSymbols = getServerSymbols(key);
          if (!setsEqual(latestSymbols, serverSymbols)) {
            void doSave(key, latestSymbols);
          }
        }
      }
    },
    [queryClient, getServerSymbols],
  );

  const flushPendingSave = useCallback(
    (key: string | null) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (!key) return;

      const currentLocal = localSymbolsRef.current;
      const serverSymbols = getServerSymbols(key);

      if (!setsEqual(currentLocal, serverSymbols)) {
        void doSave(key, currentLocal);
      }
    },
    [doSave, getServerSymbols],
  );

  // --- Category change: flush previous, reset local ---

  useEffect(() => {
    const prevKey = prevCategoryKeyRef.current;

    if (prevKey !== null && prevKey !== categoryKey) {
      flushPendingSave(prevKey);
    }

    prevCategoryKeyRef.current = categoryKey;

    // Reset local state to new category's symbols
    const serverSymbols = getServerSymbols(categoryKey);
    setLocalSymbols(serverSymbols);
    initializedKeyRef.current = categoryKey;
    setSaveError(null);
  }, [categoryKey, getServerSymbols, flushPendingSave]);

  // --- Re-init when categories data arrives (fixes async load timing) ---

  useEffect(() => {
    if (!categoryKey || !categories) return;
    // Only re-init if no pending edits (no active debounce timer)
    if (timerRef.current) return;
    // Only re-init if we haven't successfully initialized with actual data yet
    if (initializedKeyRef.current === categoryKey && localSymbols.size > 0) return;

    const serverSymbols = getServerSymbols(categoryKey);
    if (serverSymbols.size > 0 && !setsEqual(localSymbols, serverSymbols)) {
      setLocalSymbols(serverSymbols);
      initializedKeyRef.current = categoryKey;
    }
  }, [categories, categoryKey, getServerSymbols, localSymbols]);

  // --- Cleanup on unmount: flush, don't cancel ---

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      const key = prevCategoryKeyRef.current;
      if (key) {
        const currentLocal = localSymbolsRef.current;
        const serverSymbols = getServerSymbols(key);
        if (!setsEqual(currentLocal, serverSymbols)) {
          // Fire-and-forget flush on unmount
          void doSave(key, currentLocal);
        }
      }
    };
  }, []);

  // --- Actions ---

  const toggleSymbol = useCallback(
    (code: string) => {
      if (!categoryKey) return;

      setLocalSymbols((prev) => {
        const next = new Set(prev);
        if (next.has(code)) {
          next.delete(code);
        } else {
          next.add(code);
        }
        localSymbolsRef.current = next;

        // Reset debounce timer
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
          void doSave(categoryKey, localSymbolsRef.current);
        }, DEBOUNCE_MS);

        return next;
      });
    },
    [categoryKey, doSave],
  );

  const isSymbolTicked = useCallback((code: string) => localSymbols.has(code), [localSymbols]);

  const dismissError = useCallback(() => setSaveError(null), []);

  return { localSymbols, toggleSymbol, isSymbolTicked, isSaving, saveError, dismissError };
}

// --- Utilities ---

function setsEqual(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}
