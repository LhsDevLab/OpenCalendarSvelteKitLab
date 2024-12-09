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
import { TokenRefreshError, FetchError } from "$lib/6.shared/types/Errors";

async function defaultFetch(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  options: RequestInfos = {},
): Promise<Response> {
  const url = new URL(`${config.apiUrl}/${path}`);

  if (options.query) {
    url.search = buildQueryString(options.query);
  }

  const headers: HeadersInit = {
    "Api-Version": config["Api-Version"],
    Authorization:
      FetchStore.accessToken !== "" ? "Bearer " + FetchStore.accessToken : "",
    ...options.headers,
  };

  if (
    options.contentType === undefined &&
    ["GET", "DELETE"].includes(method) === false &&
    options.body instanceof FormData === false
  ) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(url.toString(), {
    method: method,
    headers: headers,
    ...(["GET", "DELETE"].includes(method) === false
      ? {
          body:
            options.body instanceof FormData
              ? options.body
              : JSON.stringify(options.body),
        }
      : {}),
  });
}

async function refreshToken(refreshToken: string): Promise<string> {
  try {
    let res: any = await defaultFetch("POST", "open/auth/refresh", {
      body: { refreshToken },
    });

    if (!res.ok) throw new Error(`Failed to refresh token, Failed to send`);

    res = await res.json();

    if (res.isSuccess === true) {
      const { accessToken } = res as RefreshJwtResponseDTOonSuccess;
      return accessToken;
    } else if (res.isSuccess !== true) {
      const { message } = res as RefreshJwtResponseDTOonFailure;
      throw new TokenRefreshError(`Failed to refresh token, ${message}`);
    } else
      throw new TokenRefreshError(`Failed to refresh token, Unknown Error`);
  } catch (e) {
    throw new TokenRefreshError(`Failed to refresh token, Unknown Error`);
  }
}

export async function fetchWithRefresh(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  options: RequestInfos = {},
): Promise<Response> {
  let res = await defaultFetch(method, path, options);

  if (res.status === HttpStatus.UNAUTHORIZED) {
    const newToken: string = await refreshToken(FetchStore.refreshToken);
    setToken({ accessToken: newToken });
    res = await defaultFetch(method, path, options);
  }

  if (res.ok === false) {
    throw new FetchError(`Failed to fetch`);
  }

  return res;
}
