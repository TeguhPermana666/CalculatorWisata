import {
  Box,
  Container,
  Heading,
  VStack,
  useToast
} from "@chakra-ui/react"
import { CalculatorProvider, useCalculator } from "../context/CalculatorContext"
import HotelSelector from "../components/Calculator/HotelSelector"
import VillaSelector from "../components/Calculator/VillaSelector"
import TourSelector from "../components/Calculator/TourSelector"
import AdditionalCostForm from "../components/Calculator/AdditionalCostForm"
import PriceBreakdownTable from "../components/Calculator/PriceBreakdownTable"
import SubmitBar from "../components/Calculator/SubmitBar"

const CalculatorContent = () => {
  const {
    hotel, villa, tours, extras,
    updateHotel, updateVilla,
    addTour, removeTour,
    addExtra, removeExtra,
    resetAll, totalPrice
  } = useCalculator()

  const toast = useToast()

  const handleSubmit = () => {
    toast({
      title: "Data disimpan.",
      description: "Simulasi berhasil dihitung.",
      status: "success",
      duration: 3000,
      isClosable: true
    })
    console.log({
      hotel, villa, tours, extras, total: totalPrice
    })
  }

  return (
    <>
      <Container bg={"black"} maxW="5xl" py={8}>
        <Heading size="lg" mb={6}>Kalkulator Harga Paket Wisata</Heading>

        <VStack spacing={6} align="stretch">
          <HotelSelector onChange={updateHotel} />
          <VillaSelector onChange={updateVilla} />
          <TourSelector onAdd={addTour} onRemove={removeTour} />
          <AdditionalCostForm onAdd={addExtra} onRemove={removeExtra} />
          <PriceBreakdownTable />
        </VStack>
      </Container>

      <SubmitBar
        total={totalPrice}
        onSubmit={handleSubmit}
        onReset={resetAll}
      />
    </>
  )
}

const CalculatorPage = () => (
  <CalculatorProvider>
    <CalculatorContent />
  </CalculatorProvider>
)

export default CalculatorPage
