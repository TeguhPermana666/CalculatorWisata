import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Text, useColorModeValue, Spinner
} from "@chakra-ui/react"
import { calculateFinalPrice } from "../../utils/priceCalculator"

const formatRp = (val) => {
  if (!val || isNaN(val)) return "Rp 0"
  return "Rp " + Number(val).toLocaleString("id-ID")
}

const PriceBreakdownTable = ({ hotel, villa, tours = [], extras = [] }) => {
  const hasValidHotel = hotel && typeof hotel === "object" && hotel.basePrice != null
  const hasValidVilla = villa && typeof villa === "object" && villa.basePrice != null

  const isLoading = !hasValidHotel && !hasValidVilla && tours.length === 0 && extras.length === 0

  if (isLoading) {
    return (
      <Box mt={8} textAlign="center">
        <Spinner size="lg" />
        <Text mt={2}>Memuat data...</Text>
      </Box>
    )
  }

  const rows = []

  if (hasValidHotel) {
    const base = hotel.basePrice * (hotel.nights || 1)
    const final = hotel.totalPrice ?? calculateFinalPrice(base, hotel.markupType, hotel.markupValue)

    rows.push({
      type: "Hotel",
      name: hotel.hotelName || hotel.label,
      base,
      markup: hotel.markupType === "percent"
        ? `${hotel.markupValue}%`
        : formatRp(hotel.markupValue),
      final,
    })
  }

  if (hasValidVilla) {
    const base = villa.basePrice * (villa.nights || 1)
    const final = villa.totalPrice ?? calculateFinalPrice(base, villa.markupType, villa.markupValue)

    rows.push({
      type: "Villa",
      name: villa.villaName || villa.label,
      base,
      markup: villa.markupType === "percent"
        ? `${villa.markupValue}%`
        : formatRp(villa.markupValue),
      final,
    })
  }

  tours.forEach(t => {
    const final = t.finalPrice ?? calculateFinalPrice(t.basePrice, t.markupType, t.markupValue)

    rows.push({
      type: "Tour",
      name: t.tourName,
      base: t.basePrice,
      markup: t.markupType === "percent" ? `${t.markupValue}%` : formatRp(t.markupValue),
      final,
    })
  })

  extras.forEach(e => {
    const final = e.finalPrice ?? calculateFinalPrice(e.basePrice, e.markupType, e.markupValue)

    rows.push({
      type: "Extra",
      name: e.label,
      base: e.basePrice,
      markup: e.markupType === "percent" ? `${e.markupValue}%` : formatRp(e.markupValue),
      final,
    })
  })

  const totalFinal = rows.reduce((acc, item) => acc + (item.final || 0), 0)

  const tableBg = useColorModeValue("gray.50", "gray.700")
  const headerBg = useColorModeValue("gray.100", "gray.600")
  const borderColor = useColorModeValue("gray.200", "gray.500")

  return (
    <Box mt={8} borderWidth="1px" borderRadius="lg" overflowX="auto" borderColor={borderColor}>
      <Box p={4} bg={tableBg} borderBottomWidth="1px" borderColor={borderColor}>
        <Text fontSize="xl" fontWeight="bold">📊 Rincian Harga</Text>
      </Box>
      <Table variant="simple" size="sm">
        <Thead bg={headerBg}>
          <Tr>
            <Th>Jenis</Th>
            <Th>Nama</Th>
            <Th isNumeric>Harga Modal</Th>
            <Th isNumeric>Markup</Th>
            <Th isNumeric>Harga Jual</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((item, idx) => (
            <Tr key={idx}>
              <Td>{item.type}</Td>
              <Td>{item.name}</Td>
              <Td isNumeric>{formatRp(item.base)}</Td>
              <Td isNumeric>{item.markup}</Td>
              <Td isNumeric fontWeight="semibold">{formatRp(item.final)}</Td>
            </Tr>
          ))}
          <Tr bg={useColorModeValue("gray.100", "gray.600")}>
            <Td colSpan={4} textAlign="right" fontWeight="bold">Total</Td>
            <Td isNumeric fontWeight="extrabold" color="blue.400">
              {formatRp(totalFinal)}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}

export default PriceBreakdownTable
