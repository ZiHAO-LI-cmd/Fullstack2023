/*
 * @Author: zihao zihao-lee@outlook.com
 * @Date: 2024-02-06 00:35:33
 * @LastEditors: zihao zihao-lee@outlook.com
 * @LastEditTime: 2024-02-06 02:15:58
 * @FilePath: \Fullstack2023\part6\redux-anecdotes\src\components\Filter.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by zihao, All Rights Reserved. 
 */
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(setFilter(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
