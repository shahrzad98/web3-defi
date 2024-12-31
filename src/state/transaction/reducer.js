const ACTION_TYPES = {
  ADD_TRANSACTION: "addTransaction",
  UPDATE_TRANSACTION: "updateTransaction",
  UPDATE_TRANSACTION_ID: "updateTransactionId",
  CLEAR__ALL_TRANSACTION: "clearAllTransactionn",
  CLEAR_TRANSACTION: "clearTransaction",
};

const userReducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case ACTION_TYPES.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, value],
      };
    case ACTION_TYPES.UPDATE_TRANSACTION:
      return {
        transactions: [
          value,
          ...state.transactions.filter((i) => i.id !== value.id),
        ],
      };
    case ACTION_TYPES.UPDATE_TRANSACTION_ID:
      return {
        transactions: [
          {
            ...state.transactions.find((i) => i.id === value.id),
            id: value?.newId,
          },
          ...state.transactions.filter((i) => i.id !== value.id),
        ],
      };
    case ACTION_TYPES.CLEAR_TRANSACTION:
      return {
        transactions: [...state.transactions.filter((i) => i.id !== value)],
      };
    case ACTION_TYPES.CLEAR__ALL_TRANSACTION:
      return {
        transactions: [],
      };

    default:
      return state;
  }
};

export default userReducer;
