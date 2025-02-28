import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import beApi from "../api/beApi";
import DataTable from "../components/BaseTable";
import ErrorHandler from "../components/ErrorHandler";
import { Context as AuthContext } from "../context/authContext";
import { metricTableColumns } from "../data/tableCols";

function Metric() {
  const { state: authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authState.isSignedIn) {
      navigate("/login");
    }
  });

  const fetchData = async (params) => {
    try {
      const {
        orFilters = [],
        andFilters = [],
        pageChangeDirection,
        pageSize,
        primaryKeyValue,
        pageRefValue,
        sortDirection,
        url,
      } = params;

      const options = {
        params: {
          pageChangeDirection,
          pageSize,
          pageRefValue,
          pageRefField: "ticker_year",
          primaryKeyValue,
          sortDirection,
          orFilters,
          andFilters,
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
      setError(err);
    }
  };

  if (authState.isSignedIn) {
    return (
      <div>
        <ErrorHandler error={error} setError={setError} />
        <DataTable
          baseUrl="/metrics"
          tableColumns={metricTableColumns}
          getPageOfData={fetchData}
          primaryKeyName="ticker_year"
          pageRefField="ticker_year"
          tableTitle="Key Financial Metrics"
          searchColumns={"ticker,industry,ticker_year"}
          onItemSelect={(item) => console.log(item, "selected")}
        />
      </div>
    );
  }
}

export default Metric;
