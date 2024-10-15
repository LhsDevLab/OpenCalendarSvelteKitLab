import { redirect } from "@sveltejs/kit";

export const handleError = ({ error, event }) => {
  console.error("An error occurred:", error);

  throw redirect(302, "/login");
};
