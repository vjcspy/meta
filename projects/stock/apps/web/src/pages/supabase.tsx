import React, { useEffect, useState } from "react";

import { getSupabaseClient } from "@/lib/supabase/client";

type Row = Record<string, any>;

export default function SupabaseDemoPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("stock_trading_feature_candles")
          .select("*")
          .limit(10);

        console.log("[supabase] fetched rows:", data?.length ?? 0, {
          data,
          error,
        });

        if (data) {
          console.log(JSON.stringify(data[0], null, 2));
        }

        if (error) {
          setErrorMsg(error.message);
        } else {
          setRows(data ?? []);
        }
      } catch (e: any) {
        console.error("[supabase] error:", e);
        setErrorMsg(e?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Supabase Demo</h1>
      {loading && <p>Loading...</p>}
      {!loading && errorMsg && (
        <p style={{ color: "red" }}>Error: {errorMsg}</p>
      )}
      {!loading && !errorMsg && (
        <p>Fetched {rows.length} rows from stock_trading_feature_candles.</p>
      )}
    </div>
  );
}
