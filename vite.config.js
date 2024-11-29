import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  root: "./src/main/webapp",
  build: {
    sourcemap: false,
    outDir: "../../../target/classes/static",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // Forward requests starting with '/api' to the backend server
      "/api": {
        target: "http://localhost:8080", // Backend server
        changeOrigin: true, // Changes the origin of the request to the target URL
        // rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix before forwarding
      },
    },
  },
});
