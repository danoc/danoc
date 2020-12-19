import { AppProps } from "next/app";
import React from "react";
import Container from "../components/container";
import "../styles.css";

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default App;
