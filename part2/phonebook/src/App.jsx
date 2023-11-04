import { useEffect } from "react";
import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/Phonebook";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([...persons]);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  // add
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNum };

    let hasDuplicated = false;
    for (const person of persons) {
      if (person.name === newPerson.name) {
        hasDuplicated = true;
        // update
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with new one?`
          )
        ) {
          phonebookService
            .update(person.id, newPerson)
            .then((response) => {
              setPersons(
                persons.map((p) => (p.id === person.id ? response.data : p))
              );
              setMessage(`Added ${newName.name}`);
              setTimeout(() => {
                setMessage(null);
              }, 3000);
              setNewName("");
              setNewNum("");
            })
            .catch((error) => {
              setIsSuccess(false);
              setMessage(
                `Information of ${newName.name} has already been removed from sever`
              );
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            });
        }
        break;
      }
    }

    if (hasDuplicated === false) {
      phonebookService
        .add(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setMessage(`Added ${newName.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setNewName("");
          setNewNum("");
        })
        .catch((error) => {
          setIsSuccess(false);
          console.log(error);
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  // get
  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  // search
  useEffect(() => {
    const newPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    // Update the filtered persons state
    setFilteredPersons(newPersons);
  }, [searchValue, persons]);

  // delete
  const deletePerson = (id) => {
    console.log(`delete${id}`);
    const seletedPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Do you really want to delete ${seletedPerson.name}?`)) {
      phonebookService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSuccess={isSuccess}></Notification>
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
      <Persons
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}
      ></Persons>
    </div>
  );
};

export default App;
