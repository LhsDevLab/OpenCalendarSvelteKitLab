import { config } from "../app.config";
import { CookieModule } from "./CookieModule";

interface RequestOptions {
  query?: Record<string, any>; // Object representing query string parameters
  body?: Record<string, any>; // Object representing the request body
  headers?: Record<string, string>; // Object representing additional headers
  contentType?: string; // Content-Type option
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
  const jwtToken = CookieModule.getCookie("jwtToken");
  return jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};
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

  return fetch(url.toString(), {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());
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

  return fetch(url.toString(), {
    method: "POST",
    headers: headers,
    body: JSON.stringify(options.body || {}),
  }).then((res) => res.json());
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

  return fetch(url.toString(), {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(options.body || {}),
  }).then((res) => res.json());
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

  return fetch(url.toString(), {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(options.body || {}),
  }).then((res) => res.json());
}
