import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import beApi from "../api/beApi";
import DataTable from "../components/BaseTable";
import ButtonComponent from "../components/ButtonComponent";
import ErrorHandler from "../components/ErrorHandler";
import { Context as AuthContext } from "../context/authContext";
import { targetTableColumns } from "../data/tableCols";

function Watch() {
  const { state: authState } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isSignedIn) {
      navigate("/login");
    }
  }, []);

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
          pageRefField: "potentialReturn",
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
      setError(err);
    }
  };

  const defaultPageRequest = {
    pageChangeDirection: "next",
    pageSize: 15,
    primaryKeyValue: "0",
    pageRefValue: Infinity,
    sortDirection: "desc",
    url: "targets",
  };

  const handleRefresh = async () => {
    try {
      await beApi.post("targets/refresh");
    } catch (e) {
      setError(e);
    }
  };

  if (authState.isSignedIn) {
    return (
      <div>
        <ErrorHandler error={error} setError={setError} />
        <DataTable
          baseUrl="targets"
          tableColumns={targetTableColumns}
          getPageOfData={fetchData}
          primaryKeyName="ticker_year"
          pageRefField="potentialReturn"
          tableTitle="Watch List"
          searchColumns={"ticker,industry"}
          onItemSelect={(item) => {
            console.log(item, "selected item");
          }}
          defaultPage={defaultPageRequest}
          initialSortDir={"desc"}
        />
        <ButtonComponent
          onClickHandler={handleRefresh}
          nameText="Refresh"
          btnStyle={{
            display: "block",
            marginLeft: "auto",
            marginTop: "50px",
          }}
        />
      </div>
    );
  }
}

export default Watch;
