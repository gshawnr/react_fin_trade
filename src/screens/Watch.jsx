import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/BaseTable";
import { targetTableColumns } from "../data/tableCols";
import beApi from "../api/beApi";

function Watch() {
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
          pageRefField: "ticker",
          primaryKeyValue,
          sortDirection,
          orFilters,
          andFilters,
        },
      };
      const response = await beApi(url, options);

      if (response?.data) {
        const { data = [], count } = response.data;

        return { data, count };
      }
    } catch (err) {
      console.log("Error fetching watch data", err);
    }
  };

  if (authState.isSignedIn) {
    return (
      <DataTable
        baseUrl="/targets"
        tableColumns={targetTableColumns}
        getPageOfData={fetchData}
        primaryKeyName="ticker"
        pageRefField="ticker" // TODO use potentialReturn
        tableTitle="Watch List"
        searchColumns={("ticker", "industry")}
        onItemSelect={(item) => {
          console.log(item, "selected item");
        }}
      />
    );
  }
}

export default Watch;
