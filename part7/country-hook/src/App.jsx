/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-02-24 01:22:01
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-24 01:41:08
 * @FilePath: \Fullstack2023\part7\country-hook\src\App.jsx
 * @Description:
 *
 * Copyright (c) 2024 by zihao, All Rights Reserved.
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useField } from "./hooks/index";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  // https://studies.cs.helsinki.fi/restcountries/api/name/finland
  useEffect(() => {
    if (name) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
          );
          console.log(response.data.name);
          setCountry({
            found: true,
            data: {
              name: response.data.name.common,
              capital: response.data.capital,
              population: response.data.population,
              flag: response.data.flags.svg,
            },
          });
        } catch (error) {
          console.error("Country fetch error:", error);
          setCountry({ found: false });
        }
      };

      fetchCountry();
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
