// Reusable localStorage user config helpers
// Key: 'user_config'

export type StockCandleFeatureChartConfig = {
  symbol?: string;
  date?: string; // YYYY-MM-DD
  features?: string[];
};

export type UserConfig = {
  dashboard?: {
    stockCandleFeatureChart?: StockCandleFeatureChartConfig;
  };
  // Other app-wide config keys can be added later
  [key: string]: any;
};

const STORAGE_KEY = "user_config";

function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function deepMerge<T extends Record<string, any>>(base: T, patch: Record<string, any>): T {
  const out: any = { ...base };
  for (const k of Object.keys(patch)) {
    const v = patch[k];
    if (isObject(v)) {
      out[k] = deepMerge(isObject(out[k]) ? out[k] : {}, v);
    } else {
      // Arrays and primitives: replace
      out[k] = v;
    }
  }
  return out as T;
}

function getRoot(): UserConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isObject(parsed) ? (parsed as UserConfig) : null;
  } catch {
    return null;
  }
}

function setRoot(next: UserConfig): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore write errors
  }
}

function getPath(obj: any, path: string): any {
  if (!isObject(obj)) return undefined;
  const parts = path.split(".");
  let cur: any = obj;
  for (const p of parts) {
    if (!isObject(cur) || !(p in cur)) return undefined;
    cur = cur[p];
  }
  return cur;
}

function setPath(obj: any, path: string, value: any): any {
  const parts = path.split(".");
  const root = isObject(obj) ? { ...obj } : {};
  let cur: any = root;
  for (let i = 0; i < parts.length; i++) {
    const key = parts[i];
    if (i === parts.length - 1) {
      cur[key] = value;
    } else {
      cur[key] = isObject(cur[key]) ? { ...cur[key] } : {};
      cur = cur[key];
    }
  }
  return root;
}

export function getUserConfig(): UserConfig | null {
  return getRoot();
}

export function getUserConfigKey<T = any>(key: string): T | null {
  const root = getRoot();
  if (!root) return null;
  const val = getPath(root, key);
  return typeof val === "undefined" ? null : (val as T);
}

// putUserConfig(key, data): merge existing value at key with data, then write back into root
export function putUserConfig(key: string, data: any): void {
  if (typeof window === "undefined") return;
  const root = getRoot() ?? {};
  const current = getPath(root, key);
  const nextValue = isObject(data) && isObject(current)
    ? deepMerge(current, data)
    : data;
  const nextRoot = setPath(root, key, nextValue);
  setRoot(nextRoot);
}

// Convenience helpers for this feature card
export function getStockCandleFeatureChartConfig(): StockCandleFeatureChartConfig | null {
  return getUserConfigKey<StockCandleFeatureChartConfig>(
    "dashboard.stockCandleFeatureChart",
  );
}

export function setStockCandleFeatureChartConfig(partial: StockCandleFeatureChartConfig): void {
  putUserConfig("dashboard.stockCandleFeatureChart", partial);
}