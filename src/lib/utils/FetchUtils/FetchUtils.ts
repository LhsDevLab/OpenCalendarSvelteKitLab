import { fetchWithRefresh } from "$lib/utils/FetchUtils/fetchWithRefresh";
import type { RequestInfos } from "$lib/types/RequestInfos";

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

async function getImage(imageId: string): Promise<Blob> {
  const url = `app/image/get_image/${imageId}`;
  const options: RequestInfos = {
    headers: {
      Accept: "image/*",
    },
  };
  return fetchWithRefresh("GET", url, options).then((res) => res.blob());
}

export { buildQueryString, get, post, put, del, getImage };
