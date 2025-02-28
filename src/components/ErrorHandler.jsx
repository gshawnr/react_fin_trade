import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AxiosError, RedirectError } from "../utils/Error";
import ErrorModal from "./ErrorModal";

// TODO need to setup error logging

function ErrorHandler({ error, setError }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      destructureError();
    }
    setIsLoading(false);
  }, [error]);

  const destructureError = () => {
    if (error instanceof RedirectError) {
      setError(null);
      navigate(error.redirectPath);
    } else if (error instanceof AxiosError) {
      handleAxiosError();
    } else {
      // throw unexpected error to boundary error fallback
      throw error;
    }
  };

  const handleAxiosError = () => {
    const { data, status = 500 } = error.response;
    const { message: serverMessage, data: serverData } = data;

    // if 400, return error to user via error object
    if (status > 399 && status < 500) {
      let thisErrorMsg = "";

      if (Array.isArray(serverMessage)) {
        let msgStr = "";

        serverMessage.forEach((msg) => {
          const { message } = msg;
          if (message) {
            msgStr = `${msgStr} ${message}`;
          }
        });

        thisErrorMsg = msgStr;
      } else if (typeof serverMessage === "string") {
        thisErrorMsg = serverMessage;
      } else {
        thisErrorMsg = `Unexpected ${status} error`;
      }

      setErrorTitle("Request Error");
      setErrorMessage(thisErrorMsg);
      setShowErrorModal(true);
    } else {
      throw error;
    }
  };

  return (
    <div className="error-handler-container">
      {isLoading ? null : (
        <ErrorModal
          openModal={showErrorModal}
          onClose={() => {
            setShowErrorModal(false);
            setErrorMessage("");
            setError(null);
          }}
          title={errorTitle}
          content={errorMessage}
        />
      )}
    </div>
  );
}

export default ErrorHandler;
