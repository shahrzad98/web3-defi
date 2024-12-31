import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Alert = (props) => {
  const {
    title,
    closeText,
    onClose,
    className,
    closable = false,
    message = "",
    showIcon = true,
    icon,
    type = "success",
  } = props;

  const isClosable = closeText ? true : closable;
  const isShowIcon = icon ? true : showIcon;

  const getIcon = () => {
    if (icon) return icon;
    else {
      let iconType = "";
      switch (type) {
        case "success":
          iconType = "icon-info";
          break;
        case "error":
          iconType = "icon-info";
          break;
        case "warning":
          iconType = "icon-info";
          break;
        case "info":
          iconType = "icon-info";
          break;
        default:
          iconType = "icon-info";
          break;
      }
      return iconType;
    }
  };

  const handleClose = (e) => {
    typeof onClose === "function" && onClose(e);
  };

  useEffect(() => {
    setTimeout(() => {
      closable && onClose();
    }, 5000);
  }, [closable]);

  return (
    <>
      <div className={["alert", type, className].join(" ")}>
        {isShowIcon && <i className={["alert-icon " + getIcon()].join(" ")} />}
        {title && <span className="alert-title">{title}</span>}
        {message && (
          <div
            className="alert-description"
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          ></div>
        )}
        {isClosable && (
          <span
            role="button"
            className="alert-close-icon"
            onClick={handleClose}
          >
            <i className="icon-cancel color-gray" />
          </span>
        )}
      </div>
    </>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(["success", "info", "warning", "error"]),
  onClose: PropTypes.func,
  message: PropTypes.node,
  closable: PropTypes.bool,
  closeText: PropTypes.node,
  showIcon: PropTypes.bool,
  icon: PropTypes.node,
  dataTest: PropTypes.string,
};

export default Alert;
