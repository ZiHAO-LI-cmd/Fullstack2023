/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-10-01 18:18:25
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-10-10 12:16:40
 * @FilePath: \Fullstack2023\part2\phonebook\src\components\Persons.jsx
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */

const Persons = (props) => {
  return (
    <ul>
      {props.filteredPersons.map((person) => (
        <div key={person.id} style={{ display: 'flex', alignItems: 'center' }}>
          <li key={person.id}>
            {person.name} {person.number}
          </li>
          <button onClick={() => props.deletePerson(person.id)}>delete</button>
        </div>
      ))}
    </ul>
  );
};

export default Persons;
