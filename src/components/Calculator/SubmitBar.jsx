import { Button, Flex, Text, useToast } from "@chakra-ui/react"
import useCalculator from "../../hooks/useCalculator"
import { generateWhatsAppMessage } from "../../utils/whatsappFormatter"
import { v4 as uuidv4 } from "uuid"

const SubmitBar = ({ onReset }) => {
  const toast = useToast()
  const {
    hotel, villa, tours, extras, totalPrice, resetAll
  } = useCalculator()

  const isEmpty =
    !hotel && !villa && tours.length === 0 && extras.length === 0

  if (isEmpty) return null // jangan render apa-apa kalau kosong

  const handleSaveToHistory = () => {
    const item = {
      id: uuidv4(),
      guestName: "Budi",
      agent: "Fikri",
      date: new Date().toISOString().slice(0, 10),
      hotel, villa, tours, extras,
      totalPrice
    }

    const existing = JSON.parse(localStorage.getItem("calc_history") || "[]")
    localStorage.setItem("calc_history", JSON.stringify([...existing, item]))

    toast({
      title: "Disimpan ke Riwayat.",
      status: "success",
      duration: 3000,
      isClosable: true
    })
  }

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage({
      hotel, villa, tours, extras, total: totalPrice
    })
    const number = "6282147379372"
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Flex
      justify="space-between"
      align="center"
      bg="gray.100"
      p={4}
      position="sticky"
      bottom={0}
      zIndex={10}
      background="blackAlpha.800"
      color="white"
    >
      <Text fontWeight="bold">Total: Rp {totalPrice.toLocaleString("id-ID")}</Text>

      <Flex gap={2}>
        <Button colorScheme="green" onClick={handleWhatsApp}>
          Kirim via WhatsApp
        </Button>
        <Button onClick={() => {
          resetAll()
          onReset?.()
        }}>
          Reset
        </Button>
        <Button colorScheme="blue" onClick={handleSaveToHistory}>
          Simpan
        </Button>
      </Flex>
    </Flex>
  )
}


export default SubmitBar
