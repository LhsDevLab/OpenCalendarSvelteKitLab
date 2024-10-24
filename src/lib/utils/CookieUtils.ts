import { config } from "$lib/app.config";

function setCookie(name: string, value: string, options: any = {}) {
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

  document.cookie = cookieString;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split("; ") : [];
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    const cookieName = decodeURIComponent(parts[0]);
    if (cookieName === name) {
      return decodeURIComponent(parts[1]);
    }
  }
  return null;
}

export { setCookie, getCookie };
