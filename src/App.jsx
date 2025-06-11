import { Routes, Route, Navigate } from "react-router-dom"
import CalculatorPage from "./pages/CalculatorPage"
import PrintPreview from "./pages/PrintPreview"
import Dashboard from "./pages/Dashboard"
import { Box } from "@chakra-ui/react"

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Routes>
        <Route path="/" element={<Navigate to="/calculator" />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/print-preview" element={<PrintPreview />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Box>
  )
}

export default App
