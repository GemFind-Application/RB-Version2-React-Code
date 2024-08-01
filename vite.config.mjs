import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
    

          output: {
            entryFileNames: `assets/main.js`,
            chunkFileNames: `assets/main.js`,
            assetFileNames: `assets/main.[ext]`
          }
  },
  },
  plugins: [react()],
  //base: "/public/react/newbuild/",
  //publicDir: "/public/react/newbuild/"
});
