import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'

// Plugin to bypass Vite's default cleanUrl(#) truncation on directory names with '#'
const hashPathPlugin = () => ({
  name: 'hash-path-loader',
  enforce: 'pre',
  async load(id) {
    const cleanPath = id.split('?')[0];
    try {
      if (fs.existsSync(cleanPath) && fs.statSync(cleanPath).isFile()) {
        return await fs.promises.readFile(cleanPath, 'utf-8');
      }
    } catch {
      // Pass through to other loaders
    }
    return null;
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [hashPathPlugin(), react()],
  server: {
    host: '127.0.0.1',
    port: 5173
  }
})
