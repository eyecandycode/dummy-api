import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import { AppProvider } from "./context/Context";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <GlobalStyle />
        <App />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
