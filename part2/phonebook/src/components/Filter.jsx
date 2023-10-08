import React from "react";

const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input
          value={props.searchValue}
          onChange={(e) => props.setSearchValue(e.target.value)}
          type="text"
          placeholder="Search by name"
        />
      </div>
    </form>
  );
};

export default Filter;
