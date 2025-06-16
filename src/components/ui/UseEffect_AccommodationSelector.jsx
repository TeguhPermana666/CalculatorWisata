import {
  Box, Text, VStack, HStack, Tabs, TabList, TabPanels, Tab, TabPanel,
  FormLabel, Select, NumberInput, NumberInputField, useColorModeValue, Button
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import hotels from "../../data/hotels.json"
import villas from "../../data/villas.json"

const AccommodationSelector = ({ onHotelChange, onVillaChange }) => {
  const [type, setType] = useState("hotel")

  // Hotel state
  const [selectedHotel, setSelectedHotel] = useState("")
  const [selectedHotelRoom, setSelectedHotelRoom] = useState("")
  const [hotelNights, setHotelNights] = useState(1)
  const [hotelSeason, setHotelSeason] = useState("normal")
  const [hotelMarkupType, setHotelMarkupType] = useState("percent")
  const [hotelMarkupValue, setHotelMarkupValue] = useState(0)

  // Villa state
  const [selectedVilla, setSelectedVilla] = useState("")
  const [selectedVillaRoom, setSelectedVillaRoom] = useState("")
  const [villaSeason, setVillaSeason] = useState("normal")
  const [villaNights, setVillaNights] = useState(1)
  const [villaMarkupType, setVillaMarkupType] = useState("percent")
  const [villaMarkupValue, setVillaMarkupValue] = useState(0)

  const bg = useColorModeValue("white", "gray.700")
  const border = useColorModeValue("gray.200", "gray.600")

  // Hotel logic
  const hotelData = useMemo(() => hotels.filter(h => h.hotelName === selectedHotel), [selectedHotel])
  const selectedHotelData = useMemo(() => hotelData.find(r => r.roomType === selectedHotelRoom), [hotelData, selectedHotelRoom])
  const hotelBasePrice = selectedHotelData?.seasons?.[hotelSeason] ?? 0
  const hotelMarkup = hotelMarkupType === "percent"
    ? (hotelBasePrice * hotelMarkupValue / 100)
    : hotelMarkupValue
  const hotelTotal = (hotelBasePrice + hotelMarkup) * hotelNights

  // Villa logic
  const filteredVillaRooms = useMemo(() => villas.filter(v => v.villaName === selectedVilla), [selectedVilla])
  const villaRoom = useMemo(() => filteredVillaRooms.find(r => r.roomType === selectedVillaRoom), [filteredVillaRooms, selectedVillaRoom])
  const villaBasePrice = villaRoom?.seasons?.[villaSeason] ?? 0
  const totalBaseVilla = villaBasePrice * villaNights
  const villaMarkup = villaMarkupType === "percent"
    ? (totalBaseVilla * villaMarkupValue / 100)
    : villaMarkupValue * villaNights
  const villaTotal = totalBaseVilla + villaMarkup

  useEffect(() => {
    if (type === "hotel" && selectedHotel && selectedHotelRoom && hotelBasePrice > 0) {
      onHotelChange?.({
        hotelName: selectedHotel,
        roomType: selectedHotelRoom,
        nights: hotelNights,
        season: hotelSeason,
        basePrice: hotelBasePrice,
        markupType: hotelMarkupType,
        markupValue: hotelMarkupValue,
        totalPrice: hotelTotal,
      })
    } else if (type === "villa" && selectedVilla && selectedVillaRoom && villaBasePrice > 0) {
      onVillaChange?.({
        villaName: selectedVilla,
        roomType: selectedVillaRoom,
        season: villaSeason,
        nights: villaNights,
        basePrice: villaBasePrice,
        markupType: villaMarkupType,
        markupValue: villaMarkupValue,
        totalPrice: villaTotal
      })
    }
  }, [
    type, selectedHotel, selectedHotelRoom, hotelNights, hotelSeason, hotelMarkupType, hotelMarkupValue,
    selectedVilla, selectedVillaRoom, villaSeason, villaNights, villaMarkupType, villaMarkupValue,
    hotelBasePrice, villaBasePrice
  ])

  return (
    <Box bg={bg} p={6} mt={6} borderWidth="1px" borderColor={border} borderRadius="lg" shadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>🏠 Akomodasi</Text>

      <Tabs variant="solid-rounded" colorScheme="teal" onChange={(index) => setType(index === 0 ? "hotel" : "villa")}>
        <TabList>
          <Tab>Hotel</Tab>
          <Tab>Villa</Tab>
        </TabList>
        <TabPanels>
          {/* HOTEL PANEL */}
          <TabPanel>
            <HStack spacing={4} wrap="wrap">
              <Box minW="200px">
                <FormLabel>Nama Hotel</FormLabel>
                <Select placeholder="Pilih hotel" value={selectedHotel} onChange={(e) => {
                  setSelectedHotel(e.target.value)
                  setSelectedHotelRoom("")
                }}>
                  {[...new Set(hotels.map(h => h.hotelName))].map((name, idx) => (
                    <option key={idx} value={name}>{name}</option>
                  ))}
                </Select>
              </Box>
              <Box minW="250px">
                <FormLabel>Tipe Kamar</FormLabel>
                <Select placeholder="Pilih tipe kamar" value={selectedHotelRoom} onChange={(e) => setSelectedHotelRoom(e.target.value)} isDisabled={!selectedHotel}>
                  {hotelData.map((r, idx) => (
                    <option key={idx} value={r.roomType}>
                      {r.roomType} – Rp {(r.seasons?.[hotelSeason] ?? 0).toLocaleString("id-ID")}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box minW="150px">
                <FormLabel>Musim</FormLabel>
                <Select value={hotelSeason} onChange={(e) => setHotelSeason(e.target.value)}>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="peak">Peak</option>
                </Select>
              </Box>
              <Box minW="150px">
                <FormLabel>Jumlah Malam</FormLabel>
                <NumberInput min={1} value={hotelNights} onChange={(_, val) => setHotelNights(val)}>
                  <NumberInputField />
                </NumberInput>
              </Box>
              <Box minW="250px">
                <FormLabel>Markup</FormLabel>
                <HStack>
                  <Select w="40%" value={hotelMarkupType} onChange={(e) => setHotelMarkupType(e.target.value)}>
                    <option value="percent">%</option>
                    <option value="fixed">Rp</option>
                  </Select>
                  <NumberInput min={0} value={hotelMarkupValue} onChange={(_, val) => setHotelMarkupValue(val)}>
                    <NumberInputField />
                  </NumberInput>
                </HStack>
              </Box>
              <Box bg="gray.600" color="white" px={4} py={2} rounded="md" minW="220px">
                <Text fontWeight="medium">Total Harga Jual</Text>
                <Text fontSize="lg" fontWeight="bold">Rp {hotelTotal.toLocaleString("id-ID")}</Text>
              </Box>
            </HStack>
          </TabPanel>

          {/* VILLA PANEL */}
          <TabPanel>
            <HStack spacing={4} wrap="wrap">
              <Box minW="200px">
                <FormLabel>Nama Villa</FormLabel>
                <Select placeholder="Pilih villa" value={selectedVilla} onChange={(e) => {
                  setSelectedVilla(e.target.value)
                  setSelectedVillaRoom("")
                }}>
                  {[...new Set(villas.map(v => v.villaName))].map((name, idx) => (
                    <option key={idx} value={name}>{name}</option>
                  ))}
                </Select>
              </Box>
              <Box minW="300px">
                <FormLabel>Tipe Kamar</FormLabel>
                <Select placeholder="Pilih tipe kamar" value={selectedVillaRoom} onChange={(e) => setSelectedVillaRoom(e.target.value)} isDisabled={!selectedVilla}>
                  {filteredVillaRooms.map((r, idx) => (
                    <option key={idx} value={r.roomType}>
                      {r.roomType} – Normal: Rp {(r.seasons?.normal ?? 0).toLocaleString("id-ID")}, High: Rp {(r.seasons?.high ?? 0).toLocaleString("id-ID")}, Peak: Rp {(r.seasons?.peak ?? 0).toLocaleString("id-ID")}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box minW="150px">
                <FormLabel>Musim</FormLabel>
                <Select value={villaSeason} onChange={(e) => setVillaSeason(e.target.value)}>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="peak">Peak</option>
                </Select>
              </Box>
              <Box minW="150px">
                <FormLabel>Jumlah Malam</FormLabel>
                <NumberInput min={1} value={villaNights} onChange={(_, val) => setVillaNights(val)}>
                  <NumberInputField />
                </NumberInput>
              </Box>
              <Box minW="250px">
                <FormLabel>Markup</FormLabel>
                <HStack>
                  <Select w="40%" value={villaMarkupType} onChange={(e) => setVillaMarkupType(e.target.value)}>
                    <option value="percent">%</option>
                    <option value="fixed">Rp</option>
                  </Select>
                  <NumberInput min={0} value={villaMarkupValue} onChange={(_, val) => setVillaMarkupValue(val)}>
                    <NumberInputField />
                  </NumberInput>
                </HStack>
              </Box>
              <Box bg="gray.600" color="white" px={4} py={2} rounded="md" minW="220px">
                <Text fontWeight="medium">Total Harga Jual</Text>
                <Text fontSize="lg" fontWeight="bold">Rp {villaTotal.toLocaleString("id-ID")}</Text>
              </Box>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default AccommodationSelector
