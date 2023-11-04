const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url);

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// const Person = mongoose.model("Person", personSchema);

// if (process.argv.length < 4) {
//   Person.find({}).then((result) => {
//     console.log("phonebook:");
//     result.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close();
//   });
// } else {
//   const person = new Person({
//     name: name,
//     number: number,
//   });

//   person.save().then((result) => {
//     console.log(`added ${name} number ${number} to phonebook`);
//     mongoose.connection.close();
//   });
// }

module.exports = mongoose.model('Person', personSchema);
