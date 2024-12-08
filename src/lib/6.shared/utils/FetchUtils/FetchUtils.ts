import { fetchWithRefresh } from "$lib/6.shared/utils/FetchUtils/fetchWithRefresh";
import type { RequestInfos } from "$lib/6.shared/types/RequestInfos";
import { ImageSize } from "$lib/6.shared/types/ImageSize";
import { goto } from "$app/navigation";

function buildQueryString(query: Record<string, any>): string {
  return new URLSearchParams(query).toString();
}

async function get(path: string, options: RequestInfos = {}) {
  try {
    const res = await fetchWithRefresh("GET", path, options);
    return res.json();
  } catch (e: any) {
    if (e.name !== "TokenRefreshError") throw e;
    else goto("/error/TokenRefreshError");
  }
}

async function post(path: string, options: RequestInfos = {}) {
  try {
    const res = await fetchWithRefresh("POST", path, options);
    return res.json();
  } catch (e: any) {
    if (e.name !== "TokenRefreshError") throw e;
    else goto("/error/TokenRefreshError");
  }
}

async function put(path: string, options: RequestInfos = {}) {
  try {
    const res = await fetchWithRefresh("PUT", path, options);
    return res.json();
  } catch (e: any) {
    if (e.name !== "TokenRefreshError") throw e;
    else goto("/error/TokenRefreshError");
  }
}

async function del(path: string, options: RequestInfos = {}) {
  try {
    const res = await fetchWithRefresh("DELETE", path, options);
    return res.json();
  } catch (e: any) {
    if (e.name !== "TokenRefreshError") throw e;
    else goto("/error/TokenRefreshError");
  }
}

async function getImage(
  imageId: string,
  size: ImageSize,
  isPrivate: boolean = false,
): Promise<Blob> {
  const url = isPrivate
    ? `app/image/get_image/${imageId}/${size}`
    : `open/image/get_image/${imageId}/${size}`;
  return fetchWithRefresh("GET", url).then((res) => res.blob());
}

export { buildQueryString, get, post, put, del, getImage };
