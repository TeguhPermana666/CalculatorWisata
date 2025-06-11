import {
  Box, Button, FormLabel, HStack, Input, NumberInput, NumberInputField,
  Select, Text, VStack, IconButton, useColorModeValue
} from "@chakra-ui/react"
import { useState } from "react"
import { DeleteIcon } from "@chakra-ui/icons"
import tourData from "../../data/tours.json"

const TourSelector = ({ onChange }) => {
  const [items, setItems] = useState([])
  const [input, setInput] = useState({
    tourName: "",
    participants: 2,
    markupType: "percent",
    markupValue: 0,
  })

  const selectedTour = tourData.find(t => t.name === input.tourName)
  const basePrice = selectedTour?.price || 0
  const totalBase = basePrice * input.participants

  const markup = input.markupType === "percent"
    ? (totalBase * input.markupValue) / 100
    : input.markupValue

  const finalPrice = totalBase + markup

  const bg = useColorModeValue("white", "gray.700")
  const border = useColorModeValue("gray.200", "gray.600")
  const textMuted = useColorModeValue("gray.600", "gray.400")

  const handleAdd = () => {
    if (!input.tourName || input.participants <= 0) return

    const newItem = {
      ...input,
      basePrice: totalBase,
      finalPrice,
    }
    const updated = [...items, newItem]
    setItems(updated)
    setInput({ tourName: "", participants: 2, markupType: "percent", markupValue: 0 })
    onChange && onChange(updated)
  }

  const handleDelete = (index) => {
    const updated = items.filter((_, i) => i !== index)
    setItems(updated)
    onChange && onChange(updated)
  }

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md" bg={bg} borderColor={border} mt={6}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>🗺️ Paket Tour</Text>

      <VStack spacing={4} align="stretch">
        <Box>
          <FormLabel>Nama Paket</FormLabel>
          <Select
            placeholder="Pilih paket"
            value={input.tourName}
            onChange={(e) => setInput({ ...input, tourName: e.target.value })}
          >
            {tourData.map((t, idx) => (
              <option key={idx} value={t.name}>{t.name}</option>
            ))}
          </Select>
        </Box>

        <Box>
          <FormLabel>Jumlah Peserta</FormLabel>
          <NumberInput min={1} value={input.participants} onChange={(_, val) => setInput({ ...input, participants: val })}>
            <NumberInputField />
          </NumberInput>
        </Box>

        <Box>
          <FormLabel>Markup</FormLabel>
          <HStack spacing={3}>
            <Select w="40%" value={input.markupType} onChange={(e) => setInput({ ...input, markupType: e.target.value })}>
              <option value="percent">%</option>
              <option value="fixed">Rp</option>
            </Select>
            <NumberInput min={0} value={input.markupValue} onChange={(_, val) => setInput({ ...input, markupValue: val })}>
              <NumberInputField />
            </NumberInput>
          </HStack>
        </Box>

        <Button colorScheme="blue" onClick={handleAdd}>Tambah Paket</Button>

        {items.length > 0 && (
          <Box pt={4}>
            <Text fontWeight="semibold" mb={2}>Daftar Paket:</Text>
            {items.map((item, idx) => (
              <Box key={idx} p={3} rounded="md" bg={useColorModeValue("gray.100", "gray.800")} mb={2}>
                <HStack justify="space-between">
                  <Box>
                    <Text fontWeight="medium">{item.tourName}</Text>
                    <Text fontSize="sm" color={textMuted}>
                      {item.participants} peserta x Rp {selectedTour?.price?.toLocaleString("id-ID") || 0} = Rp {item.basePrice.toLocaleString("id-ID")}<br />
                      Markup: {item.markupType === "percent" ? `${item.markupValue}%` : `Rp ${item.markupValue.toLocaleString("id-ID")}`}<br />
                      <strong>Total: Rp {item.finalPrice.toLocaleString("id-ID")}</strong>
                    </Text>
                  </Box>
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    aria-label="hapus"
                    onClick={() => handleDelete(idx)}
                  />
                </HStack>
              </Box>
            ))}
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default TourSelector
