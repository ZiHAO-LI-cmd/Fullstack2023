/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-10-01 01:39:49
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-01 00:44:31
 * @FilePath: \Fullstack2023\part2\phonebook\vite.config.js
 * @Description: 
 * 
 * Copyright (c) 2023 by zihao, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
