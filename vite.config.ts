import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: 'public',
	build: {
		outDir: 'build',
	},
	plugins: [svgr()],
})
