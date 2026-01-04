import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better optimization
        manualChunks: {
          // Separate React and ReactDOM into their own chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Separate Three.js into its own chunk (it's large)
          'three-vendor': ['three'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimize build performance
    minify: 'esbuild',
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize asset inlining threshold (smaller files inline as base64)
    assetsInlineLimit: 4096, // 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['three'], // Let Three.js load on demand
  },
})

