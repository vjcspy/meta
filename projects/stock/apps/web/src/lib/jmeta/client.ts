const JMETA_BASE_URL =
  process.env.NEXT_PUBLIC_JMETA_URL ?? "http://localhost:8080";

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export async function fetchJMeta<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(path, JMETA_BASE_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`JMeta request failed: ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(json.message ?? "JMeta returned success=false");
  }

  return json.data;
}
