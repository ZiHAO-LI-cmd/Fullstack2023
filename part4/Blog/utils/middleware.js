/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-08 22:37:55
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-01-04 01:27:17
 * @FilePath: \Fullstack2023\part4\Blog\utils\middleware.js
 * @Description:
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: error.message});
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const user = await User.findById(decodedToken.id);
    if (user) {
      request.user = user;
    } else {
      return response.status(401).json({error: 'token invalid'});
    }
  } catch (exception) {
    next(exception);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
