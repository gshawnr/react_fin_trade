import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/Table";
import { companyTableColumns } from "../data/tableCols";
import beApi from "../api/beApi";

function Company() {
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
          refDocKeyValue: primaryKeyValue,
          searchField,
          searchTerm,
          sortDirection,
          sortField,
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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "70%" }}>
          <DataTable
            baseUrl="/companies"
            columns={companyTableColumns}
            filterTerms={filterValues}
            getPageOfData={fetchData}
            primaryKeyName="ticker"
            tableTitle="Company Directory"
            displayAddBtn
          />
        </div>
      </div>
    );
  }
}

// TODO
const filterValues = ["companyName"];

export default Company;
