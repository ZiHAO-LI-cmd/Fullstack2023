/* eslint-disable react/prop-types */
import Weather from "./Weather";

const DetailedInfo = ({ country, isShow }) => {
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  //   console.log(api_key);
  if (isShow === true) {
    return (
      <div>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <div>
          <img src={country.flags.png} alt={country.flags.alt} />
        </div>
        <Weather
          lat={country.capitalInfo.latlng[0]}
          lon={country.capitalInfo.latlng[1]}
          API_key={api_key}
        ></Weather>
      </div>
    );
  }
};

export default DetailedInfo;
