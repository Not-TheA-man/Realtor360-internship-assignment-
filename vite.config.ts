import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Realtor360-internship-assignment-/' : '/',
  plugins: [react()],
})
