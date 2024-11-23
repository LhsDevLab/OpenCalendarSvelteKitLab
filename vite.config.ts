import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    __PROJECT_PATH__: JSON.stringify(path.resolve(process.cwd()) + path.sep),
    API_URL: JSON.stringify(process.env.API_URL || "http://localhost:8080"),
  },
});
