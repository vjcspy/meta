import { createHOC } from "@web/ui-extension";
import { useCallback, useState } from "react";

export const withDialogState = createHOC(() => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    state: { isOpen },
    actions: { open, close, toggle },
  };
}, "withDialogState");
