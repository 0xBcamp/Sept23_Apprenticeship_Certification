import Header from "/components/Header";
import "/styles/globals.css";
import "/styles/argon-design-system-react.css";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ContractContextProvider } from "/Constants/Context/ContractContext";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { sepolia, mainnet, optimism, optimismSepolia } from "wagmi/chains";
const projectId = "2af24b72969c73477047998d06c8dff1";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, optimism, sepolia, optimismSepolia];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://sepolia.easscan.org/graphql",
});

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>BlockBadge</title>
        <meta name="description" content="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <ApolloProvider client={client}>
          <ContractContextProvider>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Component {...pageProps} />
          </ContractContextProvider>
        </ApolloProvider>
      </WagmiConfig>
    </div>
  );
}
