/**
 *
 * WalletInfo
 *
 */
import { Web3Provider } from "@ethersproject/providers";
import { CircularProgress } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { Currency, CurrencyUnit } from "app/components/Currency";
import useUser from "graphql/hooks/useUser";
import { Stake } from "graphql/models";
import React from "react";
import { useTotemToken } from "services/token";
import "styles/scss/user-data.scss";
import { isMatured } from "utils/pool";
interface Props {
  stakes: Stake[];
  balance: any;
}
export const WalletInfo = ({ stakes, balance }: Props) => {
  const { account } = useWeb3React<Web3Provider>();
  const { toTOTM, balanceLoading, balance: walletBalance } = useTotemToken(account);
  const user = useUser(account) || { totalStaked: 0 };
  let finalBalance = balance._hex === "0x00"? walletBalance : balance
  var AmountStaked = 0;

  for (let i = 0; i < stakes.length; i++) {
    if (!isMatured(stakes[i].pool)) {
      AmountStaked = AmountStaked + toTOTM(stakes[i].value);
    }
  }

  return (
    <div className="ud-walletinfo-main-div">
      <h1>Your Wallet</h1>
      <div className="ud-walletinfo-column-wallet">
        {balanceLoading ? (
          <CircularProgress size={50} />
        ) : (
          <div className="wallet-details">
            <div>
              <p>Total Balance</p>
              <p>
                <Currency
                  unit={CurrencyUnit.TOTEM}
                  size={35}
                  value={toTOTM(finalBalance) + AmountStaked}
                />
              </p>
            </div>

            <div>
              <p>Amount Staked</p>
              <p>
                <Currency
                  unit={CurrencyUnit.TOTEM}
                  size={35}
                  value={AmountStaked}
                />
              </p>
            </div>

            <div>
              <p>Available to stake</p>

              <p>
                <Currency
                  unit={CurrencyUnit.TOTEM}
                  size={35}
                  value={toTOTM(finalBalance)}
                />
              </p>
            </div>
          </div>
        )}

        <div className="row">
          <div
            className="ud-walletinfo-add-totem"
            onClick={() =>
              window.open(
                `https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${process.env.REACT_APP_UNISWAP_CONTRACT_ADDRESS}`,
                "_blank"
              )
            }
          >
            <p>Add TOTM</p>
          </div>
        </div>
      </div>
    </div>
  );
};
