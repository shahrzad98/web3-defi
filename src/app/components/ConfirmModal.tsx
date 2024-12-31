/**
 *
 * ConfirmModal
 *
 */
import { CircularProgress } from "@material-ui/core";
import { ReactGAM } from "app/google-analytics/google-analytics";
import * as React from "react";
import Modal from "react-modal";
import { TotemsData } from "types/constants";
import { Icon } from "./Icon";

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: string;
  message?: string | JSX.Element;
  confirm: () => void;
  loading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  close,
  totem,
  message,
  confirm,
  loading = false,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isMobile = false;

  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, .4)" },
    content: {
      background: `url("${process.env.PUBLIC_URL}/assets/images/aaaa.png") 0 0 repeat white`,
      backgroundSize: "contain",
      width: "400px",
      maxWidth: 400,
      border: 0,
      padding: 0,
      top: "20%",
      left: "calc(50% - 200px)",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      // transform: "translate(-65%, -50%)",
      height: "fit-content !important",
    },
  };

  // Todo: this was from props?

  const buttonBgStyle = {
    backgroundColor: TotemsData[totem].color,
  };
  const totemModalHeaderBgStyle = {
    minWidth: 0, // dummy style
    "@media screen and (maxWidth: 450px)": {
      backgroundColor: TotemsData[totem].color,
    },
  };

  const loadingWrapperBgStyle = {
    minWidth: 0, // dummy style
    ">.icon-mobile": {
      marginLeft: "-50px",
    },
    ".MuiCircularProgress-colorPrimary": {
      color: TotemsData[totem].color,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      ariaHideApp={false}
    >
      <div
        className="content-cmm-totem-modal-header"
        style={totemModalHeaderBgStyle}
      >
        <div
          className="pc-predict-model-totem-wrapper"
          style={totemModalHeaderBgStyle}
        >
          <Icon
            url={`${totem.toLowerCase()}-white.svg`}
            height={20}
            width={20}
          ></Icon>
        </div>
        <p>{loading ? "Loading..." : `${totem} Pool`}</p>
        <Icon
          url={`close-${isMobile ? "grey" : "white"}.svg`}
          height={15}
          width={15}
          cursor={"pointer"}
          onClick={close}
        ></Icon>
      </div>
      {loading ? (
        <div
          className="comp-confirm-modal-loading-wrapper"
          style={loadingWrapperBgStyle}
        >
          <CircularProgress size={80} />
        </div>
      ) : (
        <div className="comp-confirm-modal-content">
          <p>{message}</p>
          <div className="comp-confirm-modal-button-block">
            <div className="comp-cancel-modal-button" onClick={close}>
              Edit
            </div>
            <div
              className="comp-confirm-modal-button"
              onClick={() => {
                ReactGAM().trackEvent("user", "actual prediction");
                confirm();
              }}
            >
              Confirm
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
