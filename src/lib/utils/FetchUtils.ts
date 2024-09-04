import { config } from "$lib/app.config";
import { CookieUtils } from "$lib/utils/CookieUtils";

interface RequestOptions {
  query?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  contentType?: string;
}

function buildQueryString(query: Record<string, any>): string {
  return new URLSearchParams(query).toString();
}

function mergeHeaders(
  defaultHeaders: HeadersInit,
  customHeaders?: Record<string, string>,
): HeadersInit {
  return {
    ...defaultHeaders,
    ...customHeaders,
  };
}

function getAuthorizationHeader(): HeadersInit {
  const jwtToken = CookieUtils.getCookie("jwtToken");
  return jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }
  return response.json();
}

async function fetchWithErrorHandling(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export function get(path: string, options: RequestOptions = {}) {
  const url = new URL(`${config.apiUrl}/${path}`);

  if (options.query) {
    url.search = buildQueryString(options.query);
  }

  const headers = mergeHeaders(
    {
      "Content-Type": options.contentType || "application/json",
      ...getAuthorizationHeader(),
    },
    options.headers,
  );

  return fetchWithErrorHandling(url.toString(), {
    method: "GET",
    headers: headers,
  });
}

export function post(path: string, options: RequestOptions = {}) {
  const url = new URL(`${config.apiUrl}/${path}`);

  if (options.query) {
    url.search = buildQueryString(options.query);
  }

  const headers = mergeHeaders(
    {
      "Content-Type": options.contentType || "application/json",
      ...getAuthorizationHeader(),
    },
    options.headers,
  );

  return fetchWithErrorHandling(url.toString(), {
    method: "POST",
    headers: headers,
    body: JSON.stringify(options.body || {}),
  });
}

export function put(path: string, options: RequestOptions = {}) {
  const url = new URL(`${config.apiUrl}/${path}`);

  if (options.query) {
    url.search = buildQueryString(options.query);
  }

  const headers = mergeHeaders(
    {
      "Content-Type": options.contentType || "application/json",
      ...getAuthorizationHeader(),
    },
    options.headers,
  );

  return fetchWithErrorHandling(url.toString(), {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(options.body || {}),
  });
}

export function del(path: string, options: RequestOptions = {}) {
  const url = new URL(`${config.apiUrl}/${path}`);

  if (options.query) {
    url.search = buildQueryString(options.query);
  }

  const headers = mergeHeaders(
    {
      "Content-Type": options.contentType || "application/json",
      ...getAuthorizationHeader(),
    },
    options.headers,
  );

  return fetchWithErrorHandling(url.toString(), {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(options.body || {}),
  });
}
