/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-10-17 11:59:25
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-04 16:49:02
 * @FilePath: \Fullstack2023\part3\Phonebook_backend\index.js
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/person");

const app = express();
app.use(cors());

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

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
  response.send(
    `Phonebook has info for ${persons.length} people <br/> ${new Date()}`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

// app.post("/api/persons", (request, response) => {
//   const id = Math.floor(Math.random() * 10000);
//   const person = request.body;
//   if (
//     person.name === "" ||
//     person.number === "" ||
//     persons.find((p) => p.name === person.name)
//   ) {
//     response.send("{ error: 'name must be unique' }");
//   } else {
//     person.id = id;

//     persons.concat(person);

//     response.json(person);
//   }
// });

app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 10000);
  // const person = request.body;
  const person = new Person(request.body);
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    response.json(person);
    // mongoose.connection.close();
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
