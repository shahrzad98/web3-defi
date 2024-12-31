import { useContext } from "react";

import { TransactionContext } from "../../state/transaction/transactionContext";

const useTransaction = () => {
  const { state, dispatch } = useContext(TransactionContext);

  const add = (id, status) => {
    dispatch({
      type: "addTransaction",
      value: { status, id },
    });
  };
  const update = (id, status, type = "unknown") => {
    dispatch({
      type: "updateTransaction",
      value: { status, id, type },
    });
  };
  const updateId = (id, newId) => {
    dispatch({
      type: "updateTransactionId",
      value: { id, newId },
    });
  };
  const clearById = (id) => {
    dispatch({
      type: "clearTransaction",
      value: id,
    });
  };
  const clearByIndex = (index) => {
    dispatch({
      type: "clearTransaction",
      value: index,
    });
  };
  const clearAll = () => {
    dispatch({
      type: "clearAllTransaction",
    });
  };

  return {
    add,
    update,
    clearAll,
    clearByIndex,
    clearById,
    updateId,
    state,
    dispatch,
  };
};

export default useTransaction;
