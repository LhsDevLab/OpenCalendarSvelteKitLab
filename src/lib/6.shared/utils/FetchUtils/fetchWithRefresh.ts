import { config } from "$lib/app.config";
import type {
  RefreshJwtResponseDTOonSuccess,
  RefreshJwtResponseDTOonFailure,
} from "$lib/6.shared/types/apiDTO/RefreshJwtResponseDTO";
import { HttpStatus } from "$lib/6.shared/types/HttpStatus";
import { FetchStore } from "$lib/6.shared/stores/FetchStore";
import type { RequestInfos } from "$lib/6.shared/types/RequestInfos";
import { buildQueryString } from "./FetchUtils";
import { setToken } from "$lib/6.shared/stores/FetchStore";

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
    "Api-Version": config["Api-Version"],
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
  try {
    let res = await defaultFetch(method, path, options);

    if (res.ok) return res;

    if (res.status === HttpStatus.UNAUTHORIZED) {
      const newToken: string = await refreshToken(FetchStore.refreshToken);
      setToken({ accessToken: newToken });
      res = await defaultFetch(method, path, options);

      if (res.ok) return res;
    }

    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusText: "Internal Server Error",
      headers: { "Content-Type": "application/json" },
    });
  }
}
