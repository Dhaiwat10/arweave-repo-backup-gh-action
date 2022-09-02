import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  useProvider,
  useSigner,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Provider } from './components/Provider';
import { FC, ReactNode, useEffect } from 'react';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const InternalWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  return (
    <Provider
      // @ts-expect-error
      signerOrProvider={signer || provider}
    >
      {children}
    </Provider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <InternalWrapper>
          <Component {...pageProps} />
        </InternalWrapper>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
