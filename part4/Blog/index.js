/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-07 01:19:19
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-08 22:46:18
 * @FilePath: \Fullstack2023\part4\Blog\index.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
