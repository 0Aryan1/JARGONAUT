import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ogl-vendor': ['ogl'],
          'carousel-vendor': ['react-alice-carousel'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (disable in production for smaller size)
    sourcemap: false,
    // Use esbuild for minification (faster than terser and already included)
    minify: 'esbuild',
    target: 'es2015',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'ogl'],
  },
  esbuild: {
    // Drop console and debugger in production
    drop: ['console', 'debugger'],
  },
})
