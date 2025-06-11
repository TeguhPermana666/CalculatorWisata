import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Text, useColorModeValue
} from "@chakra-ui/react"

const formatRp = (val) => {
  if (!val || isNaN(val)) return "Rp 0"
  return "Rp " + Number(val).toLocaleString("id-ID")
}

const PriceBreakdownTable = ({ hotel, villa, tours = [], extras = [] }) => {
  const rows = []

  if (hotel) {
    rows.push({
      type: "Hotel",
      name: hotel.hotelName || hotel.label,
      base: hotel.basePrice * (hotel.nights || 1),
      markup: hotel.markupType === "percent" ? `${hotel.markupValue}%` : formatRp(hotel.markupValue),
      final: hotel.totalPrice,
    })
  }

  if (villa) {
    rows.push({
      type: "Villa",
      name: villa.villaName || villa.label,
      base: villa.basePrice * (villa.nights || 1),
      markup: villa.markupType === "percent" ? `${villa.markupValue}%` : formatRp(villa.markupValue),
      final: villa.totalPrice,
    })
  }

  tours.forEach(t => {
    rows.push({
      type: "Tour",
      name: t.tourName,
      base: t.basePrice,
      markup: t.markupType === "percent" ? `${t.markupValue}%` : formatRp(t.markupValue),
      final: t.finalPrice,
    })
  })

  extras.forEach(e => {
    rows.push({
      type: "Extra",
      name: e.label,
      base: e.basePrice,
      markup: e.markupType === "percent" ? `${e.markupValue}%` : formatRp(e.markupValue),
      final: e.finalPrice,
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
