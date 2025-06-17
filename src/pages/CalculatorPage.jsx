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
import AccommodationSelector from "../components/AccommodationSelector"
import TourSelector from "../components/TourSelector"
import AdditionalCostForm from "../components/AdditionalCostForm"
import PriceBreakdownTable from "../components/PriceBreakdownTable"
import SubmitBar from "../components/SubmitBar"

const CalculatorContent = () => {
  const {
    hotels, villas, tours, extras,
    updateHotels, updateVillas,
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
      hotels, villas, tours, extras, total: totalPrice
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
            onHotelChange={updateHotels}
            onVillaChange={updateVillas}
          />
          <TourSelector onAdd={addTour} onRemove={removeTour} />
          <AdditionalCostForm onAdd={addExtra} onRemove={removeExtra} />
          <PriceBreakdownTable
            hotels={hotels}
            villas={villas}
            tours={tours}
            extras={extras}
          />

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
