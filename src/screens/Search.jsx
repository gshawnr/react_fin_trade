import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import beApi from "../api/beApi";
import Filter from "../components/Filter";
import DataTable from "../components/Table";
import { Context as AuthContext } from "../context/authContext";
import { searchTableColumns } from "../data/tableCols";

import "./Search.css";

const defaultAndFilters = [
  {
    filterTerm: "valueData.dcfToAvgPrice",
    operator: "$gt",
    filterValue: 1.5,
  },
  { filterTerm: "stabilityData.debtToEquity", operator: "$lt", filterValue: 3 },
  { filterTerm: "valueData.earningsYield", operator: "$gt", filterValue: 0.07 },
];

function Search() {
  const { state: authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [filters, setFilters] = useState(defaultAndFilters);
  const [refetchDataToggle, setRefetchDataToggle] = useState(false);

  useEffect(() => {
    if (!authState.isSignedIn) {
      navigate("/login");
    }
  });

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
          return filter;
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
        primaryKeyName,
        primaryKeyValue,
        pageChangeDirection,
        pageSize,
        sortDirection,
        url,
      } = params;

      const options = {
        params: {
          pageRefField: primaryKeyName,
          pageRefValue: primaryKeyValue,
          pageChangeDirection,
          pageSize,
          sortDirection,
          andFilters: filters.map((thisFilter) => JSON.stringify(thisFilter)),
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
            baseUrl="/metrics"
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
