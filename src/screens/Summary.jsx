import React, { useContext, useState, useEffect } from "react";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/Table";
import beApi from "../api/beApi";

function Summary() {
  const { state: authState } = useContext(AuthContext);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    try {
      (async function () {
        const response = await beApi.get("/summary");
        if (response?.data) {
          setRowData(response.data);
        }
      })();
    } catch (err) {
      console.log("Error fetching summary data", err);
    }
  }, []);

  if (!authState.isSignedIn) {
    return <h1>Please sign In</h1>;
  }
  // return <div>Summary</div>;
  return <DataTable rows={rowData} columns={columns} />;
}

// TODO move to separate file
const columns = [
  { name: "ticker_year", label: "Ticker / Year" },
  { name: "currentAssets", label: "Current Assets", dataType: "number" },
  { name: "assets", label: "Total Assets", dataType: "number" },
  { name: "totalDebt", label: "Total Debt", dataType: "number" },
  { name: "liabilities", label: "Total Liabilities", dataType: "number" },
  { name: "equity", label: "Equity", dataType: "number" },
  { name: "revenue", label: "Revenue", dataType: "number" },
  { name: "costOfRevenue", label: "Cost of Revenue", dataType: "number" },
  { name: "grossProfit", label: "Gross Profit", dataType: "number" },
  { name: "netIncome", label: "Net Income", dataType: "number" },
  { name: "eps", label: "EPS", dataType: "number" },
  { name: "epsDiluted", label: "EPS Diluted", dataType: "number" },
  {
    name: "avgSharesOutstanding",
    label: "Avg Shares Outstanding",
    dataType: "number",
  },
  {
    name: "avgSharesOutstandingDiluted",
    dataType: "number",
    label: "Avg Shares Outstanding Diluted",
    dataType: "number",
  },
];

export default Summary;
