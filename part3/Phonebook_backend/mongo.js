/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-11-03 00:47:59
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-11-05 00:34:47
 * @FilePath: \Fullstack2023\part3\Phonebook_backend\mongo.js
 * @Description:
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://Zihao_Li:${password}@cluster0.vly5pwj.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
