import React, { useContext, useState, useEffect } from "react";

import { Context as AuthContext } from "../context/authContext";
import DataTable from "../components/Table";
import beApi from "../api/beApi";

function Summary() {
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    try {
      (async function () {
        const response = await beApi.get("/summary");
        console.log(response.data);
      })();
    } catch (err) {
      console.log("Error fetching summary data", err);
    }
  }, []);

  if (!authState.isSignedIn) {
    return <h1>Please sign In</h1>;
  }
  // return <div>Summary</div>;
  return <DataTable />;
}

export default Summary;
