import { setToken } from "$lib/utils/FetchUtils";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const refreshToken = cookies.get("refreshToken");
  setToken({ refreshToken });
};
