import { redirect } from "@sveltejs/kit";

export const handleError = ({ error, event }) => {
  console.error("An error occurred:", error);

  // For any other type of error, redirect to the login page
  //throw redirect(302, "/login");
};
