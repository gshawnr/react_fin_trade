import React from "react";
import { TextField } from "@mui/material";

import "./Filter.css";

function Filter({ filterProps, setFilterProps, index }) {
  const onFilterChange = ({ id, value }) => {
    const updated = { ...filterProps, [id]: value };
    setFilterProps(updated, index);
  };

  return (
    <div className="filter-container">
      <TextField
        id="fieldValue"
        label="Field"
        onChange={(e) => onFilterChange(e.target)}
        size="small"
        value={filterProps.fieldValue}
        variant="outlined"
      />
      <TextField
        id="operator"
        label="Operator"
        onChange={(e) => onFilterChange(e.target)}
        size="small"
        value={filterProps.operator}
        variant="outlined"
      />
      <TextField
        id="filterValue"
        label="Value"
        onChange={(e) => onFilterChange(e.target)}
        size="small"
        value={filterProps.filterValue}
        variant="outlined"
      />
    </div>
  );
}

export default Filter;
