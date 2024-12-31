/**
 *
 * ErrorModal
 *
 */
import * as React from "react";
import Modal from "react-modal";
import { Icon } from "app/components/Icon";
import "styles/scss/content.scss";

interface Props {
  isOpen: boolean;
  close: () => void;
  totem: string;
}

export const ErrorModal = ({ isOpen, close, totem }: Props) => {
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
      backgroundColor: "#739BA2",
    },
  };
  const totemWrapperBackgroundStyle = {
    minWidth: 0, // dummy style
    "@media screen and (maxWidth: 450px)": {
      backgroundColor: "#739BA2",
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
          style={totemWrapperBackgroundStyle}
        >
          <Icon url={`wolf-white.svg`} height={20} width={20}></Icon>
        </div>
        <p>Error</p>
        <Icon
          url={`close-${isMobile ? "grey" : "white"}.svg`}
          height={15}
          width={15}
          cursor={"pointer"}
          onClick={close}
        ></Icon>
      </div>
      <div className="content-modal-content">
        <p>Something went terribly wrong...</p>
      </div>
    </Modal>
  );
};
