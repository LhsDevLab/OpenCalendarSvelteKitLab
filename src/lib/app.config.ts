export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8080",
  "Api-Version": "*.*.*",
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
