import React, { useEffect, useContext, useState } from "react";
import { FormControl, TextField, Button } from "@mui/material";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/Table";
import { companyTableColumns } from "../data/tableCols";
import beApi from "../api/beApi";

function Company() {
  const { state: authState } = useContext(AuthContext);
  const [companyInput, setCompanyInput] = useState("");
  const [refreshData, setRefreshData] = useState(false);

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

  const addCompany = async () => {
    try {
      await beApi.get(`/annual/${companyInput}`);
      setCompanyInput("");
      setRefreshData(!refreshData);
    } catch (err) {
      console.log("unable to add company", err);
    }
  };
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
          refreshData={refreshData}
        />
      </div>
      <FormControl sx={{ width: "15%" }}>
        <TextField
          label="Add Company"
          required
          margin="normal"
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
        />
        <Button variant="contained" onClick={addCompany}>
          Add Company
        </Button>
      </FormControl>
    </div>
  );
}

// TODO
const filterValues = ["companyName"];

export default Company;
