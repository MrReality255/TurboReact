import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	root: "src",
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8503/",
				changeOrigin: true,
			},
		},
	},
});
