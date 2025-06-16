import {
  Box,
  Container,
  Heading,
  VStack,
  useToast,
  useColorModeValue
} from "@chakra-ui/react"
import { CalculatorProvider } from "../context/CalculatorContext"
import useCalculator from "../hooks/useCalculator"
import AccommodationSelector from "../components/ui/AccommodationSelector"
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

  const bg = useColorModeValue("white", "gray.800")

  return (
    <>
      <Container maxW="full" bg="black" py={10} px={{ base: 4, md: 12 }}>
        <Heading size="lg" mb={8} color="white" textAlign="center">
          Kalkulator Harga Paket Wisata
        </Heading>

        <VStack spacing={10} align="stretch" width="100%">
          <AccommodationSelector
            onHotelChange={updateHotel}
            onVillaChange={updateVilla}
          />
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
