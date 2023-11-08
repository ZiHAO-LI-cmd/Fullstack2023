/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:37:55
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-09 00:02:15
 * @FilePath: \Fullstack2023\part4\Blog\utils\middleware.js
 * @Description:
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message});
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
