import { HStack, Text } from "@chakra-ui/react"

const LabelWithValue = ({ label, value, isBold = false }) => (
  <HStack justify="space-between" w="100%">
    <Text color="gray.600">{label}</Text>
    <Text fontWeight={isBold ? "bold" : "normal"}>{value}</Text>
  </HStack>
)

export default LabelWithValue
