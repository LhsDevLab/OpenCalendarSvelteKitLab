import type { LayoutServerLoad } from "./$types";
import { FetchStore } from "$lib/utils/FetchUtils";
import { redirect } from "@sveltejs/kit";
import { HttpStatus } from "$lib/types/HttpStatus";

export const load: LayoutServerLoad = async ({}) => {
  if (FetchStore.accessToken === "") {
    redirect(HttpStatus.UNAUTHORIZED, "/login");
  }
};
