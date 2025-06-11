import {
  Box, Select, NumberInput, NumberInputField, FormLabel, VStack, HStack, Text
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import hotels from "../../data/hotels.json"

const HotelSelector = ({ onChange }) => {
  const [selectedHotel, setSelectedHotel] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [nights, setNights] = useState(1)
  const [markupType, setMarkupType] = useState("percent")
  const [markupValue, setMarkupValue] = useState(0)

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
    <Box p={4} borderWidth="1px" rounded="xl" shadow="md">
      <Text fontSize="xl" mb={2} fontWeight="bold">Pilih Hotel</Text>
      <VStack spacing={4} align="stretch">
        <Box>
          <FormLabel>Nama Hotel</FormLabel>
          <Select placeholder="Pilih hotel" onChange={(e) => {
            setSelectedHotel(e.target.value)
            setSelectedRoom("")
          }}>
            {hotelOptions.map((hotel, idx) => (
              <option key={idx} value={hotel}>{hotel}</option>
            ))}
          </Select>
        </Box>

        <Box>
          <FormLabel>Tipe Kamar</FormLabel>
          <Select
            placeholder="Pilih tipe kamar"
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
          <HStack>
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
          <Text mt={4} fontWeight="semibold">
            Total Harga Jual: Rp {totalPrice.toLocaleString()}
          </Text>
        )}
      </VStack>
    </Box>
  )
}

export default HotelSelector
