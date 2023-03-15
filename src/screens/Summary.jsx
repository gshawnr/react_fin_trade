import React, { useContext, useState } from "react";
import { Context as AuthContext } from "../context/authContext";

function Summary() {
  const { state: authState } = useContext(AuthContext);

  if (!authState.isSignedIn) {
    return <h1>Please sign In</h1>;
  }
  return <div>Summary</div>;
}

export default Summary;
