import {
  Box, FormLabel, Select, NumberInput, NumberInputField, VStack,
  Text, useColorModeValue
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import MarkupInput from "./MarkupInput"
import villaData from "../../data/villas.json"

const VillaSelector = ({ onChange }) => {
  const [selectedVilla, setSelectedVilla] = useState("")
  const [selectedRoom, setSelectedRoom] = useState("")
  const [nights, setNights] = useState(1)
  const [markupType, setMarkupType] = useState("percent")
  const [markupValue, setMarkupValue] = useState(0)

  const villa = villaData.find(v => v.villaName === selectedVilla)
  const room = villa?.rooms?.find(r => r.roomType === selectedRoom)

  const basePrice = room?.seasons?.normal || 0
  const totalBase = basePrice * nights

  const markup = markupType === "percent"
    ? (totalBase * markupValue) / 100
    : markupValue * nights

  const totalPrice = totalBase + markup

  const bg = useColorModeValue("white", "gray.700")
  const border = useColorModeValue("gray.200", "gray.600")
  const mutedText = useColorModeValue("gray.600", "gray.400")

  useEffect(() => {
    if (room) {
      onChange && onChange({
        villaName: selectedVilla,
        roomType: selectedRoom,
        nights,
        basePrice,
        markupType,
        markupValue,
        totalPrice
      })
    }
  }, [selectedVilla, selectedRoom, nights, markupType, markupValue])

  return (
    <Box p={6} borderWidth="1px" borderColor={border} borderRadius="lg" shadow="md" bg={bg} mt={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>🏡 Pilih Villa</Text>

      <VStack spacing={4} align="stretch">
        <Box>
          <FormLabel>Nama Villa</FormLabel>
          <Select
            placeholder="Pilih villa"
            value={selectedVilla}
            onChange={(e) => {
              setSelectedVilla(e.target.value)
              setSelectedRoom("")
            }}
          >
            {villaData.map((v, idx) => (
              <option key={idx} value={v.villaName}>{v.villaName}</option>
            ))}
          </Select>
        </Box>

        {villa && (
          <Box>
            <FormLabel>Tipe Kamar</FormLabel>
            <Select
              placeholder="Pilih tipe kamar"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              {villa.rooms.map((r, idx) => (
                <option key={idx} value={r.roomType}>{r.roomType}</option>
              ))}
            </Select>
          </Box>
        )}

        {room && (
          <>
            <Box>
              <FormLabel>Jumlah Malam</FormLabel>
              <NumberInput min={1} value={nights} onChange={(_, val) => setNights(val)}>
                <NumberInputField />
              </NumberInput>
            </Box>

            <MarkupInput
              label="Markup"
              value={markupValue}
              type={markupType}
              onTypeChange={setMarkupType}
              onValueChange={setMarkupValue}
            />

            <Box mt={2} bg={useColorModeValue("gray.100", "gray.800")} p={3} rounded="md">
              <Text fontWeight="medium">Total Harga</Text>
              <Text fontSize="lg" fontWeight="bold">
                Rp {totalPrice.toLocaleString("id-ID")}
              </Text>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  )
}

export default VillaSelector
