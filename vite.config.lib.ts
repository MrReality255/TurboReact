// vite.config.lib.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts"; // Import the dts plugin
import path from "path";

const entryPath = path.resolve(__dirname, "src/turbo_react/index.ts");
console.log("Resolved entry path:", entryPath); // Debug log

export default defineConfig({
	plugins: [react(), dts({ rollupTypes: true })],
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/turbo_react/index.ts"),
			name: "mm-turboreact",
			fileName: (format) =>
				`mm-turbo-react.${format === "es" ? "esm" : "cjs"}.js`,
			formats: ["es", "cjs"],
		},
		outDir: "dist",
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
		sourcemap: true,
	},
});
