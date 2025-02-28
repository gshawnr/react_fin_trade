import { Button, Typography } from "@mui/material";
import React from "react";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  return (
    <div
      className="error-boundary-fallback-container"
      style={{ width: "80%", margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ margin: "5% 0" }}>
          Error Boundary Fallback
        </Typography>
        <Typography variant="h3">
          ({error?.message ? error.message : ""})
        </Typography>
        <img
          // src="/images/glasses.png"
          // src=""
          alt=""
          style={{ width: "800px", margin: "3% 0 8%" }}
        />
        <Typography variant="h5">
          Sorry, something has gone wrong. Please try again, and if the problem
          persists, contact your administrator.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={resetErrorBoundary}
          style={styles.btn}
        >
          reset
        </Button>
      </div>
    </div>
  );
}

const styles = {
  btn: {
    backgroundColor: "#ef4040",
    "&:hover": {
      backgroundColor: "#FF6868",
    },
    margin: "40px 0",
    width: "400px",
  },
};
export default ErrorBoundaryFallback;
