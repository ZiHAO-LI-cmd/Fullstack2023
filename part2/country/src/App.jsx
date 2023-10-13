/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-10-12 23:52:15
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-10-13 00:45:06
 * @FilePath: \Fullstack2023\part2\country\src\App.jsx
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
import { useState, useEffect } from "react";
import axios from "axios";
import Info from "./components/Info";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleCountryChange = (event) => {
    setSearchValue(event.target.value);
  };

  // get
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  // search
  useEffect(() => {
    if (searchValue !== "") {
      const countriesToshow = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
      // Update the filtered persons state
      setFilteredCountries(countriesToshow);
    }
  }, [searchValue, countries]);

  return (
    <>
      <form>
        <div>
          find countries
          <input value={searchValue} onChange={handleCountryChange} />
        </div>
      </form>
      <Info filteredCountries={filteredCountries}></Info>
    </>
  );
};

export default App;
