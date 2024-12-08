import { redirect, type HandleClientError } from "@sveltejs/kit";
export const handleError: HandleClientError = ({
  error,
  event,
  status,
  message,
}) => {
  const errorRes = {
    status,
    message,
  };
  console.log("test");
  console.error(errorRes);

  return errorRes;
};
