import { createHOC } from "@web/ui-extension";
import { useCallback, useMemo, useState } from "react";

export const withAutocompleteSearch = createHOC(
  (props: { state?: { stocks?: Array<{ code: string; name: string; id: number }> } }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const stocks = props.state?.stocks ?? [];
    const filteredItems = useMemo(() => {
      if (searchQuery.length < 3 || !stocks.length) return [];
      const search = searchQuery.toUpperCase();
      return stocks.filter((s) => s.code.toUpperCase().startsWith(search)).slice(0, 20);
    }, [stocks, searchQuery]);

    const resetSearch = useCallback(() => setSearchQuery(""), []);

    return {
      state: { searchQuery, filteredItems },
      actions: { setSearchQuery, resetSearch },
    };
  },
  "withAutocompleteSearch",
);
