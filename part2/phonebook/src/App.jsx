import { useEffect } from "react";
import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([...persons]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNum };

    let hasDuplicated = false;
    for (const person of persons) {
      /*       if (JSON.stringify(person) === JSON.stringify(newPerson)) {
        alert(`${newName} is already added to phonebook`);
        hasDuplicated = true;
        break;
      } */
      if (person.name === newPerson.name) {
        alert(`${newName} is already added to phonebook`);
        hasDuplicated = true;
        break;
      }
    }

    if (hasDuplicated === false) {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNum("");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    const newPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Update the filtered persons state
    setFilteredPersons(newPersons);
  }, [searchValue, persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      ></Filter>

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
      ></PersonForm>

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}></Persons>
    </div>
  );
};

export default App;
