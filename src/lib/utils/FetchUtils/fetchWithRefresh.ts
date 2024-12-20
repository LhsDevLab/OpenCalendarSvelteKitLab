import { config } from "$lib/app.config";
import type {
  RefreshJwtResponseDTOonSuccess,
  RefreshJwtResponseDTOonFailure,
} from "$lib/types/apiDTO/RefreshJwtResponseDTO";
import { HttpStatus } from "$lib/types/HttpStatus";
import { FetchStore } from "$lib/stores/FetchStore";
import type { RequestInfos } from "$lib/types/RequestInfos";
import { buildQueryString } from "./FetchUtils";
import { setToken } from "$lib/stores/FetchStore";

async function defaultFetch(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  options: RequestInfos = {},
): Promise<Response> {
  const url = new URL(`${config.apiUrl}/${path}`);

  if (options.query) {
    url.search = buildQueryString(options.query);
  }

  const headers = {
    "Content-Type": options.contentType || "application/json",
    Authorization:
      FetchStore.accessToken !== "" ? "Bearer " + FetchStore.accessToken : "",
    ...options.headers,
  };

  return fetch(url.toString(), {
    method: method,
    headers: headers,
    ...(method !== "GET" && method !== "DELETE"
      ? { body: JSON.stringify(options.body || {}) }
      : {}),
  });
}

async function refreshToken(refreshToken: string): Promise<string> {
  let res: any = await defaultFetch("POST", "open/auth/refresh", {
    body: { refreshToken },
  });

  if (!res.ok) throw new Error(`Failed to refresh token, Failed to send`);

  res = await res.json();

  if (res.isSuccess === true) {
    const { accessToken } = res as RefreshJwtResponseDTOonSuccess;
    return accessToken;
  } else if (res.isSuccess === true) {
    const { message } = res as RefreshJwtResponseDTOonFailure;
    throw new Error(`Failed to refresh token, ${message}`);
  } else throw new Error(`Failed to refresh token, Unknown Error`);
}

export async function fetchWithRefresh(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  options: RequestInfos = {},
): Promise<Response> {
  const res = await defaultFetch(method, path, options);

  if (res.ok) return res;
  else if (res.status === HttpStatus.UNAUTHORIZED) {
    const newToken: string = await refreshToken(FetchStore.refreshToken);
    setToken({ accessToken: newToken });
    return defaultFetch(method, path, options);
  } else {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
}
