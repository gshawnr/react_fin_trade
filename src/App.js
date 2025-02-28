"use client";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./pages/ErrorBoundaryFallback";
import "./App.css";

import { Provider as AuthProvider } from "./context/authContext";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <AuthProvider>
        <div className="container">
          <AppRoutes />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

// const appExport = () => {
//   return (
//     <AuthProvider>
//       <div className="container">
//         <App />
//       </div>
//     </AuthProvider>
//   );
// };

// export default appExport;
