import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// console.log('path.resolve(__dirname, )', path.resolve(__dirname, 'src'));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
