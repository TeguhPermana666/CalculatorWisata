import { Box, Text, VStack, Divider } from "@chakra-ui/react"

const PriceSummary = ({ hotelData, villaData, tours, extras }) => {
  const getTotal = (items = []) => {
    return items.reduce((acc, item) => acc + (item.finalPrice || 0), 0)
  }

  const hotelTotal = hotelData?.totalPrice || 0
  const villaTotal = villaData?.totalPrice || 0
  const tourTotal = getTotal(tours)
  const extrasTotal = getTotal(extras)

  const subtotal = hotelTotal + villaTotal + tourTotal + extrasTotal

  const totalMarkup = (
    (hotelData?.markupType && hotelData?.markupValue)
      ? (hotelData.markupType === "percent"
        ? (hotelData.basePrice * hotelData.markupValue) / 100 * (hotelData.nights || 1)
        : hotelData.markupValue * (hotelData.nights || 1))
      : 0
  ) + (villaData?.markupValue || 0)

  return (
    <Box mt={6} p={4} borderWidth="1px" rounded="xl" shadow="md" bg="gray.50">
      <Text fontSize="xl" fontWeight="bold" mb={3}>Ringkasan Harga</Text>
      <VStack spacing={2} align="stretch">
        {hotelData && (
          <Text>🏨 Hotel: Rp {hotelTotal.toLocaleString()}</Text>
        )}
        {villaData && (
          <Text>🏡 Villa: Rp {villaTotal.toLocaleString()}</Text>
        )}
        {tours?.length > 0 && (
          <Text>🧭 Tour: Rp {tourTotal.toLocaleString()}</Text>
        )}
        {extras?.length > 0 && (
          <Text>➕ Tambahan: Rp {extrasTotal.toLocaleString()}</Text>
        )}

        <Divider my={2} />
        <Text fontWeight="semibold">💰 Total Harga Jual: Rp {subtotal.toLocaleString()}</Text>
      </VStack>
    </Box>
  )
}

export default PriceSummary
