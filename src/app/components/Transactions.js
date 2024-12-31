import React from "react";
import useTransaction from "../hooks/useTransaction";
import Alert from "./Alert";
const statusTypes = {
  processing: "info",
  done: "success",
  rejected: "error",
};
const statusMessage = {
  processing: "Your prediction is being processed",
  done: "Your prediction was submitted successfully.",
  rejected: "Your prediction was rejected",
};
const Transactions = () => {
  const { state, clearById } = useTransaction();

  if (state.transactions.length <= 0) return null;
  else
    return (
      <div className="transactions">
        {state?.transactions?.map((message) => {
          const { status, id } = message;
          return (
            <Alert
              key={id}
              title={status}
              message={statusMessage[status]}
              type={statusTypes[status]}
              onClose={() => {
                clearById(id);
              }}
              closable={status !== "processing" ? true : false}
            />
          );
        })}
      </div>
    );
};

export default Transactions;
