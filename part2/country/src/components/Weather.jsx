/* eslint-disable react/prop-types */
/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2023-10-13 16:03:46
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2023-10-13 17:17:11
 * @FilePath: \Fullstack2023\part2\country\src\components\Weather.jsx
 * @Description:
 *
 * Copyright (c) 2023 by zihao, All Rights Reserved.
 */
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({ lat, lon, API_key }) => {
  const [weather, setWeather] = useState({});

  // get
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);
  //   console.log(weather.list[0]);
  return (
    <div>
      {weather.list && weather.list.length > 0 && (
        <div>
          <div>Temperature: {weather.list[0].main.temp} Celcius</div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
              alt={weather.list[0].weather.description}
            />
          </div>
          <div>Wind: {weather.list[0].wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default Weather;
