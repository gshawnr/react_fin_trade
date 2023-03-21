import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/Table";
import { summaryTableColumns } from "../data/tableCols";
import beApi from "../api/beApi";

function Summary() {
  const { state: authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isSignedIn) {
      navigate("/login");
    }
  });

  const fetchData = async (params) => {
    try {
      const {
        pageChangeDirection,
        pageSize,
        primaryKeyValue,
        searchField,
        searchTerm,
        sortDirection,
        sortField,
        url,
      } = params;

      const options = {
        params: {
          pageChangeDirection,
          pageSize,
          refDocTickerYear: primaryKeyValue,
          searchField,
          searchTerm,
          sortDirection,
          sortField,
          url,
        },
      };
      const response = await beApi.get(url, options);

      if (response?.data) {
        const { data = [], count } = response.data;
        return { data, count };
      }
    } catch (err) {
      console.log("Error fetching summary data", err);
    }
  };

  if (authState.isSignedIn) {
    return (
      <div>
        <DataTable
          columns={summaryTableColumns}
          getPageOfData={fetchData}
          primaryKeyName="ticker_year"
          filterTerms={filterValues}
        />
      </div>
    );
  }
}

// TODO
const filterValues = [
  "netIncome",
  "revenue",
  "grossProfit",
  "ticker_year",
  "eps",
  "avgStockPrice",
];

export default Summary;
