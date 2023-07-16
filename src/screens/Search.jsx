import React, { useState } from "react";
import Filter from "../components/Filter";
import DataTable from "../components/Table";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { searchTableColumns } from "../data/tableCols";
import beApi from "../api/beApi";

import "./Search.css";

const defaultFilters = [
  {
    filterTerm: "valueData.dcfToAvgPrice",
    operator: "$gt",
    filterValue: 2,
  },
  { filterTerm: "stabilityData.debtToEquity", operator: "$lt", filterValue: 2 },
  { filterTerm: "valueData.earningsYield", operator: "$gt", filterValue: 0.1 },
];

function Search() {
  const [filters, setFilters] = useState(defaultFilters);
  const [refetchDataToggle, setRefetchDataToggle] = useState(false);

  const handleAddFilter = () => {
    setFilters([...filters, { filterTerm: "", operator: "", filterValue: "" }]);
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

  const fetchData = async (params) => {
    try {
      const {
        pageChangeDirection,
        pageSize,
        primaryKeyValue,
        sortDirection,
        url,
      } = params;

      const options = {
        params: {
          pageChangeDirection,
          pageSize,
          refDocTickerYear: primaryKeyValue,
          filter: filters.map((thisFilter) => JSON.stringify(thisFilter)),
          sortDirection,
        },
      };

      const response = await beApi(url, options);

      if (response?.data) {
        const { data = [], count } = response.data;

        // flatten nested data for presentation
        const formattedData = data.map((obj) => {
          let data = {
            ...obj,
            ...obj.performanceData,
            ...obj.profitabilityData,
            ...obj.stabilityData,
            ...obj.valueData,
          };
          return data;
        });

        return { data: formattedData, count };
      }
    } catch (err) {
      console.log("Error fetching metric data", err);
    }
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
            onClick={() => setRefetchDataToggle((prev) => !prev)}
            sx={{ margin: "0 10px", width: "120px" }}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="search-result">
        <h2>Results</h2>
        <div className="search-result-inner">
          <DataTable
            baseUrl="/metrics/advanced"
            columns={searchTableColumns}
            filterTerms={filters}
            getPageOfData={fetchData}
            primaryKeyName="ticker_year"
            tableTitle="Company Directory"
            displayAddBtn={false}
            toggleDataRefetch={refetchDataToggle}
          />
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
