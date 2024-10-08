import { config } from "$lib/app.config";

interface RequestOptions {
  query?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  contentType?: string;
}

function buildQueryString(query: Record<string, any>): string {
  return new URLSearchParams(query).toString();
}

export async function fetchWithErrorHandling(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  options: RequestOptions = {},
) {
  const url = new URL(`${config.apiUrl}/${path}`);

  if (options.query) {
    url.search = buildQueryString(options.query);
  }

  const headers = {
    "Content-Type": options.contentType || "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url.toString(), {
      method: method,
      headers: headers,
      ...(method !== "GET" && method !== "DELETE"
        ? { body: JSON.stringify(options.body || {}) }
        : {}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export function get(path: string, options: RequestOptions = {}) {
  return fetchWithErrorHandling("GET", path, options);
}

export function post(path: string, options: RequestOptions = {}) {
  return fetchWithErrorHandling("POST", path, options);
}

export function put(path: string, options: RequestOptions = {}) {
  return fetchWithErrorHandling("PUT", path, options);
}

export function del(path: string, options: RequestOptions = {}) {
  return fetchWithErrorHandling("DELETE", path, options);
}
