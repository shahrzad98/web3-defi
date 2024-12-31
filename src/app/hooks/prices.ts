import { useEffect, useState } from "react";
import axios from "axios";
import { offchain } from "../../utils/networks";
export type MarketInformation = {
  price?: number;
  marketCap?: number;
  circulatingSupply?: number;
};

const useMarketInformation = (token: string) => {
  const endpoint = `https://api.coingecko.com/api/v3/coins/${token}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const [marketInformation, setMarketInformation] = useState<MarketInformation>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(endpoint)
      .then(({ data }) => {
        setError("");
        setMarketInformation({
          price: data.market_data.current_price.usd.toFixed(4),
          marketCap: data.market_data.market_cap.usd,
          circulatingSupply: Math.round(data.market_data.circulating_supply),
        });
      })
      .catch((e) => {
        setError(e.message);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  return { marketInformation, error, loading };
};
const useOffchainInformation = (token: string) => {
  const endpoint = offchain.priceEndPoint;
  const [marketInformation, setMarketInformation] = useState<MarketInformation>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(endpoint)
      .then(({ data }) => {
        setError("");

        setMarketInformation({
          price: data?.data?.TOTM?.quote?.USD?.price.toFixed(4),
          marketCap: data?.data?.TOTM?.quote?.USD?.market_cap,
          circulatingSupply: Math.round(data?.data?.TOTM?.circulating_supply),
        });
      })
      .catch((e) => {
        setError(e.message);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  return { marketInformation, error, loading };
};

const usePrices = () => {
  const totm = useOffchainInformation("totmprice");
  const btc = useMarketInformation("bitcoin");

  return {
    loading: totm?.loading || btc?.loading,
    totmPrice: totm.marketInformation.price,
    btcPrice: btc.marketInformation.price,
  };
};

export default usePrices;
