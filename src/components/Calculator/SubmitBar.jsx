import { Button, Flex, Text } from "@chakra-ui/react"
import { useCalculator } from "../../context/CalculatorContext"
import { generateWhatsAppMessage } from "../../utils/whatsappFormatter"

import { v4 as uuidv4 } from "uuid"

const handleSaveToHistory = () => {
  const item = {
    id: uuidv4(),
    guestName: "Budi",  // Nanti bisa diisi via input form
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


const SubmitBar = ({ onSubmit, onReset, total }) => {
  const { hotel, villa, tours, extras } = useCalculator()

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage({
      hotel,
      villa,
      tours,
      extras,
      total,
    })
    const number = "6282147379372"
    const url = `https://wa.me/${number}?text=${message}`
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
      background={"blackAlpha.800"}
      color="white"
    >
      <Text fontWeight="bold" color={"white"}>Total: Rp {total.toLocaleString("id-ID")}</Text>

      <Flex gap={2}>
        <Button colorScheme="green" onClick={handleWhatsApp}>
          Kirim via WhatsApp
        </Button>
        <Button onClick={onReset}>Reset</Button>
        <Button colorScheme="blue" onClick={onSubmit}>Simpan</Button>
      </Flex>
    </Flex>
  )
}

export default SubmitBar
