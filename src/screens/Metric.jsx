import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/Table";
import { metricTableColumns } from "../data/tableCols";
import beApi from "../api/beApi";

function Metric() {
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

      const response = await beApi("/metrics", options);

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

  if (authState.isSignedIn) {
    return (
      <DataTable
        columns={metricTableColumns}
        getPageOfData={fetchData}
        primaryKeyName="ticker_year"
        filterTerms={filterValues}
      />
    );
  }
}

const filterValues = [
  "ticker_year",
  "dcfValuePerShare",
  "priceToEarnings",
  "priceToSales",
  "priceToBook",
];

export default Metric;
