import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default MyApp;
