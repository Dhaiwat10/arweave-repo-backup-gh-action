import { useContext, useState } from 'react';
import { AppContext } from './components/Provider';

export const useBalance = () => {
  const { balance, bundlr, setBalance } = useContext(AppContext);

  const fetchBalance = async () => {
    const balance = await bundlr?.getLoadedBalance();
    setBalance(balance?.toString());
  };

  return { balance, fetchBalance };
};

export const useBundlrInstance = () => {
  const { bundlr } = useContext(AppContext);

  return { bundlr };
};

export const useFundWallet = () => {
  const { bundlr } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fundWallet = async (amount: string) => {
    try {
      setLoading(true);
      if (!bundlr) {
        alert('bundlr 404');
      }
      await bundlr?.fund(amount);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fundWallet,
    loading,
    error,
  };
};
