/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import DetailedInfo from "./DetailedInfo";

const Info = ({ filteredCountries }) => {
  const [isShow, setIsShow] = useState(false);
  const [countryToshow, setCountryToshow] = useState({});

  const toggleButtonChange = (c) => {
    setIsShow(!isShow);
    setCountryToshow(c);
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setIsShow(true);
    }
  }, [filteredCountries]); // Run the effect when filteredCountries changes

  if (filteredCountries.length === 1) {
    return (
      <div>
        <h2>{filteredCountries[0].name.common}</h2>
        <DetailedInfo
          country={filteredCountries[0]}
          isShow={isShow}
        ></DetailedInfo>
      </div>
    );
  }
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <div>
      {filteredCountries.map((c) => (
        <div key={+c.ccn3}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>{c.name.common}</div>
            <button onClick={() => toggleButtonChange(c)}>show</button>
          </div>
        </div>
      ))}
      <DetailedInfo country={countryToshow} isShow={isShow}></DetailedInfo>
    </div>
  );
};

export default Info;
