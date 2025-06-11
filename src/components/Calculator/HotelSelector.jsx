import {
  Box, Select, NumberInput, NumberInputField,
  FormLabel, VStack, HStack, Text, useColorModeValue
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import hotels from "../../data/hotels.json"

const HotelSelector = ({ onChange }) => {
  const [selectedHotel, setSelectedHotel] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [nights, setNights] = useState(1)
  const [markupType, setMarkupType] = useState("percent")
  const [markupValue, setMarkupValue] = useState(0)

  const bg = useColorModeValue("white", "gray.700")
  const border = useColorModeValue("gray.200", "gray.600")

  const hotelOptions = [...new Set(hotels.map(h => h.hotelName))]
  const roomOptions = hotels.filter(h => h.hotelName === selectedHotel)
  const selectedData = roomOptions.find(r => r.roomType === selectedRoom)

  const basePrice = selectedData?.pricePerNight || 0
  const markup =
    markupType === "percent"
      ? (basePrice * markupValue) / 100
      : markupValue
  const totalPrice = (basePrice + markup) * nights

  useEffect(() => {
    if (selectedHotel && selectedRoom) {
      onChange({
        hotelName: selectedHotel,
        roomType: selectedRoom,
        nights,
        basePrice,
        markupType,
        markupValue,
        totalPrice,
      })
    }
  }, [selectedHotel, selectedRoom, nights, markupType, markupValue])

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderColor={border}
      borderRadius="lg"
      shadow="md"
      bg={bg}
      mt={4}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        🏨 Pilih Hotel
      </Text>

      <VStack spacing={4} align="stretch">
        <Box>
          <FormLabel>Nama Hotel</FormLabel>
          <Select
            placeholder="Pilih hotel"
            value={selectedHotel}
            onChange={(e) => {
              setSelectedHotel(e.target.value)
              setSelectedRoom("")
            }}
          >
            {hotelOptions.map((hotel, idx) => (
              <option key={idx} value={hotel}>{hotel}</option>
            ))}
          </Select>
        </Box>

        <Box>
          <FormLabel>Tipe Kamar</FormLabel>
          <Select
            placeholder="Pilih tipe kamar"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            isDisabled={!selectedHotel}
          >
            {roomOptions.map((r, idx) => (
              <option key={idx} value={r.roomType}>{r.roomType}</option>
            ))}
          </Select>
        </Box>

        <Box>
          <FormLabel>Jumlah Malam</FormLabel>
          <NumberInput min={1} value={nights} onChange={(_, val) => setNights(val)}>
            <NumberInputField />
          </NumberInput>
        </Box>

        <Box>
          <FormLabel>Markup</FormLabel>
          <HStack spacing={3}>
            <Select w="40%" value={markupType} onChange={(e) => setMarkupType(e.target.value)}>
              <option value="percent">%</option>
              <option value="fixed">Rp</option>
            </Select>
            <NumberInput min={0} value={markupValue} onChange={(_, val) => setMarkupValue(val)}>
              <NumberInputField />
            </NumberInput>
          </HStack>
        </Box>

        {selectedRoom && (
          <Box mt={4} bg="gray.600" color="white" px={4} py={2} rounded="md">
            <Text fontWeight="medium">Total Harga Jual</Text>
            <Text fontSize="lg" fontWeight="bold">
              Rp {totalPrice.toLocaleString("id-ID")}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default HotelSelector
