import React from "react";
import { useLocation } from "react-router-dom";

const ApplicationConfirmation = () => {
  const location = useLocation();
  const { status, message } = location.state || { status: "error", message: "Something went wrong!" };

  return (
    <div>
      <h2>Application {status === "success" ? "Successful" : "Failed"}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ApplicationConfirmation;