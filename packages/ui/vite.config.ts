import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { glob } from "glob"
import { defineConfig, normalizePath } from "vite"
import dts from "vite-plugin-dts"
import { viteStaticCopy } from "vite-plugin-static-copy"

function pathTo(p: string) {
	return normalizePath(path.resolve(__dirname, p))
}

export default defineConfig(() => {
	const fontEntries = Object.fromEntries(
		glob
			.sync("src/fonts/*.css")
			.map((file) => [path.basename(file, ".css"), pathTo(file)]),
	)

	return {
		root: __dirname,
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
				"@": pathTo("src"),
			},
		},
		build: {
			outDir: "dist",
			lib: {
				entry: {
					index: pathTo("src/index.ts"),
					"index-css": pathTo("src/styles/index.css"),
					...fontEntries,
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
						const originalName = assetInfo.originalFileNames.at(0) || ""

						if (originalName.startsWith("src/fonts")) {
							return "fonts/[name][extname]"
						}

						if (originalName.startsWith("src/styles")) {
							const name = originalName.replace("src/styles/", "")
							return `styles/${name}`
						}

						// Default naming for other assets
						return "assets/[name].[ext]"
					},
				},
			},
		},
	}
})