import React, { useEffect, useState } from "react";

enum ShowStoppers {
  SHOW,
  FADING_OUT,
  HIDE,
}

interface ConfirmationIndicatorProps {
  loading: boolean;
  error?: string;
}

const ConfirmationIndicator = (props: ConfirmationIndicatorProps) => {
  const [showMe, setShowMe] = useState<ShowStoppers>(ShowStoppers.HIDE);

  const [error, setError] = useState<string>();

  const hideMe = () => {
    setShowMe(ShowStoppers.FADING_OUT);

    setTimeout(() => {
      setShowMe(ShowStoppers.HIDE);
    }, 2000);
  };

  useEffect(() => {
    if (props.loading) {
      setShowMe(ShowStoppers.SHOW);
    } else {
      hideMe();
    }
  }, [props.loading]);

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  useEffect(() => {
    if (error) hideMe();
  }, [error]);

  return (
    <>
      <span
        className="confirmation-indicator"
        style={
          showMe === ShowStoppers.SHOW
            ? { opacity: 1 }
            : showMe === ShowStoppers.FADING_OUT
            ? {
                opacity: 0,
                transition: `opacity 2s ease-in`,
              }
            : { display: "none" }
        }
      >
        <span className="confirmation-indicator-text">
          {showMe === ShowStoppers.SHOW
            ? "Pending"
            : showMe === ShowStoppers.FADING_OUT && error
            ? "Failure"
            : "Success"}
        </span>

        {showMe === ShowStoppers.SHOW ? (
          <i className="fas fa-circle-notch fa-spin"></i>
        ) : showMe === ShowStoppers.FADING_OUT && error ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-check"></i>
        )}
      </span>
    </>
  );
};

export default ConfirmationIndicator;
