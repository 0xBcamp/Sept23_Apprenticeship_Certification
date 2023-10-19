import Header from "@/components/Header";
import "@/styles/globals.css";
import Head from "next/head";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { ContractContextProvider } from "../Context/ContractContext";

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
      <MoralisProvider initializeOnMount={false}>
        <ApolloProvider client={client}>
          <NotificationProvider>
            <ContractContextProvider>
              <Header />
              <Component {...pageProps} />
            </ContractContextProvider>
          </NotificationProvider>
        </ApolloProvider>
      </MoralisProvider>
    </div>
  );
}
