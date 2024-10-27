import { config } from "$lib/app.config";

function makeCookieString(name: string, value: string, options: any = {}) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  options = Object.assign(config.cookieDefaultOptions, options);

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  return cookieString;
}

export { makeCookieString };
