/**
 *
 * ConnectMetamaskModal
 *
 */
import * as React from "react";
import Modal from "react-modal";
import { TotemsData } from "types/constants";
import { Icon } from "app/components/Icon";
import "styles/scss/content.scss";

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: string;
}

export const ConnectMetamaskModal = ({ isOpen, close, totem }: Props) => {
  const isMobile = false;
  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, .4)" },
    content: {
      width: "100%",
      maxWidth: 420,
      height: 200,
      border: 0,
      padding: 0,
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const modalHeaderBackgroundStyle = {
    minWidth: 0, // dummy style
    "@media screen and (maxWidth: 450px)": {
      backgroundColor: TotemsData[totem].color,
    },
  };
  const wrapperLinkBackgroundStyle = {
    minWidth: 0, // dummy style
    "&:hover": {
      backgroundColor: TotemsData[totem].color,
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
        style={modalHeaderBackgroundStyle}
      >
        <div
          className="pc-predict-model-totem-wrapper"
          style={modalHeaderBackgroundStyle}
        >
          <Icon url={`${totem}-white.svg`} height={20} width={20}></Icon>
        </div>
        <p>Connect to wallet</p>
        <Icon
          url={`close-${isMobile ? "grey" : "white"}.svg`}
          height={15}
          width={15}
          cursor={"pointer"}
          onClick={close}
        ></Icon>
      </div>
      <div className="content-cmm-modal-content">
        <div
          className="content-cmm-wrapper-link"
          style={wrapperLinkBackgroundStyle}
          onClick={() => window.open("https://metamask.io", "_blank")}
        >
          {" "}
          <div className="content-cmm-message">
            <p>Install Metamask</p>
            <small>Sign in from metamask browser</small>
          </div>
          <img
            alt=""
            src={"assets/images/metamask-icon.png"}
            width={24}
            height={24}
          />
        </div>
      </div>
    </Modal>
  );
};
