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
        primaryKeyValue,
        pageSize,
        pageChangeDirection,
        sortDirection,
        sortField,
      } = params;

      const options = {
        params: {
          refDocTickerYear: primaryKeyValue,
          pageSize,
          pageChangeDirection,
          sortField,
          sortDirection,
        },
      };
      const response = await beApi.get(`/summary`, options);

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
      <DataTable
        columns={summaryTableColumns}
        getPageOfData={fetchData}
        primaryKeyName="ticker_year"
        filterTerms={filterValues}
      />
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
