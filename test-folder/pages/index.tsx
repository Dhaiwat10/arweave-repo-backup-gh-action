import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useBalance, useFundWallet } from './hooks';

const Home: NextPage = () => {
  const { balance } = useBalance();
  const { fundWallet, loading, error } = useFundWallet();

  // funding amount in wei
  const [fundAmount, setFundAmount] = useState('');

  return (
    <div className='flex flex-col p-20'>
      <ConnectButton />

      <h3>Your MATIC balance: {balance} wei</h3>

      <h3 className='mt-6 font-bold text-2xl'>Fund a Bundlr node</h3>
      <input
        value={fundAmount}
        onChange={(e) => setFundAmount(e.target.value)}
        className='p-2 border-2 rounded'
        placeholder='Amount in wei'
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          fundWallet(fundAmount);
        }}
        className='mt-2 py-2 px-4 rounded-lg w-fit bg-blue-900 text-white'
      >
        Fund
      </button>
    </div>
  );
};

export default Home;
