import { useContext } from "react";

import { NotificationContext } from "../../state/notification/notificationContext";

const useNotification = () => {
  const { state, dispatch } = useContext(NotificationContext);

  const error = (content) => {
    const id = new Date();
    content &&  dispatch({
      type: "addNotification",
      value: { content: content, type: "error", id },
    });
  };
  const success = (content) => {
    const id = new Date();
    dispatch({
      type: "addNotification",
      value: { content: content, type: "success", id },
    });
  };
  const clearById = (id) => {
    dispatch({
      type: "clearNotification",
      value: id,
    });
  };
  const clearByIndex = (index) => {
    dispatch({
      type: "clearNotification",
      value: index,
    });
  };
  const clearAll = () => {
    dispatch({
      type: "clearAllNotification",
    });
  };

  return {
    error,
    success,
    clearAll,
    clearByIndex,
    clearById,
    state,
    dispatch,
  };
};

export default useNotification;
