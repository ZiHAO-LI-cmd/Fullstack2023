import React from "react";

const Persons = (props) => {
  return (
    <ul>
      {props.filteredPersons.map((person, i) => (
        <li key={i}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
