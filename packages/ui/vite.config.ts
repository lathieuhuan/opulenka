import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig, normalizePath } from "vite"
import dts from "vite-plugin-dts"
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			tsconfigPath: "./tsconfig.build.json",
		}),
		viteStaticCopy({
			targets: [
				{
					src: "src/themes/*.css",
					dest: "themes",
					rename: { stripBase: true },
				},
			],
		}),
	],
	server: {
		port: 3001,
	},
	esbuild: {
		target: "es2022",
	},
	resolve: {
		alias: {
			"@": normalizePath(path.resolve(__dirname, "./src")),
		},
	},
	build: {
		outDir: "dist",
		lib: {
			entry: {
				index: normalizePath(path.resolve(__dirname, "src/index.ts")),
			},
			formats: ["es"],
		},
		cssCodeSplit: true,
		copyPublicDir: false,
		rollupOptions: {
			external: ["react", "react/jsx-runtime"],
			output: {
				format: "es",
				entryFileNames: "[name].js",
				assetFileNames: (assetInfo) => {
					if (assetInfo.originalFileNames.includes("src/index.ts")) {
						return "index.css"
					}
					// Default naming for other assets
					return "assets/[name].[ext]"
				},
			},
		},
	},
})