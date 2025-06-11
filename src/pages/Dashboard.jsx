import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Text
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [history, setHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("calc_history")
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  const handleLoad = (item) => {
    localStorage.setItem("calc_data", JSON.stringify(item))
    navigate("/calculator")
  }

  const handleDelete = (id) => {
    const filtered = history.filter((item) => item.id !== id)
    setHistory(filtered)
    localStorage.setItem("calc_history", JSON.stringify(filtered))
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Riwayat Simulasi</Heading>
      {history.length === 0 ? (
        <Text>Tidak ada data kalkulasi.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nama Tamu</Th>
              <Th>Agent</Th>
              <Th>Tanggal</Th>
              <Th isNumeric>Total</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map((item) => (
              <Tr key={item.id}>
                <Td>{item.guestName}</Td>
                <Td>{item.agent}</Td>
                <Td>{item.date}</Td>
                <Td isNumeric>Rp {item.totalPrice.toLocaleString("id-ID")}</Td>
                <Td>
                  <Button size="sm" onClick={() => handleLoad(item)} colorScheme="blue" mr={2}>
                    Lihat
                  </Button>
                  <Button size="sm" onClick={() => handleDelete(item.id)} colorScheme="red">
                    Hapus
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}

export default Dashboard
