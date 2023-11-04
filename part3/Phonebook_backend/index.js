/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-10-17 11:59:25
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-04 18:57:54
 * @FilePath: \Fullstack2023\part3\Phonebook_backend\index.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const express = require("express");
const app = express();
const morgan = require("morgan");
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
const cors = require("cors");
require("dotenv").config();

const Person = require("./models/person");

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  console.log(request.body);
  Person.find({}).then((persons) => {
    response.send(
      `Phonebook has info for ${persons.length} people <br/> ${new Date()}`
    );
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const _id = request.params.id;
  Person.findById(_id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const _id = request.params.id;
  Person.findByIdAndDelete(_id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});


app.post("/api/persons", (request, response) => {
  const person = new Person(request.body);

  
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    response.json(person);
    // mongoose.connection.close();
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  // 检查是否有具有相同姓名的其他条目
  Person.findOne({ name: person.name })
    .then((existingPerson) => {
      if (!existingPerson) {
        // 如果没有匹配的条目，返回404错误
        return response.status(404).json({ error: "Person not found" });
      } else {
        // 更新第一个匹配的条目
        Person.findByIdAndUpdate(existingPerson._id, person, { new: true })
          .then((updatedPerson) => {
            response.json(updatedPerson);
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
