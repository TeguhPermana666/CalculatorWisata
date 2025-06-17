import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { CalculatorProvider } from "./context/CalculatorContext"
import "./styles/index.css"
import "./styles/global.css"
const config = {
  initialColorMode: "dark", // dark default
  useSystemColorMode: false,
}

const theme = extendTheme({ config })
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CalculatorProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CalculatorProvider>
    </ChakraProvider>
  </React.StrictMode>
)
