import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/BaseTable";
import { companyTableColumns } from "../data/tableCols";
import beApi from "../api/beApi";
import CompanyViewModal from "../components/CompanyViewModal";
import ErrorHandler from "../components/ErrorHandler";

function Company() {
  const { state: authState } = useContext(AuthContext);

  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companyViewData, setCompanyViewData] = useState(null);
  const [error, setError] = useState(null);

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
          pageRefField: "ticker", // used fo sorting and pagination
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
      setError(err);
    }
  };

  const handleCompanySelect = (item) => {
    setCompanyViewData(item);
    setShowCompanyModal(true);
  };

  if (authState.isSignedIn) {
    return (
      <div>
        <ErrorHandler error={error} setError={setError} />
        <CompanyViewModal
          showModal={showCompanyModal}
          showModalHandler={setShowCompanyModal}
          companyData={companyViewData}
        />
        <div>
          <DataTable
            baseUrl="/companies"
            tableColumns={companyTableColumns}
            getPageOfData={fetchData}
            primaryKeyName="ticker"
            pageRefField="ticker"
            tableTitle="Company Directory"
            searchColumns={"companyName,raw.symbol"}
            onItemSelect={handleCompanySelect}
          />
        </div>
      </div>
    );
  }
}

export default Company;
