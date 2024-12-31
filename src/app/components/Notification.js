import React from "react";
import useNotification from "../hooks/useNotification";
import Alert from "../components/Alert";
const Notification = () => {
  const { state, clearById } = useNotification();

  if (state.messages.length <= 0) return null;
  else
    return (
      <div className="notification">
        {state?.messages?.map((message, index) => {
          const { content, type, id } = message;
          return (
            <Alert
              ket={id}
              title={type}
              message={content}
              type={type}
              onClose={() => {
                clearById(id);
              }}
              closable="true"
            />
          );
        })}
      </div>
    );
};

export default Notification;
