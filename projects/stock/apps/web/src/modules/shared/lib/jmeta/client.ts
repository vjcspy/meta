const JMETA_BASE_URL = process.env.NEXT_PUBLIC_JMETA_URL ?? "http://localhost:8080";

export class JMetaError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "JMetaError";
  }
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export async function fetchJMeta<T>(path: string, params?: Record<string, string>): Promise<T> {
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
    throw new JMetaError(res.status, `JMeta request failed: ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new JMetaError(0, json.message ?? "JMeta returned success=false");
  }

  return json.data;
}

export async function mutateJMeta<T>(path: string, method: "PUT" | "POST" | "DELETE", body?: unknown): Promise<T> {
  const url = new URL(path, JMETA_BASE_URL);

  const res = await fetch(url.toString(), {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new JMetaError(res.status, `JMeta ${method} failed: ${res.status} ${res.statusText}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new JMetaError(0, json.message ?? "JMeta returned success=false");
  }

  return json.data;
}
