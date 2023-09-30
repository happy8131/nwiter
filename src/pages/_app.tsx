import LoadingScreen from "../components/lodingScreen";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { auth } from "../../firebase";
import ProtectedRoute from "../components/protected";

const GlobalStyles = createGlobalStyle`
 ${reset}
 * {
 box-sizing: border-box;
}
body {
 background-color: black;
 color:white;
 font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <Component {...pageProps} />}
    </Wrapper>
  );
}
