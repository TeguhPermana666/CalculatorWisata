import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { CalculatorProvider } from "./context/CalculatorContext";
import "./styles/index.css";
import "./styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AkomodasiContextProvider from "./context/AkomodasiContext";
import CheckoutContextProvider from "./context/CheckoutContext";
import TransportContextProvider from "./context/TransportContext";
import AdminProviderContext from "./context/Admin/AdminProviderContext";
const config = {
  initialColorMode: "dark", // dark default
  useSystemColorMode: false,
};

const theme = extendTheme({ config });
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <CalculatorProvider>
      <CheckoutContextProvider>
        <AkomodasiContextProvider>
          <TransportContextProvider>
            <AdminProviderContext>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AdminProviderContext>
          </TransportContextProvider>
        </AkomodasiContextProvider>
      </CheckoutContextProvider>
    </CalculatorProvider>
  </ChakraProvider>
);
