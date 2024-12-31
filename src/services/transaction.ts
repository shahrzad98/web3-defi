import { ContractTransaction } from "ethers";
import { useEffect, useState } from "react";
import useTransactions from "../app/hooks/useTransaction";
export const useTransaction = (allowed: Function) => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [transaction, setTransaction] = useState<
    Promise<ContractTransaction>
  >();
  const transactions = useTransactions();
  useEffect(() => {
    if (transaction) {
      setWaiting(true);
      setError(null);

      transaction
        .then((tx) => {
          tx.wait(1)
            .then(() => {
              allowed(null);
              setError(null);
            })
            .catch((e) => {
              allowed(e.message);
              setError(e.message);
              transactions.update(1, "rejected");
            })
            .finally(() => {
              setWaiting(false);
            });
        })
        .catch((e) => {
          transactions.update(1, "rejected");
          setError(e.message);
          setWaiting(false);
        });
    }
  }, [transaction]);

  return {
    waiting,
    error,
    setError,
    setTransaction,
  };
};
