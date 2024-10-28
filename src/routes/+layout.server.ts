import { setToken } from "$lib/utils/FetchUtils";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  const refreshToken = cookies.get("refreshToken");
  setToken({ refreshToken });
};
