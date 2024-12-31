const userReducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case "setCalculatedRewards":
      return {
        ...state,
        calculatedRewards: value,
      };

    default:
      return state;
  }
};

export default userReducer;
