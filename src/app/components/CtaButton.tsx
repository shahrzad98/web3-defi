/**
 *
 * CtaButton
 *
 */
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ReactGAM } from "app/google-analytics/google-analytics";
import React, { memo } from "react";
interface Props {
  background: string;
  color: string;
  classes?: string;
  showModal?: () => void;
}

export const CtaButton = memo((props: Props) => {
  const styles = {
    color: props.color,
    backgroundColor: props.background,
  };

  const { account } = useWeb3React<Web3Provider>();

  const callShowModal = () => {
    ReactGAM().trackModalView("connect wallet");
    props.showModal();
  };

  return (
    <div
      className={`cta-button ${props.classes || ""}`}
      style={styles}
      onClick={() => {
        ReactGAM().trackPageView("predict_now");
        callShowModal();
      }}
      {...props}
    >
      {!account ? <b>Connect Your Wallet</b> : <b>Predict Now</b>}
    </div>
  );
});
