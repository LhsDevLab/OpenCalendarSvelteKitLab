import { redirect, type HandleServerError } from "@sveltejs/kit";
export const handleError: HandleServerError = ({
  error,
  event,
  status,
  message,
}) => {
  const errorRes = {
    status,
    message,
  };

  console.error(errorRes);

  return errorRes;
};
