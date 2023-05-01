import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/Table";
import { watchTableColumns } from "../data/tableCols";
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
        filterField,
        filterValue,
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
          filterField,
          filterValue,
          pageChangeDirection,
          pageSize,
          refDocTicker: primaryKeyValue,
          searchField,
          searchTerm,
          sortDirection,
          sortField,
        },
      };
      const response = await beApi(url, options);
      console.log("response", response.data);

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
        baseUrl="/watch"
        columns={watchTableColumns}
        filterTerms={filterValues}
        getPageOfData={fetchData}
        primaryKeyName="ticker"
        tableTitle="Watch List"
        displayAddBtn={false}
      />
    );
  }
}

const filterValues = ["ticker"];

export default Watch;
