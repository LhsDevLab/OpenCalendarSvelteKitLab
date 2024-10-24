export const config = {
  apiUrl: "http://localhost:8080",
  cookieDefaultOptions: {
    path: "/",
    httpOnly: true, // Cookie can only be accessed via HTTP(S), not JavaScript
    "max-age": 3600,
    secure: true,
    sameSite: "strict",
  },
  smallWidth: 1000,
  smallHeight: 800,
};
