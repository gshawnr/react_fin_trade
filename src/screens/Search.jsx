import React, { useState } from "react";
import Filter from "../components/Filter";
import DataTable from "../components/Table";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import "./Search.css";

const defaultFilter = { fieldValue: "", operator: "", filterValue: "" };

function Search() {
  const [filters, setFilters] = useState([defaultFilter]);

  const handleAddFilter = () => {
    setFilters([...filters, defaultFilter]);
  };

  const handleRemoveFilter = (index) => {
    if (filters.length === 1) return;
    setFilters(filters.filter((filter, thisIndex) => thisIndex !== index));
  };

  const handleFilterUpdate = (filter, index) => {
    setFilters(
      filters.map((thisFilter, thisIndex) => {
        if (thisIndex === index) {
          return { ...filter };
        }
        return thisFilter;
      })
    );
  };

  const handleRenderFilters = () => {
    return filters.map((filter, index) => {
      return (
        <div key={index} className="search-filter-grp">
          <Filter
            index={index}
            filterProps={filter}
            setFilterProps={handleFilterUpdate}
          />
          {index === 0 ? null : (
            <RemoveCircleIcon
              color="primary"
              fontSize="large"
              onClick={() => handleRemoveFilter(index)}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="search-container">
      <div className="search-inner">
        <h2>Filter</h2>
        <div className="search-inner-grp">
          <div className="search-filter-ctrl">{handleRenderFilters()}</div>
          <div className="search-btn-grp"></div>
        </div>
        <div className="search-btn-grp">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFilter}
            sx={{ width: "120px" }}
          >
            Add Filter
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={{}}
            sx={{ margin: "0 10px", width: "120px" }}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="search-result">
        <h2>Results</h2>
        <div className="search-result-inner">
          {/* <DataTable
            baseUrl="/metrics"
            columns={companyTableColumns}
            filterTerms={filterValues}
            getPageOfData={fetchData}
            primaryKeyName="ticker"
            tableTitle="Company Directory"
            displayAddBtn="false"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Search;

// <RemoveCircleIcon
// color="primary"
// onClick={handleRemoveFilter(index)}
// fontSize="large"
// />
