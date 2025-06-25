import { Routes, Route, Navigate } from "react-router-dom"
import CalculatorPage from "./pages/CalculatorPage"
import TourPackagePage from "./pages/TourPackages"
import { Box, useColorModeValue } from "@chakra-ui/react"

function App() {
  const bg = useColorModeValue("gray.50", "gray.900") // light vs dark

  return (
    <Box minH="100vh" bg={bg}>
      <Routes>
        <Route path="/" element={<Navigate to="/calculator" />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="tour-packages" element={<TourPackagePage />} />
      </Routes>
    </Box>
  )
}


export default App
