/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-01-08 01:52:34
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-14 04:06:27
 * @FilePath: \Fullstack2023\part5\bloglist-frontend\.eslintrc.cjs
 * @Description: 
 * 
 * Copyright (c) 2024 by zihao, All Rights Reserved. 
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "jest"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "single"],
    // semi: ["error", "never"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "no-unused-vars": 0,
  },
};
