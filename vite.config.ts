import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// This config intentionally avoids Replit-specific plugins so you have
// full control of the development environment. We add an optional
// `vite-plugin-checker` in development if it's installed to provide
// TypeScript/ESLint overlays similar to other dev platforms.

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plugins: any[] = [react()];
if (process.env.NODE_ENV !== "production") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const checkerModule = require("vite-plugin-checker");
    const checker = checkerModule.default || checkerModule;
    plugins.push(
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./client/src" --ext .ts,.tsx,.js,.jsx',
        },
      }),
    );
    // Small dev-time console banner to replace dev-banner behavior
    // eslint-disable-next-line no-console
    console.log("\n=== Dev: vite-plugin-checker enabled ===\n");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("vite-plugin-checker not installed — skipping dev type checking overlay.");
    // eslint-disable-next-line no-console
    console.log("To enable it, run: npm install -D vite-plugin-checker");
  }
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
