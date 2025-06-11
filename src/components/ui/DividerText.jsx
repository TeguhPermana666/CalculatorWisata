import { Box, Divider, HStack, Text } from "@chakra-ui/react"

const DividerText = ({ text }) => (
  <HStack my={4} align="center">
    <Divider />
    <Text fontSize="sm" px={2} color="gray.500">{text}</Text>
    <Divider />
  </HStack>
)

export default DividerText
