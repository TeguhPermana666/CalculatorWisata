import { Box, Heading, Text, VStack, Divider } from "@chakra-ui/react"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { useCalculator } from "../context/CalculatorContext"
import CurrencyDisplay from "../components/ui/CurrencyDisplay"

const PrintPreview = () => {
  const componentRef = useRef()
  const { hotel, villa, tours, extras, totalPrice } = useCalculator()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Kalkulasi Paket Wisata"
  })

  return (
    <Box p={8}>
      <Heading mb={4}>Print Preview</Heading>
      <button onClick={handlePrint}>🖨️ Print / Save as PDF</button>

      <Box ref={componentRef} p={6} mt={6} borderWidth="1px" borderRadius="md">
        <Heading size="md" mb={4}>Rangkuman Estimasi Harga</Heading>
        <VStack spacing={3} align="start">
          {hotel && (
            <Text>
              🏨 Hotel: {hotel.name} – {hotel.nights} malam – <CurrencyDisplay amount={hotel.totalPrice} />
            </Text>
          )}
          {villa && (
            <Text>
              🏡 Villa: {villa.name} – {villa.nights} malam – <CurrencyDisplay amount={villa.totalPrice} />
            </Text>
          )}
          {tours.map((t, i) => (
            <Text key={i}>
              🗺️ Tour {i + 1}: {t.name} – <CurrencyDisplay amount={t.finalPrice} />
            </Text>
          ))}
          {extras.map((e, i) => (
            <Text key={i}>
              ➕ Tambahan {i + 1}: {e.label} – <CurrencyDisplay amount={e.finalPrice} />
            </Text>
          ))}

          <Divider />
          <Text fontWeight="bold">
            💰 Total: <CurrencyDisplay amount={totalPrice} />
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

export default PrintPreview
