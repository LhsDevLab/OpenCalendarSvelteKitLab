import { config } from "$lib/app.config";
import type {
  RefreshJwtResponseDTOonSuccess,
  RefreshJwtResponseDTOonFailure,
} from "$lib/types/apiDTO/RefreshJwtResponseDTO";
import { HttpStatus } from "$lib/types/HttpStatus";

const FetchStore = {
  accessToken: "",
  refreshToken: "",
};

function setToken(newToken: { accessToken?: string; refreshToken?: string }) {
  Object.assign(FetchStore, newToken);
}

interface RequestOptions {
  query?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  contentType?: string;
}

function buildQueryString(query: Record<string, any>): string {
  return new URLSearchParams(query).toString();
}

async function fetchWithErrorHandling(
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
    Authorization:
      FetchStore.accessToken !== "" ? "Bearer " + FetchStore.accessToken : "",
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

    if (response.ok) return response;

    // 토큰 만료시, 갱신 및 재호출
    if (response.status === HttpStatus.UNAUTHORIZED) {
      const refreshRes:
        | RefreshJwtResponseDTOonSuccess
        | RefreshJwtResponseDTOonFailure = refreshToken(
        FetchStore.refreshToken,
      ) as any;
      if (refreshRes.isSuccess === false) {
        const { message } = refreshRes as RefreshJwtResponseDTOonFailure;

        throw new Error(message || `token refresh failed`);
      }
      const { accessToken } = refreshRes as RefreshJwtResponseDTOonSuccess;
      setToken({ accessToken });
      return fetchWithErrorHandling(method, path, options);
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

function refreshToken(refreshToken: string) {
  return post("/open/auth/refresh", { body: { refreshToken } });
}

function get(path: string, options: RequestOptions = {}) {
  return fetchWithErrorHandling("GET", path, options).then((res) => res.json());
}

function post(path: string, options: RequestOptions = {}) {
  return fetchWithErrorHandling("POST", path, options).then((res) =>
    res.json(),
  );
}

function put(path: string, options: RequestOptions = {}) {
  return fetchWithErrorHandling("PUT", path, options).then((res) => res.json());
}

function del(path: string, options: RequestOptions = {}) {
  return fetchWithErrorHandling("DELETE", path, options).then((res) =>
    res.json(),
  );
}

async function getImage(imageId: string): Promise<Blob> {
  const url = `app/image/get_image/${imageId}`;
  const options: RequestOptions = {
    headers: {
      Accept: "image/*",
    },
  };
  return fetchWithErrorHandling("GET", url, options).then((res) => res.blob());
}

export { buildQueryString, get, post, put, del, getImage, setToken };
