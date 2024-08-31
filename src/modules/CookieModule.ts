import { browser } from "$app/environment";
import { config } from "../app.config";

export class CookieModule {
  static setCookie(
    name: string,
    value: string,
    options: {
      [key: string]: string | number | boolean;
    } = config.cookieDefaultOptions,
  ): void {
    if (!browser) return;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (const optionKey in options) {
      cookieString += `; ${optionKey}`;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        cookieString += `=${optionValue}`;
      }
    }

    document.cookie = cookieString;
  }

  static getCookie(name: string): string | null {
    if (!browser) return null;

    const nameEQ = `${encodeURIComponent(name)}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  static deleteCookie(name: string): void {
    if (!browser) return;

    this.setCookie(name, "", { "max-age": -1 });
  }
}
