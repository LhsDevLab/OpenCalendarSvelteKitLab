import type { PageServerLoad } from "./$types";
import { FetchStore } from "$lib/stores/FetchStore";

export const load: PageServerLoad = async ({ cookies }) => {
  // Access cookies
  let jwtToken = cookies.get("jwtToken");
  FetchStore.token = jwtToken;
};
