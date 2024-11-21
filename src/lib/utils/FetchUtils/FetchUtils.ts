import { fetchWithRefresh } from "$lib/utils/FetchUtils/fetchWithRefresh";
import type { RequestInfos } from "$lib/types/RequestInfos";
import { ImageSize } from "$lib/types/ImageSize";

function buildQueryString(query: Record<string, any>): string {
  return new URLSearchParams(query).toString();
}

function get(path: string, options: RequestInfos = {}) {
  return fetchWithRefresh("GET", path, options).then((res) => res.json());
}

function post(path: string, options: RequestInfos = {}) {
  return fetchWithRefresh("POST", path, options).then((res) => res.json());
}

function put(path: string, options: RequestInfos = {}) {
  return fetchWithRefresh("PUT", path, options).then((res) => res.json());
}

function del(path: string, options: RequestInfos = {}) {
  return fetchWithRefresh("DELETE", path, options).then((res) => res.json());
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
