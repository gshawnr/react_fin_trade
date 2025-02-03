import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/BaseTable";
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
          baseUrl="/summary"
          tableColumns={summaryTableColumns}
          getPageOfData={fetchData}
          primaryKeyName="ticker_year"
          pageRefField="ticker_year"
          tableTitle="Financial Data Highlights"
          searchColumns={"ticker,industry,ticker_year"}
          onItemSelect={(item) => console.log(item, "selected")}
        />
      </div>
    );
  }
}

export default Summary;
